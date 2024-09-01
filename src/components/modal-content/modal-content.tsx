import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styles from './modal-content.module.css';
import { setShowModal } from '../../services/slices/modal-slice';
import { selectFirstWord } from '../../services/slices/words-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { copyTextToClipboard } from '../../utils/copy-text-to-clipboard';

const ModalContent = () => {
  const word = useAppSelector(selectFirstWord);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  // (заметка № 15)
  useEffect(() => {
    copyTextToClipboard(`${word.targetWord} - ${word.translating}`);
  }, []);

  return (
    <div className={styles.modalContent}>
      <div className={styles.phraseZone}>
        {word.targetWord} - {word.translating}
      </div>

      <iframe
        src={`https://saparovpetr.github.io/mdWords/${word.targetWord}%20-%20${word.translating}.md`}
        id='iframe'
      />
      <div className={styles.buttonsZone}>
        <Link
          className={styles.button}
          to={`https://github.com/SaparovPetr/mdWords/edit/main/${word.targetWord.toLowerCase()}%20-%20${word.translating.toLowerCase()}.md`}
          target='_blank'
        >
          edit
        </Link>

        <a
          className={styles.button}
          onClick={() => {
            dispatch(setShowModal(false));
            setTimeout(onClose, 200);
          }}
        >
          close
        </a>
      </div>
    </div>
  );
};

export default ModalContent;
