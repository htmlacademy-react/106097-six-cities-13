import { SyntheticEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectors } from '../middleware/index';
import { sort } from '../store/offers-data/offers-data';
import { SortStatus } from '../const';

const sortTypes = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export function Sort() {
  const sortType = useAppSelector(selectors.sortType);

  const [sortingStatus, setSortingStatus] = useState(SortStatus.closed);
  const onSortingClick = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (sortingStatus === SortStatus.closed) {
      setSortingStatus(SortStatus.opened);
    } else {
      setSortingStatus(SortStatus.closed);
    }
  };

  const dispatch = useAppDispatch();
  const handleSort = (sortName: string) => {
    dispatch(sort(sortName));
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={onSortingClick}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortingStatus === SortStatus.opened ? 'places__options--opened' : ''}`}>
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
