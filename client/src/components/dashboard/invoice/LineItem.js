import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MdCancel as DeleteIcon } from 'react-icons/md'
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
// import styles from './LineItem.module.scss'


const LineItem = (props) => {
  const { index, name, description, quantity, price } = props
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      {/* <TableCell><input name="name" type="text" value={name} onChange={props.changeHandler} /></TableCell> */}
      <TableCell><input name="name" type="text" value={name} onChange={props.changeHandler(index)} /></TableCell>
      <TableCell><input name="description" type="text" value={description} onChange={props.changeHandler(index)} /></TableCell>
      <TableCell><input name="quantity" type="number" step="1" value={quantity} onChange={props.changeHandler(index)} onFocus={props.focusHandler} /></TableCell>
      <TableCell><input name="price" type="number" step="0.01" min="0.00" max="9999999.99" value={price} onChange={props.changeHandler(index)} onFocus={props.focusHandler} /></TableCell>
      <TableCell>{props.currencyFormatter( quantity * price )}</TableCell>
      <TableCell>
        <button type="button"
          onClick={props.deleteHandler(index)}
        ><DeleteIcon size="1.25em" /></button>
      </TableCell>
    </TableRow>
  )
}

export default LineItem

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}