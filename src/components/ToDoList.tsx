import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector, Categories } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setCategory(value as Categories);
  };

  return (
    <div>
      <select onInput={onInput} value={category}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default ToDoList;
