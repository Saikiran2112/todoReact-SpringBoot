import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../security/AuthContext";
function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const { user,tok} = useContext(AuthContext);
  const navigate = useNavigate();
  function fetchTodos() {
    axios
      .get(`http://localhost:8080/users/${user}/todos`,{
        headers:{
            Authorization:tok
        }
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchTodos();
  }, []);
  function deleteTodo(id) {
    axios
      .delete(`http://localhost:8080/users/${user}/todos/${id}`,{
        headers:{
            Authorization:tok
        }
      })
      .then((response) => {
        console.log(response);
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function updateTodo(id) {
    navigate(`/todo/${id}`);
  }
  function handleClick() {
    navigate(`/todo/-1`);
  }

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Description</td>
              <td>Is Done?</td>
              <td>TargetDate</td>
              <td>Delete</td>
              <td>Update</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateTodo(todo.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-success m-5" onClick={handleClick}>
        Add Todo
      </button>
    </div>
  );
}

export default ListTodosComponent;
