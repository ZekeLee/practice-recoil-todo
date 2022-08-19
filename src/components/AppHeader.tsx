import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Toggle = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 50%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const AppHeader = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Header>
      <Toggle onClick={toggleMode}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </Toggle>
      <Title>TO DOS</Title>
    </Header>
  );
};

export default AppHeader;
