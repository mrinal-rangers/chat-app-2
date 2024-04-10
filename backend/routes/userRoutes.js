const express=  require("express");
const router = express.Router();
const {registerUser} = require('../controllers/userControllers')
 
router.route('/').post(registerUser)
router.get('/',(req,res)=>{
    return res.send('hi');
})

module.exports= router;