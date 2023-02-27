import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './accounts/PrivateRoute';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import { loadUser } from './reducer/actions/auth';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './components/layout/Alerts';
const middleware = [thunk];

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: 'top center',
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Alerts />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route element={<Login />} path='/login'></Route>
          <Route element={<Register />} path='/register'></Route>
        </Routes>
      </AlertProvider>
    </Provider>
  );
}

export default App;
