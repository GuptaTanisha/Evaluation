import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import List from '../components/List'
import Header from '../components/Header';
import './styles.css';
import { useParams,useNavigate} from 'react-router-dom';
import NewestScreen from './NewestScreen';
const NewScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(id));
  const handleClick = () => { 
    setPage(page+1);
    navigate(`/newest/${parseInt(id)+1}`);
    window.scrollTo(0, 0);
  }
  return (
    <>
    <Header />
    <div className="App">
   <NewestScreen page={page}/>
      <Button onClick={handleClick} variant="text">More</Button>
    </div></>
  );
}

export default NewScreen;