# 📚 Minimal Library Management System – Frontend

This is the **frontend** portion of the Minimal Library Management System project built using **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.

> 🔗 [Live Site](#) https://library-management-topaz.vercel.app/

---

## 🚀 Features

### ✅ Public Routes

- No authentication needed
- All pages are accessible to all users

### 📖 Book Management

- **List All Books** in a table
  - Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions
- **Add New Book**
  - Form fields: Title, Author, Genre, ISBN, Description, Copies
- **Edit Book Info**
  - Pre-filled form with update option
- **Delete Book**
  - With confirmation dialog
- **Borrow Book**
  - Form: Quantity (≤ copies), Due Date
  - Marks unavailable if copies = 0

### 📊 Borrow Summary

- Shows total quantity borrowed per book
- Fields: Book Title, ISBN, Total Quantity Borrowed

---

## 🎁 Bonus Implementations

| Optimistic UI Updates | ✅ |
| Toast Notifications | ✅ |
| Responsive Layout | ✅ |
| Type-Safe Forms | ✅ |

---

## ⚙️ Tech Stack

| Frontend | React + TypeScript |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| API Communication | RESTful API (consumed via RTK Query) |

---

## 🔌 API Integration

- RTK Query is used for all asynchronous API calls
- Typed API endpoints for:
  - Books (CRUD)
  - Borrowing books
  - Borrow summary (aggregation)

---

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/B5A4.git
cd B5A4

# Install dependencies
npm install

# Start the development server
npm run dev
```
