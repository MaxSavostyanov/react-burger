import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthData } from '../../services/reducers';

type TProps = {
  onlyUnAuth?: boolean,
  element: ReactElement,
}

export const ProtectedRoute: FC<TProps> = ({ onlyUnAuth = false, element, ...rest }) => {
  const { userData, isAuthCheked } = useSelector(getAuthData);
  const location = useLocation();

  if (!isAuthCheked) {
    return null;
  }

  if (onlyUnAuth && userData) {
    const { from } = location.state || { from: { pathname: '/' } };

    return (
      <Navigate to={from} replace />
    )
  }

  if (!onlyUnAuth && !userData) {
    return (
      <Navigate to='/login' state={{ from: location }} replace />
    )
  }

  return element;
};
