import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {fetchBooks} from '../actions/getBooks'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import {addToCard} from '../actions/cardAction'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import 'typeface-roboto'
import UpdateRequest from './updateBook'
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove'
import {updateBook} from '../actions/update'
import {deleteBook} from '../actions/delete'
import {CreateBook} from './createBook'
import {createBook} from '../actions/createBook'
import {cleanBooks} from '../actions/cleanup'
const styleSheet = createStyleSheet('EditRequest', theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  edit_bar: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export class EditRequest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputField: "",
      selected: [],
      editBtnDisabled: true,
      rmBtnDisabled: true,
      openDialog: false,
      dialogValue: {},
      openCreateDialog: false,
      searchBtnDisabled: true,
      selectedAll: false
		};
	}


  componentWillUnmount() {
    // console.log(wil)
    this.props.dispatch(cleanBooks())
  }

  
	componentDidMount() {
    if (!this.props.auth)
      this.context.router.history.push('/auth')

    this.props.dispatch(fetchBooks())

	}


	updateInput(event, value) {

    this.setState({inputField: event.target.value, searchBtnDisabled: false})


  }

  _onChangeRaiseButton (element) {
    let queryArray = this.state.selected.map (el => {
      return {instance_id: el}
    })

    let queryJson = JSON.stringify(queryArray)
    this.props.dispatch(addToCard(queryJson))
    this.setState({selected: []})


  }

isSelected = id => this.state.selected.indexOf(id) !== -1;

handleClick(event, id) {
  const {selected} = this.state
  const idx = selected.indexOf(id)
  let newArray = []

  if (idx === -1) {
    newArray = newArray.concat(selected, id)
  } else if (idx === 0) {
    newArray = newArray.concat(selected.slice(1))
  } else if ( idx === selected.length - 1 ) {
    newArray = newArray.concat(selected.slice(0, -1))
  } else {
    newArray = newArray.concat(selected.slice(0, idx))
    newArray = newArray.concat(selected.slice(idx + 1))
  }

  let editButton = this.state.editBtnDisabled
  if (newArray.length === 1) {
    editButton = false
  } else {
    editButton = true
  }

  let rmButton = this.state.rmBtnDisabled
  if (newArray.length >= 1) {
    rmButton = false
  } else {
    rmButton = true
  }

  let selectedAll = this.state.selectedAll
  if (selectedAll)
    selectedAll = !selectedAll


  this.setState({
    selected: newArray,
    editBtnDisabled: editButton,
    rmBtnDisabled: rmButton,
    selectedAll: selectedAll
  })
}

componentWillReceiveProps(nextProps) {
  if (!nextProps.auth)
    this.context.router.history.push('/auth')
}


_searchBtnClicked() {

  if (this.state.inputField === "") {
    this.props.dispatch(fetchBooks())
  } else {
    this.props.dispatch(fetchBooks(this.state.inputField))
  }

  this.setState({selected: [], rmBtnDisabled: true, editBtnDisabled: true, searchBtnDisabled: true})

}


changeButton(event) {
  const state = this.state.removeButton;
  this.setState({removeButton: !state})
}

_editHandler(event) {
  const selected = this.state.selected
  if (selected.length !== 1 )
    return


  let book = this.props.books.filter (el => {
    return this.state.selected.indexOf(el.instance_id) !== -1
  })

let bookInstance
if (book.length === 1) {
  bookInstance = book[0]
} else {
  return
}


  this.setState({openDialog: true, dialogValue: bookInstance, selectedAll: false})

}


updateHandler(book) {

  let bookJson = JSON.stringify(book)
  this.props.dispatch(updateBook(bookJson))
  this.setState({openDialog: false, selected: []})

}

cancelUpdateHandler() {
  this.setState({openDialog: false})
}

deleteHandler() {

  const selected = this.state.selected
  if (selected === null || selected.length === null || selected.length === 0 )
    return

  let book = this.props.books.filter (el => {
    return this.state.selected.indexOf(el.instance_id) !== -1
  })

  let bookJson = JSON.stringify(book)
  this.props.dispatch(deleteBook(bookJson))


  this.setState({selected:[], selectedAll: false, rmBtnDisabled: true, editBtnDisabled: true})

}

createHandler() {
  this.setState({openCreateDialog: true})

}
okcreateHandler(bookJson) {
  let bookString = JSON.stringify(bookJson)
  this.props.dispatch(createBook(bookString))
  this.setState({openCreateDialog: false})
}

cancelCreateHandler() {
  this.setState({openCreateDialog: false})
}

_onSelectAll() {
  let selectedAll = !this.state.selectedAll

  let selected = []

  let rmBtn = true
  let editBtn = true

  if (selectedAll) {
    let newArray = this.props.books.map(el => {
      return el.instance_id
    })
    if (newArray.length > 0)
      rmBtn = false
    if (newArray.length === 1)
      editBtn = false
    selected = newArray

  } else {
    rmBtn = true
    editBtn = true
  }

  this.setState({selectedAll: selectedAll, selected: selected, rmBtnDisabled: rmBtn, editBtnDisabled: editBtn})
}





render() {
  const classes = this.props.classes;
	return (
		<div className={classes.container}>
    <Grid container>
      <Grid item xs={8} sm={8}>
      <div className={classes.edit_bar}>
        <TextField id="placeholder"
          label="Search"
          type="text"
          value={this.state.inputField}
          onChange={this.updateInput.bind(this)}
          helperText="enter book name"
          fullWidth={true}
          marginForm
        />
        <Button raised disabled={this.state.searchBtnDisabled} onClick={this._searchBtnClicked.bind(this)}>search</Button>
        <Button fab  color="primary"  className={classes.button} onClick={this.createHandler.bind(this)}>
          <Add />
        </Button>
        <Button fab color="primary" disabled={this.state.rmBtnDisabled} onClick={this.deleteHandler.bind(this)}><Remove /></Button>
        <Button fab color="accent" disabled={this.state.editBtnDisabled} onClick={this._editHandler.bind(this)} className={classes.button}>
          <ModeEditIcon />
        </Button>

    </div>
    </Grid>
				<div>
					<Table>
						<TableHead>
              <TableRow role="checkbox" onClick={this._onSelectAll.bind(this)}>
                <TableCell checkbox >
                  <Checkbox checked={this.state.selectedAll} />
                </TableCell>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Year</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Publisher</TableCell>
		      		</TableRow>
		    		</TableHead>
		    		<TableBody>
		    			{
		    				this.props.books.map(el => {
                  const isSelected = this.isSelected(el.instance_id);
                  const author = el.author.map(author => {return author.first_name + " " + author.last_name }).join()
                  return (
                    <TableRow hover role="checkbox" key={el.instance_id} onClick={event => this.handleClick(event, el.instance_id)}>
                      <TableCell checkbox>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{el.instance_id}</TableCell>
                      <TableCell>{el.name}</TableCell>
                      <TableCell>{el.year}</TableCell>


                      <TableCell>{author}</TableCell>
                      <TableCell>{el.publisher}</TableCell>
                    </TableRow>
                  )
                })
              }
		    			</TableBody>
		  			</Table>
				</div>

        <UpdateRequest
            open={this.state.openDialog}
            okHandler={this.updateHandler.bind(this)}
            cancelHandler={this.cancelUpdateHandler.bind(this)}
            book={this.state.dialogValue}
          />

          <CreateBook
              open={this.state.openCreateDialog}
              okHandler={this.okcreateHandler.bind(this)}
              cancelHandler={this.cancelCreateHandler.bind(this)}
            />

      </Grid>
		</div>
	);
}
}


EditRequest.contextTypes = {
  	router: PropTypes.shape({
  }).isRequired,
};


const mapStateToProps = (state) => {
  return {
    books: state.books,
    auth: state.auth
  }
}


export default connect(mapStateToProps,)  (withStyles(styleSheet)(EditRequest));
