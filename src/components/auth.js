import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {getToken} from '../actions/authAction'
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const styleSheet = {
  auth_field: {
  },
};

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        login: "",
        password: ""
      }
    };
  }

  updateInput(event, value) {}

  _onChangeRaiseButton() {

    if (this.state.credentials.login === "" || this.state.credentials.password === "")
      return

    console.log("_onChangeRaiseButton.this")
    console.log(this)

    this.props.dispatch(getToken(this.state.credentials))
  }

  _onChange(event) {
    let field = event.target.id
    let credentials = this.state.credentials

    credentials[field] = event.target.value

    this.setState({credentials: credentials})

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push('/')
    }
  }

  render() {
    const classes = this.props.classes;


    console.log("auth.this")
    console.log(this)

    console.log("auth.this.props")
    console.log(this.props)

    return (
      <div className={styleSheet.auth_field}>

          {/* <Grid container align="center" justify="center" direction="column"> */}
          <Grid container justify="center" direction="column">
            <TextField id="login"
              label="login"
              type="text"
              value={this.state.inputField}
              onChange={this._onChange.bind(this)}
              // marginForm
            />

            <TextField id="password"
              label="password"
              type="text"
              value={this.state.inputField}
              onChange={this._onChange.bind(this)}
              // marginForm
            />
            <Button variant="raised" onClick={this._onChangeRaiseButton.bind(this)}>ok</Button>
            {/* <Button onClick={this._onChangeRaiseButton.bind(this)}>ok</Button> */}
        </Grid>

      </div>
    );
  }
}

Auth.contextTypes = {
  router: PropTypes.shape({}).isRequired
};

const mapStateToProps = (state) => {
  return {auth: state.auth}
}


export default connect(mapStateToProps,) (Auth);
// export default connect(mapStateToProps,mapDispatchToProps)(Auth);
