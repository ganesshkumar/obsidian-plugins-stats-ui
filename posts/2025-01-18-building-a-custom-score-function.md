---
title: Building Custom Scoring Functions
description: "Learn how to create and utilize custom scoring functions in ObsidianStats to rank plugins based on metrics such as downloads and more."
excerpt: This guide provides a step-by-step walkthrough on creating, validating, and using custom scoring functions in Obsidian. Learn to rank plugins effectively and customize scores to suit your needs.
publishedDate: "2025-01-18"
modifiedDate: "2025-01-18"
tags: 
  - scoring
  - custom score function
  - feature
  - tutorial
---

## Score

- The score is a floating point number ranging from 0 to 1.
- To score a function we must set the property score on plugins (that was passed as argument to the function)
```
plugin.score = 0.5;
```

## Where to see and create score functions?

- `[/scorer](https://www.obsidianstats.com/scorer)` page shows the list of all custom score functions.
- `[/scorer/build](https://www.obsidianstats.com/scorer/build)` page is where we create our custom score functions from.

Have a look at [/scorer](https://www.obsidianstats.com/scorer). Right now, it will be empty with no score functions.

![List of custom scorers](/images/scorer/scorer-list.png)

Click on `+ Create Scorer` button and start creating a scorer.

![Score Builder](/images/scorer/empty-builder.png)

## Signature of the custom score function
To build a custom scorer, you must create a javascript function 

```js
function scorePlugins(plugins, utils) {
  // ...
}
```

- The type of plugins is an array of {@link PluginMetrics}
- The type of utils is {@link ScorerUtils}

Let's build a simple score functions.

## Example 1: Setting score of all plugins to 50 

To set the scores of all plugins to 50, you can write the following custom score function.

```
function scorePlugins(plugins, utils) {
  plugins.forEach(plugin => {
    plugin.score = 0.5; // Setting the score of each plug to 0.5
  })
}
```

The first and last lines are not editable in the UI. So, fill the function with the 3 lines from above.

- One you are done, click `Validate`.
- Upon successful validation, enter a name and description to the score function.
- Click `Save and Use`

![Save and Use](/images/scorer/save-and-use.png)

🎉 Congratulations! Your just set a custom score of 50 to all the plugins across the website. You can see the custom scores in different pages now ([new](https://www.obsidianstats.com/new), [most-downloaded](https://www.obsidianstats.com/most-downloaded) etc.)

Let's build something usable now. In the [/scorer/build](https://www.obsidianstats.com/scorer/build) page, click on "New Scorer" button to build our next scorer.

## Example 2: Setting score based on downloads count

Use the below code to build a custom score function based on download count (totalDownloads property) of the plugins. 

### Get all the download values
```
function scorePlugins(plugins, utils) {
  let downloads = plugins.map(plugin => plugin.totalDownloads);
}
```

### Find min and max download counts among all plugins
```
function scorePlugins(plugins, utils) {
  let downloads = plugins.map(plugin => plugin.totalDownloads);
  const min = Math.min(...downloads); // We use min and max from Math library
  const max = Math.max(...downloads);
}
```

### Assign normalized value of a plugin's totalDownloads as it's score
```
function scorePlugins(plugins, utils) {
  let downloads = plugins.map(plugin => plugin.totalDownloads);
  const min = Math.min(...downloads);
  const max = Math.max(...downloads);
  plugins.forEach(plugin => {
    // we use normalize function from utils
    plugin.score = utils.normalize(plugin.totalDownloads, min, max);
  });
}
```

- The top most downloaded plugin has totalDownloads of 3,244,441 (Excalidraw)
- The second most downloaded plugin has totalDownloads of 2,413,498 (Dataview)
- The above function will score Excalidraw as 100 and the second best plugin will have a score of 76.
- To avoid this skew in number we can remove few extreme values (outliers) on the higher end (we can do it on lower end as well to avoid outliers with zero or very less totalDownloads)

### Remove outliers values before scoring 
```
function scorePlugins(plugins, utils) {
  let downloads = plugins
    .map(plugin => plugin.totalDownloads)
    .sort((a, b) => a - b);  // Let's sort all the totalDownload values
  
  const outliersCount = Math.round(plugins.length * 0.005) // We are considering 0.5% values as outliers on either side
  downloads = downloads.slice(outliersCount, plugins.length - outliersCount) // Sliding off the outliers
  
  const min = Math.min(...downloads);
  const max = Math.max(...downloads);
  plugins.forEach(plugin => {
    // we use normalize function from utils
    plugin.score = utils.normalize(plugin.totalDownloads, min, max);
  });
}
```

This change makes 10 plugins to score more than 80. 

Note: We must analyse the distribution of each dimension we use to determine the outliers. The 0.5% is just an example here!

Validate, give a name and description and click `Save and Use`. 

![Normalized download count scorer](/images/scorer/normalized-download-count-scorer.png)

🚀 Our new custom score function is being used across the website.

You can go to [all plugins](https://www.obsidianstats.com/plugins) and sort by "Score (High to Low)" and see your custom scores in action.
Here is [magic link](https://www.obsidianstats.com/plugins?sortby=score_desc) for the same! 

![all plugins with score](/images/scorer/all-plugins-with-score.png)

Go to [/scorer](https://www.obsidianstats.com/scorer) page to view the list of custom score function. You can edit a score function or use it from here!

![scorer list with scorers](/images/scorer/scorer-list-with-scorers.png)


Note: Your custom score function score the plugin locally in the browser and the custom scores are saved locally in your browser's `localStorage`.


## Going forward

- I want to fix the default score function with clear objective to cater new comers to Obsidian.
- I want to add more functions to `utils` to make building score functions easier. 
- Ofcourse, I want to develop a process to publish scorer function and let everyone use it just like how we use themes and plugins in Obsidian.

## Contribution 

- All your feedback and suggestions are welcome at the [Github discussion](https://github.com/ganesshkumar/obsidian-plugins-stats-ui/discussions/52).
- Will update the link to the source of the `plugins` and `utils` soon. (They are not published anywhere yet as I write this!)