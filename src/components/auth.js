import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {getToken} from '../actions/authAction'
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

import 'typeface-roboto'

const styleSheet = createStyleSheet('Auth', theme => ({
  auth_field: {
  },
}));

export class Auth extends React.Component {

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

    return (
      <div className={classes.auth_field}>

          <Grid container align="center" justify="center" direction="column">
            <TextField id="login"
              label="login"
              type="text"
              value={this.state.inputField}
              onChange={this._onChange.bind(this)}
              marginForm
            />

            <TextField id="password"
              label="password"
              type="text"
              value={this.state.inputField}
              onChange={this._onChange.bind(this)}
              marginForm
            />
            <Button raised onClick={this._onChangeRaiseButton.bind(this)}>ok</Button>
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

export default connect(mapStateToProps,)(withStyles(styleSheet)(Auth));
