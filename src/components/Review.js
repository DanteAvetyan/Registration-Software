//Review.js

import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCart } from './CartContext';
import { useData } from './UserContext';
import { usePayData } from './PayContext';

//const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
let address;

export default function Review() {

    const { cart } = useCart();
    const { userData } = useData();
    const { payData } = usePayData();

    const totalCost = cart.reduce((sum, item) => sum + item.cost, 0).toFixed(2);

    if (userData.address2) {
        address = `${userData.address1 || null}, 
                   ${userData.address2 || null}, 
                   ${userData.city || null}, 
                   ${userData.state || null} 
                   ${userData.zip || null}, 
                   ${userData.country || null}`;
    } else {
        address = `${userData.address1 || null},
                   ${userData.city || null}, 
                   ${userData.state || null} 
                   ${userData.zip || null}, 
                   ${userData.country || null}`;
    }

    const payments = [
        { name: 'Card type:', detail: payData.cardType || 'Visa' }, // Default to 'Visa' if not available
        { name: 'Card holder:', detail: payData.cardHolder || `${userData['first-name']} ${userData['last-name']}` },
        { name: 'Card number:', detail: payData.cardNumber ? `xxxx-xxxx-xxxx-${payData.cardNumber.slice(-4)}` : 'xxxx-xxxx-xxxx-xxxx' },
        { name: 'Expiry date:', detail: payData.expirationDate || 'MM/YY' },
    ];

    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${totalCost}
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <Stack direction="column" divider={<Divider flexItem />} spacing={2} sx={{ my: 2 }}>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>
                        {userData['first-name']} {userData['last-name']}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                        {address}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Stack direction="row" spacing={1} useFlexGap sx={{ width: '100%', mb: 1 }}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        {payment.name}
                                    </Typography>
                                    <Typography variant="body2">{payment.detail}</Typography>
                                </Stack>
                            </React.Fragment>
                        ))}
                    </Grid>
                </div>
            </Stack>
        </Stack>
    );
}