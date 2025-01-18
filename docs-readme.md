## Custom Scorer

To build a custom scorer, you have to create a function 

```js
function scorePlugins(plugins, utils) {
  // ...
}
```

- The type of plugins is an array of {@link PluginMetrics}
- The type of utils is {@link ScorerUtils}