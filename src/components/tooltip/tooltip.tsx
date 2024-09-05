import { selectCollection } from '../../services/slices/words-slice';
import { useAppSelector } from '../../services/store';
import './tooltip.css';
import { counterFromLocalStorage } from '../../utils/localstorage-functionality';
const ToolTip = () => {
  const collection = useAppSelector(selectCollection);

  return (
    <div className='tooltip-container'>
      <span className='text'>▽</span>
      <span className='tooltip1'>
        <div className='item'> remain: {collection.length}</div>
        <div className='item'>
          today: {counterFromLocalStorage ? counterFromLocalStorage : 0}
        </div>
      </span>
    </div>
  );
};

export default ToolTip;
