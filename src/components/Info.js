import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {useCart} from "./CartContext";
import { TableCell, TableRow} from "@mui/material";

function Info({ totalPrice }) {

  const { cart } = useCart();


  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {cart.map((item, index) => (

            <TableRow key={index}>
              <TableCell>{item.group}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>${item.cost}</TableCell>
            </TableRow>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
