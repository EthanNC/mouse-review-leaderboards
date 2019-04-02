import React, { Component } from 'react'
import Mice from '../imports/mice'
import Voter from './Voter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'


class MiceList extends Component {

  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll("div.rt-th > input");
      for (let filter of filters) {
        filter.placeholder = "Search..";
      }
    }
  
  componentDidMount() {
    this.addFilterPlaceholder();
  }

  filterCount = index => {
    const { count } = this.props
    const obj = count.find(doc => doc.id === index.toString())
    return obj && obj.vote ? obj.vote : '0'

  }

  render() {
    const columns = [
      {
        Header: "Votes",
        accessor: "Voter",
        maxWidth: 140,
        filterable: false,
        sortable: false,
        Cell: row => <Voter id={row.index} vote={this.filterCount(row.index)} />,
        
      },
      {
        Header:"ID",
        accessor: "Id",
        maxWidth:30,
        show: false,
        filterable: false,
        sortMethod: (a,b) => {
          a = (a === null || a === undefined || a === '') ? -Infinity : a;
            b = (b === null || b === undefined || b === '') ? -Infinity : b;

            a = parseInt(a);
            b = parseInt(b);
            if (a === b) {
              return 0;
            }
            return this.filterCount(a) > this.filterCount(b) ? 1 : -1;
        }
      },
      {
        Header: "Brand",
        accessor: "Brand",
        // Cell:  ({ row }) => <Link to={{pathname:`/mice/${row._index}`, state:{fromRow:row}}} key={row.index}>{row.Brand}</Link>
    
      },
      {
        Header: "Model",
        accessor: "Model",
        // Cell:  ({ row }) => <Link to={'/mice/' + row.Model} key={row.index}>{row.Model}</Link>
      },
      {
        Header: "Sensor",
        accessor: "Sensor",
        maxWidth:100,
        filterable: false
      },
      {
        Header: "Switches",
        accessor: "Switch Type",
        maxWidth:80,
        filterable: false
      },
      {
        Header: "Shape",
        accessor: "Form Factor",
        maxWidth:60,
        filterable: false
      },
      {
        Header: "Weight",
        accessor: "Weight",
        maxWidth:60,
        filterable: false
      },
      {
        Header: "Dimensions",
        columns: [
          {
            Header: "Length",
            accessor: "Length",
            maxWidth:60,
            filterable: false
          },
          {
            Header: "Width",
            accessor: "Width",
            maxWidth:60,
            filterable: false
          },
          {
            Header: "Height",
            accessor: "Height",
            maxWidth:60,
            filterable: false
          }
        ]
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
        defaultSorted={[
          {
            id: "Id",
            desc: true
          }
        ]}
      
      >
      </ReactTable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.firestore.ordered.count ? state.firestore.ordered.count : []
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'count' }])
)(MiceList)
