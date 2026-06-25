# 📝 Todo Application

A simple Todo application built with React that allows users to create, update, delete, and manage tasks while persisting data using the browser's Local Storage.

---

## 🚀 Features

* Add new todos
* Edit existing todos
* Delete todos
* Mark todos as completed
* Persist data using Local Storage
* Global state management using React Context API
* Responsive and clean user interface

---

## 🛠️ Technologies Used

* React
* Context API
* Tailwind CSS
* Local Storage

---

## 📖 How It Works

The application uses a centralized Context to manage all todo-related operations and state.

### State Management

The todo list is stored in a single state:

```js
const [todos, setTodos] = useState(...)
```

This state is shared across components using the Context API.

---

### Adding a Todo

When a user submits the form:

1. The input value is captured.
2. A new todo object is created.
3. The todo is added to the existing array.
4. The UI automatically re-renders.

Example structure:

```js
{
  id: 17123456789,
  todo: "Learn React",
  completed: false
}
```

---

### Updating a Todo

Users can edit an existing todo.

When saved:

1. The matching todo is found using its ID.
2. The todo content is updated.
3. The state is refreshed.

---

### Deleting a Todo

When the delete button is clicked:

1. The matching todo is identified.
2. It is removed from the array.
3. The UI updates automatically.

---

### Toggling Completion

Users can mark tasks as completed.

The application:

1. Finds the matching todo.
2. Flips the completed value.
3. Updates the UI styling accordingly.

---

### Local Storage Persistence

Todos are automatically saved to Local Storage whenever the state changes.

```js
localStorage.setItem("todos", JSON.stringify(todos))
```

When the application loads, previously saved todos are retrieved and restored.

This ensures tasks remain available even after refreshing the page or reopening the browser.

---

## 🧩 Project Structure

### TodoForm

Responsible for:

* Capturing user input
* Creating new todos

### TodoItem

Responsible for:

* Displaying a todo
* Editing a todo
* Deleting a todo
* Toggling completion status

### TodoContext

Provides:

* Todo state
* Add functionality
* Update functionality
* Delete functionality
* Toggle functionality

### App

Acts as the root component and:

* Initializes todo state
* Provides Context
* Handles Local Storage synchronization

---

## 🎯 Learning Objectives

This project was built to practice:

* React State Management
* Context API
* Component Communication
* CRUD Operations
* Local Storage
* Tailwind CSS Styling

---

## 📌 Future Improvements

Possible enhancements include:

* Due dates
* Priority levels
* Categories & Tags
* Search & Filtering
* Drag and Drop Sorting
* Backend Integration
* User Authentication

---

## 📄 Notes

Additional implementation details, debugging experiences, and lessons learned are documented separately to keep this README focused on the project overview.
