import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthData } from '../../services/reducers';

export const ProtectedRoute = ({ onlyUnAuth = false, element, ...rest }) => {
  const { userData } = useSelector(getAuthData);
  const location = useLocation();

  if (onlyUnAuth && userData) {
    const { from } = location.state || { from: { pathname: '/'}};

    return (
      <Navigate to={from} replace />
    )
  }

  if (!onlyUnAuth && !userData) {
    return (
      <Navigate to='/login' replace />
    )
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element,
};
