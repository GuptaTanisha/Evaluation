import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import NewScreen from './screens/NewScreen';
import SearchScreen from './screens/SearchScreen';

function App() {
  return(  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/newest/1" />} />
    <Route path="/newest/:id" element={<NewScreen />} exact></Route>
    <Route path="/search" element={<SearchScreen />} exact></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;




