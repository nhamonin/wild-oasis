import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo onClick={() => navigate('/')}>
      <Img src={`/logo-${isDarkMode ? 'dark' : 'light'}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
