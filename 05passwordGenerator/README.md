# React Hooks Revision Notes

## useEffect, useRef, and useCallback

---

# 1. useEffect

## What problem does it solve?

React components should ideally only render UI.

Sometimes, after rendering, we need to:

* Fetch data from APIs
* Start timers
* Add event listeners
* Update the document title
* Sync with external systems

These are called **side effects**.

`useEffect` allows us to run code **after React has rendered**.

---

## Mental Model

```txt
Render UI
↓
React updates DOM
↓
useEffect runs
```

---

## Basic Syntax

```js
useEffect(() => {
  // side effect code
}, []);
```

---

## Dependency Array

### Run only once

```js
useEffect(() => {
  fetchData();
}, []);
```

Meaning:

```txt
Run on first render only
```

---

### Run when a value changes

```js
useEffect(() => {
  fetchData();
}, [url]);
```

Meaning:

```txt
Run whenever url changes
```

---

### Run on every render

```js
useEffect(() => {
  console.log("Rendered");
});
```

Meaning:

```txt
Runs after EVERY render
```

Usually not recommended.

---

## Cleanup Functions

Used when:

* Clearing intervals
* Removing event listeners
* Closing connections

Example:

```js
useEffect(() => {
  const id = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

---

## Industry Uses

### API Calls

```js
useEffect(() => {
  fetchUsers();
}, []);
```

---

### Timers

```js
useEffect(() => {
  const id = setInterval(...);

  return () => clearInterval(id);
}, []);
```

---

### Event Listeners

```js
useEffect(() => {
  window.addEventListener(...);

  return () => window.removeEventListener(...);
}, []);
```

---

## One-Line Summary

```txt
useEffect = Run code after React renders.
```

---

# 2. useRef

## What problem does it solve?

Sometimes we need to remember something between renders but:

```txt
We do NOT want a re-render.
```

That's what useRef does.

---

## Mental Model

```txt
useState
=
Store value + Re-render

useRef
=
Store value + No re-render
```

---

## Basic Syntax

```js
const ref = useRef();
```

---

## Accessing DOM Elements

```js
const inputRef = useRef();
```

```jsx
<input ref={inputRef} />
```

```js
inputRef.current.focus();
```

---

## What is .current?

```js
ref.current
```

holds the actual value.

Example:

```js
const countRef = useRef(0);

countRef.current++;
```

---

## Industry Uses

### Focus Inputs

```js
inputRef.current.focus();
```

---

### Timer IDs

```js
const timerRef = useRef();

timerRef.current = setInterval(...);
```

---

### Previous Values

```js
const prevValue = useRef();
```

Used in custom hooks like:

```js
usePrev()
```

---

### DOM Manipulation

```js
divRef.current.scrollTop
```

```js
divRef.current.scrollHeight
```

---

## Chat Example

```js
chatBoxRef.current.scrollTop =
chatBoxRef.current.scrollHeight;
```

Meaning:

```txt
Move scroll position
to the bottom.
```

---

## Important Properties

### scrollTop

```txt
Current scroll position.
```

---

### scrollHeight

```txt
Total height of content.
```

---

## One-Line Summary

```txt
useRef = Remember something without causing a re-render.
```

---

# 3. useCallback

## What problem does it solve?

Every render creates new functions.

Example:

```js
const handleClick = () => {
  console.log("Clicked");
};
```

Every render:

```txt
Function A
Function B
Function C
```

New function each time.

---

## Why is that a problem?

Normally:

```txt
No problem.
```

But when passing functions to memoized components:

```jsx
<Child onClick={handleClick} />
```

React sees:

```txt
Old Function ≠ New Function
```

and re-renders the child.

---

# React.memo

```js
const Child = React.memo(function Child() {
  ...
});
```

Meaning:

```txt
Only re-render if props change.
```

---

## Without useCallback

```js
const handleClick = () => {};
```

Render #1

```txt
Function A
```

Render #2

```txt
Function B
```

React.memo sees:

```txt
Props changed.
```

Child re-renders.

---

## With useCallback

```js
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

Render #1

```txt
Function A
```

Render #2

```txt
Function A
```

Render #3

```txt
Function A
```

Same function reference.

Child can skip rendering.

---

# Dependency Array

## Empty Array

```js
useCallback(fn, []);
```

Meaning:

```txt
Create once.
Never recreate.
```

---

## Dependency Present

```js
useCallback(fn, [count]);
```

Meaning:

```txt
Create a new function
whenever count changes.
```

---

## Why Dependencies Matter

Example:

```js
const handleClick = useCallback(() => {
  console.log(count);
}, []);
```

If count becomes:

```txt
0 → 10
```

The function still remembers:

```txt
count = 0
```

This is called a:

```txt
Stale Closure
```

---

Correct version:

```js
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

Now React recreates the function whenever count changes.

---

# Industry Uses

## Large Tables

```txt
1000+
Rows
```

Avoid unnecessary row renders.

---

## Dashboards

```txt
Charts
Widgets
Maps
Tables
```

Prevent expensive re-renders.

---

## Custom Hooks

```js
function useChat() {
  const sendMessage = useCallback(...);

  return { sendMessage };
}
```

---

## Real Example

```jsx
<Map
  onMarkerClick={handleMarkerClick}
/>
```

Without useCallback:

```txt
Every parent render
↓
New function
↓
Map re-renders
```

With useCallback:

```txt
Same function
↓
Map skips render
```

---

# Beginner Rule

Do NOT use useCallback everywhere.

Ask:

```txt
Am I passing a function
to a memoized child?
```

If NO:

```txt
Probably don't need useCallback.
```

---

# One-Line Summary

```txt
useCallback = Keep the same function reference between renders.
```

---

# Final Cheat Sheet

## useEffect

```txt
Purpose:
Run code after rendering.

Common Uses:
- API Calls
- Timers
- Event Listeners

Mental Model:
Render → Effect Runs
```

---

## useRef

```txt
Purpose:
Store values without re-rendering.

Common Uses:
- DOM Access
- Timers
- Previous Values
- Scroll Management

Mental Model:
Remember things.
```

---

## useCallback

```txt
Purpose:
Keep function references stable.

Common Uses:
- React.memo
- Large Lists
- Dashboards
- Custom Hooks

Mental Model:
Reuse the same function.
```

---

# The Three Hooks in One Sentence

```txt
useEffect  → Do something after render.

useRef     → Remember something without re-rendering.

useCallback → Reuse the same function between renders.
```
