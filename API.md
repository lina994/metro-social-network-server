# Supported API methods

## Navigation

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
  - email (string)
  - password (string)
  - role (string)
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
  - createdAt (DATETIME)
  - updatedAt (DATETIME)



