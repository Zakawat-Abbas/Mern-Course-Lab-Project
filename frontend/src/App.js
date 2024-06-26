import React, { useState } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  function toggleForm() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="App">
      {showLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}
    </div>
  );
}

export default App;