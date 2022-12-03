import React from 'react'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#ff6600" }}>
        <Toolbar>
          <Link className="link logo" onClick={() => navigate('/')} sx={{ flexGrow: 1 }}>
            HackerRank News Clone
          </Link>
          <Button color="inherit" onClick={() => navigate('/newest/1')}>New stories</Button>
          <Button color="inherit" onClick={() => navigate('/search')}>Search</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header