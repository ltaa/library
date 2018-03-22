import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {withStyles, createStyleSheet} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import {logout} from '../actions/authAction';
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const styleSheet = {
  app: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu_list: {
    'margin-right': 20,
    "border-right": "1px solid lightgray",
  },
  app_child: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

class App extends React.Component {

  searchClickHandle(event) {
    console.log("entering searchClickHandle")

    this.context.router.history.push('/books')
  }

componentWillMount() {
  console.log("Will mount")
}

  componentDidMount() {
    console.log("Did mount")
  }
  componentWillUnmount() {
    console.log("will unmount")
  }
  homeClickHandle(event) {
    this.context.router.history.push('/')
  }

  checkoutClickHandle(event) {
    this.context.router.history.push('/checkout')
  }

  clientBooksClickHandle(event) {
    this.context.router.history.push('/clientBooks')
  }


  login_handler() {
    if (this.props.auth) {
      this.props.dispatch(logout())
    } else {
      this.context.router.history.push('/auth')
    }

  }

  createHandler() {
    console.log("createHandler")
    this.context.router.history.push('/create')
  }

  edit_handler() {
    this.context.router.history.push('/edit')
  }

  render() {
    console.log("App render")
    console.log(this.props)
    const classes = this.props.classes;
    let login_string = ""

    if (this.props.auth) {
      login_string = "logout"

    } else {
      login_string = "login"
    }


    return (
      <div style={styleSheet.app}>
        <Grid item xs={4} sm={2}>
          <div style={styleSheet.menu_list}>
          <List>
            <ListItem button onClick={this.homeClickHandle.bind(this)}>
              <ListItemText primary="home"/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={this.searchClickHandle.bind(this)}>
              <ListItemText primary="search"/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={this.checkoutClickHandle.bind(this)}>
              <ListItemText primary="checkout"/>
            </ListItem>
            <Divider/>


            <ListItem button onClick={this.clientBooksClickHandle.bind(this)}>
              <ListItemText primary="client"/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={this.login_handler.bind(this)}>
              <ListItemText primary={login_string} />
            </ListItem>
            <ListItem button onClick={this.edit_handler.bind(this)}>
              <ListItemText primary="edit" />
            </ListItem>


          </List>
        </div>
        </Grid>


        <Grid item xs={8} sm={10}>
          <div style={styleSheet.app_child}>

            {this.props.children}

          </div>
        </Grid>

      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.shape({}).isRequired
};


const mapStateToProps = (state) => {
  console.log(state)

  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps) (App);
