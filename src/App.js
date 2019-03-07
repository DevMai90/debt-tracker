// Note: Using react-redux version 5
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddDebtor from './components/debtors/AddDebtor';
import DebtDetails from './components/debtors/DebtDetails';
import EditDebtor from './components/debtors/EditDebtor';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/debtor/add"
                  component={UserIsAuthenticated(AddDebtor)}
                />
                <Route
                  exact
                  path="/debtor/:id"
                  component={UserIsAuthenticated(DebtDetails)}
                />
                <Route
                  exact
                  path="/debtor/edit/:id"
                  component={UserIsAuthenticated(EditDebtor)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
