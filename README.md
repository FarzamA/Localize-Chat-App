# Setup Instructions
## Connecting to MongoDB
In order to connect to the MogoDB instance a `.env` file will need to be added into the backend directory with credentials in order to connect to the database. 
To set this up navigate into the `chat-app-backend` directory and create a new file called `.env` or just paste the one that is provided. This can be done by either running the following two commands:
```bash
cd chat-app-backend
touch .env
```
Or can be done manually through a file explorer.
If properly set up it will look something like this: 
```env
USERNAME=
PASSWORD=
DB_NAME=
```

## Backend Setup
1. If not already there, navigate into the `chat-app-backend` directory.
2. Remove any residual files like `package-lock.json` and the `node_modules` directory.
This can be done manually or by running the following command from within the `chat-app-backend` directory:
```bash
rm -rf package-lock.json node_modules
```
3. Once there are no residual files run the following command in order to download all necessary backend dependencies:
```bash
npm install
```
4. Once the `npm install` command has run, from within the `chat-app-backend` directory run the following command:
```bash
npm start
```
What this is doing behind the scenes is compiling all of our typescript files and putting them into a new folder called `dist` and launching a `node` server from the compiled files.
5. If the MongoDB setup and backend setup are done correctly you will see the following in your terminal:
```bash
Server is running on port 5000
Connected to MongoDB
```
This means you are ready to go!

## Backend Unit Tests
1. Once the backend is set up properly and you see the proper output in the terminal it is time to test our routes. I have created some very simple unit tests that can be run in order to test this.
2. Open another terminal window and navigate into the `chat-app-backend` directory. 
4. Run the following command:
```bash
npm test
```
This will run some basic tests for creating and posting messages.
5. If tests pass the terminal window will look something like this:
```bash
 ✓ test/app.test.ts (2)
   ✓ API Endpoints (2)
     ✓ GET /messages (1)
       ✓ should return an array of messages without modifying data
     ✓ POST /messages (1)
       ✓ should create a new message and not affect production data

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  07:56:27
   Duration  2.56s (transform 248ms, setup 0ms, collect 1.12s, tests 172ms, environment 0ms, prepare 614ms)
```
All tests should pass if everything is set up properly!

## Frontend Setup
The frontend setup is similar to the backend setup. Here are the steps:
1. If not already there, navigate into the `chat-app-frontend` directory.
2. Remove any residual files like `package-lock.json` and the `node_modules` directory.
This can be done manually or by running the following command from within the `chat-app-frontend` directory:
```bash
rm -rf package-lock.json node_modules
```
3. Once there are no residual files run the following command in order to download all necessary frontend dependencies:
```bash
npm install
```
4. Once the `npm install` command has run, from within the `chat-app-frontend` directory run the following command:
```bash
npm start
```
This will start our frontend server in order to access the web application which can be accessed at the following url: `localhost:3000`

## Additional Quality of Life Features
1. Dark mode implementation through button at the top right of web page.
2. Automatic scrolling of messages when there are more messages than can be displayed on the screen.
3. Clean error handling in the `Post a New Message` modal.
4. Responsive design with UX in mind.
