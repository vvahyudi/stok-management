<h1 align="center">EXPRESS - Stock Management API</h1>

<div align="center">

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg?style=rounded-square)](https://nodejs.org/)

</div>

---

<p align="center"> A web application for efficient stock management, featuring user authentication, product and stock tracking.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Welcome to the Stock Management App! This application is designed to help you efficiently manage your inventory and stock-related operations. Whether you're a small business owner or part of a larger organization, this app provides essential tools to streamline your stock management processes.

## 🏁 Getting Started <a name = "getting_started"></a>

1. Clone the Repository.

2. Open app's directory in CMD or Terminal.
3. Type `npm install`

### Prerequisites

Before you begin setting up your project's `.env` file, ensure you have the following prerequisites:

1. **Node.js and npm:**

2. **Supabase Account:**

   - You'll need a Supabase account to configure the database and authentication. Sign up for a Supabase account at [Supabase](https://supabase.com/).

3. **Supabase Project:**

   - Create a new project in your Supabase account. You will obtain the project URL and API key during this process.

4. **Cloudinary Account:**

   - Create a Cloudinary account to manage image storage. You will need your Cloudinary cloud name, API key, and API secret.

5. **Redis Server:**
   - Set up a Redis server for caching. You will need the host, port, username, and password for your Redis server.

Once you have these prerequisites in place, you can proceed with configuring the project's `.env` file as described in the "Setting Up Your .env File" section of this README.

## 🎈 Usage <a name="usage"></a>

#### 1. Set up .env file:

In the project directory, create a .env file if it doesn't already exist.

#### 2. Configure Environment Variabel:

```
SUPABASE_URL='your-supabase-url'
SUPABASE_KEY='your-supabase-api-key'

JWT_ACCESS_KEYS='your-access-jwt-key'
JWT_REFRESH_KEYS='your-refresh-jwt-key'

CLOUDINARY_CLOUD_NAME='your-cloudinary-cloud-name'
CLOUDINARY_API_KEY='your-cloudinary-api-key'
CLOUDINARY_API_SECRET='your-cloudinary-api-secret'

REDIS_HOST='your-redis-host'
REDIS_PORT=your-redis-port
REDIS_USER='your-redis-user'
REDIS_PASSWORD='your-redis-password'
```

#### 3. Postman Endpoint

You can see all the end point [here](https://documenter.getpostman.com/view/15191012/2s9YBz3v4s)

## ⛏️ Built Using <a name = "built_using"></a>

- [Supabase](https://supabase.com//) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Postman](https://www.postman.com/) - API Platform

## ✍️ Authors <a name = "authors"></a>

## [@vvahyudi](https://github.com/vvahyudi) - Ahmad Wahyudi
