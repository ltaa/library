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
import {cleanBooks} from '../actions/cleanup'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const styleSheet = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  search_bar: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};


export class SearchRequest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputField: "",
      selected: [],
      selectedAll: false,
      searchBtnDisabled: true,
      addBtnDisabled: true
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
    this.props.dispatch(addToCard(this.props.workerId, queryJson))
    this.setState({selected: [], addBtnDisabled: true, selectedAll: false})


  }


_onSelectAll() {
  let selectedAll = !this.state.selectedAll
  let selected = []
  let addBtn = true
  if (selectedAll) {
    let newArray = this.props.books.map(el => {
      return el.instance_id
    })
    if (newArray.length > 0)
      addBtn = false
    selected = newArray

  } else {
    addBtn = true
  }
  this.setState({selectedAll: selectedAll, selected: selected, addBtnDisabled: addBtn})
}

isSelected = id => {
  if(this.state.selectedAll)
    return true
  return this.state.selected.indexOf(id) !== -1
}

handleClick(event, id) {
  const {selected} = this.state
  let newArray = []
  const idx = selected.indexOf(id)

  if (idx === -1) {
    newArray = newArray.concat(selected, id)
  } else if (idx === 0) {
    newArray = newArray.concat(selected.slice(1))
  } else if (idx === selected.length - 1) {
    newArray = newArray.concat(selected.slice(0, -1))
  } else {
    newArray = newArray.concat(selected.slice(0, idx))
    newArray = newArray.concat(selected.slice(idx + 1))
  }

  let addBtn = true
  if (newArray.length > 0) {
    addBtn = false
  }

  let selectedAll = this.state.selectedAll
  if (selectedAll)
    selectedAll = !selectedAll

  this.setState({selected: newArray, addBtnDisabled: addBtn, selectedAll: selectedAll})

}


componentWillReceiveProps(nextProps) {
  if (!nextProps.auth)
    this.context.router.history.push('/auth')

}

_searchBtn() {
  if (this.state.inputField === "") {
    this.props.dispatch(fetchBooks())
  } else {
    this.props.dispatch(fetchBooks(this.state.inputField))
  }

  this.setState({selected: [], searchBtnDisabled: true})

}


render() {
  const classes = this.props.classes;

	return (
		<div style={styleSheet.container}>
    <Grid container>
      <Grid item xs={8} sm={8}>
      <div style={styleSheet.search_bar}>
        <TextField id="placeholder"
          label="Search"
          type="text"
          value={this.state.inputField}
          onChange={this.updateInput.bind(this)}
          helperText="enter book name"
          fullWidth={true}
          marginForm
        />
        <Button raised disabled={this.state.searchBtnDisabled} onClick={this._searchBtn.bind(this)}>search</Button>
        <Button raised disabled={this.state.addBtnDisabled} onClick={this._onChangeRaiseButton.bind(this)}> add to Card</Button>

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

      </Grid>
		</div>
	);
}
}


SearchRequest.contextTypes = {
  	router: PropTypes.shape({
  }).isRequired,
};


// function SearchRequest() {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <MainSearchRequest />
//     </MuiThemeProvider>
//   );
// }


const mapStateToProps = (state) => {
  return {
    books: state.books,
    auth: state.auth,
    workerId: state.workerId
  }
}


export default connect(mapStateToProps,)  (SearchRequest);
