// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import UserIcon from '@material-ui/icons/Face';
import BookmarkIcon from '@material-ui/icons/TurnedInNot';
import CategoriesIcon from '@material-ui/icons/Widgets';

import './../App.css'

export default function Nav() {
    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange}>
            <Link to="/">
                <BottomNavigationAction 
                    label="Home" 
                    to="/" 
                    value="home" 
                    icon={<HomeIcon />} 
                />
            </Link>
            
            <Link to="/create">
                <BottomNavigationAction 
                    label="Create Info" 
                    to="/create" 
                    value="create_info" 
                    icon={<AddIcon />} 
                />
            </Link>
            
            <Link to="/user">
                <BottomNavigationAction 
                    label="Add User" 
                    to="/user" 
                    value="add_user" 
                    icon={<UserIcon />} 
                />
            </Link>
            
            <Link to="/">
                <BottomNavigationAction 
                    label="Bookmark" 
                    to="/" 
                    value="bookmark" 
                    icon={<BookmarkIcon />} 
                />
            </Link>
            
            <Link to="/">
                <BottomNavigationAction 
                    label="Categories" 
                    to="/" 
                    value="categories" 
                    icon={<CategoriesIcon />} 
                />
            </Link>
        </BottomNavigation>
    );
}