import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

import { useGeneralClose } from '../hooks/useGeneralClose';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  $position: {
    x: number;
    y: number;
  };
};

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: number;
  close: () => void;
  open: (id: number) => void;
  $position: { x: number; y: number };
  setPosition: ($position: { x: number; y: number }) => void;
};

const MenusContext = createContext<MenusContextType>({
  openId: 0,
  close: () => {},
  open: () => {},
  $position: { x: 0, y: 0 },
  setPosition: () => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<number>(0);
  const [$position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const close = () => setOpenId(0);
  const open = (id: number) => setOpenId(id);

  return (
    <MenusContext.Provider value={{ openId, close, open, $position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const target = e.target as Element;
    const buttonElement = target.closest('button');

    if (!buttonElement) {
      return;
    }

    const rect = buttonElement.getBoundingClientRect();

    setPosition({ x: window.innerWidth - rect.width - rect.x, y: rect.y + rect.height + 8 });

    openId === 0 || +openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { openId, $position, close } = useContext(MenusContext);

  const ref = useGeneralClose<HTMLUListElement>(close);

  if (+openId !== id) {
    return null;
  }

  return createPortal(
    <StyledList $position={$position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
