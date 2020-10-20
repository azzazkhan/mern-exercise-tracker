import React from "react"; // Support for JSX syntax
// React's router component; `Route` component is used to define slot for component
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing Bootstrap's styles and scripts
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

// Our custom components
import Navbar from "./components/navbar";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-3">
        {/* `Route` component is used to create a slot where specified component will be loaded. The `Route` componente will be replaced by the specified component. */}
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
