import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { withRouter } from 'react-router-dom';

class AddFriend extends React.Component {
  state = {
    newFriend: {
      id: Date.now(),
      name: '',
      age: '',
      email: '',
    },
    isFetching: false,
  };

  handleChange = e => {
    this.setState({
      newFriend: {
        ...this.state.newFriend,
        [e.target.name]: e.target.value,
      },
    });
  };

  addFriend = e => {
    e.preventDefault();
    this.setState({
      isFetching: true,
    });

    axiosWithAuth()
      .post('/friends', this.state.newFriend)
      .then(res => {
        console.log(this.props, 'prop');
        this.setState({ friends: [...res.data, res.data.payload] });
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addFriend}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.newFriend.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="age"
            placeholder="Age"
            value={this.state.newFriend.age}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.newFriend.email}
            onChange={this.handleChange}
          />

          <button>Add Friend</button>
          {this.state.isFetching && (
            <div className="key spinner">
              <p>Loading...</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default withRouter(AddFriend);
