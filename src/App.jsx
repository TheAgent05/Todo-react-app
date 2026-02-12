import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currText, setText] = useState("");
  // const [currId, setID] = useState();

  function log() {
    console.log(currText);
    console.log(todos);
  }

  function getText(input) {
    setText(input.target.value);
  }

  function checkId() {
    let newid = 1;

    while (todos.some((e) => newid === e.id)) {
      newid++;
    }

    return newid;
  }

  function add() {
    if (currText === "") return;
    setTodos([...todos, { id: checkId(), text: currText, isDone: false }]);
    setText("");
  }

  function deleteTask(id) {
    setTodos(todos.filter((arr) => arr.id !== id));
  }

  function completeTask(e, idTask) {
    const updTask = todos.map((arr) => {
      if (arr.id === idTask) {
        return { ...arr, isDone: e.target.checked };
      } else return arr;
    });

    setTodos(updTask);
  }

  return (
    <div className="main">
      <h1 onClick={log}>Todo App</h1>

      <div className="todoList">
        <ul>
          {todos.map((todo) => {
            return (
              <li className="task" key={todo.id}>
                <input
                  type="checkbox"
                  name="done"
                  id="checkDone"
                  className="doneBox"
                  onChange={(e) => completeTask(e, todo.id)}
                  checked={todo.isDone}
                />
                <span className={todo.isDone ? "done" : ""}>{todo.text}</span>
                <button type="button" onClick={() => deleteTask(todo.id)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="inputBox">
        <input
          type="text"
          name=""
          id=""
          onChange={getText}
          value={currText}
        ></input>
        <button type="button" onClick={add}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
