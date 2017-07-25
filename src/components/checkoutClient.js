import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import 'typeface-roboto'
import {fetchClients, registerClient} from '../actions/clientAction'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import RegisterClient from './registerClient'

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



export class CheckoutClient extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      inputField: "",
      searchBtnDisabled: false,
      selectedId: -1,
      openDialog: false,
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

_registerBtn(event) {
  this.setState({openDialog: true})
}


_handleOk() {
  let state = this.state

  if (state.selectedId < 0)
    return


    // let year = parseInt(book.year)

  this.props.okHandler(state.selectedId)

  this.setState({selectedId: -1})

}

_handleCancel() {
  this.props.cancelHandler()
}



_searchBtn() {

  // return


  if (this.state.inputField === "") {
    this.props.dispatch(fetchClients())
  } else {
    this.props.dispatch(fetchClients(this.state.inputField))
  }

  this.setState({selectedId: -1, searchBtnDisabled: true})

}

isSelected(id) {
  console.log("input id == ", id)

  return id === this.state.selectedId
}


handleClick(event, client_id) {
  console.log("handleClick calling, id = ", client_id)
  let id = client_id

  if (this.state.selectedId == client_id)
    id = -1

this.setState({selectedId: id})

}

registerHandler(client) {

  this.setState({openDialog: false})
  console.log("client", client)

  let clientJson = JSON.stringify(client)

  this.props.dispatch(registerClient(clientJson))

}


cancelRegisterHandler() {
  this.setState({openDialog: false})

}
render() {
  console.log("checkoutClient render :", this)
  const classes = this.props.classes

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
                <TextField id="placeholder"
                  label="Search"
                  type="text"
                  value={this.state.inputField}
                  onChange={this.updateInput.bind(this)}
                  helperText="enter client id"
                  fullWidth={true}
                  marginForm
                />
                <Button raised onClick={this._searchBtn.bind(this)}>search</Button>
                <Button raised onClick={this._registerBtn.bind(this)}>register</Button>

            {/* </div> */}
            {/* </Grid> */}
        				{/* <div> */}
        					<Table>
        						<TableHead>
        							<TableRow role="checkbox">
                        <TableCell checkbox >
                          <Checkbox checked={this.state.selectedAll} />
                        </TableCell>
        								<TableCell>ID</TableCell>
        								<TableCell>First name</TableCell>
        								<TableCell>Last Name</TableCell>
        		      		</TableRow>
        		    		</TableHead>
        		    		<TableBody>
        		    			{
        		    				this.props.clients.map(el => {
                          const isSelected = this.isSelected(el.client_id)
                          return (
                            <TableRow hover role="checkbox" key={el.client_id} onClick={event => this.handleClick(event, el.client_id)}>
                              <TableCell checkbox>
                                <Checkbox checked={isSelected} />
                              </TableCell>
                              <TableCell>{el.client_id}</TableCell>
                              <TableCell>{el.first_name}</TableCell>
                              <TableCell>{el.last_name}</TableCell>
                            </TableRow>
                          )
                        })
                      }
        		    			</TableBody>
        		  			</Table>


                    <RegisterClient
                        open={this.state.openDialog}
                        okHandler={this.registerHandler.bind(this)}
                        cancelHandler={this.cancelRegisterHandler.bind(this)}
                      />
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
    clients: state.clients,
		workerId: state.workerId
    // books: state.books,
    // auth: state.auth
  }
}


export default connect(mapStateToProps,)  (withStyles(styleSheet)(CheckoutClient));
