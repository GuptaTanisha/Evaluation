import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Button,FormControl,Grid,InputLabel,Select,MenuItem,DialogTitle,DialogActions,DialogContent,Dialog} from '@mui/material';
import List from '../components/List'
import moment from 'moment';
import Header from '../components/Header';
import { DateRangePicker } from "materialui-daterange-picker";
import './styles.css';
const SearchScreen = () => {
  const [posts, setPosts] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [firstFilter, setFirstFilter] = useState("(story,comment,poll,pollopt,show_hn,ask_hn,front_page)");
  const [secondFilter, setSecondFilter] = useState("points");
  const [thirdFilter, setThirdFilter] = useState("All time");
  const [open, setOpen] = React.useState(false);

   useEffect(() => {
    const fetchPost = async () => {
      console.log(moment(dateRange.startDate).unix());
      console.log(moment(dateRange.endDate).unix());
      let response;
      console.log({thirdFilter});
      let end = moment().unix();
      let start=0;
      if(thirdFilter=="Last 24h"){
        start = moment().subtract(1, 'day').unix();
        console.log("1");
      }else if(thirdFilter=="Past week"){
        start = moment().subtract(1, 'week').unix();
        console.log("2");
      }else if(thirdFilter=="Past month"){
        start = moment().subtract(1, 'month').unix();
        console.log("3");
      }else if(thirdFilter=="Past year"){
        start = moment().subtract(1, 'year').unix();
        console.log("4");
      }else if(thirdFilter=="All time"){
        console.log("5");
      }else{
        start = moment(dateRange.startDate).unix();
        end = moment(dateRange.endDate).unix();
        console.log("6");
      }
      console.log({start});
      console.log({end});
      if(secondFilter=="points"){
         response = await Axios.get(`http://hn.algolia.com/api/v1/search?tags=${firstFilter}&numericFilters=created_at_i<=${end},created_at_i>=${start}`);
        setPosts(response.data.hits.sort((doc1, doc2) => (parseInt(doc1.points > parseInt(doc2.points) ? -1 : 1))));
      }else{
        response = await Axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=${firstFilter}&numericFilters=created_at_i<=${end},created_at_i>=${start}`);
        setPosts(response.data.hits.sort((doc1, doc2) => (parseInt(doc1.created_at_i > parseInt(doc2.created_at_i) ? -1 : 1))));
      }
       console.log(response);
       console.log({posts});
    };
    fetchPost();
 }, [firstFilter,secondFilter,thirdFilter,dateRange]);

const handleClose = (event) => {
    setOpen(false);
};
const handleClickOpen = () => {
    setOpen(true);
    setThirdFilter("Custom Range");
};
const handleDateRange = () => {
  setThirdFilter("Custom Range");
  handleClose();
}
const handleFirstChange = (event) => {
  setFirstFilter(event.target.value)
}
const handleSecondChange = (event) => {
  setSecondFilter(event.target.value)
}
const handleThirdChange = (event) => {
  setThirdFilter(event.target.value)
}
  return (
    <>
      <Header />
      <div className="App">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Search</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={firstFilter}
                  label="Search"
                  onChange={handleFirstChange}
                >
                  <MenuItem value={"(story,comment,poll,pollopt,show_hn,ask_hn,front_page)"}>All</MenuItem>
                  <MenuItem value={"story"}>Stories</MenuItem>
                  <MenuItem value={"comment"}>Comments</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={secondFilter}
                  label="By"
                  onChange={handleSecondChange}
                >
                  <MenuItem value={"points"}>Popularity</MenuItem>
                  <MenuItem value={"created_at_i"}>Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">For</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={thirdFilter}
                    label="For"
                    onChange={handleThirdChange}
                  >
                    <MenuItem value={"All time"}>All time</MenuItem>
                    <MenuItem value={"Last 24h"}>Last 24h</MenuItem>
                    <MenuItem value={"Past week"}>Past week</MenuItem>
                    <MenuItem value={"Past month"}>Past month</MenuItem>
                    <MenuItem value={"Past year"}> Past year</MenuItem>
                    <div>
                      <MenuItem onClick={handleClickOpen} value={"Custom Range"}>Custom Range</MenuItem>
                      <Dialog sx={{ width: "100%"}} disableEscapeKeyDown open={open} onBackdropClick={handleClose}>
                        <DialogContent>
                          <DateRangePicker
                          open={true}
                          onChange={(range) => {setDateRange(range)}}

                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleDateRange}>Apply</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                </Select>
              </FormControl>
            </Grid>
        </Grid>
        <List posts={posts} />
      </div>
    </>
  );
}

export default SearchScreen;