import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react'

const options = [
    'Sort',
    'Title-ASC',
    'Title-DEC',
    'Length-ASC',
    'Length-DEC',
    'Favorites',
    'Free',
    'Paid'
];

export default function SimpleListMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [labelIndex, setLabelIndex] = useState(1)
    const { setSelectedIndex, selectedIndex } = props
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(options[index]);
        setLabelIndex(index)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", zIndex: "50" }}>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
                style={{ width: "7em", borderRadius: ".5em", height: "2em", display: "flex", alignItems: "center" }}
            >
                <ListItem style={{ textAlign: "center" }}
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText style={{ color: "black" }}
                        primary="Sort"
                        secondary={options[labelIndex]}
                        color='black'

                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
