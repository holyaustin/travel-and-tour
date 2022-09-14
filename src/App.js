import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import background from './images/tourist1.jpg';
// import Home component
import Explore from './components/Explore';
// import Home component
import Hire from './components/Hire';
// import About component
import Become from './components/Become';
// import ContactUs component
import Community from './components/Community';

function App() {
  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }}>

        <Router>
          <Routes>
            <Route exact path="/" element={<h1>Home Page</h1>} />
            <Route exact path="Hire" element={<Hire />} />
            <Route exact path="Become" element={<Become />} />
            <Route exact path="Community" element={<Community />} />
            <Route exact path="Explore" element={<Explore />} />
          </Routes>
          <div className="list">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Hire">Hire</Link></li>
              <li><Link to="/Become">Become</Link></li>
              <li><Link to="community">Join Our Community</Link></li>
              <li><Link to="explore">Explore</Link></li>
            </ul>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
