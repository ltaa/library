import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/app'
import SearchRequest from './components/searchRequest'
import configureStore from './store/store'
import Checkout from './components/checkout'
import ClientBook from './components/clientBookList'
import 'typeface-roboto'
import {MuiThemeProvider} from 'material-ui/styles';
import Auth from './components/auth'
import EditRequest from './components/editBook'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <MuiThemeProvider>
      <Switch>
        <Route path="/auth" component={Auth}/>
        <App>
          <Route path="/books" component={SearchRequest}/> {/* <Route path="/books" component={BookList} /> */}
          <Route path="/checkout" component={Checkout}/>
          <Route path="/clientBooks" component={ClientBook}/>
          <Route path="/edit" component={EditRequest} />
        </App>
      </Switch>
    </MuiThemeProvider>
  </Router>
</Provider>, document.getElementById('mount-point'));
