//AddressForm.js

import * as React from 'react';
//import Checkbox from '@mui/material/Checkbox';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useData } from './UserContext'; // Use the correct hook from UserContext

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function AddressForm() {
    const { userData, addUserData } = useData(); // Access the context here

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        addUserData({ [name]: value });
    };

    return (
        <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="John"
                    value = {userData['first-name'] || ''}
                    onChange={handleInputChange}
                    autoComplete="first name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    value = {userData['last-name'] || ''}
                    onChange={handleInputChange}
                    autoComplete="last name"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address1" required>
                    Address line 1
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="text"
                    placeholder="Street name and number"
                    value={userData['address1'] || ''}
                    onChange={handleInputChange}
                    autoComplete="shipping address-line1"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value = {userData['address2'] || ''}
                    onChange={handleInputChange}
                    autoComplete="shipping address-line2"
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="text"
                    placeholder="New York"
                    value = {userData['city'] || ''}
                    onChange={handleInputChange}
                    autoComplete="address-level2"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>
                <OutlinedInput
                    id="state"
                    name="state"
                    type="text"
                    placeholder="NY"
                    value = {userData['state'] || ''}
                    onChange={handleInputChange}
                    autoComplete="address-level1"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="12345"
                    value = {userData['zip'] || ''}
                    onChange={handleInputChange}
                    autoComplete="postal-code"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="country"
                    type="text"
                    placeholder="United States"
                    value = {userData['country'] || ''}
                    onChange={handleInputChange}
                    autoComplete="country-name"
                    required
                    size="small"
                />
            </FormGrid>
            {/*<FormGrid size={{ xs: 12 }}>*/}
            {/*    <FormControlLabel*/}
            {/*        control={<Checkbox name="saveAddress" value="yes" />}*/}
            {/*        label="Use this address for payment details"*/}
            {/*    />*/}
            {/*</FormGrid>*/}
        </Grid>
    );
}