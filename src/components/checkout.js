import React, {PropTypes} from 'react';
import {getCardList, checkout} from '../actions/cardAction'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox'
import { connect } from 'react-redux'
import 'typeface-roboto'

import CheckoutClient from './checkoutClient'
import {cleanBooks} from '../actions/cleanup'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const styleSheet = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export class Checkout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// books: [],
      selected: [],
      checkoutBtnDisabled: true,
      selectedAll: false,
      openDialog: false
		};



	}

	componentDidMount() {
    console.log("checkout: auth=", this.props.auth)
    if (!this.props.auth)
      this.context.router.history.push('/auth')

    console.log("componentDidMount", this)

    this.props.dispatch(getCardList(this.props.workerId))
	}

  componentWillReceiveProps(nextProps) {
    console.log("auth: ", this.props.auth)
    console.log("nextProps: ", nextProps)
    if (!nextProps.auth) {
      console.log("go to /auth")
      this.context.router.history.push('/auth')
    }
  }

  _onChangeRaiseButton (element, value) {



    this.setState({openDialog: true})

  //   console.log("selected values", this.state.selected)
  //
  // let queryArray = this.state.selected.map (el => {
  //   return {instance_id: el}
  // })
  //
  // let queryJson = JSON.stringify(queryArray)
  //
  // console.log('query log', queryJson)
  //
  // this.props.dispatch(checkout(queryJson))
  //
  // this.setState({selected: [], checkoutBtnDisabled: true, selectedAll: false})




  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick(event, id) {
    console.log("id", id)
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


    let checkoutBtn = true
    if (newArray.length > 0) {
      checkoutBtn = false
    }

    let selectedAll = this.state.selectedAll
    if (selectedAll)
      selectedAll = !selectedAll


    this.setState({selected: newArray, checkoutBtnDisabled: checkoutBtn, selectedAll: selectedAll})




    console.log("selected", this.state.selected)

  }


  _onSelectAll(event) {
    let selectedAll = !this.state.selectedAll

    let selected = []

    let checkBtn = true
    if (selectedAll) {
      let newArray = this.props.books.map(el => {
        return el.instance_id
      })
      if (newArray.length > 0)
        checkBtn = false
      selected = newArray

    } else {
      checkBtn = true
    }

    console.log("selectedAll:", selectedAll )
    this.setState({selectedAll: selectedAll, selected: selected, checkoutBtnDisabled: checkBtn})
  }

clientHandler(clientId) {

    console.log("selected values", this.state.selected)

  let queryArray = this.state.selected.map (el => {
    return {instance_id: el}
  })

  let queryJson = JSON.stringify(queryArray)

  console.log('query log', queryJson)

  this.props.dispatch(checkout(this.props.workerId, clientId, queryJson))

  this.setState({selected: [], checkoutBtnDisabled: true, selectedAll: false, openDialog: false})

}


cancelClientHandler() {
  this.setState({openDialog: false})

}

componentWillUnmount() {
  // console.log(wil)
  this.props.dispatch(cleanBooks())
}

render() {

  console.log("checkout render", this)
  const classes = this.props.classes;




	return (
		<div style={styleSheet.container}>
			<div className="table__header">
        <Button raised disabled={this.state.checkoutBtnDisabled} onClick={this._onChangeRaiseButton.bind(this)} >checkout</Button>
				<div>
          <Table>
            <TableHead>
              <TableRow role="checkbox" onClick={this._onSelectAll.bind(this)} >
              {/* <TableRow role="checkbox"> */}
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

            <CheckoutClient
                open={this.state.openDialog}
                okHandler={this.clientHandler.bind(this)}
                cancelHandler={this.cancelClientHandler.bind(this)}
              />


				</div>
			</div>




		</div>
	);
}
}

Checkout.contextTypes = {
  	router: PropTypes.shape({
  }).isRequired
};


const mapStateToProps = (state) => {

  console.log("state", state.books)
  return {
    books: state.books,
    auth: state.auth,
    workerId: state.workerId
  }
}


export default connect(mapStateToProps,)  (Checkout);
