import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector, Categories } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const SelectBox = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 5px;
  overflow: hidden;
  select {
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    width: 100%;
    font-weight: 500;
    background-color: ${(props) => props.theme.boxColor};
  }
  svg {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
  }
`;

const ToDos = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const Nothing = styled.p`
  text-align: center;
`;

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
    <main>
      <SelectBox>
        <select onInput={onInput} value={category}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <FontAwesomeIcon icon={faAngleDown} />
      </SelectBox>
      <CreateToDo />
      {toDos.length === 0 ? (
        <Nothing>Nothing to do 😭</Nothing>
      ) : (
        <ToDos>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDos>
      )}
    </main>
  );
};

export default ToDoList;
