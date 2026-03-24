# 🏠 Smart Home Management System

A **full-stack Smart Home Management platform** that enables homeowners to monitor, control, and manage smart devices through a centralized web dashboard.

The system implements **secure authentication**, **role-based access control**, and a **scalable frontend–backend architecture**, simulating a real-world IoT management environment.

---

## 🚀 Project Overview

The Smart Home Management System allows multiple types of users to interact with smart devices efficiently while maintaining system security and operational control.

The application provides:

* Centralized smart device management
* Secure JWT-based authentication
* Role-based dashboards
* Device monitoring & service workflows
* Admin system supervision

---

## 🧱 Tech Stack

### 🎨 Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Context API (State Management)
* Role-Based Routing & Protected Routes

### ⚙️ Backend

* Java
* Spring Boot
* Spring Security (JWT Authentication)
* JPA / Hibernate
* RESTful APIs
* Maven

### 🗄️ Database

* MySQL

---

## 👥 User Roles & Features

### 🔐 Admin

* Manage users
* Monitor system activity
* Approve technicians
* Maintain platform security

### 🏡 Homeowner

* Add & manage smart devices
* Monitor energy usage
* Control devices remotely
* Raise service requests

### 🛠️ Technician

* View assigned service requests
* Maintain and troubleshoot devices
* Update maintenance status

---

## 🏗️ System Architecture

```
Frontend (React)
        ↓
Service Layer (Axios)
        ↓
REST API (Spring Boot)
        ↓
Security Layer (JWT + Spring Security)
        ↓
Database (MySQL)
```

### Frontend Structure

```
src/
 ├── components/     # Reusable UI components
 ├── pages/          # Route-level screens
 ├── layouts/        # Shared dashboard layouts
 ├── context/        # Global state management
 ├── services/       # API communication layer
 └── assets/
```

---

## 🔒 Authentication & Security

* JWT-based authentication
* HTTP-only cookie session handling
* Role-based authorization
* Protected frontend routes
* Spring Security backend validation

---

## ✨ Key Features

* Role-based dashboard system
* Secure login & signup workflow
* Persistent authentication (re-login handling)
* Device management system
* REST API integration
* Responsive UI using Tailwind CSS
* Modular and scalable architecture

---

## ⚙️ Backend Configuration

Before running the backend server, configure:

```
backend/src/main/resources/application.yml
```

---

### 🗄️ Database Setup

Create MySQL database:

```
smart_home
```

Update credentials:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/smart_home
    username: YOUR_MYSQL_USERNAME
    password: YOUR_MYSQL_PASSWORD
```

---

### 📧 Email (SMTP Configuration)

Used for OTP verification and notifications.

1. Open Google Account Settings
2. Search **App Passwords**
3. Create App Password for Mail
4. Copy generated password

Update:

```yaml
spring:
  mail:
    username: YOUR_EMAIL@gmail.com
    password: YOUR_APP_PASSWORD
```

⚠️ Use App Password — not your Gmail password.

---

### 🔐 JWT Configuration

```yaml
jwt:
  secret: abcdefghijklmnopqurstuvwxyz1234567890
```

You may generate your own secret key.

---

## ⚡ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/daisy2105/Smart-Home-Management-System.git
```

---

### 2️⃣ Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📌 Future Enhancements

* Real-time device updates (WebSockets)
* Notification system
* Advanced analytics dashboard
* Mobile optimization
* Dark mode UI
* Docker deployment

---

## 🧪 Development Goals

This project demonstrates:

* Full-stack application design
* Authentication & authorization workflows
* Scalable frontend architecture
* REST API integration
* Role-based system engineering

---
