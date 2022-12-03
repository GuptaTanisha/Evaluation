import { Grid, Card, Button,Divider } from '@mui/material';
import {Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import './styles.css';

const Item = ({post}) => {
    const [more, setMore] = useState(false);

    const handleToggle = () => {
        setMore(!more);
    }
    const handleClick = (post) => {
        if(post.title){
           window.location.replace(post.url); 
        }
    }
    const handleStoryClick = (post) => {
           window.location.replace(post.story_url); 
    }

    return ( 
        <>
        <Grid item xs={12} md={12}>
            <div className="mainDiv" onClick={() => {handleClick(post)}}>
                <Card className="card" content={false}>
                    <Typography variant="body1" align='left'>{post.title ? post.title: post.comment_text?.slice(0,more? post.comment_text.length:100)}
                    {post.comment_text &&  <Button
                                                size="small"
                                                className="button"
                                                selected={more}
                                                onClick={handleToggle}
                                            >
                                                {more == false ? 'More...' : 'View Less'}
                                            </Button>}
                    {(post.story_url!="" && post.story_url!=null) &&  
                                            <Button onClick={() => {handleStoryClick(post)}}>View story
                                            </Button>}
                    </Typography>
                    <div className='cardDiv'>
                        <Typography variant="body2" className='cardTypography'>{post.points} points</Typography>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />
                        <Typography variant="body2" className='cardTypography'>{post.created_at.slice(0,10)}</Typography>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />
                        <Typography variant="body2" gutterBottom className='cardTypography'>{moment.utc(post.created_at).local().startOf('seconds').fromNow()}</Typography>
                    </div>
                </Card>
            </div>
        </Grid>
        </>
    );
}

export default Item;