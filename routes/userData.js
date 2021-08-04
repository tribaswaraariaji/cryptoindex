const router = require('express').Router();
const UserDataController = require('../controller/userDataController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/:accountNumber',UserDataController.getByAccountNumber);
router.get('/:identityNumber',UserDataController.getByIdentityNumber);
router.get('/',UserDataController.getAll);

// router.route('/').get((req, res) => {
//     UserData.find()
//         .then(userData => res.json(userData))
//         .catch(err => res.status(400).json('Error : '+err));
// });

// router.route('/').post((req,res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const accountNumber = req.body.accountNumber;
//     const identityNumber = req.body.identityNumber;
//     const password = req.body.password;

//     const newUserData = new UserData({
//         username,
//         email,
//         accountNumber,
//         identityNumber,
//         password
//     });

//     newUserData.save()
//         .then(() => res.json('User Data Added!'))
//         .catch(err => res.status(400).json('Error : '+err));
// });

// router.route('/accountNumber/:accountNumber').get((req, res) => {
//     UserData.findOne(req.params.accountNumber)
//         .then(userData => res.json(userData))
//         .catch(err => res.status(400).json('Error : '+err));
// });

// router.route('/identityNumber/:identityNumber').get((req, res) => {
//     UserData.findOne(req.params.identityNumber)
//         .then(userData => res.json(userData))
//         .catch(err => res.status(400).json('Error : '+err));
// });

module.exports = router;