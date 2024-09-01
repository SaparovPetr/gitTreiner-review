/**
 * функция получения рандомного элемента массива из переданного ей массива
 * @param arr массив
 * @returns рандомный элемент массиваа
 */
export function getRandomElement(arr: any) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}
