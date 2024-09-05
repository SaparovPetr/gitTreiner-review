import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOneWord } from '@utils-types';

import { getRandomElement } from '../../utils/get-random-element';
import { removeWord } from '../slices/words-slice';

/**
 * функция, принимающая базу и возвращающая коллекцию
 */
export const fetchCollection = createAsyncThunk(
  'words/fetchCollection',
  async function (currientBase: any) {
    // (заметка № 3)
    const collection = [];
    for (let i = 0; i <= 9; i = i + 1) {
      const randomElement = getRandomElement(currientBase);
      collection.push(randomElement);
    }
    return collection;
  }
);

/**
 * функция добавления ID к каждому элементу Коллекции
 */
export const addIdToEachWord = createAsyncThunk(
  'words/addIdToEachWord',
  async function (arr: TOneWord[]) {
    return arr;
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async function (id: string, { dispatch }) {
    dispatch(removeWord({ id }));
  }
);
