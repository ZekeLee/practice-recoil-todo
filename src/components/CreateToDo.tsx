import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { text: toDo, id: Date.now(), category: 'TO_DO' },
      ...prevToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        type="text"
        {...register('toDo', {
          required: 'Please write a to do',
        })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateToDo;
