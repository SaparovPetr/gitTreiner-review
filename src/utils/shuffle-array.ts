/**
 * функция смешивания элементов массива
 * @param array исходный массив
 * @returns массив, элементы которого перерасставлены на рандомные индексы
 */
export const shuffle = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
