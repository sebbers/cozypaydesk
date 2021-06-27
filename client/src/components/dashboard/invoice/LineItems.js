import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import LineItem from './LineItem'

import { MdAddCircle as AddIcon } from 'react-icons/md'

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
// import styles from './LineItems.module.scss'


const LineItems = (props) => {
  const {
    items, 
    addHandler, 
    // changeHandler,
    // reorderHandler, 
    ...functions
  } = props

  return (
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <LineItem
              style={{color: 'red'}}
              key={index + item.id} 
              index={index} 
              name={item.name}
              description={item.description} 
              quantity={item.quantity} 
              price={item.price}
              {...functions}
            />
          ))}
        </TableBody>

        <div>
          <button type="button" onClick={addHandler}><AddIcon size="1.25em" /> Add Item</button>
        </div>

      </Table>

  )
  
}

export default LineItems

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  currencyFormatter: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  reorderHandler: PropTypes.func.isRequired,
}

