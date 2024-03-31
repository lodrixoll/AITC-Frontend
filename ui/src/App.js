import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Email from './pages/Email';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar'; // Add this line
import SidebarLayout from './components/SidebarLayout'; // Import the SidebarLayout
import './App.css';

// Define your route components here
const sidebarRoutes = [
    { path: '/dashboard', Component: Dashboard },
    { path: '/transactions', Component: Transactions },
    { path: '/emails', Component: Email },
    { path: '/settings', Component: Settings },
    { path: '/calendar', Component: Calendar }, // Add this line
];

function App() {
  return (
    <Router>
      <div className="App">
        <RoutesContainer />
      </div>
    </Router>
  );
}

function RoutesContainer() {
  const location = useLocation();

  // Check if the current location is a sidebar route
  const isSidebarRoute = sidebarRoutes.some(route => route.path === location.pathname);

  return (
      <TransitionGroup className="RoutesContainer">
          {isSidebarRoute ? (
              // Render without transition for sidebar routes
              <Routes location={location}>
                  {sidebarRoutes.map(({ path, Component }) => (
                      <Route key={path} path={path} element={<SidebarLayout><Component /></SidebarLayout>} />
                  ))}
              </Routes>
          ) : (
              // Apply CSSTransition for non-sidebar routes
              <CSSTransition key={location.key} classNames="slide" timeout={350}>
                  <Routes location={location}>
                      {/* Non-sidebar routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Registration />} />
                      {/* Sidebar routes */}
                      {sidebarRoutes.map(({ path, Component }) => (
                          <Route key={path} path={path} element={<SidebarLayout><Component /></SidebarLayout>} />
                      ))}
                      {/* Redirect to login as default */}
                      <Route path="/" element={<Login />} />
                  </Routes>
              </CSSTransition>
          )}
      </TransitionGroup>
  );
}

export default App;