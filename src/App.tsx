import ToDoList from './components/ToDoList';
import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <h1>To Dos</h1>
      <ToDoList />
    </>
  );
};

export default App;
