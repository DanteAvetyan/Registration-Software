import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Paper, Table, TableBody, TableCell, TableRow, Radio, Snackbar, SnackbarContent } from '@mui/material';
import { useCart } from './CartContext'; // Import useCart hook

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null); // Store the selected schedule
    const [displayCart, setDisplayCart] = useState(false); // Control cart visibility
    const { cart, addToCart } = useCart(); // Access cart and addToCart from CartContext

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const schedule = {
        Monday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Tuesday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Wednesday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Thursday: [
            { group: "Adults", time: "12PM-2PM", cost: 15 },
            { group: "Ages 6-8", time: "2PM-8PM", cost: 15 },
            { group: "Ages 8-12", time: "3:30PM-8PM", cost: 15 },
        ],
        Saturday: [
            { group: "Ages 4-6", time: "10AM-2:30PM", cost: 15 },
            { group: "Ages 6-8", time: "11:30AM-2:30PM", cost: 15 },
            { group: "Ages 8-12", time: "1PM-2:30PM", cost: 15 },
            { group: "Adults", time: "2:30PM-4PM", cost: 15 },
        ],
    };


    useEffect(() => {
        generateCalendar();
    }, [currentMonth, currentYear]);

    const generateCalendar = () => {
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDayOfMonth.getDate(); // Total number of days in the current month

        const days = [];
        for (let i = -2; i <= totalDays; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); // Full weekday name (Monday, Tuesday, etc.)

            days.push({
                date: date,
                dayOfWeek: dayOfWeek,
            });
        }

        setCalendarDays(days); // Set the list of all days for rendering
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setSelectedSchedule(null); // Reset selected schedule on new day selection
    };

    const getScheduleForDay = (dayOfWeek) => {
        return schedule[dayOfWeek] || null;
    };

    const handleMonthChange = (direction) => {
        if (direction === 'prev') {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
            if (currentMonth === 0) {
                setCurrentYear(currentYear - 1);
            }
        } else {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
            if (currentMonth === 11) {
                setCurrentYear(currentYear + 1);
            }
        }
    };

    const handleRadioChange = (event) => {
        const scheduleGroup = event.target.value;
        const selectedSlot = schedule[selectedDate?.dayOfWeek]?.find(slot => slot.group === scheduleGroup);
        setSelectedSchedule(selectedSlot);
    };

    const handleAddToCart = () => {
        if (selectedSchedule) {
            addToCart(selectedSchedule); // Add to cart via context
            setMessage("Added to Cart.");
            setOpenSnackbar(true); // Open the Snackbar
        }
    };

    const toggleCartDisplay = () => {
        setDisplayCart(!displayCart);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Class Calendar
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Calendar</Typography>
                        <Button onClick={() => handleMonthChange('prev')}>◀</Button>
                        <Typography variant="h6" sx={{ display: 'inline', margin: '0 15px' }}>
                            {new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                        </Typography>
                        <Button onClick={() => handleMonthChange('next')}>▶</Button>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginTop: 2 }}>
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                <Typography key={day} align="center" variant="body1">{day}</Typography>
                            ))}
                            {calendarDays.map((day, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    sx={{ backgroundColor: day.date.toDateString() === new Date().toDateString() ? 'lightblue' : 'white' }}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day.date.getDate()}
                                </Button>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Selected Date: {selectedDate ? selectedDate.date.toDateString() : "None"}</Typography>
                        {selectedDate && getScheduleForDay(selectedDate.dayOfWeek) ? (
                            <Table>
                                <TableBody>
                                    {getScheduleForDay(selectedDate.dayOfWeek).map((slot, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{slot.group}</TableCell>
                                            <TableCell>{slot.time}</TableCell>
                                            <TableCell>${slot.cost}</TableCell>
                                            <TableCell>
                                                <Radio
                                                    checked={selectedSchedule?.group === slot.group}
                                                    onChange={handleRadioChange}
                                                    value={slot.group}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography>No schedule available for {selectedDate?.dayOfWeek}</Typography>
                        )}

                        <Button onClick={handleAddToCart} disabled={!selectedSchedule}>Add to Cart</Button>
                        <Button onClick={toggleCartDisplay} sx={{ marginLeft: 2 }}>
                            {displayCart ? 'Hide Cart' : 'Display Cart'}
                        </Button>
                        {displayCart && (
                            <Paper sx={{ marginTop: 2, padding: 2 }}>
                                <Typography variant="h6">Cart</Typography>
                                {cart.length > 0 ? (
                                    <Table>
                                        <TableBody>
                                            {cart.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.group}</TableCell>
                                                    <TableCell>{item.time}</TableCell>
                                                    <TableCell>${item.cost}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Typography>No items in cart.</Typography>
                                )}
                            </Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '4px',
                    }}
                    message={message}
                />
            </Snackbar>
        </Box>
    );
};

export default Calendar;
