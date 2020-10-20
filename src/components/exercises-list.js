import React, { Component } from "react"; // Support for JSX syntax
import { Link } from "react-router-dom"; // Router link component
import axios from "axios"; // For making async calls to backend API

// Internal component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>Edit</Link>
    </td>
    <td>
      <button
        className="btn btn-link p-0 mb-2"
        onClick={() => props.deleteExercise(props.exercise._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

// Main base component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    // Set `this` object context to reffer current object
    this.deleteExercise = this.deleteExercise.bind(this);
    // Set initial values for states
    this.state = {
      exercises: [], // List of all created exercises
    };
  }

  // Called when component is mounted
  componentDidMount() {
    // Retrieve list of all exercises from our backend API
    axios
      .get("http://localhost:4000/exercises/")
      .then(res =>
        this.setState({
          exercises: res.data,
        }),
      )
      .catch(err => console.error(err)); // Display the error on console
  }

  // Custom function for removing exercise data from both backend and front-end
  deleteExercise(id) {
    axios
      .delete(`http://localhost:4000/exercises/${id}`)
      .then(res => {
        console.log(res.data);
        // Remove exercise from state
        this.setState({
          // TODO: Fix bug where table does not update when exercise is deleted
          exercises: this.state.exercises.filter(e => e.id !== id),
        });
      })
      .catch(err => console.error(err));
  }

  // Custom function for creating decleared internal component `Exercise` and passing props to it
  exerciseList() {
    return this.state.exercises.map((exercise, index) => {
      return (
        <Exercise
          index={index}
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          key={exercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="display-4 text-center">Logged Exercises</h3>
        <table className="table table-hover text-center w-50 mx-auto mt-5">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col" colSpan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
