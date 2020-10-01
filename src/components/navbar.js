import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          ExerTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Exercises
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Add Exercise
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Add User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/* <nav className="navbar navbar-expanded-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Exercise Tracker
        </Link>
        <ul className="navbar-nav d-flex">
          <li className="nav-item d-inline-block">
            <Link to="/" className="nav-link">
              Exercises
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Add Exercise Log
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              Add User
            </Link>
          </li>
        </ul>
      </nav> */
