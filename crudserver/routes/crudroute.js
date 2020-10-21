import express from 'express';
import Store from '../model/storemodel';
import validator, { validationResult } from 'express-validator';
import  {validcreatestore} from '../helpers/valid';

const router = express.Router()

router.get('/', async (req,res)=>{
    const store = await Store.find({});
    if(store){
        res.send(store);
    } else {
        res.status(404).send('Unable to fetch stores');
    }
})

router.post('/', validcreatestore, async (req,res)=>{
    const {storename,aptname,locality,street,zipcode,lat,lng} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
        errors:firstError
   });
    } else {
   const store = new Store({
        storename,
        aptname,
        locality,
        street,
        zipcode,
        lat,
        lng
    });
 store.save((err,data)=>{
     if(err){
         return res.status(404).json({
             errors: 'Unable to save new store'
         });
     } else {
         return res.json(data)
     }
 })}
})

router.put('/:id/update',validcreatestore, async (req,res)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
        errors:firstError
   });
    } else {
        const store = await Store.findById(req.params.id);
    if (store){
        store = {
        storename:req.body.storename,
        aptname: req.body.aptname,
        locality: req.body.locality,
        street: req.body.street,
        zipcode: req.body.zipcode,
        lat: req.body.lat,
        lng:req.body.lng
        }
    }
    store.save((err,data)=>{
        if(data){
            res.send(data);
        } else {
            res.status(404).send({message: 'Store unable to update'})
        }
    })
    }
})

router.get('/search', async (req,res) => {
    const stores = await Store.find({lat:req.body.lat,lng:req.body.lng});
    if(stores){
        res.send(stores);
    }else{
        res.status(404).send({ message:'No store in this location'})
    }
});

router.get('/:id', async (req,res) => {
    const storeId = req.params.id;
    const stores = await Store.findOne({_id:storeId});
    if(stores){
        res.send(stores);
    }else{
        res.status(404).send({ message:'No store in this location'})
    }
});

router.delete("/:id/delete", async (req,res) => {
    const deletedStore = await Store.findById(req.params.id)
    if (deletedStore) {
        await deletedStore.remove();
        res.send({ message: 'Store Deleted'});
    } else {
        res.send('Error in Deleting')
    }
});


module.exports = router;