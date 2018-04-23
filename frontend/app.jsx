import React from 'react';
import NavBarContainer from './components/navbar/navbar_container';
import MainPage from './main_page';
import 'sanitize.css';

const App = () => (
  <div>
    <NavBarContainer />
    <MainPage />
  </div>
);

export default App;