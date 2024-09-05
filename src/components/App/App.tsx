import './main.css';
import { useEffect } from 'react';

import { AppMode } from '@utils-types';
import { Route, Routes, useLocation } from 'react-router-dom';

import { MainPage } from '../../pages/main-page/main-page';
import { setCounter } from '../../services/slices/counter-slice';
import { setShowModal } from '../../services/slices/modal-slice';
import { setMode } from '../../services/slices/mode-slice';
import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { addIdToEachWord, fetchCollection } from '../../services/thunks/thunk';
import {
  currientModeFromLocalStorage,
  counterFromLocalStorage
} from '../../utils/localstorage-functionality';
import { threeThousandWordBase } from '../../word-bases/3k';
import { aWordBase } from '../../word-bases/a';
import { bOneWordBase } from '../../word-bases/b-one';
import { bTwoWordBase } from '../../word-bases/b-two';
import { difWordBase } from '../../word-bases/dif';
import { Layout } from '../modal/layout';
import { Modal } from '../modal/modal';
import ModalContent from '../modal-content/modal-content';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const collection = useAppSelector(selectCollection);
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    if (!currientModeFromLocalStorage) {
      dispatch(setMode(AppMode.Dif)); // (заметка № 1)
    }

    if (currientModeFromLocalStorage) {
      dispatch(setMode(currientModeFromLocalStorage));
    }

    if (currientModeFromLocalStorage === AppMode.Dif) {
      dispatch(fetchCollection(difWordBase)); // (заметка № 2)
    }

    if (currientModeFromLocalStorage === AppMode.ThreeK) {
      dispatch(fetchCollection(threeThousandWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.A) {
      dispatch(fetchCollection(aWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.B1) {
      dispatch(fetchCollection(bOneWordBase));
    }

    if (currientModeFromLocalStorage === AppMode.B2) {
      dispatch(fetchCollection(bTwoWordBase));
    }

    dispatch(addIdToEachWord(collection));
    dispatch(setCounter(Number(counterFromLocalStorage)));
    dispatch(setShowModal(false));
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/gitTreiner' element={<MainPage />} />
        <Route
          path='/gitTreiner/word'
          element={
            <Layout>
              <ModalContent />
            </Layout>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/gitTreiner' element={<MainPage />} />
          <Route
            path='/gitTreiner/word'
            element={
              <Layout>
                <Modal>
                  <ModalContent />
                </Modal>
              </Layout>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
