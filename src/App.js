import SearchBar from "./components/searchBar";
import Title from "./components/title";
import "./App.css";
import React, { useEffect } from 'react';

function App() {
  // raining effect
  useEffect(() => {
    let hrElement;
    let counter = 70;
    for (let i = 0; i < counter; i++) {
      hrElement = document.createElement("HR");
      hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = 2 + Math.random() * 3 + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(hrElement);
    }
  }, []);

  return (<div className="whole">
    <Title></Title>
    <SearchBar></SearchBar>
  </div>)
}

export default App;