import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import 'typeface-roboto'

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';


const styleSheet = createStyleSheet('SearchRequest', theme => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // update_bar: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // }
}));



export class CreateBook extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      book: {
        name: "",
        year: 0,
        publisher: "",
        author: [
          {
            first_name: "",
            last_name: ""
          },
        ]
      }
		};
	}


  componentWillUpdate(nextProps) {
     if (nextProps.book !== this.props.book) {
       this.setState({ book: this.props.book });
     }
   }



_onChange(event) {
  let field = event.target.id
  let book = this.state.book


	if (field === "year") {
		if (isNaN (event.target.value))
			return
		let year = parseInt(event.target.value)
		book[field] = year
	} else  {
		book[field] = event.target.value
	}

	this.setState({book: book})
}


_handleOk() {
  let book = this.state.book

  if (book.name === "" ||
      book.year === 0 ||
      book.publisher === "" ||
      book.first_name === "" ||
      book.last_name === "" )
    return

  this.props.okHandler(book)
  this.setState({book: {}})

}

_handleCancel() {
  this.props.cancelHandler()
}

firstNameChange(event) {
  let book = this.state.book
  let id = event.target.id
  book.author[id].first_name = event.target.value
  this.setState({book: book})

}

lastNameChange(event) {
  let book = this.state.book
  let id = event.target.id
  book.author[id].last_name = event.target.value

  this.setState({book: book})

}

render() {
  const book = this.state.book

  const { ...other } = this.props;
  if (book.author == null) {
    return (null)
  }

	return (
        <Dialog
          ignoreBackdropClick
          ignoreEscapeKeyUp
          maxWidth="xs"
          onEntering={this.handleEntering}
          {...other}
          >
          <DialogContent>
                    <TextField id="name" label="book name" value={book.name} onChange={this._onChange.bind(this)} marginForm/>
                    <TextField id="year" label="book year" value={book.year} onChange={this._onChange.bind(this)} marginForm />
                    <TextField id="publisher" label="publisher" value={book.publisher} onChange={this._onChange.bind(this)} marginForm />
                    {

                      book.author.map((author, idx) => {
                        return (
                          <div key={idx}>
                        <TextField name="first_name" id={idx.toString()}  key={"first_name" + idx.toString() } label="author first name" value={author.first_name} onChange={this.firstNameChange.bind(this)} marginForm />
                        <TextField name="last_name" id={idx.toString()} key={"last_name" + idx.toString() } label="author last name" value={author.last_name} onChange={this.lastNameChange.bind(this)} marginForm />
                      </div>
                      )
                      })
                    }

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
  return {
  }
}


export default connect(mapStateToProps,)  (withStyles(styleSheet)(CreateBook));
