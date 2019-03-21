import React, { Component } from 'react'
import Mice from  '../imports/mice'
import Voter from './Voter'
import {Table} from 'semantic-ui-react'

class MiceList extends Component {
  render() {
    const rows = Mice.map((mouseDetail, i) => {
      return (
        <Table.Row className="text-primary" key={i}>
          <Table.Cell><Voter id={i}/></Table.Cell>
          <Table.Cell>{mouseDetail.Brand}</Table.Cell>
          <Table.Cell>{mouseDetail.Model}</Table.Cell>
          <Table.Cell>{mouseDetail.Sensor}</Table.Cell>
          <Table.Cell>{mouseDetail["Switch Type"]}</Table.Cell>
          <Table.Cell>{mouseDetail.Weight}</Table.Cell>
          <Table.Cell>
            {mouseDetail.Length}/{mouseDetail.Width.HeaderCell}/{mouseDetail.Height}
          </Table.Cell>
          <Table.Cell>{mouseDetail["Form Factor"]}</Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div className="container Table-responsive">
        <h2 className="text-primary">Mouse Table</h2>
        <Table sortable className="Table Table-bordered Table-secondary">
          <Table.Header className="text-primary Table-">
            <Table.Row>
              <Table.HeaderCell>Vote</Table.HeaderCell>
              <Table.HeaderCell>Brand</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Sensor</Table.HeaderCell>
              <Table.HeaderCell>Switch Type</Table.HeaderCell>
              <Table.HeaderCell>Weight</Table.HeaderCell>
              <Table.HeaderCell>Len/Wid/Hei</Table.HeaderCell>
              <Table.HeaderCell>Form Factor</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
        <br />
      </div>
    );
  }
}

export default MiceList
