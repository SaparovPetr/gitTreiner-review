import { threeThousandWordBase } from '../word-bases/3k';
import { aWordBase } from '../word-bases/a';
import { bOneWordBase } from '../word-bases/b-one';
import { bTwoWordBase } from '../word-bases/b-two';
import { difWordBase } from '../word-bases/dif';

/**
 * функция получения базы слов, сответствующей текущему режиму
 * @param str режим приложения
 * @returns база слов (массив), соответствующая режиму приложения
 */
export const getCurrientBase = (mode: string | null) => {
  if (mode === 'dif') {
    return difWordBase;
  } else if (mode === '3K') {
    return threeThousandWordBase;
  } else if (mode === 'A') {
    return aWordBase;
  } else if (mode === 'B1') {
    return bOneWordBase;
  } else if (mode === 'B2') {
    return bTwoWordBase;
  }
};
