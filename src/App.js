import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { browserMetaData, currentTime } from './utils';

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({ ...browserMetaData(), startSession: currentTime() });
  }, [])

  useBeforeunload(event => {
     fetch('http://k96eg.mocklab.io', {
    method: 'POST',
    body: JSON.stringify({
      ...state,
      endSession: currentTime(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  });

 

  console.log(state);

  return (
    <div className="App">
     {JSON.stringify(state, null)}
     <p>djd</p>
    </div>
  );
}

export default App;
