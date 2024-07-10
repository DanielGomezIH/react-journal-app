import { Provider } from 'react-redux';
import { store } from '../';
import PropTypes from "prop-types";

export const ReduxProvider = ( { children } ) => {
  return (
    <Provider store={ store }>
      { children }
    </Provider>
  );
};

ReduxProvider.propTypes = {
  children: PropTypes.element.isRequired
};