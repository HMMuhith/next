SELECT  *  FROM  users ORDER BY age DESC
const User.find().sort({age:-1})


SELECT * FROM users WHERE age>20;
User.find({age:{$gt:20}})

SELECT * FROM users LIMIT 10 OFFSET 20
User.find().limit(10).skip(20)

SELECT * FROM users IN (18,20,25)

User.find({age:{$in :[18,20,25]}})

SELECT * FROM users WHERE age<18 OR  age>60
User.find({$or:[{age:{$lt:20}},{age:{$gt:60}}]})

SELECT * FROM users WHERE age<18 AND city='NYC'
User.find({age:{gt>18},city:'NYC'})

SELECT COUNT(*) FROM users
User.countDocuments()