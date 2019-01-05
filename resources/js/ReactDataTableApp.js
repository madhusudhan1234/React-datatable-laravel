import ReactDOM from "react-dom";
import React, { Component } from "react";
import DataTable from "./components/DataTable";

export default class ReactDataTableApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = ['id', 'name', 'email', 'address', 'created_at'];
    return (
      <DataTable url="/api/users" columns={columns} />
    );
  }
}

if (document.getElementById('datatable')) {
    ReactDOM.render(<ReactDataTableApp />, document.getElementById('datatable'));
}
