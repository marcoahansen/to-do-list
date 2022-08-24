import { useState, useEffect } from "react";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa";
import "./home.css";

function Home() {
  const [idToDo, setIdToDo] = useState(0);

  const [toDos, setToDos] = useState([]);

  const [input, setInput] = useState("");

  const [editToDo, setEditToDo] = useState(null);

  const [editToDoText, setEditToDoText] = useState("");

  useEffect(() => {
    const toDosStorage = localStorage.getItem("toDos");

    if (toDosStorage) {
      setToDos(JSON.parse(toDosStorage));
    }
  }, []);

  useEffect(() => {
    if (toDos.length > 0) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }
  }, [toDos]);

  function addToDo() {
    setToDos([...toDos, { id: idToDo, value: input, status: false }]);
    setInput("");
    setIdToDo((prev) => prev + 1);
  }

  function toggleStatus(id) {
    let toDosArrayUpdate = [...toDos].map((toDo) => {
      if (toDo.id === id) {
        toDo.status = !toDo.status;
        console.log(toDo.status);
      }
      return toDo;
    });
    setToDos(toDosArrayUpdate);
  }

  function submitEditToDo(id) {
    const updatedTodos = [...toDos].map((toDo) => {
      if (toDo.id === id) {
        toDo.value = editToDoText;
      }
      return toDo;
    });
    setToDos(updatedTodos);
    setEditToDo(null);
  }

  function deleteToDo(index) {
    let toDosArray = [...toDos];
    toDosArray.splice(index, 1);
    setToDos(toDosArray);
  }

  return (
    <div className="all-todos-list">
      <div className="todos-list-container todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" disabled={!input} onClick={addToDo}>
          +
        </button>
      </div>
      <ul>
        {toDos.map((toDo, index) => (
          <li
            className={
              toDo.status
                ? "todos-list todos-list-container completed"
                : "todos-list todos-list-container"
            }
            key={toDo.id}
          >
            <label className="toggler-wrapper style-9">
              <input
                type="checkbox"
                id="status"
                checked={toDo.status}
                onChange={() => toggleStatus(toDo.id)}
              />
              <div className="toggler-slider">
                <div className="toggler-knob"></div>
              </div>
            </label>
            <div className="todo-text">
              {toDo.id === editToDo ? (
                <input
                  type="text"
                  placeholder={toDo.value}
                  onChange={(e) => setEditToDoText(e.target.value)}
                />
              ) : (
                <div>{toDo.value}</div>
              )}
            </div>
            <div className="buttons">
              {toDo.id === editToDo ? (
                <button
                  className="button-todo"
                  disabled={!editToDoText}
                  onClick={() => submitEditToDo(toDo.id)}
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  className="button-todo"
                  onClick={() => setEditToDo(toDo.id)}
                >
                  <VscEdit />
                </button>
              )}
              <button className="button-todo" onClick={() => deleteToDo(index)}>
                <VscTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
