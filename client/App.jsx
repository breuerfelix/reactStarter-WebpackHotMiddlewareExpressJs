import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

import Scriptworld from './sites/scriptworld';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div class="container">
                    <Route path="/" component={Scriptworld} />
                    <Switch>
                        <Route path="/sw" component={Scriptworld} />
                        <Route path="/" exact />
                        <Route component={Scriptworld} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
