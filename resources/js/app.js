import React from 'react';
import ReactDOM from "react-dom";

require('./bootstrap');

import ReactDataTableApp from './ReactDataTableApp';

if (document.getElementById('datatable')) {
  ReactDOM.render(<ReactDataTableApp />, document.getElementById('datatable'));
}
