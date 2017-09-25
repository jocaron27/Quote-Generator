const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    console.log('Worked');
    res.render('index');
})

module.exports = router;