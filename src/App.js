import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/Addtodo";
import About from "./components/pages/About";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  //Delete Todo

  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos].filter((todo) => todo.id !== id),
        })
      );
  };

  //Toggle Completed To One

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Toggle Completed To All

  checkAll = () => {
    const { todos } = this.state;
    const checkCompleted = todos.every((todo) => todo.completed === true);
    this.setState({
      todos: this.state.todos.map((todo) => {
        checkCompleted ? (todo.completed = false) : (todo.completed = true);
        return todo;
      }),
    });
  };

  //Add Todo

  addTodo = (title) => {
    if (title) {
      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed: false,
        })
        .then((res) =>
          this.setState({
            todos: [...this.state.todos, res.data],
          })
        );
    } else {
      alert("Todo can not be empty!");
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} checkAll={this.checkAll} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
