import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import 'typeface-roboto'
import {fetchClients} from '../actions/clientAction'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';


const styleSheet = createStyleSheet('SearchRequest', theme => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // search_bar: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // }
}));



export class RegisterClient extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      client: {
        first_name: "",
        last_name: ""
      }
      // inputField: "",
      // searchBtnDisabled: false,
      // selectedId: -1
		};
	}



  componentWillUpdate(nextProps) {
   }



   updateInput(event, value) {
     this.setState({inputField: event.target.value, searchBtnDisabled: false})
   }


componentDidMount() {
  console.log("UPDATE BOOK MOUNTED")
}




_handleOk() {
  let state = this.state

  if (state.first_name === "" || state.last_name === "")
    return

  this.props.okHandler(this.state.client)

  this.setState({client: {
    first_name: "",
    last_name: ""
  }})

}

_handleCancel() {
  this.props.cancelHandler()
}

firstNameChange(event) {
  let client = this.state.client
  client.first_name = event.target.value
  this.setState({client: client})

}

lastNameChange(event) {
  let client = this.state.client
  client.last_name = event.target.value
  this.setState({client: client})
}

render() {
  console.log("checkoutClient render :", this)
  const classes = this.props.classes
  const client = this.state.client

  const { ...other } = this.props;
	return (
        <Dialog
          ignoreBackdropClick
          ignoreEscapeKeyUp
          maxWidth="sm"
          onEntering={this.handleEntering}
          {...other}
          >
          <DialogContent>
            {/* <Grid container  direction="column" justify="center" align="center"> */}

            {/* <div className={classes.container}> */}
            {/* <Grid container> */}
              {/* <Grid item xs={8} sm={8}> */}
              {/* <div className={classes.search_bar}> */}
                {/* <TextField id="placeholder"
                  label="Search"
                  type="text"
                  value={this.state.inputField}
                  onChange={this.updateInput.bind(this)}
                  helperText="enter client id"
                  fullWidth={true}
                  marginForm
                /> */}
                {/* <Button raised disabled={this.state.searchBtnDisabled} onClick={this._searchBtn.bind(this)}>search</Button> */}

                <TextField fullWidth={true} id="first_name" label="client first name" value={client.first_name} onChange={this.firstNameChange.bind(this)} marginForm />
                <TextField fullWidth={true} id="last_name" label="client last name" value={client.last_name} onChange={this.lastNameChange.bind(this)} marginForm />

            {/* </div> */}
            {/* </Grid> */}
        				{/* <div> */}

        				{/* </div> */}

              {/* </Grid> */}
        		{/* </div> */}

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this._handleCancel.bind(this)}>
              Cancel
            </Button>
            <Button color="primary" onClick={this._handleOk.bind(this)}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

	);
}
}




const mapStateToProps = (state) => {

  console.log("update", state.books)
  return {
    clients: state.clients
    // books: state.books,
    // auth: state.auth
  }
}


export default connect(mapStateToProps,)  (withStyles(styleSheet)(RegisterClient));
