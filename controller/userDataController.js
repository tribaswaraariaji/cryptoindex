const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserData = require('../models/userDataModels');
const bcrypt = require('bcrypt');

module.exports = {
    create: function(req,res,next){
        UserData.create({
            username: req.body.username,
            email: req.body.email,
            accountNumber: req.body.accountNumber,
            identityNumber: req.body.identityNumber,
            password: req.body.password,
        }, function(err, result){
            if(err) next(err);
            else
            res.json({status: "success", message: "User Data Added!",data: "null"});
        });
    },

    authenticate: function(req, res, next) {
        UserData.findOne({username: req.body.username}, function(err,userDataInfo){
            if(err){
                next(err);
            }else{
                if(bcrypt.compareSync(req.body.password, userDataInfo.password)) {
                    const token = jwt.sign({id: userDataInfo._id}, req.app.get('secretKey'), {expiresIn:'1h'});
                    res.json({status: "success", message: "User Data Found!",data: {userData:userDataInfo, token:token}});
                }else{
                    res.json({status: "success", message: "Invalid username/password!",data: "null"});
                }
            }
        });
    },

    getByAccountNumber: function(req, res, next){
        console.log(req.body);
        UserData.findOne(req.params.accountNumber, function(err, userDataInfo){
            if (err) {
                next(err);
               } else {
                res.json({status:"success", message: "User Data Found!", data:{userData: userDataInfo}});
               }
        });
    },
    
    getByIdentityNumber: function(req, res, next){
        console.log(req.body);
        UserData.findOne(req.params.identityNumber, function(err, userDataInfo){
            if (err) {
                next(err);
               } else {
                res.json({status:"success", message: "User Data Found!", data:{userData: userDataInfo}});
               }
        });
    },
    
    getAll: function(req,res,next) {
        let userDataList = [];

        UserData.find({}, function(err, userData){
            if(err){
                next(err);
            }else{
                for(let userDatas of userData){
                    userDataList.push({
                        id: userDatas._id,
                        username: userDatas.username, 
                        email: userDatas.email, 
                        accountNumber: userDatas.accountNumber, 
                        identityNumber: userDatas.identityNumber, 
                        password: userDatas.password, 
                    });
                    res.json({status:"success", message:"User Data List Fond!", data:{userData: userDataList}});
                }
            }
        })
    }
}