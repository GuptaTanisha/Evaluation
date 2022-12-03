import { Grid, Typography} from '@mui/material';
import Item from './Item';
import './styles.css';
const List = ({posts}) => {
    return ( 
        <>
        {posts?.length ? 
        (
            <Grid container spacing={2}>
                {posts.map((post) => ( 
                    <Item post={post} />       
                    ))
                }
            </Grid>
        ) : 
        (<div>
            <Typography>Loading posts...</Typography>
        </div>
        )
        }
        </>
    );
}

export default List;