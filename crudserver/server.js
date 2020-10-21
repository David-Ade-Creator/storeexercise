import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from 'mongoose';
import crudroute from './routes/crudroute';


const app = express();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use(bodyParser.json());
app.use('/api/s3', crudroute)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../que/build')));
    app.get('*', (req, res) => {
     res.sendFile(path.join(`${__dirname}/../que/build/index.html`));
     });
   }


   app.listen(config.PORT, () => {
    console.log(`server started at ${config.PORT}`)
})