const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const LoginRouter = require('./routes/loginRoutes');
const UserDataRouter = require('./routes/userData');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
app.use(cors());
app.use(express.json());
require ('dotenv').config();
const port = process.env.PORT || 3000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database Connection Connected Succesfuly");
})
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
// public route
app.use('/userData', LoginRouter);
// private route
app.use('/data', validateUser, UserDataRouter);
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});
app.listen(3000, function(){
 console.log('Node server listening on port 3000');
});