import { useRecoilValue } from 'recoil';
import { toDoState } from '../atoms';
import ToDo from './ToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
