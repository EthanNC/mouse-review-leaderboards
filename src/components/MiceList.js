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
    const obj = count.find(doc => doc.id === index.toString())
    return obj && obj.vote ? obj.vote : '0'

  }

  render() {
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
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
          return row[id] !== undefined
              ? String(row[id]).includes(filter.value)
              : true;
      }}
      >
      </ReactTable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  count: state.firestore.ordered.count ? state.firestore.ordered.count : []
}}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'count' }])
)(MiceList)
