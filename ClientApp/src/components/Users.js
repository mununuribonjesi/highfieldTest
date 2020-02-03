import React, { Component } from 'react';


export class Users extends Component {
  static displayName = Users.name;

  constructor (props) {
    super(props);
    this.state = { users: [], loading: true };

    fetch('api/Home/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data, loading: false });
      });
  }

  static renderUsersTable (users) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
                    <th>DOB</th>
                    <th>FavouriteColour</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
              <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>{user.favouriteColour}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Users.renderUsersTable(this.state.users);

    return (
      <div>
        <h1>Highfield Users</h1>
        {contents}
      </div>
    );
  }
}
