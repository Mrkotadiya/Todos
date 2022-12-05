import React, { useState,useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import "./SingleTodo.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit =(e:React.FormEvent,id: number) => {
      e.preventDefault();
      setTodos(todos.map((todo) =>(todo.id === id ? {...todo,todo:editTodo} : todo)));
      setEdit(false);
  }

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
      inputRef.current?.focus();
  },[edit])

  return (
    <form className="singleTodo" onSubmit={(e)=>{handleEdit(e,todo.id)}}>
      {edit ? (
        <input
        ref={inputRef}
          className="singleTodoText"
          value={editTodo}
          onChange={(e) => {
            setEditTodo(e.target.value);
          }}
        />
      ) : todo.isDone ? (
        <s className="singleTodoText">{todo.todo}</s>
      ) : (
        <span className="singleTodoText">{todo.todo}</span>
      )}

      <span
        className="icon"
        onClick={() => {
          if (!edit && !todo.isDone) {
            setEdit(!edit);
          }
        }}
      >
        <AiFillEdit />
      </span>
      <span
        className="icon"
        onClick={() => {
          handleDelete(todo.id);
        }}
      >
        <MdDelete />
      </span>
      <span
        className="icon"
        onClick={() => {
          handleDone(todo.id);
        }}
      >
        <MdDone />
      </span>
    </form>
  );
};

export default SingleTodo;
