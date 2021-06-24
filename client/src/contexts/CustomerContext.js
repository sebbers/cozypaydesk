import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// import axios from '../lib/axios';
import axios from 'axios';
import { verify, JWT_SECRET } from '../utils/jwt';

const initialState = {
  // isAuthenticated: false,
  // isInitialized: false,
  // user: null
  customers: []
};

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const handlers = {
  INITIALIZE: (state, action) => {
    // const { isAuthenticated, user } = action.payload;
    const { customers } = action.payload;

    return {
      ...state,
      customers
      // isAuthenticated,
      // isInitialized: true,
      // user
    };
  },
  // LOGIN: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },
  // LOGOUT: (state) => ({
  //   ...state,
  //   isAuthenticated: false,
  //   user: null
  // }),
  CREATE: (state, action) => {
    const { customer } = action.payload;

    return {
      ...state,
      // isAuthenticated: true,
      customers: [ ...state.customers, customer ]
    };
  }
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

const CustomerContext = createContext({
  ...initialState,
  // platform: 'JWT',
  // login: () => Promise.resolve(),
  // logout: () => Promise.resolve(),
  // register: () => Promise.resolve()
  create: () => Promise.resolve()
});

export const CustomerProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = window.localStorage.getItem('accessToken');
  //       debugger
  //       if (accessToken && verify(accessToken, JWT_SECRET)) {
  //         // setSession(accessToken);

  //         const response = await axios.get('/api/customers');
  //         const { customers } = response.data;

  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             customers
  //           }
  //         });
  //       } else {
  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             // isAuthenticated: false,
  //             // user: null
  //             customers: []
  //           }
  //         });
  //       }
  //     } catch (err) {
  //       debugger
  //       console.error(err);
  //       dispatch({
  //         type: 'INITIALIZE',
  //         payload: {
  //           // isAuthenticated: false,
  //           // user: null
  //           customers: []
  //         }
  //       });
  //     }
  //   };

  //   initialize();
  // }, []);

  // const login = async (email, password) => {
  //   const response = await axios.post('/api/auth/login', {
  //     email,
  //     password
  //   });
  //   const { accessToken, user } = response.data;
  //   console.log({ accessToken, user })
  //   debugger
  //   setSession(accessToken);
  //   dispatch({
  //     type: 'LOGIN',
  //     payload: {
  //       user
  //     }
  //   });
  // };

  // const logout = async () => {
  //   setSession(null);
  //   dispatch({ type: 'LOGOUT' });
  // };

  const create = async (values) => {
    const {
      // firstName,
      // lastName,
      name,
      email
    } = values;
    console.log(values)
    debugger

    const response = await axios.post('/api/customer', {
      // firstName,
      // lastName,
      name,
      email
    });
    debugger
    const { customer } = response.data;
    // debugger
    // window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'CREATE',
      payload: {
        customer
      }
    });
  };

  return (
    <CustomerContext.Provider
      value={{
        ...state,
        create
        // platform: 'JWT',
        // login,
        // logout,
        // register
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CustomerContext;
