# Supported API methods

## Table of contents

- [/people](#people)
- [/friends](#friends)
- [/profile](#profile)


## /people

### get

Input:
- count (Query Param, default: 20)  
- page (Query Param, default: 1)

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

### get

Input:
- id (Query Param, required)
- count (Query Param, default: 20)  
- page (Query Param, default: 1)

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
  - users_friend (JSON Array)
    - id (integer)
    - createdAt (DATETIME)
    - updatedAt (DATETIME)
    - userId (integer)
    - friendId (integer)

  ### post

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

  ### delete

Input:
- id1 (Query Param, , required)
- id2 (Query Param, , required)

  Example:  
  http://localhost:3001/api/friends?id1=1&id2=3

Output:
empty

## /profile

### get

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

### put

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

