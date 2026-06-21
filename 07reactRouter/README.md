# React Router Cheat Sheet (Interview + Development Ready)

## What is React Router?

React Router is a library that enables navigation between different pages/components in a React Single Page Application (SPA) without reloading the browser.

### Without React Router

```jsx
function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>

      {page === "home" && <Home />}
      {page === "about" && <About />}
    </>
  );
}
```

Problems:

* URL doesn't change
* Back button doesn't work
* Can't bookmark pages
* Can't share specific pages

React Router solves all of these.

---

# Installation

```bash
npm install react-router-dom
```

---

# BrowserRouter

Wrap the entire application.

```jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Purpose

Provides routing capabilities to the entire application.

Think:

```text
BrowserRouter
     ↓
Manages URLs
     ↓
Renders matching routes
```

---

# Routes and Route

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

    </Routes>
  );
}
```

### Mapping

```text
/         → Home
/about    → About
/contact  → Contact
```

---

# Link

Used for navigation without page reload.

### Wrong

```jsx
<a href="/about">About</a>
```

Causes full page reload.

### Correct

```jsx
import { Link } from "react-router-dom";

<Link to="/about">
  About
</Link>
```

### Usage

* Navbar
* Cards
* Product links
* Blog links

---

# NavLink

Same as Link but knows whether it's active.

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/about">
  About
</NavLink>
```

---

## Active Styling

```jsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive
      ? "text-red-500 font-bold"
      : "text-gray-500"
  }
>
  About
</NavLink>
```

### Industry Usage

Used in:

* Sidebars
* Dashboards
* Navigation menus
* Settings panels

---

# Link vs NavLink

| Feature        | Link | NavLink |
| -------------- | ---- | ------- |
| Navigation     | ✅    | ✅       |
| Prevent Reload | ✅    | ✅       |
| Active State   | ❌    | ✅       |
| Navbar Usage   | ⚠️   | ✅       |
| Sidebar Usage  | ⚠️   | ✅       |

Rule:

```text
Link → Normal navigation

NavLink → Menus & Navigation bars
```

---

# Dynamic Routes

Allows variable URLs.

### Route

```jsx
<Route
  path="/product/:id"
  element={<Product />}
/>
```

### URLs

```text
/product/1
/product/10
/product/999
```

All use same component.

---

# useParams()

Extract dynamic values from URL.

### Route

```jsx
<Route
  path="/product/:id"
  element={<Product />}
/>
```

### Component

```jsx
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return <h1>{id}</h1>;
}
```

### URL

```text
/product/101
```

Output:

```text
101
```

---

# useNavigate()

Navigate programmatically.

### Example

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

navigate("/dashboard");
```

---

## Login Example

```jsx
if(loginSuccess){
  navigate("/dashboard");
}
```

---

# Nested Routes

Useful for dashboards.

### Routes

```jsx
<Route
  path="/dashboard"
  element={<Dashboard />}
>

  <Route
    path="profile"
    element={<Profile />}
  />

  <Route
    path="settings"
    element={<Settings />}
  />

</Route>
```

URLs:

```text
/dashboard/profile
/dashboard/settings
```

---

# Outlet

Placeholder for child routes.

### Parent Layout

```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
```

### Meaning

```text
Sidebar
Header
Outlet
```

Outlet renders:

```text
Profile
Settings
Users
Reports
```

depending on URL.

---

# Query Parameters

URL:

```text
/products?category=laptop
```

### Read Query Params

```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();

const category =
  searchParams.get("category");
```

Output:

```text
laptop
```

---

# Protected Routes

Prevent unauthorized access.

### Wrapper

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children
}) {

  const user = getUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

### Usage

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

# Loader

Fetch data BEFORE page renders.

---

## Without Loader

```jsx
function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if(!user) return "Loading...";

  return <h1>{user.name}</h1>;
}
```

Problems:

* Loading states
* More boilerplate
* Data and UI mixed together

---

## With Loader

### Route

```jsx
{
  path: "/profile/:id",

  loader: async ({ params }) => {
    const res = await fetch(
      `/api/user/${params.id}`
    );

    return res.json();
  },

  element: <Profile />
}
```

---

### Component

```jsx
import { useLoaderData }
from "react-router-dom";

function Profile() {

  const user =
    useLoaderData();

  return (
    <h1>{user.name}</h1>
  );
}
```

---

## Loader Flow

```text
User visits page
        ↓
Loader runs
        ↓
Data fetched
        ↓
Component renders
```

---

## useLoaderData()

Used inside component.

```jsx
const data = useLoaderData();
```

Receives whatever the loader returns.

---

# Loader Parameters

### params

```jsx
loader({ params })
```

Route:

```jsx
path: "/user/:id"
```

URL:

```text
/user/10
```

Result:

```jsx
params.id === "10"
```

---

### request

```jsx
loader({ request })
```

URL:

```text
/products?category=laptop
```

Example:

```jsx
const url =
  new URL(request.url);

url.searchParams.get("category");
```

Result:

```text
laptop
```

---

# Real Industry Examples

### Amazon

```text
/
 /products
 /product/:id
 /cart
 /orders
```

### Netflix

```text
/
 /movies
 /tv
 /search
 /profile
```

### LinkedIn

```text
/in/:username
/jobs
/messages
/network
```

### GitHub

```text
/:username
/:username/:repo
/:username/:repo/issues
```

---

# Typical Industry Folder Structure

```text
src
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Dashboard.jsx
│
├── layouts
│   ├── MainLayout.jsx
│   └── DashboardLayout.jsx
│
├── loaders
│   └── profileLoader.js
│
├── routes
│   └── router.jsx
│
└── App.jsx
```

---

# Most Important APIs (80/20 Rule)

Master these first:

```jsx
BrowserRouter
Routes
Route
Link
NavLink
Outlet
useParams
useNavigate
useLoaderData
useSearchParams
Navigate
loader
```

If you understand these APIs deeply, you can build:

* Dashboards
* E-commerce sites
* SaaS products
* Admin panels
* Portfolio websites
* Social media apps
* Hackathon projects

with professional routing architecture.
