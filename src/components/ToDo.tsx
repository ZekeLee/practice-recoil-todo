import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faCheck,
  faHourglass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  span {
    flex-grow: 1;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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

  const removeToDo = () => {
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((todo) => todo.id === id);
      const newToDos = [...prevToDos];
      newToDos.splice(targetIndex, 1);

      return newToDos;
    });
  };

  return (
    <Item>
      📌
      <span>{text}</span>
      <ButtonBox>
        {category !== Categories.TO_DO && (
          <button type="button" name="TO_DO" onClick={onChangeState}>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </button>
        )}
        {category !== Categories.DOING && (
          <button type="button" name="DOING" onClick={onChangeState}>
            <FontAwesomeIcon icon={faHourglass} />
          </button>
        )}
        {category !== Categories.DONE && (
          <button type="button" name="DONE" onClick={onChangeState}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
        <button type="button" onClick={removeToDo}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </ButtonBox>
    </Item>
  );
};

export default ToDo;
