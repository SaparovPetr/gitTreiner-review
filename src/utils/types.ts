/** тип объекта одного слова */
export type TOneWord = {
  targetWord: string;
  translating: string;
  id: string;
};

/** виды режимов приложения (уровня изучаемых слов) */
export const enum AppMode {
  Dif = 'dif',
  ThreeK = '3K',
  A = 'A',
  B1 = 'B1',
  B2 = 'B2'
}
