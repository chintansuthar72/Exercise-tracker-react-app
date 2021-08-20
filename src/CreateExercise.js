import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './create-exercise.css'

export class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:5000/users/")
    .then(res => {
      if(res.data.length > 0){
        this.setState({
          users : res.data.map(user => user.username),
          username : res.data[0].username
        })
      }
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios.post("http://localhost:5000/exercises/add",exercise).then(res => console.log(res)).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="create-exercise">
        <p className='title-create-exercise'>Create New Exercise</p>
        <form onSubmit={this.onSubmit}>
          <div className="username-exercise">
            <label>Username : </label>
            <select className='select'
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => { 
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="description">
            <label>Description : </label>
            <input
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="duration">
            <label>Duration (in min) : </label>
            <input
              type="text"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="date" style={{display:'flex'}}>
            <label>Date:</label>
              <DatePicker className='datepicker'
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
          </div>
          <div className="submit">
            <input type="submit" value="Create Exercise" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
