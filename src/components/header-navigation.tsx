import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../middleware/index';
import { logoutAction } from '../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { SyntheticEvent } from 'react';

export function HeaderNavigation() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectors.authorizationStatus);
  const favoriteOffers = useAppSelector(selectors.favoriteOffers);
  const {email, avatarUrl} = useAppSelector(selectors.getUserInfo);
  const handleSignOutClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authStatus === AuthorizationStatus.Auth
          ? (
            <>
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Favorites}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img src={avatarUrl} alt="avatar" style={{borderRadius: '50%'}}/>
                  </div>
                  <span className="header__user-name user__name">
                    {email}
                  </span>
                  <span className="header__favorite-count">{favoriteOffers.length}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.Root} onClick={handleSignOutClick}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          )
          : (
            <li className="header__nav-item user">
              <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}
