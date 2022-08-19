import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onChangeState = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories };
      const newToDos = [...prevToDos];
      newToDos.splice(targetIndex, 1, newToDo);

      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button type="button" name="TO_DO" onClick={onChangeState}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button type="button" name="DOING" onClick={onChangeState}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button type="button" name="DONE" onClick={onChangeState}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
