import React from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Categories({ onOpenMenu }) {
    return (
        <IconButton onClick={onOpenMenu}>
        <MoreVertIcon />
        </IconButton>
        );
    }
    
    export default Categories;