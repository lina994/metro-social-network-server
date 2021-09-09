# Supported API methods

## Table of contents

- [/people](#people)


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



