import React, { useState, useEffect, useCallback } from 'react';
import uuidv4 from 'uuid/v4'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, Grid, Switch, TextField, Typography } from '@material-ui/core';
import wait from '../../../utils/wait';
import useCustomer from '../../../hooks/useCustomer';

import SelectSearch from 'react-select-search';
import axios from 'axios';
import LineItems from './LineItems'

const InvoiceAddForm = (props) => {
  const { ...other } = props || {};
  const { enqueueSnackbar } = useSnackbar();

  const locale = 'en-US'
  const currency = 'USD'

  const [customer, setCustomer] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  // const { create } = useCustomer();

  const handleLineItemChange = (elementIndex) => (event) => {
    console.log(`elementIndex: ${elementIndex}`)
    console.log('event')
    console.log(event)
    
    const newLineItems = lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    console.log('lineItems')
    console.log(newLineItems)
    // debugger
    setLineItems(newLineItems)
  }

  const handleAddLineItem = (event) => {
    setLineItems(lineItems.concat(
      [{ id: uuidv4(), name: '', description: '', quantity: 0, price: 0.00 }]
    ))
  }

  const handleRemoveLineItem = (elementIndex) => (event) => {
    setLineItems(lineItems.filter((item, i) => {
      return elementIndex !== i
    }))
  }

  const handleReorderLineItems = (newLineItems) => {
    setLineItems(newLineItems)
  }

  const handleFocusSelect = (event) => {
    event.target.select()
  }

  const formatCurrency = (amount) => {
    return (new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }


  const createInvoice = async () => {
    try {

      console.log('customer')
      console.log(customer)

      console.log('lineItems')
      console.log(lineItems)

      const response = await axios.post('/api/invoices', { customer, lineItems });

      // if (isMountedRef.current) {
      //   setCustomer(response.data.customer);
      // }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <SelectSearch
        options={[]}
        getOptions={(query) => {
            return new Promise((resolve, reject) => {
                axios.get(`/api/customer?name=${query}`)
                    .then(({ data }) => {
                      resolve(data.data.map(({ _id, name, email }) => ({ value: _id, name: `${email}` })))
                    })
                    .catch(reject);
            });
        }}
        onChange={val => setCustomer(val)}
        search
        placeholder="Find customer"
      />
      {customer}

      <LineItems
        items={lineItems}
        currencyFormatter={formatCurrency}
        addHandler={handleAddLineItem}
        changeHandler={handleLineItemChange}
        // focusHandler={handleFocusSelect}
        deleteHandler={handleRemoveLineItem}
        // reorderHandler={handleReorderLineItems}
      /> 

      <button>Create Invoice</button>
    </>
  );
};

InvoiceAddForm.propTypes = {
  // @ts-ignore
  // customer: PropTypes.object.isRequired
};

export default InvoiceAddForm;
