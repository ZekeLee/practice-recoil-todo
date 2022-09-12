import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector, categoriesState } from '../atoms';
import { useForm } from 'react-hook-form';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';

const FormBox = styled.form`
  form {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    overflow: hidden;
    input {
      flex-grow: 1;
      padding: 0.5rem;
      background-color: ${(props) => props.theme.boxColor};
    }
    button {
      padding: 0.5rem;
      font-size: 1rem;
      color: #fff;
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

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
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit } = useForm();

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setCategory(value);
  };

  const onValid = (data: any) => {
    setCategories([...categories, data.category]);
  };

  return (
    <main>
      <section>
        <FormBox onSubmit={handleSubmit(onValid)}>
          <Title>Add Category</Title>
          <form>
            <input type="text" {...register('category')} />
            <button type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
        </FormBox>
      </section>
      <section>
        <Title>Select Category</Title>
        <SelectBox>
          <select onInput={onInput} value={category}>
            {categories.map((cate, index) => (
              <option key={index}>{cate}</option>
            ))}
          </select>
          <FontAwesomeIcon icon={faAngleDown} />
        </SelectBox>
      </section>
      <section>
        <Title>Add Todo</Title>
        <CreateToDo />
      </section>
      <section>
        {toDos.length === 0 ? (
          <Nothing>Nothing to do 😭</Nothing>
        ) : (
          <ToDos>
            {toDos?.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ToDos>
        )}
      </section>
    </main>
  );
};

export default ToDoList;
