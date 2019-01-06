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
