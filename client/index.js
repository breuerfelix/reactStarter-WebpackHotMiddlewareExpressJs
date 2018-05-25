import React from 'react';
import { render } from 'react-dom';

import App from './App';
import Header from './Header';

render(<Header />, document.getElementById('react-header'));
render(<App />, document.getElementById('react-app'));

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept();
    }
}
