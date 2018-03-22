import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {getBooksList, returnBook, fetchClients} from '../actions/clientAction'
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const styleSheet ={
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export class ClientBookList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      returnBtnDisabled: true,
      selectedAll: false,
      inputField: "",
      selectedId: -1,
      searchBtnDisabled: true
    };

  }

  componentDidMount() {
    if (!this.props.auth)
      this.context.router.history.push('/auth')

    // this.props.dispatch(getBooksList())
  }


  _onChangeRaiseButton (element) {
    if (this.state.selectedId == -1 || this.state.selectedId == null)
      return

    console.log("selected values", this.state.selected)

    let queryArray = this.state.selected.map (el => {
      return {instance_id: el}
    })

    let queryJson = JSON.stringify(queryArray)

    console.log("queryJson ", queryJson)
    this.props.dispatch(returnBook(queryJson, this.state.selectedId))
    this.setState({selected: [], returnBtnDisabled: true, selectedAll: false})

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

    let returnBtn = true
    if (newArray.length > 0)
      returnBtn = false


      let selectedAll = this.state.selectedAll
      if (selectedAll)
        selectedAll = !selectedAll

    this.setState({selected: newArray, returnBtnDisabled: returnBtn, selectedAll: selectedAll})

  }



  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth) {
      this.context.router.history.push('/auth')
    }
  }



  _onSelectAll() {
    let selectedAll = !this.state.selectedAll
    let selected = []

    let retBtn = true
    if (selectedAll) {
      let newArray = this.props.books.map(el => {
        return el.instance_id
      })
      if (newArray.length > 0)
        retBtn = false
      selected = newArray

    } else {
      retBtn = true
    }

    this.setState({selectedAll: selectedAll, selected: selected, returnBtnDisabled: retBtn})
  }


  updateInput(event, value) {
    this.setState({inputField: event.target.value, searchBtnDisabled: false})
  }

  _searchBtn() {

    // return



    console.log("inputField = ", this.state.inputField)
    if (this.state.inputField === "") {
      // this.props.dispatch(fetchClients())
    } else {
      this.props.dispatch(getBooksList(this.state.inputField))
    }
    let id = parseInt(this.state.inputField, 10)
    this.setState({selectedId: id, searchBtnDisabled: true})

  }

  render() {
    console.log("ClientBookList render", this)
    const classes = this.props.classes;
    return (
      <div style={styleSheet.container}>
        <div className="table__header">

          <div>
            <TextField id="placeholder"
              label="Search"
              type="text"
              value={this.state.inputField}
              onChange={this.updateInput.bind(this)}
              helperText="enter client id"
              fullWidth={true}
              marginForm
            />
            <Button raised disabled={this.state.searchBtnDisabled} onClick={this._searchBtn.bind(this)}>search</Button>
            <Button raised disabled={this.state.returnBtnDisabled} onClick={this._onChangeRaiseButton.bind(this)} >return book</Button>
            <Table>
              <TableHead>
                <TableRow onClick={this._onSelectAll.bind(this)}>
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
        </div>

      </div>
    );
  }
}

ClientBookList.contextTypes = {
  router: PropTypes.shape({}).isRequired
};


const mapStateToProps = (state) => {
  return {
    books: state.books,
    auth: state.auth
  }
}

// function ClientBookList() {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <MainClientBookList />
//     </MuiThemeProvider>
//   );
// }


export default connect(mapStateToProps,)  (ClientBookList);
