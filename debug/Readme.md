## Scenario
You’ve inherited the following backend code intended to fetch, sort, and return social media posts using a Mongoose model. However, the code sometimes **returns duplicate posts** or **hangs and never responds**.



## Original Code

```js
// postsController.js
async function getSortedPosts(req, res) {
  const posts = await Posts.find(); // Mongoose model
  posts.sort((a, b) => b.created - a.created);
  res.json(posts);
}

// router.js
router.get('/posts', async (req, res) => {
  await getSortedPosts(req, res);
  console.log('Done.');
});
```

## Problems Identified

 Non-blocking async call without error handling

- If `getSortedPosts()` throws an error, `router.get()` never responds, and the app may hang.
- No `try/catch` or `.catch()` means unhandled promise rejections.

Inefficient sorting in JavaScript after fetching

- Sorting is done in memory using `.sort()` on an array, rather than directly in the database query.
- This causes performance issues on large datasets and can lead to unexpected behavior or duplicates if multiple queries run in parallel.
