import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    // Set `this` object context to reffer current object
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    // Set initial values for states
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [], // List of all registered users
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/exercises/${this.props.match.params.id}`)
      .then(res => {
        const { username, description, duration, date } = res.data;
        this.setState({
          username,
          description,
          duration,
          date: new Date(date),
        });
      })
      .catch(err => console.log(err));
    // Get all registed users
    axios
      .get("http://localhost:4000/users/")
      .then(res => {
        if (res.data.length > 0)
          this.setState({
            users: res.data.map(user => user.username),
          });
      })
      .catch(err => console.error(err));
  }

  // Change the states when input field's value is changed
  onChangeUsername = e => this.setState({ username: e.target.value });
  onChangeDescription = e => this.setState({ description: e.target.value });
  onChangeDuration = e => this.setState({ duration: Number(e.target.value) });
  onChangeDate = date => this.setState({ date });

  // Prevent form submission
  onFormSubmit = e => {
    e.preventDefault();
    // Get the data from state
    const { username, description, duration, date } = this.state;
    // Create an object for holding values
    const exercise = { username, description, duration, date };
    console.log(exercise); // Print the object on console
    // Send the data to our backend API
    axios
      .post(
        `http://localhost:4000/exercises/${this.props.match.params.id}/update`,
        exercise,
      )
      .then(({ data }) => {
        console.log(data);
        window.location = "/"; // Redirect to homepage
      })
      .catch(err => console.error(err));
  };

  heading_style = {
    fontSize: "28px",
  };

  render() {
    return (
      <div className="form bg-light w-50 mx-auto mt-5 py-4 px-3 border rounded">
        <h1 className="lead text-center mb-3" style={this.heading_style}>
          Edit exercise log
        </h1>
        <form onSubmit={this.onFormSubmit}>
          {/* Exercise User */}
          <div className="form-group">
            <select
              required
              className="form-control"
              onChange={this.onChangeUsername}
              defaultValue=":disabled"
            >
              <option value=":disabled" disabled>
                Select a user
              </option>
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Exercise Description */}
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder="Enter exercise description"
            />
          </div>
          {/* Exercise Duration */}
          <div className="form-group">
            <input
              required
              type="number"
              className="form-control"
              value={String(this.state.duration)}
              onChange={this.onChangeDuration}
              placeholder="Enter exercise duration"
            />
          </div>
          {/* Exercise Date */}
          <div className="form-group">
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          {/* Submit button */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Update Exercise Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
