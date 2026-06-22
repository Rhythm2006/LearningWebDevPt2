# Theme Switcher using React Context API + Tailwind CSS

## Project Overview

This project demonstrates how to use the **React Context API** to manage a global theme state (Light Mode / Dark Mode) and apply theme changes across the application without prop drilling.

The application contains:

- Theme Context
- Theme Provider
- Theme Toggle Button
- Card Component
- Global Theme State Management

---

# Objective

The goal of this project is to:

1. Learn Context API.
2. Share state globally across components.
3. Implement Light/Dark mode switching.
4. Understand how Context updates trigger component re-renders.
5. Learn how Tailwind CSS Dark Mode works.

---

# Folder Structure

```txt
src/
│
├── components/
│   ├── Card.jsx
│   └── ThemeBtn.jsx
│
├── context/
│   └── theme.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Context API Implementation

## Step 1: Create Context

```js
import { createContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
})
```

### What this does

Creates a context object.

Think:

```txt
ThemeContext
=
A radio frequency
```

It does NOT store state.

It only identifies a shared communication channel.

---

# Step 2: Create Custom Hook

```js
export default function UseTheme(){
    return useContext(ThemeContext)
}
```

### Why?

Instead of writing:

```js
useContext(ThemeContext)
```

everywhere,

we can write:

```js
UseTheme()
```

which is shorter and cleaner.

---

# Step 3: Create Provider

Inside App:

```jsx
<ThemeProvider
    value={{
        themeMode,
        darkTheme,
        lightTheme
    }}
>
```

This provides data to all child components.

Think:

```txt
Provider
=
Radio Tower

Context
=
Radio Frequency

Components
=
Radio Receivers
```

---

# State Management

## Theme State

```js
const [themeMode, setThemeMode] = useState("light")
```

Initial state:

```txt
themeMode = light
```

---

## Dark Theme Function

```js
const darkTheme = () => {
    setThemeMode("dark")
}
```

Changes theme to dark.

---

## Light Theme Function

```js
const lightTheme = () => {
    setThemeMode("light")
}
```

Changes theme to light.

---

# Theme Toggle Button

## Reading Context

```js
const {
    themeMode,
    lightTheme,
    darkTheme
} = UseTheme()
```

This reads data from Context.

---

## Toggle Logic

```js
const onChangeBtn = (e) => {
    const darkmodeStatus = e.currentTarget.checked

    if (darkmodeStatus) {
        darkTheme()
    } else {
        lightTheme()
    }
}
```

### Flow

```txt
Checkbox Click
      ↓
onChangeBtn()
      ↓
darkTheme()
      ↓
setThemeMode("dark")
      ↓
App Re-renders
      ↓
Context Value Updates
      ↓
Consumers Re-render
```

---

# Synchronizing Theme with HTML

```js
useEffect(() => {
    document
      .querySelector("html")
      .classList.remove("light", "dark")

    document
      .querySelector("html")
      .classList.add(themeMode)

}, [themeMode])
```

---

## Why is this needed?

Tailwind's dark mode works by checking:

```html
<html class="dark">
```

or

```html
<html class="light">
```

So whenever themeMode changes:

```txt
light → dark
```

React updates:

```html
<html class="dark">
```

---

# Complete Timeline

## Initial Render

### App Executes

```txt
App()
```

Creates:

```txt
themeMode = light
```

---

### Provider Executes

Publishes:

```js
{
    themeMode: "light",
    darkTheme,
    lightTheme
}
```

---

### ThemeBtn Executes

Reads:

```js
{
    themeMode: "light",
    darkTheme,
    lightTheme
}
```

from Context.

---

### Card Executes

Renders UI.

---

### useEffect Executes

Adds:

```html
<html class="light">
```

---

# User Clicks Toggle

Checkbox becomes checked.

---

### ThemeBtn Executes

```js
darkTheme()
```

runs.

---

### State Updates

```js
setThemeMode("dark")
```

---

### App Re-renders

New state:

```txt
themeMode = dark
```

---

### Provider Re-renders

Publishes:

```js
{
    themeMode: "dark",
    darkTheme,
    lightTheme
}
```

---

### ThemeBtn Re-renders

Reads updated context.

---

### useEffect Runs

Changes:

```html
<html class="light">
```

to:

```html
<html class="dark">
```

---

### Tailwind Detects

```html
<html class="dark">
```

and activates:

```css
dark:bg-gray-800
dark:text-white
dark:bg-blue-600
```

---

# Problems Faced

## Problem 1

Dark mode was not switching.

Even though:

```txt
Theme Toggle Worked
Context Worked
State Updated
```

UI remained unchanged.

---

## Initial Assumption

Thought:

```txt
Context API is broken
```

or

```txt
useEffect is not running
```

---

## Debugging Process

### Step 1

Verified Context.

Added logs:

```js
console.log(themeMode)
```

Output:

```txt
light
dark
light
dark
```

Result:

```txt
Context Working
```

---

### Step 2

Verified HTML Class

Opened DevTools.

Observed:

```html
<html class="light">
```

switching to:

```html
<html class="dark">
```

Result:

```txt
useEffect Working
```

---

### Step 3

Verified Tailwind

Created test component:

```jsx
<div
  className="
  bg-white
  dark:bg-black
"
>
```

Expected:

```txt
White → Black
```

Actual:

```txt
No Change
```

Result:

```txt
Tailwind Dark Mode Configuration Issue
```

---

# Root Cause

Inside:

```js
vite.config.js
```

I had:

```js
darkMode: "class"
```

which is NOT a valid Vite configuration option.

---

# Fix 1

Removed:

```js
darkMode: "class"
```

from:

```js
vite.config.js
```

---

# Fix 2

Updated:

```css
@import "tailwindcss";
```

to:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

in:

```css
src/index.css
```

---

# Result

Dark mode started working correctly.

Tailwind successfully detected:

```html
<html class="dark">
```

and applied all:

```css
dark:*
```

utilities.

---

# Key Learnings

## Context API

Context does NOT store state.

State lives in:

```js
useState()
```

Context only provides access.

---

## Provider

Provider executes BEFORE its children.

Timeline:

```txt
Provider Executes
      ↓
Publishes Context Value
      ↓
Children Render
      ↓
useContext Reads Value
```

---

## useContext

```js
const value = useContext(Context)
```

means:

```txt
Find nearest Provider
and return its value.
```

---

## Tailwind Dark Mode

Dark mode depends on:

```html
<html class="dark">
```

not React state directly.

React state simply controls the class.

---

# Final Takeaway

This project taught:

- Context API
- Provider Pattern
- Custom Hooks
- Global State Sharing
- useEffect
- Tailwind Dark Mode
- Debugging Strategy

Most importantly:

```txt
Never assume React is broken.

Verify:

State
↓
Context
↓
DOM
↓
CSS

one step at a time.
```