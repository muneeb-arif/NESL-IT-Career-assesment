You’re building analytics for a social network where:
- Users can follow each other
- Users can create posts
- You want to fetch recent posts from the users someone follows

## Collection Schema Design

###  `users` Collection
```json
{
  "_id": ObjectId("u1"),
  "name": "Alice",
  "joined": ISODate("2024-01-15T09:00Z")
}
```
### `follows` Collection
```json
{
  "_id": ObjectId(),
  "followerId": ObjectId("u1"),
  "followingId": ObjectId("u2")
}
```
### `posts` Collection
```json
{
  "_id": ObjectId("p1"),
  "authorId": ObjectId("u2"),
  "content": "Hello!",
  "created": ISODate("2024-03-10T18:00Z")
}
```

## Aggregation Pipeline

The following MongoDB aggregation retrieves the 10 most recent posts from all users followed by a given user (e.g. u1). Each result includes the post’s content, created date, and the author's name.

```js
const userId = ObjectId("u1");

db.follows.aggregate([
  { $match: { followerId: userId } },
  {
    $lookup: {
      from: "posts",
      localField: "followingId",
      foreignField: "authorId",
      as: "posts"
    }
  },
  { $unwind: "$posts" },
  {
    $lookup: {
      from: "users",
      localField: "followingId",
      foreignField: "_id",
      as: "author"
    }
  },
  { $unwind: "$author" },
  {
    $project: {
      _id: 0,
      content: "$posts.content",
      created: "$posts.created",
      authorName: "$author.name"
    }
  },
  { $sort: { created: -1 } },
  { $limit: 10 }
]);
```

## Indexing Strategy
To ensure efficient queries and scalability, the following indexes should be added:

### `posts` Collection
```js
db.posts.createIndex({ authorId: 1, created: -1 });
```
- Supports filtering by author and sorting by most recent
- Essential for pagination and feed performance

### `follows` Collection
```js
db.follows.createIndex({ followerId: 1 });
db.follows.createIndex({ followingId: 1 });
```
- Enables quick lookups of a user’s followings and followers
- Critical for real-time social graphs

### `users` Collection
Default `_id` index is sufficient for looking up author names during joins