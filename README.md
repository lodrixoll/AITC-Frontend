AITC-Frontend
====================
Welcome to the AITC-Frontend repository. This project is a React-based application designed to provide a comprehensive dashboard for managing real estate transactions, emails, calendar events, and more. It leverages TailwindCSS for styling and includes a variety of features such as authentication, dynamic routing, and form handling.
r
n

To Do
---------------
- [ ] fix page refresh authentication bug
- [x] Transactions page frontend


Branching Strategy
---------------
1. `production`: This is the main branch where the production-ready codebase resides. It should be the most stable and up-to-date version of the application.
2. `staging`: This branch contains the latest development codebase. It is the branch where new features and bug fixes are developed and tested.
3. `feature/<feature-name>`: These branches are used to develop new features. They are branched off from the `staging` branch and merged back into the `staging` branch once the feature is complete.
4. `bugfix/<bugfix-name>`: These branches are used to fix bugs. They are branched off from the `staging` branch and merged back into the `staging` branch once the bug is fixed.


Getting Started
---------------
To get started with this project, clone the repository to your local machine and navigate to the `ui` directory:

```
git clone https://github.com/lodrixoll/AITC-Frontend.git
cd ui

```


### Installation

Install the necessary dependencies by running:

```
npm install

```


### Environment

You need to set the `REACT_APP_BACKEND_URL` environment variable to the URL of the backend server. This is used to make requests to the backend server.

```
cp .env.example .env
```

This is typically `http://localhost:3001` if you are running the backend locally.


### Running the Application

To start the application in development mode, run:

```
npm start

```

This will launch the application on <http://localhost:3000>, where you can view it in your browser.


### Deployment

Vercel

```
To do

```

Vercel


Project Structure
-----------------

* `src/`: Contains the source code of the application.
	+ `components/`: Reusable components.
	+ `contexts/`: React context providers for global state management.
	+ `pages/`: Components representing different pages/routes.
	+ `App.js`: The main application component.
	+ `index.js`: Entry point for the React application.
* `public/`: Public assets and the `index.html` file.
* `.gitignore`: Specifies intentionally untracked files to ignore.
* `package.json`: Defines the project dependencies and scripts.
* `tailwind.config.js`: Configuration for TailwindCSS.

