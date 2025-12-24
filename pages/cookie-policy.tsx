import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { User } from 'react-feather';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

const CookiePolicy = () => {
  const completePolicy = (
    <>
      <h1>Cookie Policy for Obsidian Stats</h1>
      <span className="text-sm">Last updated: November 22, 2025</span>
      <p className="mb-2 mt-4">
        <strong>Summary:</strong> Obsidian Stats uses minimal cookies. We use
        ONE httpOnly secure cookie for authentication (refresh token, 7 days
        expiry). Our analytics platform (Plausible), advertising network
        (EthicalAds), and feature flag platform (GrowthBook) are all self-hosted
        and use NO cookies at all.
      </p>

      <hr />
      <h2>Cookies Used by Obsidian Stats</h2>

      <h3>1. Essential Authentication Cookie (First-Party)</h3>
      <div className="my-4">
        <Card>
          <p>
            <strong>Cookie Name:</strong> Refresh Token (httpOnly, secure)
            <br />
            <strong>Purpose:</strong> Used to maintain your login session and
            automatically refresh your access token
            <br />
            <strong>Duration:</strong> 7 days
            <br />
            <strong>Type:</strong> First-party, httpOnly, secure,
            SameSite=Strict
            <br />
            <strong>Category:</strong> Strictly Necessary - Required for
            authentication functionality
            <br />
            <strong>Personal Data:</strong> Session identifier (no readable
            personal data in cookie itself)
            <br />
            <strong>Optional:</strong> Yes - Only set if you choose to sign in
            with Google OAuth
          </p>
        </Card>
      </div>

      <h3>2. Analytics (Cookieless)</h3>
      <div className="my-4">
        <Card>
          <p>
            <strong>Service:</strong> Plausible Analytics (Self-Hosted)
            <br />
            <strong>Cookies Used:</strong> NONE
            <br />
            <strong>Tracking:</strong> Cookieless, privacy-focused analytics
            <br />
            <strong>Personal Data:</strong> None - fully anonymized
            <br />
            <strong>Opt-out:</strong> Not available (no personal data collected,
            GDPR compliant)
          </p>
          <p className="mt-2">
            Plausible Analytics is a privacy-focused analytics service that we
            self-host at plausible.obsidianstats.com. It does not use cookies,
            does not collect personal data, and does not track users across
            websites. All data collected is fully anonymized and aggregated.
            Learn more at{' '}
            <a
              href="https://plausible.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plausible Privacy Policy
            </a>
            .
          </p>
        </Card>
      </div>

      <h3>3. Local Storage (Browser-Only, Not Transmitted)</h3>
      <div className="my-4">
        <Card>
          <p>
            <strong>Data Stored:</strong> Favorite plugins list, access token
            (15-minute expiry), feature flag user ID, user email (when logged
            in)
            <br />
            <strong>Purpose:</strong> Store your favorite plugins locally, cache
            authentication tokens, and identify you for feature flags and A/B
            testing
            <br />
            <strong>Transmission:</strong> Never sent to our servers
            <br />
            <strong>Duration:</strong> Until you clear browser storage
            <br />
            <strong>Category:</strong> Functional - Enhances user experience
            <br />
            <strong>Optional:</strong> Yes - You can clear localStorage at any
            time
          </p>
        </Card>
      </div>

      <h3>4. Feature Flags & A/B Testing (Cookieless, Uses localStorage)</h3>
      <div className="my-4">
        <Card>
          <p>
            <strong>Service:</strong> GrowthBook (Self-Hosted on Our
            Infrastructure)
            <br />
            <strong>Cookies Used:</strong> NONE
            <br />
            <strong>Storage:</strong> Uses browser localStorage only (no
            cookies)
            <br />
            <strong>Data Stored:</strong> User identifier (email if logged in,
            random UUID otherwise), feature flag evaluations
            <br />
            <strong>Self-Hosted:</strong> Fully hosted on our own infrastructure
            - no data shared with GrowthBook, Inc. or external parties
            <br />
            <strong>Tracking:</strong> No cross-site tracking, client-side only
            <br />
            <strong>Personal Data:</strong> User identifier for feature
            targeting (remains on our servers, not sold or shared)
            <br />
            <strong>Opt-out:</strong> Not available - feature flags are
            essential for site functionality
          </p>
          <p className="mt-2">
            GrowthBook is an open-source feature flagging and A/B testing
            platform that we fully self-host on our own infrastructure at
            growthbookapi.obsidianstats.com. Because it is self-hosted, we
            maintain complete control over all data and no information is
            transmitted to GrowthBook, Inc. or any third-party services. It does
            not use cookies and stores all data in browser localStorage. Feature
            evaluations happen client-side in your browser. Learn more about the
            open-source project at{' '}
            <a
              href="https://www.growthbook.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              GrowthBook Open Source
            </a>
            .
          </p>
        </Card>
      </div>

      <h3>5. Advertising (Cookieless)</h3>
      <div className="my-4">
        <Card>
          <p>
            <strong>Service:</strong> EthicalAds
            <br />
            <strong>Cookies Used:</strong> NONE
            <br />
            <strong>Tracking:</strong> No tracking, contextual ads only
            <br />
            <strong>Personal Data:</strong> None - no personal data collected
            <br />
            <strong>Privacy-focused:</strong> GDPR compliant, no cross-site
            tracking
          </p>
          <p className="mt-2">
            EthicalAds is a privacy-focused advertising network that serves
            contextual ads based on page content only. It does not use cookies,
            does not collect personal data, and does not track users across
            websites. Learn more at{' '}
            <a
              href="https://www.ethicalads.io/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              EthicalAds Privacy Policy
            </a>
            .
          </p>
        </Card>
      </div>

      <hr />
      <h2>Analytics Disclosure</h2>
      <p className="mb-2">
        <strong>Important:</strong> Obsidian Stats uses Plausible Analytics to
        collect anonymized usage statistics automatically for all visitors. This
        analytics service:
      </p>
      <ul className="mb-2">
        <li>Does not use cookies or any tracking technologies</li>
        <li>Does not collect any personal information</li>
        <li>Does not track users across websites</li>
        <li>
          Collects only aggregated, anonymized data (page views, referrers,
          browser types, device types, country)
        </li>
        <li>Is fully GDPR, CCPA, and PECR compliant</li>
        <li>Cannot identify individual users</li>
      </ul>
      <p className="mb-2">
        There is no opt-out mechanism for analytics because no personal data is
        collected. By using this website, you acknowledge that anonymized,
        non-personal analytics data will be collected.
      </p>

      <hr />
      <h2>How to Manage Cookies</h2>
      <h3>Browser Settings</h3>
      <p className="mb-2">
        You can control cookies through your browser settings. Most browsers
        allow you to:
      </p>
      <ul className="mb-2">
        <li>View what cookies are stored</li>
        <li>Delete cookies individually or all at once</li>
        <li>Block cookies from specific sites</li>
        <li>Block all third-party cookies</li>
        <li>
          Block all cookies (this may prevent you from using some features)
        </li>
      </ul>
      <p className="mb-2">Learn how to manage cookies in popular browsers:</p>
      <ul className="mb-2">
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h3>Authentication Cookie</h3>
      <p className="mb-2">If you block or delete the authentication cookie:</p>
      <ul className="mb-2">
        <li>You will be logged out</li>
        <li>You will need to sign in again to rate or review plugins</li>
        <li>
          You can still browse and use all other site features without signing
          in
        </li>
      </ul>

      <h3>Local Storage</h3>
      <p className="mb-2">
        You can clear local storage through your browser's developer tools or
        privacy settings. This will clear your favorites list, feature flag
        identifier, and require you to sign in again if you were authenticated.
      </p>

      <hr />
      <h2>Contact Information</h2>
      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <User />
          <div>
            <h3 className="mt-0!">Owner and Data Controller</h3>
            <p>
              <strong>Contact email:</strong>{' '}
              <a href="mailto:rpganesshkumar@gmail.com">
                rpganesshkumar@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <p className="pt-4">
        For more information about how we handle your data, please see our{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header
          title="Cookie Policy | Obsidian Stats"
          description="Cookie policy for Obsidian Stats"
          canonical="https://www.obsidianstats.com/cookie-policy"
          image="/images/obsidian-stats-ogImage.png"
        />
        <Navbar current="cookie-policy" />

        <div className="bg-white pt-5 grow mt-8">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            <div
              className={`prose max-w-none!
                prose-h1:text-2xl prose-h1:mb-0
                prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-1
                prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-1
                prose-h4:mt-4 prose-h4:mb-1
                prose-hr:my-4
                prose-p:my-1 prose-p:text-sm
                prose-li:text-sm`}
            >
              {completePolicy}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CookiePolicy;
