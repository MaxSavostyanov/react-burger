import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthData } from '../../services/reducers';

export const ProtectedRoute = ({ element }) => {
  const { userData } = useSelector(getAuthData);

  return userData ? element : <Navigate to='/login' replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element,
};
