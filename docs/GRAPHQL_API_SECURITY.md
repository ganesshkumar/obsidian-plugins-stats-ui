# GraphQL API Security

This document describes the security measures implemented for the GraphQL API endpoint (`/api/graphql`).

## Overview

The GraphQL API has been hardened against common attack vectors including:

- **Denial of Service (DoS)** attacks via excessive requests
- **Resource exhaustion** via expensive or deeply nested queries
- **API abuse** through malicious automation

## Security Measures

### 1. Rate Limiting

**Configuration:**

- **Limit:** 100 requests per minute per IP address
- **Window:** 60 seconds (sliding window)
- **Identifier:** Client IP address (from `x-forwarded-for` or `x-real-ip` headers)

**Implementation:**

- In-memory store with automatic cleanup of expired entries
- Returns HTTP 429 (Too Many Requests) when limit is exceeded
- Provides standard rate limit headers:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: Time when the rate limit resets
  - `Retry-After`: Seconds to wait before retrying

**Response on Rate Limit:**

```json
{
  "errors": [
    {
      "message": "Rate limit exceeded. Please try again in X seconds.",
      "extensions": {
        "code": "RATE_LIMIT_EXCEEDED",
        "retryAfter": 30
      }
    }
  ]
}
```

**Production Considerations:**
For production deployments with multiple server instances, consider replacing the in-memory store with Redis or another distributed cache to ensure consistent rate limiting across all instances.

### 2. Query Complexity Analysis

**Configuration:**

- **Maximum Complexity:** 2000 points
- **Default Field Cost:** 1 point per field

**How It Works:**
Each field in a GraphQL query has an associated cost (complexity). The total complexity is calculated by summing the costs of all requested fields. If the total exceeds the maximum, the query is rejected before execution.

**Example:**
A simple query requesting a few fields might have a complexity of 10-50 points, while a query requesting all plugins with all fields would have a higher complexity.

**Response on Complexity Limit:**

```
Query is too complex: 2500. Maximum allowed complexity: 2000.
Please simplify your query by requesting fewer fields or reducing nesting depth.
```

**Customization:**
Field-specific complexity can be configured using the `fieldExtensionsEstimator`, allowing you to assign higher costs to expensive operations like:

- Queries that return large lists
- Fields that require database joins
- Computationally expensive calculations

### 3. Query Depth Limiting

**Configuration:**

- **Maximum Depth:** 10 levels

**How It Works:**
Prevents deeply nested queries that could cause excessive database queries or memory consumption. The depth is calculated by counting the levels of nesting in the GraphQL query.

**Example of Rejected Query:**

```graphql
query {
  plugins {
    ratingInfo {
      # ... (continues for more than 10 levels)
    }
  }
}
```

## Security Best Practices

### For API Consumers

1. **Respect Rate Limits:** Monitor the `X-RateLimit-*` headers and implement exponential backoff
2. **Optimize Queries:** Request only the fields you need to reduce complexity
3. **Cache Responses:** Use the `Cache-Control` headers to cache responses appropriately
4. **Handle Errors:** Implement proper error handling for rate limit and complexity errors

### For API Maintainers

1. **Monitor Usage:** Track query complexity and rate limit hits to adjust thresholds
2. **Consider Redis:** For production with multiple instances, use Redis for rate limiting
3. **Adjust Limits:** Fine-tune complexity and rate limits based on actual usage patterns
4. **Field Costs:** Assign appropriate complexity costs to expensive fields

## Testing

The security measures can be tested using the following approaches:

### Rate Limiting Test

```bash
# Send multiple requests rapidly to trigger rate limiting
for i in {1..150}; do
  curl -X POST http://localhost:5000/api/graphql \
    -H "Content-Type: application/json" \
    -d '{"query":"{ plugins { pluginId name } }"}'
done
```

### Query Complexity Test

```graphql
# Query with many fields to test complexity limit
query ExpensiveQuery {
  plugins {
    pluginId
    name
    author
    description
    osDescription
    osCategory
    osTags
    repo
    createdAt
    latestReleaseAt
    latestRelease
    totalDownloads
    score
    scoreReason
    closedIssues
    openIssues
    totalIssues
    mergedPR
    closedPR
    openPR
    totalPR
    commitCountInLastYear
    stargazers
    subscribers
    forks
    zScoreTrending
    ratingInfo {
      avgRating
      ratingCount
      star5Count
      star4Count
      star3Count
      star2Count
      star1Count
    }
  }
}
```

### Query Depth Test

```graphql
# Deeply nested query to test depth limit
query DeepQuery {
  categoriesLite {
    name
    topPlugins {
      pluginId
      name
      # If we could nest further, this would trigger the depth limit
    }
  }
}
```

## Monitoring and Logging

The implementation logs query complexity to the console for monitoring:

```
Query complexity: 150
```

In production, you should:

1. Send these logs to a centralized logging system
2. Set up alerts for:
   - High rate limit violations
   - Queries approaching the complexity limit
   - Unusual traffic patterns
3. Track metrics over time to inform limit adjustments

## Future Enhancements

Potential improvements for enhanced security:

1. **User-based Rate Limiting:** Different limits for authenticated vs. anonymous users
2. **Query Allowlist:** Whitelist specific queries in production
3. **Custom Field Complexity:** Assign costs based on actual computational expense
4. **GraphQL Shield:** Add authorization layer for field-level access control
5. **Persistent Banning:** Block malicious IPs after repeated violations
6. **Dynamic Rate Limiting:** Adjust limits based on server load

## Related Files

- `/pages/api/graphql.ts` - Main GraphQL API implementation
- `/pages/api/graphql.test.ts` - Security tests for the API

## Dependencies

- `graphql-query-complexity`: Analyzes and enforces query complexity limits
- `graphql-depth-limit`: Enforces maximum query depth
- `graphql-yoga`: GraphQL server framework with plugin support

## References

- [GraphQL Query Complexity](https://www.npmjs.com/package/graphql-query-complexity)
- [GraphQL Depth Limit](https://www.npmjs.com/package/graphql-depth-limit)
- [GraphQL Yoga Plugins](https://the-guild.dev/graphql/yoga-server/docs/features/envelop-plugins)
- [Rate Limiting Best Practices](https://www.somethingsblog.com/2024/10/19/protect-your-graphql-api-rate-limits-depth-limits/)
