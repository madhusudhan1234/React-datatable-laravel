import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ users: data.data });
      });
  }

  userList() {
    return this.state.users.map(user => {
      return <tr key={ user.id }>
        <td>{ user.id }</td>
        <td>{ user.name }</td>
        <td>{ user.email }</td>
        <td>{ user.address }</td>
        <td>{ user.created_at }</td>
      </tr>
    })
  }

  render() {
    return (
      <div className="data-table">
        <table className="table">
          <thead>
            <tr>
              <th className="table-head">#</th>
              <th className="table-head">Name</th>
              <th className="table-head">Email</th>
              <th className="table-head">Address</th>
              <th className="table-head">Created At</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    );
  }
}

if (document.getElementById('datatable')) {
  ReactDOM.render(<DataTable />, document.getElementById('datatable'));
}
