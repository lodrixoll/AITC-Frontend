AITC-Frontend
====================
Welcome to the AITC-Frontend repository. This project is a react app for real estate transaction management. It leverages TailwindCSS for styling and includes a variety of features such as authentication, dynamic routing, and form handling.

To Do
---------------
- [ ] update add transaction to use new routes (validate & extract-details)
- [ ] fix page refresh authentication bug

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

You need to set the `REACT_APP_BACKEND_URL` environment variable to the URL of the backend server. Create an env by copying the example file.

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

