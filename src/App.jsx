// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Trắc nghiệm lịch sử Quân khu 7</h1>
      <Quiz />
    </div>
  );
}

export default App;
