import React, { useState } from 'react';
import './App.scss';
import Dashboard from './Dashboard';

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  function toggleInstructions(e) {
    e.preventDefault();
    setShowInstructions((i) => !i);
  }
  return (
    <div className="app-wrapper">
      <div className="headers-wrapper">
        <h2>Welcome to Templater!</h2>
        <h2>Automate repetitive writing tasks.</h2>
      </div>
      <div
        className={`instructions-wrapper ${
          showInstructions ? 'shown' : 'hidden'
        }`}
      >
        {showInstructions ? (
          <>
            <div className="text-wrapper">
              <p className="instructions">
                Write your template in the box on the right. Whereever there's
                something you'll want to insert, use #s to surround the field
                title like so: #FIELD1#.
              </p>
              <p className="instructions">
                For example, you could write "Hello #FIELD1#, nice to meet you!"
                and then fill in the box titled FIELD 1. Feel free to add as
                many FIELDS as you want for your template!
              </p>
              <p className="instructions">
                When you're all done, click "Replace" at the bottom of the page
                to get your full document. When you're ready to move on, just
                the same button to 'Go Back' and change up your template and
                fields.
              </p>
            </div>
            <button className="hide-button" onClick={toggleInstructions}>
              Hide instructions
            </button>
          </>
        ) : (
          <button className="show-button" onClick={toggleInstructions}>
            Show instructions
          </button>
        )}
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
