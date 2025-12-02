# **Scalable Chat App**

A real-time, scalable chat application built using **Next.js**, **Node.js (Express)**, **Socket.IO**, **Kafka**, **Redis Streams**, and **Google OAuth**.
Designed to support group chats, real-time messaging, and distributed event processing.

---

##  **Tech Stack**

### **Frontend**

* Next.js (App Router)
* TypeScript
* NextAuth (Google OAuth)
* Axios
* TailwindCSS

### **Backend**

* Node.js + Express
* Socket.IO (real-time messaging)
* Redis Streams Adapter (for scaling WebSocket connections)
* Kafka (message queue for chat events)
* Prisma / PostgreSQL (chat storage)

### **Deployment**

* Render Web Service (Frontend)
* Render Web Service (Backend)
* Render Redis
* Render Kafka / External Kafka cluster

---

##  **Features**

* Google OAuth Login
* Create chat groups
* Add users to groups
* Real-time chats using WebSockets
* Kafka-based message queue for horizontal scaling
* Redis Streams adapter to distribute WebSocket events
* Fully containerized & deploy-ready

---

##  **Environment Variables**

### **Frontend**

```
NEXTAUTH_URL=<frontend-url>
NEXTAUTH_SECRET=<secret>

NEXT_PUBLIC_APP_URL=<frontend-url>
NEXT_PUBLIC_BACKEND_URL=<backend-url>

GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
```

### **Backend**

```
PORT=7000
DATABASE_URL=<postgres-url>

REDIS_URL=<redis-url>
KAFKA_BROKER=<broker>

GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
```

---

##  **Running Locally**

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
npm start
```

---

##  **API Base URL**

```
/api/auth/login
/api/chat-group
/api/chat-group/:id
/api/chat-group-user
/api/chats/:groupId
```

---

##  **Real-Time Architecture**

* Chat message → Kafka topic
* Consumer pushes to Redis stream
* Socket.IO broadcast to all connected clients
* Ensures reliability even under load

---

## **Production URLs**

* **Frontend:** [https://scalable-chat-app-1-dqxx.onrender.com](https://scalable-chat-app-1-dqxx.onrender.com)
* **Backend:** [https://scalable-chat-app-rn42.onrender.com](https://scalable-chat-app-rn42.onrender.com)

