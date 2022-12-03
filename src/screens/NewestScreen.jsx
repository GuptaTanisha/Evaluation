import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import List from '../components/List'
import './styles.css';
const NewestScreen = ({page}) => {
  const [posts, setPosts] = useState([]);
   useEffect(() => {
      const fetchPost = async () => {
         let response = await Axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=story&&hitsPerPage=30&&page=${page}`);
         setPosts(response.data.hits.sort((doc1, doc2) => (parseInt(doc1.created_at_i > parseInt(doc2.created_at_i) ? -1 : 1))));
         console.log(response.data.hits);
         console.log({posts});
      };
      fetchPost();
   }, [page]);
  return (
    <>
    <List posts={posts} />
    </>
  );
}

export default NewestScreen;