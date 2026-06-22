# React Context API Notes

## The Big Problem Context API Solves

Imagine two components:

```txt
Login
Profile
```

Both need access to the same user data.

Without Context:

```txt
Login
  ↓
 App
  ↓
Profile
```

Data has to travel through props.

Example:

```jsx
<App>
  <Login setUser={setUser} />
  <Profile user={user} />
</App>
```

As applications grow, passing props through many levels becomes annoying.

This is called:

```txt
Prop Drilling
```

Context API solves this problem.

---

# Mental Model

Think of Context as a shared room.

```txt
createContext()
=
Create the room

Provider
=
Put data inside the room

useContext()
=
Enter the room and read data
```

---

# Step 1: Create the Context

```jsx
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
```

## What's happening?

We're creating an empty container.

Think:

```txt
UserContext = Empty WhatsApp Group
```

The group exists.

No data inside yet.

---

# Step 2: Create the Provider

```jsx
import UserContext from "./UserContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
```

---

## What is the Provider?

Think:

```txt
UserContext = WhatsApp Group

Provider = Group Admin
```

The admin decides what data everyone can access.

Here:

```jsx
value={{
  user,
  setUser
}}
```

means:

```txt
Everyone inside this Provider can access:

user
setUser
```

---

# Step 3: Wrap Components with Provider

```jsx
<UserContextProvider>
  <Login />
  <Profile />
</UserContextProvider>
```

Visualized:

```txt
UserContextProvider
│
├── Login
│
└── Profile
```

Both components can now access Context.

---

# Step 4: Initial Render

Inside Provider:

```jsx
const [user, setUser] = useState(null);
```

Initially:

```txt
user = null
```

Context value becomes:

```jsx
{
  user: null,
  setUser: function
}
```

---

# Step 5: Profile Reads Context

```jsx
const { user } = useContext(UserContext);
```

Meaning:

```txt
Go to the shared room
and get the user value.
```

Current value:

```txt
user = null
```

Then:

```jsx
if (!user)
```

becomes:

```jsx
if (true)
```

because:

```jsx
!null === true
```

So React renders:

```jsx
Please Login
```

---

# Step 6: User Fills Login Form

Suppose:

```txt
Username: Rhythm
Password: 123
```

Inside Login component:

```jsx
username = "Rhythm"
password = "123"
```

stored using local state.

---

# Step 7: User Clicks Submit

```jsx
setUser({
  username,
  password
});
```

becomes:

```jsx
setUser({
  username: "Rhythm",
  password: "123"
});
```

---

# What Does setUser Change?

Remember:

```jsx
const [user, setUser] = useState(null);
```

inside Provider.

Before:

```txt
user = null
```

After:

```txt
user = {
  username: "Rhythm",
  password: "123"
}
```

Provider state changes.

---

# Step 8: Context Updates

Provider re-renders.

Now:

```jsx
value={{
  user,
  setUser
}}
```

becomes:

```jsx
value={{
  user: {
    username: "Rhythm",
    password: "123"
  },
  setUser
}}
```

The shared room now contains new data.

---

# Step 9: Profile Re-renders

Profile runs again:

```jsx
const { user } = useContext(UserContext);
```

Now user contains:

```jsx
{
  username: "Rhythm",
  password: "123"
}
```

This condition:

```jsx
if (!user)
```

becomes:

```jsx
if (false)
```

because user exists.

So React skips:

```jsx
Please Login
```

and renders:

```jsx
Welcome Rhythm
```

---

# Full Data Flow

```txt
User types credentials
          ↓
Login component
          ↓
setUser(...)
          ↓
Provider state changes
          ↓
Context value changes
          ↓
Profile re-renders
          ↓
Welcome Rhythm
```

---

# Why useContext Works

```jsx
const { user } = useContext(UserContext);
```

Think:

```txt
Walk into the shared room
and grab the current value.
```

React automatically subscribes the component.

Whenever the Context value changes:

```txt
Component re-renders automatically.
```

---

# Context API vs Props

## Props

```txt
Login
  ↓
 App
  ↓
Profile
```

Data must travel through intermediate components.

---

## Context

```txt
Login ──────┐
            │
        Context
            │
Profile ────┘
```

Both components communicate directly with shared state.

---

# Key Terms

## Context

Created using:

```jsx
createContext()
```

A shared container for data.

---

## Provider

Created using:

```jsx
<UserContext.Provider>
```

Supplies data to all child components.

---

## Consumer

Any component using:

```jsx
useContext(UserContext)
```

Consumes data from Context.

---

# Common Beginner Mistake

Thinking:

```txt
Context stores data.
```

Not exactly.

The Provider stores data using state:

```jsx
const [user, setUser] = useState(...)
```

Context simply provides access to that state.

---

# Final Summary

```txt
createContext()
=
Create a shared room

Provider
=
Put data in the room

useContext()
=
Read data from the room

setUser(...)
=
Update the room

Context changes
=
Consumers re-render automatically
```

---

# One-Line Definition

Context API allows multiple components to access and update shared state without passing props through every intermediate component.

---



---




# React Context API Timeline (Step-by-Step Execution)

## Goal

Understand exactly:

```txt
What runs first?
What runs second?
Where does user come from?
Why can Login and Profile access user and setUser?
```

---

# The Code

```jsx
<App />
```

renders:

```jsx
<UserContextProvider>
  <h1>Welcome to the tutorial</h1>
  <Login />
  <Profile />
</UserContextProvider>
```

---

# Initial Render Timeline

## Step 1: React Starts Rendering App

React executes:

```jsx
App()
```

App returns:

```jsx
<UserContextProvider>
  <h1>Welcome to the tutorial</h1>
  <Login />
  <Profile />
</UserContextProvider>
```

At this moment:

```txt
Login has NOT executed.
Profile has NOT executed.
```

React only sees the component tree.

---

# Step 2: React Executes UserContextProvider

React calls:

```jsx
UserContextProvider()
```

Inside:

```jsx
const [user, setUser] = useState(null)
```

React creates:

```txt
user = null

setUser = function
```

---

# Step 3: Provider Publishes Context Value

Provider returns:

```jsx
<UserContext.Provider
  value={{
    user,
    setUser
  }}
>
  {children}
</UserContext.Provider>
```

Which currently means:

```jsx
<UserContext.Provider
  value={{
    user: null,
    setUser: function
  }}
>
```

---

# Important Moment

At this point:

```txt
Login has still not rendered.

Profile has still not rendered.
```

But React already knows:

```txt
UserContext Value

{
  user: null,
  setUser: function
}
```

because Provider executed first.

---

# Step 4: React Renders Children

Now React starts rendering:

```jsx
<h1 />
<Login />
<Profile />
```

---

# Step 5: Login Executes

React calls:

```jsx
Login()
```

Inside:

```jsx
const { setUser } = useContext(UserContext)
```

React asks:

```txt
Find nearest UserContext.Provider
```

React finds:

```jsx
<UserContext.Provider
  value={{
    user:null,
    setUser:function
  }}
>
```

and returns:

```jsx
{
  user:null,
  setUser:function
}
```

Login extracts:

```jsx
setUser
```

and continues rendering.

---

# Step 6: Profile Executes

React calls:

```jsx
Profile()
```

Inside:

```jsx
const { user } = useContext(UserContext)
```

React again finds:

```jsx
<UserContext.Provider
  value={{
    user:null,
    setUser:function
  }}
>
```

and returns:

```jsx
{
  user:null,
  setUser:function
}
```

Profile extracts:

```jsx
user = null
```

---

# Step 7: Profile Decides What To Show

This code:

```jsx
if (!user)
```

becomes:

```jsx
if (true)
```

because:

```jsx
!null === true
```

So React renders:

```txt
Please Login
```

---

# Initial Screen

```txt
Welcome to the tutorial

[ Login Form ]

Please Login
```

---

# User Interaction Begins

User enters:

```txt
Username = Rhythm
Password = 123
```

These values live inside Login state.

---

# User Clicks Submit

This runs:

```jsx
setUser({
  username,
  password
})
```

which becomes:

```jsx
setUser({
  username: "Rhythm",
  password: "123"
})
```

---

# What Does setUser Update?

Remember:

```jsx
const [user, setUser] = useState(null)
```

belongs to:

```jsx
UserContextProvider
```

NOT Login.

NOT Profile.

Provider owns the state.

---

# Step 8: Provider State Changes

Before:

```txt
user = null
```

After:

```txt
user = {
  username:"Rhythm",
  password:"123"
}
```

---

# Step 9: React Starts Re-render

Because state changed:

```txt
UserContextProvider re-renders
```

React executes:

```jsx
UserContextProvider()
```

again.

---

# Step 10: Provider Publishes New Context Value

Now:

```jsx
user = {
  username:"Rhythm",
  password:"123"
}
```

Provider returns:

```jsx
<UserContext.Provider
  value={{
    user:{
      username:"Rhythm",
      password:"123"
    },
    setUser
  }}
>
```

---

# Context Value Changed

Old:

```jsx
{
  user:null
}
```

New:

```jsx
{
  user:{
    username:"Rhythm"
  }
}
```

React notices:

```txt
Context value changed.
```

---

# Step 11: Components Using Context Re-render

React re-renders:

```txt
Login
Profile
```

because both use:

```jsx
useContext(UserContext)
```

---

# Step 12: Login Re-renders

React calls:

```jsx
Login()
```

again.

Login receives:

```jsx
{
  user:{
    username:"Rhythm"
  },
  setUser
}
```

Login only uses:

```jsx
setUser
```

so nothing visually changes.

---

# Step 13: Profile Re-renders

React calls:

```jsx
Profile()
```

again.

Now:

```jsx
const { user } = useContext(UserContext)
```

returns:

```jsx
{
  username:"Rhythm",
  password:"123"
}
```

---

# Step 14: Profile Runs Condition Again

This:

```jsx
if (!user)
```

becomes:

```jsx
if(false)
```

because user exists.

React skips:

```jsx
Please Login
```

and renders:

```jsx
Welcome Rhythm
```

---

# Final Screen

```txt
Welcome to the tutorial

[ Login Form ]

Welcome Rhythm
```

---

# Complete Flow Diagram

```txt
App()
│
▼
UserContextProvider()
│
├── user = null
│
└── Publishes Context:
    {
      user:null,
      setUser
    }
          │
          ▼
       Login()
          │
          ▼
      Profile()
          │
          ▼
     "Please Login"

--------------------------------

User clicks Submit

setUser(...)
          │
          ▼
Provider State Changes
          │
          ▼
UserContextProvider()
runs again
          │
          ▼
Publishes Context:
{
  user:{
    username:"Rhythm"
  },
  setUser
}
          │
          ▼
Login Re-renders
Profile Re-renders
          │
          ▼
"Welcome Rhythm"
```

---

# Most Important Concept

Provider executes BEFORE its children.

Timeline:

```txt
1. App executes

2. UserContextProvider executes

3. user and setUser are created

4. Provider publishes Context value

5. Login renders

6. Profile renders

7. useContext reads the published value
```

NOT:

```txt
1. Login renders

2. Profile renders

3. Provider creates Context value
```

The Provider always publishes the value first.

---

# Mental Model

```txt
createContext()
=
Create a radio frequency

Provider
=
Radio tower broadcasting data

useContext()
=
Radio receiver

Components
=
Listeners
```

The tower broadcasts first.

Then listeners tune in and receive the current value.

---

# One-Line Summary

```txt
Provider executes first, creates user and setUser, publishes them through Context, and only then do child components render and read those values using useContext().
```
