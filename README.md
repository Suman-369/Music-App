# 🎵 Rythmix – Microservice-Based Music Application

## 🚀 Overview

**Rythmix** is a scalable **microservice-based music streaming backend** built using modern technologies like Node.js, Docker, and message queues.
It follows a **distributed architecture**, where each service handles a specific responsibility.

---

## 🧩 Architecture

This project is designed using **Microservices Architecture**:

* 🔐 **Auth Service** – User authentication & authorization
* 🎧 **Music Service** – Manage songs, albums, playlists
* 📩 **Notification Service** – Email/alerts using queue system
* 📦 **API Gateway** – Central entry point for all requests
* 🗄️ **Database** – MongoDB (for different services)
* 🐇 **Message Broker** – RabbitMQ for async communication

---

## ⚙️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### DevOps & Tools

* Docker & Docker Compose
* RabbitMQ
* JWT Authentication

---

## 📁 Folder Structure

```
backend/
│
├── auth/               # Authentication Service
├── music/              # Music Service
├── notification/       # Notification Service
├── gateway/            # API Gateway
│
├── docker-compose.yml  # Multi-container setup
└── README.md
```

---

## 🔄 Microservices Communication

* Services communicate using:

  * REST APIs (synchronous)
  * RabbitMQ (asynchronous messaging)

Example:

* User registers → Auth Service
* Event sent → RabbitMQ
* Notification Service → Sends email

---

## 🐳 Docker Setup

### Build Image

```bash
docker buildx build --platform linux/amd64 -t rythmix-auth . --load
```

### Run with Docker Compose

```bash
docker-compose up --build
```

---

## 🔐 Authentication Flow

1. User registers/login
2. JWT token is generated
3. Token is verified for protected routes

---

## 📡 API Endpoints (Example)

### Auth Service

* `POST /api/auth/register`
* `POST /api/auth/login`

### Music Service

* `GET /api/music`
* `POST /api/music/upload`

---

## 📬 Messaging (RabbitMQ)

* Queue: `user_created`
* Used for:

  * Sending welcome emails
  * Triggering async events

---

## 🌟 Features

* ✅ Microservice architecture
* ✅ Scalable & modular design
* ✅ Dockerized services
* ✅ Event-driven communication
* ✅ Secure authentication (JWT)

---

## 🛠️ Future Improvements

* 🎶 Add real-time streaming
* 📱 Frontend (React / Mobile App)
* 🔍 Search & recommendation system
* ☁️ Deploy on AWS / Kubernetes

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork and submit a PR 🚀


## 👨‍💻 Author

**Suman Kar**
B.Tech CSE | MERN Stack Developer
