import { useState } from "react";
import ToDoList from "./TodoList";

function Todo() {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("Posts")) || "",
  );
  const [description, setDescription] = useState();
  localStorage.setItem("Posts", JSON.stringify(posts));

  const addNewPost = (desc) => {
    if (desc) {
      const newTask = {
        id: +new Date() + Math.random(),
        text: desc,
        complete: false,
      };
      setPosts([...posts, newTask]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPost(description);
    setDescription("");
  };

  const removeTask = (id) => {
    setPosts([...posts.filter((todo) => todo.id !== id)]);
  };

  const removeCheckbox = () => {
    const checkbox = posts.filter((todo) => !todo.complete);
    setPosts(checkbox);
  };

  const checkedTask = (id) => {
    const checked = posts.map((todo) =>
      id === todo.id ? { ...todo, complete: !todo.complete } : todo,
    );
    setPosts(checked);
  };

  return (
    <div className="todo">
      <h1 className="todo__title">Todo List</h1>
      <div className="todo__menu">
        <form className="todo__form" onSubmit={handleSubmit}>
          <input
            className="todo__input"
            type="text"
            placeholder="Добавить пункт..."
            value={description}
            title="Доступна кириллица, латинские буквы, цифры."
            onChange={(e) => setDescription(e.currentTarget.value)}></input>
          <button className="todo__btn">Добавить</button>
        </form>
        {posts.length ? <hr /> : ""}
        {posts.map((todo) => {
          return (
            <ToDoList
              key={todo.id}
              todo={todo}
              removeTask={removeTask}
              checkedTask={checkedTask}
            />
          );
        })}
        {posts.length ? (
          <div className="todo__delete">
            <button className="todo__deleteCheckbox" onClick={removeCheckbox}>
              Удалить завершенные
            </button>
            <button className="todo__deleteAll" onClick={() => setPosts([])}>
              Удалить все
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Todo;
