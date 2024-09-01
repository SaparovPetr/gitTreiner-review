import React, { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import styles from './modal.module.css';
import './modal.css';
import {
  selectModalState,
  setShowModal
} from '../../services/slices/modal-slice';
import { selectCollection } from '../../services/slices/words-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { audioCallback } from '../../utils/audio-callback';

export const Modal = ({ children }: React.PropsWithChildren) => {
  const showModal = useAppSelector(selectModalState);
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();
  const collection = useAppSelector(selectCollection);

  useEffect(() => {
    // (заметка № 14)
    audioCallback(collection);
    dispatch(setShowModal(true));
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setShowModal(false));
        setTimeout(onClose, 1000);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <CSSTransition
        in={showModal}
        nodeRef={nodeRef}
        timeout={200}
        classNames='modal'
        unmountOnExit
      >
        <div className='modal' ref={nodeRef}>
          <div
            className={styles.overlay}
            onClick={() => {
              dispatch(setShowModal(false));
              setTimeout(onClose, 200);
            }}
          />
          <div className={styles.popup}>{children}</div>
        </div>
      </CSSTransition>
    </>
  );
};
