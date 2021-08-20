import React, { Component } from "react";
import axios from "axios";
import './create-user.css';

export class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username : this.state.username
    };

    axios.post("http://localhost:5000/users/add",user).then(res => console.log(res)).catch(err => console.log(err));

    this.setState({
      username : "",
    })
  }

  render() {
    return <div className="create-user">
      <p className='title-create-user'>Create User</p>
      <form className='user-form' onSubmit={this.onSubmit}>
        <div className="username">
          <label>Username : </label>
          <input type="text" value={this.state.username} onChange={this.onChangeUsername}/>
        </div>
        <div className="submit">
          <input type="submit" value="Create User" />
        </div>
      </form>
    </div>;
  }
}

export default CreateUser;
