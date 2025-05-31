# 🛒 eCommerce Checkout Flow Simulation

This is a 3-page mini eCommerce flow simulation built with the **MERN stack** (MongoDB, Express, React, Node.js). It demonstrates a real-world checkout journey with dynamic form validation, backend handling, transaction simulation, and confirmation emails.

🔗 **Live Demo:** [https://storeapp-flow.onrender.com](https://storeapp-flow.onrender.com)

### 1. **Landing Page**
- Displays product information: image, name, description, price.
- Includes:
  - Variant selector (e.g., color/size)
  - Quantity input
  - “Buy Now” button
- On click, navigates to the checkout page with the selected product data.

### 2. **Checkout Page**
- Form fields:
  - Full Name
  - Email (validated)
  - Phone Number (validated)
  - Address (City, State, Zip)
  - Card Number (16-digit)
  - Expiry Date (must be future)
  - CVV (3-digit)
- Includes a dynamic order summary reflecting the product selection.
- On submit:
  - Simulates a transaction outcome based on Card number starts with:
    - `1111 and any other 12 digit` → ✅ Approved
    - `2222 and any other 12 digit` → ❌ Declined
    - `Any 16 digit` → ⚠️ Gateway Error
  - Stores order in MongoDB
  - Updates inventory
  - Sends a confirmation/failure email via Mailtrap
  - Redirects to the Thank You page

### 3. **Thank You Page**
- Displays:
  - Order ID
  - Full order summary
  - Customer details
---

## 🛠 Tech Stack

| Layer     | Tools Used                             |
|-----------|----------------------------------------|
| Frontend  | React, React Router, Tailwind CSS      |
| Backend   | Node.js, Express, REST API             |
| Database  | MongoDB              |
| Email     | Mailtrap.io, Nodemailer                |

---

## 📦 Installation & Setup

### 🔧 Backend Setup

```bash
cd server
npm install
````

* Create a `.env` file in `/server` with:

```env
PORT=8080
MONGO_URI=your_mongodb_atlas_uri
MAILTRAP_HOST=your_mailtrap_host
MAILTRAP_PORT=your_mailtrap_port
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
CLIENT_ORIGIN=frontent-origin
```

* Run the backend:

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd client/store
npm install
npm run dev
```

* Set environment variable in `client/.env`:

```env
VITE_API_URL=http://localhost:8080/api

