import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        data: [],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 5,
          to: 1,
          total: 1,
        },
      },
      first_page: 1,
      current_page: 1,
      sorted_column: 'name',
      offset: 4,
      order: 'asc',
      columns: ['id', 'name', 'email', 'address', 'created_at'],
    }
  }

  fetchUsers() {
    let fetchUrl = `/api/users/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.users.meta.per_page}`;
    fetch(fetchUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ users: data });
      })
      .catch(e => {
        console.error(e);
      });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {this.fetchUsers()});
  }

  pagesNumbers() {
    if (!this.state.users.meta.to) {
      return [];
    }
    let from = this.state.users.meta.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.state.users.meta.last_page) {
      to = this.state.users.meta.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  componentDidMount() {
    this.setState({ current_page: this.state.users.meta.current_page }, () => {this.fetchUsers()});
  }

  tableHeads() {
    let icon;
    if (this.state.order === 'asc') {
      icon = <i className="fas fa-arrow-up"></i>;
    } else {
      icon = <i className="fas fa-arrow-down"></i>;
    }
    return this.state.columns.map(column => {
      return <th className="table-head" key={column} onClick={() => this.sortByColumn(column)}>
        { column }
        { column === this.state.sorted_column && icon }
      </th>
    });
  }

  userList() {
    if (this.state.users.data.length) {
      return this.state.users.data.map(user => {
        return <tr key={ user.id }>
          <td>{ user.id }</td>
          <td>{ user.name }</td>
          <td>{ user.email }</td>
          <td>{ user.address }</td>
          <td>{ user.created_at }</td>
        </tr>
      })
    } else {
      return <tr>
        <td colSpan={this.state.columns.length} className="text-center">No Records Found.</td>
      </tr>
    }
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === 'asc' ? this.setState({ order: 'desc', current_page: this.state.first_page }, () => {this.fetchUsers()}) : this.setState({ order: 'asc' }, () => {this.fetchUsers()});
    } else {
      this.setState({ sorted_column: column, order: 'asc', current_page: this.state.first_page }, () => {this.fetchUsers()});
    }
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.state.users.meta.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  render() {
    return (
      <div className="data-table">
        <table className="table table-bordered">
          <thead>
            <tr>{ this.tableHeads() }</tr>
          </thead>
          <tbody>{ this.userList() }</tbody>
        </table>
        { (this.state.users.data && this.state.users.data.length > 0) &&
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link"
                  disabled={ 1 === this.state.users.meta.current_page }
                  onClick={() => this.changePage(this.state.users.meta.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              { this.pageList() }
              <li className="page-item">
                <button className="page-link"
                  disabled={this.state.users.meta.last_page === this.state.users.meta.current_page}
                  onClick={() => this.changePage(this.state.users.meta.current_page + 1)}
                >
                  Next
                </button>
              </li>
              <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying { this.state.users.data.length } of { this.state.users.meta.total } entries.</i></span>
            </ul>
          </nav>
        }
      </div>
    );
  }
}

if (document.getElementById('datatable')) {
  ReactDOM.render(<DataTable />, document.getElementById('datatable'));
}
