import React, { Component } from 'react'
import Mice from '../imports/mice'
import Voter from './Voter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'


class MiceList extends Component {

  filterCount = index => {
    const {count} = this.props 
    const obj = count.find(vote => vote.id === index.toString())
    return obj && obj.vote ? obj.vote : '0'

  }

  render() {
    const {count} = this.props 
    const obj = count.find(vote => vote.id === '19')
    console.log(obj && obj.vote ? obj.vote : "This sucks")
    const columns = [
      {
        Header: "Brand",
        accessor: "Brand"
      },
      {
        Header: "Model",
        accessor: "Model"
      },
      {
        Header: "Sensor",
        accessor: "Sensor"
      },
      {
        Header: "Switch Type",
        accessor: "Switch Type",
        filterable: false
      },
      {
        Header: "Weight",
        accessor: "Weight",
        filterable: false
      },
      {
        Header: "Form Factor",
        accessor: "Form Factor",
        filterable: false
      },
      {
        Header: "Dimensions",
        columns: [
          {
            Header: "Length",
            accessor: "Length",
            filterable: false
          },
          {
            Header: "Width",
            accessor: "Width",
            filterable: false
          },
          {
            Header: "Height",
            accessor: "Height",
            filterable: false
          }
        ]
      },
      {
        Header: "Votes",
        accessor: "Voter",
        filterable: false,
        Cell: row => <Voter id={row.index} vote={this.filterCount(row.index)}/>
      },
    ]
    return (
      <ReactTable
        data={Mice}
        columns={columns}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
      >
      </ReactTable>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.firestore.ordered.count ? state.firestore.ordered.count : []
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'count' }])
)(MiceList)
