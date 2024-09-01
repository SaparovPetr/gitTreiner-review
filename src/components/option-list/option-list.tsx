import { useState } from 'react';

import { TOneWord } from '@utils-types';

import styles from './option-list.module.css';
import { useAppDispatch } from '../../services/store';
import { deleteWord } from '../../services/thunks/thunk';
import { getCurrientBase } from '../../utils/get-currient-base';
import { getRandomElement } from '../../utils/get-random-element';
import { currientModeFromLocalStorage } from '../../utils/localstorage-functionality';
import { shuffle } from '../../utils/shuffle-array';

/** компоненет списка ответов */
const OptionList =
  // (заметка № 8)
  (targetObject: TOneWord) => {
    const dispatch = useAppDispatch();

    const currientBase = getCurrientBase(currientModeFromLocalStorage);
    // (заметка № 9)
    const thirdOption = getRandomElement(currientBase);
    const secondOption = getRandomElement(currientBase);
    const fourthOption = getRandomElement(currientBase);
    // (заметка № 10)
    const shuffledArrey = shuffle([
      targetObject,
      secondOption,
      thirdOption,
      fourthOption
    ]);

    // (заметка № 11)
    /** запись в стейт подготовленного массива для его сохранения при ререндеринге */
    const [preparedArrey] = useState(shuffledArrey);

    /** удаление Рабочего элемента из Коллекции */
    const skipWordCallback = (id: string) => {
      dispatch(deleteWord(id));
    };

    // (заметка № 12)
    const choseOption = (e: any) => {
      if (e.target.textContent === targetObject.translating) {
        skipWordCallback(targetObject.id);
      } else {
        e.target.style.color = 'gray';
        e.target.style.border = '1px solid gray';
      }
    };

    return (
      <div className={styles.fourOptions}>
        <div key={2} className={styles.option} onClick={choseOption}>
          {preparedArrey[0].translating}
        </div>
        <div key={3} className={styles.option} onClick={choseOption}>
          {preparedArrey[1].translating}
        </div>
        <div key={4} className={styles.option} onClick={choseOption}>
          {preparedArrey[2].translating}
        </div>
        <div key={5} className={styles.option} onClick={choseOption}>
          {preparedArrey[3].translating}
        </div>
      </div>
    );
  };

export default OptionList;
