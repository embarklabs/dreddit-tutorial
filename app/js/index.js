import EmbarkJS from 'Embark/EmbarkJS';
import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

EmbarkJS.onReady(() => {
  render(<App />, document.getElementById('root'));
});
