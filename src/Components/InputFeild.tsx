import React, { useRef } from "react";
import "./InputFeild.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

// function InputFeild({todo,setTodo}:Props) {
const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        action=""
        className="inputForm"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          placeholder="Enter Text Here"
          className="inputFeild"
        />
        <button className="btnSubmit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default InputFeild;
