import { memo } from 'react';

import { AppMode } from '@utils-types';

import styles from './functional-component.module.css';
import { setCounter } from '../../services/slices/counter-slice';
import { selectModeState, setMode } from '../../services/slices/mode-slice';
import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { addIdToEachWord } from '../../services/thunks/thunk';
import {
  currientModeFromLocalStorage,
  isFirstStart,
  markTheFirstStart,
  counterFromLocalStorage
} from '../../utils/localstorage-functionality';
import WordItem from '../word-item/word-item';

const FunctionalComponent = memo(() => {
  const dispatch = useAppDispatch();
  const collection = useAppSelector(selectCollection);
  const currientMode = useAppSelector(selectModeState);

  /**
   * Колбек для кнопки "продолжить" на экране успеха
   */
  const increaseCounter = () => {
    dispatch(addIdToEachWord(collection));
    dispatch(setCounter(1));
    location.reload();
  };

  /**
   * Колбек для клика по логотипу
   */
  const changeMode = () => {
    if (currientMode === AppMode.Dif) {
      dispatch(setMode(AppMode.ThreeK));
      location.reload();
    }
    if (currientMode === AppMode.ThreeK) {
      dispatch(setMode(AppMode.A));
      location.reload();
    }
    if (currientMode === AppMode.A) {
      dispatch(setMode(AppMode.B1));
      location.reload();
    }
    if (currientMode === AppMode.B1) {
      dispatch(setMode(AppMode.B2));
      location.reload();
    }
    if (currientMode === AppMode.B2) {
      dispatch(setMode(AppMode.Dif));
      location.reload();
    }
  };

  if (collection.length > 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea} onClick={changeMode}>
            <div>Git_</div>
            <div>
              treiner
              <span className={styles.lable}>
                {currientModeFromLocalStorage}
              </span>
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.button}> remain: {collection.length}</div>
            <div className={styles.button}>
              today: {counterFromLocalStorage ? counterFromLocalStorage : 0}
            </div>
          </div>
        </div>

        <WordItem key={collection[0].id} {...collection[0]} />
      </div>
    );
  }

  if (!isFirstStart) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>👋 </div>
          <div>Welcome to the GitTreiner!</div>
          <div>
            You can brush up words and edit Markdone notes for them from your
            GitHub.
          </div>
          <button className={styles.button} onClick={markTheFirstStart}>
            →
          </button>
        </div>
      </div>
    );
  }

  // (заметка № 13)
  if (collection.length === 0) {
    return (
      <div className={styles.functionalArea}>
        <div className={styles.success}>
          <div>🥳</div>
          <div>Great!</div>
          <div>Let's go again!</div>
          <button className={styles.button} onClick={increaseCounter}>
            →
          </button>
        </div>
      </div>
    );
  }
});

export default FunctionalComponent;
