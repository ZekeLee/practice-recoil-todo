import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FormBox = styled.div`
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

const Error = styled.p`
  margin-top: 0.5rem;
  color: red;
`;

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { text: toDo, id: Date.now(), category },
      ...prevToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <>
      <FormBox>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            type="text"
            {...register('toDo', {
              required: 'Please write a to do',
              minLength: {
                value: 5,
                message: 'At least 5 characters',
              },
              maxLength: {
                value: 30,
                message: 'Less than 30 characters',
              },
            })}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
        <Error>{errors.toDo ? errors.toDo?.message : null}</Error>
      </FormBox>
    </>
  );
};

export default CreateToDo;
