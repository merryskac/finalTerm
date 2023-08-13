# Play API

## Database Structure

- Video Schema

```http
  {
    _id: ObjectId(),
    title: String,
    thumbnail_img: String,
    created_at: Date.now,
    ended_at: Date.now,
  }
```

- Comment Schema

```http
  {
    _id: ObjectId(),
    username: String,
    comment: String,
    videoID: String,
    timestamp: Date.now
  }
```

- Product Schema

```http
  {
    _id: ObjectId(),
    link_product: String,
    title: String,
    price: String,
    videoID: String
  }
```

## API Structure

- Get All Thumbnail

```http
  GET /play/thumbnails
```

- Post a video

```http
  POST /play/post-video

```

| Parameter       | Type     | Description                         |
| :-------------- | :------- | :---------------------------------- |
| `title`         | `string` | **Required**. Your Video title      |
| `thumbnail_img` | `string` | **Required**. Your thumbnail source |

- Get Comments By Video Id

```http
  GET /play/comments/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Video id (\_id) |

- Post a comment

```http
  POST /comments/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Video id (\_id) |

- Get All Products by Video Id

```http
  GET /play/products/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Video Id (\_id) |

- Add a product

```http
  POST /play/products/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Video Id (\_id) |
