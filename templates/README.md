# SeaJS - The 245 Byte FE Framework

## Overview

**SeaJS** is a lightweight, frontend JavaScript framework designed for building web applications with minimal overhead. It offers a simple API for component-based development, state management, and signal handling. SeaJS focuses on performance and bundle size efficiency, making it ideal for projects where every kilobyte matters. As of now the bundle size is a mere 245 Bytes!

## Key Features

- **Component-Based Architecture**: Create and manage UI components easily.
- **State Management**: Efficiently manage and update application state.
- **Signal System**: Handle events and communication between different parts of the application.
- **Minimal Bundle Size**: Designed to be compact and performant. With a bundle size of just ***under 245 B*** SeaJS is the world's smallest frontend framework!

## Installation and Setup

Currently, Sea JS doesn't comes with a CLI that automatically installs everything you need and creates a starter app for you. It is in works but for now you have to do it yourself. Please follow these steps to get started with using the framework in your project.

### 1. Initialize a Node.js Project

First, you need to set up a Node.js project. In your terminal, navigate to the folder where you want to create the project and run:

```bash
npm init -y
```

This will create a `package.json` file in your project folder, initializing the Node.js project.

### 2. Install the Framework

Once your project is initialized, install the framework from npm:

```bash
npm i sea-js-ui-core
```

This will add the framework to your project dependencies.

### 3. Setup a Module Bundler

To bundle your application, you’ll need to set up a module bundler. We recommend using **Vite** for fast builds and hot reloading. You can install and configure Vite by running the following commands:

```bash
npm i vite --save-dev
```

Update the `package.json` under the `"scripts"` section. Here is how you do it if you use `Vite`:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
```

### 4. Create an `index.html` File

In the root of your project folder, create an `index.html` file that will serve as the entry point for your application. Add the following basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea JS</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="src/app.js"></script>
</body>
</html>
```

### 5. Create the `src/` Folder and `app.js`

Next, create a folder called `src` in the root of your project. Inside the `src` folder, create a file called `app.js` where you will write your main application logic.

Here’s an example of what your `app.js` file might look like:

```javascript
import { createComponent } from "sea-js-ui-core";

function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
    console.log(state.count + 1);
  }
  function decrement() {
    setState({ count: state.count - 1 });
    console.log(state.count - 1);
  }
  window.increment = increment;
  window.decrement = decrement;

  return `
    <div>
      <h1>Welcome to SeaJS!</h1>
      <h6>A lightweight frontend framework made with love.</h6>
      <h2>Count: ${state.count}</h2>
      <button onclick="increment()">Increment</button>
      <button onclick="decrement()">Decrement</button>
    </div>
  `;
}

createComponent(CounterComponent, { count: 0 });
```

### 6. Make sure that `app.js` is properly linked to `index.html`

Make sure the `<script>` tag in `index.html` correctly links to your `app.js` file. The structure provided above already does this with:

```html
<script type="module" src="/src/app.js"></script>
```

### 7. Start the Development Server

Now you can run the development server using Vite. Simply run:

```bash
npm run dev
```

That's it! You now have a basic setup with your framework, ready for development.

## Basic Usage

### **Creating a Component**

You can create components using the `createComponent` function. Here’s a basic example:

```javascript
import { createComponent } from "sea-js";

function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
    console.log(state.count + 1);
  }
  function decrement() {
    setState({ count: state.count - 1 });
    console.log(state.count - 1);
  }
  // Expose functions to the global scope
  window.increment = increment;
  window.decrement = decrement;

  return `
    <div>
      <h1>Welcome to SeaJS!</h1>
      <h6>A lightweight frontend framework made with love.</h6>
      <h2>Count: ${state.count}</h2>
      <button onclick="increment()">Increment</button>
      <button onclick="decrement()">Decrement</button>
    </div>
  `;
}

createComponent(CounterComponent, { count: 0 });
```

## Core Features

### 1. **State Management**

SeaJS provides a basic store for managing application state:

```javascript
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
  getState() {
    return this.state;
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

window.store = new Store();
```

### 2. **The Create Components Function**

The `createComponent` function initializes a component with a given initial state and renders it:

```javascript
export function createComponent(componentFn, initialState) {
  window.store.setState(initialState);

  function render() {
    const state = window.store.getState();
    const html = componentFn(state, window.store.setState.bind(window.store));
    document.getElementById('root').innerHTML = html;
  }

  render();
  window.store.subscribe(render);
}
```

Note - Signals have been removed for now, because of a bug and due to the TC39 Proposal integrating Signals into JS.
