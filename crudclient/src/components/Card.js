import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deletestore, liststores } from '../redux/actions/storeaction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height:220,
    margin:10
  },
  title: {
    fontSize: 20,
    textAlign:"center",
    color:'black'
  },
  pos: {
    marginBottom: 12,
  },
  btns:{
    marginBottom:10,
    display:'flex',
    justifyContent:'space-between'
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const store = props.store;
  const openModal = props.openModal;

  const deleteStore = useSelector(state=>state.deleteStore);
  const {loading:loaddel,message,error} =  deleteStore;

  const dispatch = useDispatch();

  useEffect(()=>{
     if(message){
       dispatch(liststores())
     }
  },[dispatch])

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deletestore(store._id))
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          {store.storename}
        </Typography>
        <h4>Location</h4>
        <Typography className={classes.pos} >
          {store.aptname}
        </Typography>
        <Typography variant="body2" component="p">
          {store.locality}
        </Typography>
        <Typography variant="body2" component="p">
          {store.street}
        </Typography>
        <Typography variant="body2" component="p">
          {store.Zipcode}
        </Typography>
      </CardContent>
      <CardActions className={classes.btns}>
        <Button size="small" onClick={()=>openModal(store)}>Edit</Button>
        <Button size="small" onClick={handleDelete}>{loaddel ? 'Delete...':'Delete'}</Button>
      </CardActions>
    </Card>
  );
}