import React, { useState } from 'react';

const ToDoList = () => {
  const [toDo, setToDo] = useState('');
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setToDo(value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Wirte to do"
          value={toDo}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
