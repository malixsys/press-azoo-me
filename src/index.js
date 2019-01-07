/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import ReactDOM from 'react-dom';

import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';

dayjs.extend(relativeTime);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
