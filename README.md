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
1. Open your VSCode or terminal 
2. Make sure you have installed "NodeJs". If you haven't, you   can get it here:\
    NodeJS: https://nodejs.org/en
3. Clone this repo locally in your computer using terminal
\
  ```git clone https://github.com/merryskac/PlayAPI.git ``` \
  and then do on your terminal\
  ```cd PlayAPI```

5. On your terminal, do
```npm install``` to install necessary package for this program

6. Make sure you have installed "MongoDB Compass" on your computer. You can get it from https://www.mongodb.com/products/compass

7. On MongoDB Compass, connect to the Database with URI
 ```mongodb://localhost:27017``` OR ```mongodb://0.0.0.0:27017```

8. On your terminal, type 
```node server.js```

9. On your terminal, there will be message
```
server Open!
Database Connected!
```

9. Now you can use the API. the base URL is 
```localhost:3000```\
Make sure this port is clear.
You can try with your browser, or Postman App, or terminal using curl.

10. Once the program is running, this program automatically insert a document of data to the database if you don't have the same database. so, if you do (example) ```GET /play/thumbnail``` for the first time, even you have not insert any data yet, you will get document as a response.

P.S. I hope this instruction is clear, and hopefully I can get max Grade for this mid term in this GIGIH 3.0 Program ✌
