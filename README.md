# finalTerm

# Play API
## Database Structure

(new added)
* Account Schema
```
  {
    _id: ObjectId(),
    username: String,
    password: String,
    refreshToken: Date.now,
  }
```

* Channel Schema
```
  {
    _id: ObjectId(),
    title: String,
    thumbnail_img: String,
    created_at: Date.now,
    ended_at: Date.now,
  }
```
* Comment Schema
```
  {
    _id: ObjectId(),
    username: String,
    comment: String,
    videoID: String,
    timestamp: Date.now
  }
```
* Product Schema
```
  {
    _id: ObjectId(),
    link_product: String,
    title: String,
    price: String,
    videoID: String
  }
```

.
## API Structure
```Client sending request``` -> ```server.js``` -> ```router files, handle specific path```->```controller files, handle req, res```->```use case files, call model function```->```model files, use mongoose function```->```grab data from MongoDB```->```Data go to model files as return```->```model files return data to usecase files```->```use case files process datas and return it to controller files```->```controller files handle data and make it a JSON response```->```Data go to router files as return```->```give result to client```

so files in order:
```server.js (/play)```

```router files (channel, comment, product, account)```

```controller files (channel, comment,product, account)```

```use case files (channel, comment, product)```

```model files (channel,comment, product, account)```

# API Request and Response
## GET /logout
* URL Params \
  none
* Data Params \
  None
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    message: 'logout success'
  }
  ```

## GET /cektoken
* URL Params \
  none
* Data Params \
  None
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    message: {'access token refreshed', access_token: <access token>, username: <username>}
  }
  ```
* Error Response: \
  * Code: 403 \
    content: ```{message: please relogin}```
  * Code: 403 \
    content: ```{message: <error message from jwt>}```
  * Code: 403 \
    content: ```{message: <error message from jwt>}```



## POST /register
* URL Params \
  none
* Data Params 
  ```
  {
    username: string,
    password: string
  }
  ```
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    account: {<account_object>}
  }
  ```
* Error Response: \
  * Code: 403 \
    content: ```{message: username already exist}```

## POST /login
* URL Params \
  none
* Data Params 
  ```
  {
    username: string,
    password: string
  }
  ```
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    account: {<account_object>, access_token: <access_token>}
  }
  ```
* Error Response: \
  * Code: 404 \
    content: ```{message: username not found}```
* Code: 400 \
content: ```{message: wrong password}```


## GET /play/thumbnails
* URL Params \
  none
* Data Params \
  None
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    thumbnails: [
      {<channel_object>}
      {<channel_object>}
      {<channel_object>}
    ]
  }
  ```

## POST /play/post-video
* URL Params \
  none
* Data Params 
  ```
  {
    title: string,
    thumbnail_img: string
  }
  ```
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    video: {<channel_object>}
  }
  ```
* Error Response: \
  * Code: 400 \
    content: ```{message: title and thumbnail_img are required}```


## GET /play/comments/:videoID
* URL Params \
  Required: ```videoID: string``` 
* Data Params  \
  None
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    comments: [
      {<comment_object>},
      {<comment_object>},
      {<comment_object>} 
    ]
  }
  ```
* Error Response:
  * Code: 404 \
    content: ```{message: "Video content not found"}```\
    OR 
  * Code: 400 \
    content: ``` {message: "Cast to ObjectId failed for value \"${id}" (type string) at path \"_id"} ``` 



## POST /play/comments/:videoID
  * URL Params \
  Required: ```videoID: string```
* Data Params  \
  ```
  {
    username: string,
    comment: string
  }
  ```
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    message:"Comment successfully added"
  }
  ```
* Error Response:
  * Code: 404 \
    content: ```{message: "Video content not found"}```\
    OR 
  * Code: 400 \
    content: ``` {message: "Cast to ObjectId failed for value \"${id}" (type string) at path \"_id"} ``` 
  * Code: 400 \
    content: ```{message: title and thumbnail_img are required}```

## GET /play/products/:videoID
  * URL Params \
  Required: ```videoID: string```
* Data Params  \
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    products:[
      {<product_object>},
      {<product_object>},
      {<product_object>}
    ]
  }
  ```
* Error Response:
  * Code: 404 \
    content: ```{message: "Video content not found"}```\

    OR 
  * Code: 400 \
    content: ``` {message: "Cast to ObjectId failed for value \"${id}" (type string) at path \"_id"} ``` 


## POST /play/products/:videoID
  * URL Params \
  Required: ```videoID: string```
* Data Params  \
  ```
  {
    "link_product":string,
      "name":string,
      "price":int
  }
  ```
* Headers \
  Content-Type: application/json
* Success Response \
  * Code: 200 \
  * Content:
  ```
  {
    product:{<product_object>}
  }
  ```
* Error Response:
  * Code: 404 \
    content: ```{message: "Video content not found"}```\

    OR 
  * Code: 400 \
    content: ``` {message: "Cast to ObjectId failed for value \"${id}" (type string) at path \"_id"} ``` 

    OR
  * Code: 400 \
    content: ```{message: Data link_product, name, price are required!}```

    OR
  * Code: 400 \
    content: ```{message: price should be number}```

## HOW TO RUN
1. This database is now running in my MongoDB Atlas, so it's accessible online.
2. You can see this api in this link
   https://final-term-git-main-wheytosharepalu-gmailcom.vercel.app/
   use the instruction up there for the endpoints


P.S. I hope this instruction is clear, and hopefully I can get max Grade for this mid term in this GIGIH 3.0 Program ✌
