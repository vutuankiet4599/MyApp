MY APP BACKEND

Installation:
- Clone this code to your local
- Run command: npm install (or anything like this) to install all dependencies
- Create file .env and fill all enviroment variable in file .env.example
- Create database (name you set in file .env)
- Run command: npx sequelize-cli db:migrate and npx sequelize-cli db:seed:all
- Run command: npm start to start project

Enviroment variable:
- NODE_ENV: project enviroment
- PORT: port where project run on
- DB_NAME: your database name
- DB_USERNAME: username of database
- DB_PASSWORD: password of database
- DB_HOST: database host
- DB_DIALECT: your dbms(mysql, postgres...)
- MAIL: your mail
- MAIL_PASSWORD: app password of mail 
(https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer)
You can visit this link for details
- HOST: Your project host
- PROTOCOL: Your protocol(http or https)

Status code:
- 00: Account is existed
- 01: Username or password is not existed
- 02: Password wrong
- 03: Lack of required information
- 04: Registration failed
- 05: Unkown error
- 06: Registration successfully
- 07: Update account successfully
- 08: Authorization header not found
- 09: Wrong token
- 10: Wrong role
- 11: Account is login
- 12: Get products success
- 13: You don't have permission
- 14: Insert product success
- 15: Delete product success
- 16: Update product success
- 17: Logout success
- 18: Account not accpected