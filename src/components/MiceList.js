import React, { Component } from 'react'
import Mice from  '../imports/mice'
import Voter from './Voter'

class MiceList extends Component {
  render() {
    const rows = Mice.map((mouseDetail, i) => {
      return (
        <tr className="text-primary" key={i}>
          <td><Voter id={i}/></td>
          <td>{mouseDetail.Brand}</td>
          <td>{mouseDetail.Model}</td>
          <td>{mouseDetail.Sensor}</td>
          <td>{mouseDetail["Switch Type"]}</td>
          <td>{mouseDetail.Weight}</td>
          <td>
            {mouseDetail.Length}/{mouseDetail.Width}/{mouseDetail.Height}
          </td>
          <td>{mouseDetail["Form Factor"]}</td>
        </tr>
      );
    });
    return (
      <div className="container table-responsive">
        <h2 className="text-primary">Mouse Table</h2>
        <table className="table table-bordered table-secondary">
          <thead className="text-primary table-">
            <tr>
              <th>Vote</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Sensor</th>
              <th>Switch Type</th>
              <th>Weight</th>
              <th>Len/Wid/Hei</th>
              <th>Form Factor</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <br />
      </div>
    );
  }
}

export default MiceList
