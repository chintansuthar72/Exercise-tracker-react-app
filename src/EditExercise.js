import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './edit-exercise.css'

export class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      ID : this.props.match.params.id
    };

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){

    axios.get("http://localhost:5000/exercises/"+this.state.ID)
    .then((res) => {
      this.setState({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
        users: [],
      })
    }).catch(err => console.log(err));
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
      username : this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    axios.post("http://localhost:5000/exercises/update/"+this.state.ID,exercise).then(res => console.log(res)).catch(err => console.log(err));

  }

  render() {
    return (
      <div className="edit-exercise">
        <p className="title-edit-exercise">Edit Exercise</p>
        <form onSubmit={this.onSubmit}>
          <div className="username-exercise">
            <label>Username : {this.state.username}</label>
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
            <label>Duration : </label>
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
            <input type="submit" value="Edit Exercise" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
