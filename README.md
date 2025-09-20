# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Open [http://localhost:9988](http://localhost:9988) to view it in your browser.

*Notice:
You will need to register for a new Reddit API key and a new News API key in order to use those sections of the project. Both services provide free plans similar to the one our team used — you can easily find the registration process on Google.

In addition, you must generate your own JWT key. Please store all keys inside a .env file and avoid exposing them directly in the source code (as happened with some of our team’s keys).

For the database (CRUD: users), the structure is as follows:

| Column          | Description             |
| --------------- | ----------------------- |
| `user_id`       | Unique identifier       |
| `user_name`     | Display name            |
| `user_username` | Username for login      |
| `user_password` | Encrypted password      |
| `role`          | User role (admin, user) |

Database name: trendssync

Table name: users

This project is relatively simple, as it was our first attempt at a “fullstack” application. Some features (such as CRUD) are basically completed but not actively used in the project, since no further user-oriented functionalities were developed. Nevertheless, they may still serve as a foundation for building additional features.

Thank you for taking the time to review this project.



