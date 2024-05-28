# Delta_node

# Google_oauth implementation

- Go to https://console.cloud.google.com/cloud-resource-manager
- Create a new Google Cloud project.
- Go to API's and Services and create the credentials for OAuth clientID
- Configure consent screen
- Create Web application OAuth Client ID
- Check the env configuration details for details

# Authentication

### constant Folder :

- jwtConstant.ts
- Public and secret keys are stored.

### Dto Folder:

- The DTO folder contains all classes used for data transfer between the server and client sides.

### Entities Folder:

- It contains entities representing the database.

### Roles Folder:

- It holds the custom role decorator, and an enum that encompasses all role arrays.

### Functionality of Role Guard:

- The role guard is responsible for checking if the user has access to certain routes.

### Auth.controller.ts:

- Holds Sign In routes and methods in the respective service.

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

## Code Snippets and Api business logics

- ### http://localhost:3000/user/create

  - Step 1: Hash the password using Bcrypt Encryption Algorithm
  - Step 2: Prepare user information : It constructs an object with the user's details.
  - Step 3: Check if user already exists
  - Step 4: Creating User: If the user doesn't exist, it saves the user details into the database.
  - Step 5: Handle existing user scenario return bad Request
  ```
      {
          "status": 400,
          "message": "Username already exists" or "User email already exists"
      } 
  ```
  - Step 6: Return appropriate response after creating the user
  ```
    {
      "status": 200,
      "message": "User details are created"
    }
    ```
  - Step 7: Handle errors

- ### http://localhost:3000/user/userlist

  - Step 1 : Retrieve User Details: The method retrieves user details (username, email, and role) from the database using a query builder.
  - Step 2: Return User List: It returns the list of users as a success response along with a message indicating that data has been fetched successfully.
  - Step 3: Error Handling: If any errors occur during the process, it logs the error and returns a server error response.

- ### http://localhost:3000/auth/login

  - Step 1: Find user by email in the database
  - Step 2: Compare Passwords: It compares the provided password with the hashed password stored in the database.
  - Step 3: Password Mismatch: If passwords don't match, it returns a bad request response indicating incorrect password.
  - Step 4: Email Not Found: If the email does not exist in the database, it returns a bad request response indicating the email doesn't exist.
  - Step 5: Remove Password: It removes the password from the user data for security reasons.
  - Step 6: Generate Access Token: It generates an access token using the user's email for authentication purposes.
  - Step 7: Success Response: It sends a success response along with the access token indicating successful login.
  - Step 8: Error Handling: If any errors occur during the process, it sends a server error response.

- ### http://localhost:3000/auth/refresh

  - Step 1: Validate the refresh token received from the payload
  - Step 2: Verify the token using the secret key for refresh tokens
  - Step 3: Check if the user exists in the database based on the email from the token payload
  - Step 4: If user not found, return a bad request response indicating an invalid token
  - Step 5: If user found, generate new access and refresh tokens by passing the decoded email
  - Step 6: Return a success response with the newly generated tokens
  - Step 7: If any error occurs during the process, return a server error response

- ### http://localhost:3000/google/url

  - Step 1: Generate Query Parameters: The method generates query parameters required for authentication.
  - Step 2: Construct URL: It constructs the URL using the generated query parameters and authentication URL from the configuration.
  - Step 3: Return Generated URL: The method returns a success response with the generated URL.
  - Step 4: Error Handling: If any errors occur during the process, it logs the error and returns a server error response.

- ### http://localhost:3000/google/token
  - Step 1: Fetch Auth Code: The method fetches the authorization code from the URL query.
  - Step 2: Prepare Token Parameters: It prepares token parameters including client ID, client secret, auth code, etc.
  - Step 3: Generate Token: The method calls the Google API to generate a token using the provided parameter.
  - Step 4: Check Token Availability: checks if the token is available.
  - Step 5: Decode Token: If the token is available, it decodes the token to extract the email.
  - Step 6: Sign New Token: It signs a new token using the extracted email and sets expiration time.
  - Step 7: Set Token in Cookie: The token is set in the cookie of the response for future requests.
  - Step 8: Return Success Response: It returns a success response with the generated token.
  - Step 9: Error Handling: If any errors occur during the process, it logs the error and returns a server error response.
