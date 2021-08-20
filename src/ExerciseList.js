import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import './exercise-list.css';

const Exercise = (props) => {
  return <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link className='i-am-link' to={'/update/' + props.exercise._id}>{'   edit  '}</Link> |<Link className='i-am-link' to='/exercises' onClick={() => props.deleteExercise(props.exercise._id)}>{"  delete  "}</Link>
    </td>
  </tr>
}

export class ExerciseList extends Component {

  constructor(props){
    super(props);

    this.state = {
      exercises : []
    }

    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:5000/exercises")
    .then(res => {
      this.setState({
        exercises : res.data
      })
    }).catch(err => console.log(err));
  }

  deleteExercise(id){
    axios.delete("http://localhost:5000/exercises/"+id).then(res => console.log(res.data)).catch(err => console.log(err));
    this.setState({
      exercises : this.state.exercises.filter(ex => ex._id !== id)
    })
  }

  exerciseList(){
    return this.state.exercises.map(currexercise => {
      return <Exercise exercise={currexercise} deleteExercise={this.deleteExercise} key={currexercise._id}/>
    })
  }

  render() {
    return <div className="exercise-list">
      <p className='title-exercise-list'>Exercise List</p>
      <table id='exercises'>
        <thead>
          <td>Username</td>
          <td>Description</td>
          <td>Duration</td>
          <td>Date</td>
          <td>Actions</td>
        </thead>
        <tbody>
          {this.exerciseList()}
        </tbody>
      </table>
    </div>;
  }
}

export default ExerciseList;
