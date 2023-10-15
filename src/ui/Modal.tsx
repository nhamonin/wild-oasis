import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useModalGeneralClose } from '../hooks/useModalGeneralClose';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextProps {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: { children: ReactElement; opens: string }) {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      open(opensWindowName);
      return;
    },
  });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const { openName, close: onClose } = useContext(ModalContext) as ModalContextProps;
  const ref = useModalGeneralClose(onClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, {
            onClose,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
