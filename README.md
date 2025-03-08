# Project Name

Basic E-commerce platform built with Next.js, Express, MySQL, and Sequelize, following the MVC pattern.

## Backend Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Copy the example configuration file and set up the database connection:
   ```sh
   cp config/config.example.json config/config.json
   ```

3. Copy the example environment file and configure JWT and database details:
   ```sh
   cp .env.example .env
   ```

4. Create the database in MySQL.

5. Run Sequelize migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

6. Start the development server:
   ```sh
   npm run dev
   ```

## Frontend Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Copy the example environment file and configure the API URL:
   ```sh
   cp .env.local.example .env.local
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
