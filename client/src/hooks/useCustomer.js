import { useContext } from 'react';
import CustomerContext from '../contexts/CustomerContext';

const useCustomer = () => useContext(CustomerContext);

export default useCustomer;
