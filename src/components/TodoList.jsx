import krest from "../img/deleteIcon.png";

function TodoList({ todo, removeTask, checkedTask }) {
  return (
    <div className="todo__list">
      <input
        type="checkbox"
        className="todo__checkbox"
        onClick={() => checkedTask(todo.id)}
      />
      <span>{todo.text}</span>
      <button
        className="todo__list--active"
        onClick={() => removeTask(todo.id)}>
        <img src={krest} />
      </button>
    </div>
  );
}

export default TodoList;
