import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Login from './pages/Login';
import Registration from './pages/Registration';
import './App.css'; // Ensure you have an App.css for the transitions

function App() {
  return (
    <Router>
      <div className="App">
        <RoutesContainer />
      </div>
    </Router>
  );
}

// This component is used to wrap the Routes and apply the transition
function RoutesContainer() {
  const location = useLocation(); // This hook gives you the current location

  return (
    <TransitionGroup className="RoutesContainer">
      {/* The `key` prop is essential for the transition to work with different routes */}
      <CSSTransition key={location.key} classNames="slide" timeout={350}>
        <Routes location={location}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;