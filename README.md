# Delta_node

# Installation Process

#### Follow these steps to install and run the project:
- Clone the repository: `https://github.com/divamidesignlabs/delta_node.git `
- Navigate into the project directory: `cd delta_node`
- Install the dependencies: `npm i`
- Set up your environment variables. You can use the `dev.env` file for development.
- Run the project: `npm start`
- If there is an issue while `npm start` in your windows run `npm install -g win-node-env`

# Modules and usage

### Husky Installation and usage

- To install husky run `npm install --save-dev husky`
- Configure it using `npx husky init`
- Add required commands that need to be executed before git commit (e.g. linting -> npm run lint)

#### PostgreSQL Database:

- Step 1: install using `npm install pg`
- Step 2: install using `npm install --save @nestjs/typeorm typeorm mysql2`
- Step 3: Initiate the database connection using the Data source and credentials from the env file PostgreSQL is a open-source relational database management system known for its reliability, robustness, and advanced features.

#### MongoDB Setup:

- Step 1: install `npm install --save @nestjs/mongoose mongoose`
- Step 2: Initiate the database connection using the credentials from the env file

#### DataSource:

- In TypeORM, a DataSource is an object that represents a connection to a database. It encapsulates the necessary information required to establish a connection, such as database type, host, port, username, password, and database name.

#### Connection Options:

- When creating a DataSource instance for PostgreSQL, connection options such as host, port, username, password, and database name are provided. These options are typically read from environment variables for security and flexibility.

#### Entities:

- In TypeORM, entities are TypeScript classes that represent database tables. They define the structure of the data and how it is stored in the database. The entities array contains all the entity classes to be used in the database connection.

#### Winston:

- Winston Logger offers various transport options for logging:

- Console: Logs messages to the console.
- File: Logs messages to a file.
- AWS CloudWatch: Logs messages to AWS CloudWatch by configuring AWS credentials in the environment and granting CloudWatch access to the IAM user.
- MongoDB: Logs messages to MongoDB by specifying the MongoDB URI in the environment.

