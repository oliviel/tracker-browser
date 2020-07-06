import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { browserMetaData, currentTime } from './utils';

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({ ...browserMetaData(), startSession: currentTime() });
  }, [])

  useBeforeunload(event => {
    // http://k96eg.mocklab.io
     fetch('https://tracker-d4fd7.firebaseio.com/track.json', {
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

  return (
    <div className="App">
     {JSON.stringify(state, null)}
     <p>djd</p>
    </div>
  );
}

export default App;
