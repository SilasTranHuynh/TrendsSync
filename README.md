In the project directory, you can run:

### `npm run dev`

Open [http://localhost:9988](http://localhost:9988) to view it in your browser.


Features:

_Fetch trending data via APIs (YouTube, Reddit, News)

_Fetch trending data through HTML scraping (TikTok hashtags – via third party, Twitter (X) topics – via third party, Google Trends topics)

_Store data every 2 hours throughout the day to build a menu that allows users to revisit platform-specific rankings within one day (12 time slots)

_Quick feedback inbox using Nodemailer

_Log in/Sign up (JWT, bcrypt)

_CRUD for user database

→ The last two features were set as a foundation for potential future updates (if given the opportunity).

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


Thank you for taking the time to review this project.



