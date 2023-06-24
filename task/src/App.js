import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Survey from './components/main/Survey'
import Page2 from './components/page2/Page2';
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Survey />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      
     {/* <Page2></Page2> */}
    </div>
  );
}

export default App;
