import React from 'react';
import ReactDOM from 'react-dom';
import { ReactP5Wrapper } from "react-p5-wrapper"

self.onmessage = function (event) {
  const props = event.data;

  // Render the React component inside the Web Worker
  ReactDOM.render(
    <React.StrictMode>
      <ReactP5Wrapper {...props} />
    </React.StrictMode>,
    self.document.getElementById('root')
  );
};