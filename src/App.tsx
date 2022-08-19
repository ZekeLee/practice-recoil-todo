import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
import AppHeader from './components/AppHeader';
import ToDoList from './components/ToDoList';

import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import GlobalStyle from './GlobalStyle';

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <AppHeader />
        <ToDoList />
      </ThemeProvider>
    </>
  );
};

export default App;
