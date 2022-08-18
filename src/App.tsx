import CreateToDo from './components/CreateToDo';
import ToDoList from './components/ToDoList';
import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <CreateToDo />
      <ToDoList />
    </>
  );
};

export default App;
