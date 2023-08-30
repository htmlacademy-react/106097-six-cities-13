import { useAppSelector, useAppDispatch } from '../hooks';
import { selectors } from '../middleware/index';
import { sort } from '../store/offers-data/offers-data';

const sortTypes = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export function Sort() {
  const sortType = useAppSelector(selectors.sortType);

  const dispatch = useAppDispatch();
  const handleSort = (sortName: string) => {
    dispatch(sort(sortName));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortTypes.map((element) => (
          <li
            className={`places__option ${element === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={element}
            onClick={() => handleSort(element)}
          >
            {element}
          </li>
        ))}
      </ul>
    </form>
  );
}
