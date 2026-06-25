# 📝 Redux Toolkit Todo App

A simple Todo application built with **React** and **Redux Toolkit** to understand centralized state management. The project demonstrates CRUD operations on todos while persisting data using the browser's Local Storage.

---

## 🚀 Features

* ➕ Add new todos
* ✏️ Edit existing todos
* ❌ Delete todos
* 💾 Persist todos using Local Storage
* ⚡ Global state management with Redux Toolkit
* 🎨 Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

* React
* Redux Toolkit
* React Redux
* Tailwind CSS
* Local Storage

---

## 📖 Project Overview

This project was built to understand how **Redux Toolkit** manages global application state.

Instead of passing data through props or Context, all todos are stored inside a centralized **Redux Store**. Components interact with the store by dispatching actions and reading state using React Redux hooks.

---

## 🏗️ Project Workflow

### 1. Adding a Todo

When the user enters a task and clicks **Add Todo**:

* The form dispatches the `addTodo` action.
* The Todo Slice creates a new todo object.
* A unique ID is generated using `nanoid()`.
* Redux updates the store.
* The UI automatically re-renders with the new todo.

---

### 2. Editing a Todo

When **Edit** is clicked:

* The selected todo becomes editable.
* The updated text is stored locally while editing.
* Clicking **Save** dispatches the `updateTodo` action.
* Redux updates the matching todo in the store.
* The updated text is reflected instantly in the UI.

---

### 3. Deleting a Todo

When **Delete** is clicked:

* The `removeTodo` action is dispatched.
* Redux removes the matching todo using its ID.
* The UI updates automatically.

---

### 4. Local Storage

Whenever the todo list changes:

* The updated state is saved to Local Storage.
* On application startup, previously saved todos are loaded back into the Redux Store.

This allows todos to persist even after refreshing the browser.

---

## 🧩 Redux Architecture

```
User Action
      │
      ▼
dispatch(action)
      │
      ▼
Redux Store
      │
      ▼
Todo Slice Reducer
      │
      ▼
Updated State
      │
      ▼
React Components Re-render
```

---

## 📂 Project Structure

```
src/
│
├── app/
│   └── store.js
│
├── features/
│   └── todo/
│       └── todoSlice.js
│
├── components/
│   ├── AddTodo.jsx
│   └── Todo.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🧠 Redux Concepts Practiced

This project focuses on understanding the core Redux Toolkit workflow:

* Configuring a Redux Store
* Creating a Slice
* Defining Reducers
* Dispatching Actions
* Reading State with `useSelector`
* Updating State with `useDispatch`
* Maintaining a Single Source of Truth

---

## 🎯 Learning Outcome

After completing this project, you should understand how Redux Toolkit simplifies global state management by:

* Keeping application state centralized.
* Separating business logic from UI components.
* Updating state predictably through reducers.
* Automatically re-rendering subscribed components whenever the store changes.

---

## 🔮 Possible Improvements

* ✅ Mark todos as completed
* 🔍 Search todos
* 📌 Filter by status
* 📅 Due dates
* 🏷️ Categories & tags
* 🌙 Dark mode
* ☁️ Backend integration
* 👤 User authentication

---

## 🙏 Acknowledgement

This project was built while learning **Redux Toolkit** as part of the **Chai aur React** series by **Hitesh Choudhary**.

* 🎥 YouTube Playlist: https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige
* 💻 Original Repository: https://github.com/hiteshchoudhary/chai-aur-react

A huge thank you to **Hitesh Choudhary** for creating one of the most beginner-friendly React learning resources available.

