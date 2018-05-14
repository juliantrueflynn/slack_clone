import React from 'react';
import NavBarContainer from './components/NavBarContainer';
import MainPage from './MainPage';
import 'sanitize.css';

const App = () => (
  <div>
    <NavBarContainer />
    <MainPage />
  </div>
);

export default App;