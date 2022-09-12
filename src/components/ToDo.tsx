import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, IToDo, toDoState } from '../atoms';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  span {
    flex-grow: 1;
  }
`;

const CategoryTab = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const Tab = styled.button.attrs({ type: 'button' })<{ disabled: boolean }>`
  padding: 0.5rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 5px;
  display: ${(props) => (props.disabled ? 'none' : 'block')};
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  div {
    display: flex;
    gap: 0.5rem;
  }
`;

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const onChangeState = (category: string) => {
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category };
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
      <TextWrap>
        <div>
          📌
          <span>{text}</span>
        </div>
        <button type="button" onClick={removeToDo}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </TextWrap>
      <CategoryTab>
        {Object.values(categories).map((cate) => (
          <Tab
            key={cate}
            disabled={cate === category}
            onClick={() => onChangeState(cate)}
          >
            {cate}
          </Tab>
        ))}
      </CategoryTab>
    </Item>
  );
};

export default ToDo;
