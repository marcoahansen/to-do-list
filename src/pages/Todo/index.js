import { useParams, useLocation } from "react-router-dom";

const Todo = () => {
  const { id } = useParams();
  const { state } = useLocation();

  console.log(id, state.item);

  return (
    <div>
      <h1>Tarefa para editar</h1>
    </div>
  );
};

export default Todo;
