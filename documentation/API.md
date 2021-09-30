# Supported API methods

## Table of contents

- [/people](#people)
  - [/get](#people-get)
- [/friends](#friends)
  - [/get](#friends-get)
  - [/post](#friends-post)
  - [/delete](#friends-delete)
- [/profile](#profile)
  - [/get](#profile-get)
  - [/put](#profile-put)
- [/profile/img](#profileimg)
  - [/put](#profileimg-put)
- [/conversation](#conversation)
  - [/get](#conversation-get)
  - [/post](#conversation-post)
  - [/delete](#conversation-delete)
- [/conversation/messages](#conversationmessages)
  - [/get](#conversationmessages-get)
  - [/post](#conversationmessages-post)
  - [/delete](#conversationmessages-delete)


## /people

### /people get

Input:
- count (Query Param, optional, default: 20)  
- page (Query Param, optional, default: 1)

  Example:  
  http://localhost:3001/api/people?count=25&page=2

Output:
JSON object
- Array of objects
  - Object fields: 
    - id (integer)
    - isActive (boolean)
    - lastLogin (DATETIME)
    - accountStatus (string)
    - firstName (string)
    - lastName (string)
    - imgUrl (string)
    - intro (string)
    - country (string)
    - city (string)
    - gender (string)

## /friends

### /friends get

Input:
- id (Query Param, required)
- count (Query Param, optional, default: 20)  
- page (Query Param, optional, default: 1)

  Example:  
  http://localhost:3001/api/friends?id=1&count=25&page=1

Output:
JSON object
- Object fields: 
  - id (integer)
  - isActive (boolean)
  - lastLogin (DATETIME)
  - accountStatus (string)
  - firstName (string)
  - lastName (string)
  - imgUrl (string)
  - intro (string)
  - country (string)
  - city (string)
  - gender (string)
  - users_friend (JSON Object)
    - id (integer)
    - createdAt (DATETIME)
    - updatedAt (DATETIME)
    - userId (integer)
    - friendId (integer)

### /friends post

Input:
- id1 (body, required)
- id2 (body, required)

  Example:  
  http://localhost:3001/api/friends
  
  req.body = {
    "id1": 1,
    "id2": 4
  }

Output:
JSON object
- Object fields: 
  - id (integer)
  - isActive (boolean)
  - lastLogin (DATETIME)
  - accountStatus (string)
  - firstName (string)
  - lastName (string)
  - imgUrl (string)
  - intro (string)
  - country (string)
  - city (string)
  - gender (string)
  - users_friend (JSON Object)
    - id (integer)
    - createdAt (DATETIME)
    - updatedAt (DATETIME)
    - userId (integer)
    - friendId (integer)

### /friends delete

Input:
- id1 (Query Param, , required)
- id2 (Query Param, , required)

  Example:  
  http://localhost:3001/api/friends?id1=1&id2=3

Output:
empty

## /profile

### /profile get

Input:
- id (Query Param, required)

  Example:  
  http://localhost:3001/api/profile?id=10

Output:
JSON object
- Object fields: 
  - id (integer)
  - isActive (boolean)
  - lastLogin (DATETIME)
  - accountStatus (string)
  - firstName (string)
  - lastName (string)
  - imgUrl (string)
  - intro (string)
  - country (string)
  - city (string)
  - gender (string)

### /profile put

Input:
- id (body, required)
- firstName (body, optional)
- lastName (body, optional)
- imgUrl (body, optional)
- intro (body, optional)
- country (body, optional)
- city (body, optional)
- gender (body, optional)

  Example:
  http://localhost:3001/api/profile
  
  req.body = {
    "id": 1,
    "firstName": "myNewName"
  }

Output:
empty

## /profile/img

### /profile/img put

Input:
- id (integer)
- avatar (file)

  Example:
  http://localhost:3001/api/profile/img
  
  With postman: 
    - set method type to PUT
    - select Body -> form-data
    - set first key to 'id'
      - set value
    - set second key name to 'avatar'
      - set key type from Text to File
      - choose your image file
    You DON'T need to add any headers, Postman will do this for you automatically.

Output:
empty

## /conversation

### /conversation get

Input:
- id (Query Param, required)
- count (Query Param, optional, default: 20)  
- page (Query Param, optional, default: 1)

  Example:  
  http://localhost:3001/api/conversation?id=1&count=2&page=2

Output:
JSON object
- Array of objects
  - Object fields: 
    - id (integer)
    - createdAt (DATETIME)
    - updatedAt (DATETIME)
    - userId (integer)
    - interlocutorId (integer)
    - conversationInterlocutor (JSON Array of objects)
      - id (integer)
      - isActive (boolean)
      - lastLogin (DATETIME)
      - accountStatus (string)
      - firstName (string)
      - lastName (string)
      - imgUrl (string)
      - intro (string)
      - country (string)
      - city (string)
      - gender (string)

### /conversation post

Input:
- id1 (body, required)
- id2 (body, required)

  Example:  
  http://localhost:3001/api/conversation
  
  req.body = {
    "id1": 1,
    "id2": 4
  }

Output:
JSON object
- Object fields: 
  - id (integer)
  - createdAt (DATETIME)
  - updatedAt (DATETIME)
  - userId (integer)
  - interlocutorId (integer)

### /conversation delete

Input:
- conversationId (Query Param, , required)

  Example:  
  http://localhost:3001/api/conversation?conversationId=1

Output:
empty

## /conversation/messages

### /conversation/messages get

Input:
- conversationId (Query Param, required)
- count (Query Param, optional, default: 20)  
- page (Query Param, optional, default: 1)

  Example:  
  http://localhost:3001/api/conversation/messages?conversationId=2&count=5&page=1

Output:
JSON object
- Array of objects
  - Object fields: 
    - id (integer)
    - messageText (string)
    - isRead (boolean)
    - createdAt (DATETIME)
    - updatedAt (DATETIME)
    - conversationId (integer)
    - senderId (integer)
    - receiverId (integer)

### /conversation/messages post

Input:
- conversationId (body, required)
- messageText (body, required)

  Example:  
  http://localhost:3001/api/conversation/messages
  
  req.body = {
    "conversationId": 25,
    "messageText": "my message"
}

Output:
JSON object
- Object fields: 
  - id (integer)
  - isRead (boolean)
  - messageText (string)
  - senderId (integer)
  - receiverId (integer)
  - createdAt (DATETIME)
  - updatedAt (DATETIME)

### /conversation/messages delete

Input:
- messageId (Query Param, , required)

  Example:  
  http://localhost:3001/api/conversation/messages?messageId=12

Output:
empty


