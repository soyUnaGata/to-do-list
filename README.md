# To-Do List App

Welcome to the documentation for the To-Do List App! This project is a simple to-do list application built using Vue.js, Vue-datepicker, Moment.js, and Vuex (in the second branch). It utilizes localStorage to store tasks and relevant information.

## Live Demo

Check out the live demo of the To-Do List App: [Live Demo](https://monumental-figolla-2c1644.netlify.app/)

## Features

- Create, edit, and delete tasks.
- Utilizes Vue-datepicker for selecting due dates.
- Incorporates Moment.js for handling and displaying dates.
- Data is persisted using localStorage for a seamless experience.
- Vuex state management (in the second branch) for centralized data management.

## Technologies Used

- Vue.js
- Vue-datepicker
- Moment.js
- Vuex (in second branch)
- localStorage

## Getting Started

### Prerequisites

- Node.js and npm must be installed on your machine.

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd to-do-list`
3. Install dependencies: `npm install`

### Usage

1. Run `npm run serve` to start the development server.
2. The app will be available at `http://localhost:8080`.
3. Use the app to manage your to-do tasks.

### Project Structure

- `src/` - Contains the source code and assets.
  - `assets/` - Contains static assets like images.
  - `common/` - Contains utility functions and constants.
    - `helper.js` - Utility functions for general use.
    - `constants.js` - Constants used in the app.
  - `components/` - Contains Vue components.
  - `services/` - Contains service setup.
- `public/` - Contains the HTML template and other public files.
- `src/main.js` - Entry point of the application.

## Branches

- `main` - Contains the basic version of the app.
- `vuex` - Contains the version with Vuex state management.

## Contributing

Contributions are welcome! If you find any issues or improvements, feel free to create a pull request.


