import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Donut from './components/Donut';
import About from './components/About';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/ziba/" component={Donut} />
        <Route path="/ziba/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
