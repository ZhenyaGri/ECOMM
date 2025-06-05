import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../button/button';
import '../../styles/components/_modal.scss';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const modal = document.getElementById('modal')!;

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';

    return (): void => {
      window.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const onModalClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div onClick={onClose} className="modal-background">
      <div onClick={onModalClick} className="modal">
        <Button
          className="btn-light btn-modal"
          type="button"
          children="Close"
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    modal
  );
};
