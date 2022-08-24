import React from "react";
import { useState, useEffect } from "react";
import { VscTrash, VscEdit } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa";
import "./home.css";
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";

function Home() {
  const [idToDo, setIdToDo] = useState();

  const [toDos, setToDos] = useState([]);

  const [input, setInput] = useState("");

  const [editToDo, setEditToDo] = useState(null);

  const [editToDoText, setEditToDoText] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);

  // const handleConfirmOpen = () => {
  //     setConfirmOpen(true)
  // }
  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  useEffect(() => {
    const toDosStorage = localStorage.getItem("toDos");

    if (toDosStorage) {
      setToDos(JSON.parse(toDosStorage));
    }
  }, []);

  useEffect(() => {
    if (toDos.length > 0) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }else{
      localStorage.clear();
    }
  }, [toDos]);

  useEffect(() =>{
    if(editToDo != null){
      setEditToDoText(editToDo.value);
    }
  },[editToDo])

  function addToDo() {
    setToDos([...toDos, { id: Date.now(), value: input, status: false }]);
    setInput("");
  }

  function toggleStatus(id) {
    let updatedTodos = [...toDos].map((toDo) => {
      if (toDo.id === id) {
        toDo.status = !toDo.status;
        console.log(toDo.status);
      }
      return toDo;
    });
    setToDos(updatedTodos);
  }

  function submitEditToDo(id) {
    let updatedTodos = [...toDos].map((toDo) => {
      if (toDo.id === id) {
        toDo.value = editToDoText;
      }
      return toDo;
    });
    setToDos(updatedTodos);
    setEditToDo(null);
  }

  function confirmDelete(id) {
    setIdToDo(id);
    setConfirmOpen(true);
  }

  function deleteToDo(id) {
    let updatedTodos = toDos.filter((toDo) => toDo.id !== id);
    console.log(updatedTodos);
    setToDos(updatedTodos);
    setConfirmOpen(false);
    setIdToDo();
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
        {toDos.map((toDo) => (
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
              {editToDo && toDo.id === editToDo.id ? (
                <input
                  type="text"
                  value={editToDoText}
                  onChange={(e) => setEditToDoText(e.target.value)}
                />
              ) : (
                <div>{toDo.value}</div>
              )}
            </div>
            <div className="buttons">
              {editToDo && toDo.id === editToDo.id ? (
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
                  onClick={() => setEditToDo({id: toDo.id, value: toDo.value})}
                >
                  <VscEdit />
                </button>
              )}
              <button
                className="button-todo"
                onClick={() => confirmDelete(toDo.id)}
              >
                <VscTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        keepMounted
        aria-describedby="alert-dialog-slide"
      >
        <DialogTitle>{"Deseja excluir essa tarefa?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Não</Button>
          <Button onClick={() => deleteToDo(idToDo)}>Sim</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
