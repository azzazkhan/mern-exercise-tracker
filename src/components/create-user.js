import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    // Set `this` object context to reffer current object
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    // Set initial values for states
    this.state = {
      username: "",
    };
  }

  // Change the states when input field's value is changed
  onChangeUsername = e => this.setState({ username: e.target.value });

  // Prevent form submission
  onFormSubmit = e => {
    e.preventDefault();
    // Create an object for holding values
    const user = { username: this.state.username };
    console.log(user); // Print the object on console
    // Send the data to backend API
    axios
      .post("http://localhost:4000/users/add", user)
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));

    this.setState({ username: "" });
  };

  heading_style = {
    fontSize: "28px",
  };

  render() {
    return (
      <div className="form bg-light w-50 mx-auto mt-5 py-4 px-3 border rounded">
        <h1 className="lead text-center mb-3" style={this.heading_style}>
          Create new user
        </h1>
        <form onSubmit={this.onFormSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder="Enter username"
            />
          </div>
          {/* Submit button */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Create User
            </button>
          </div>
        </form>
      </div>
    );
  }
}
