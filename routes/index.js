const express = require('express');
const router = express.Router();
const path=require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/maps',function(req,res){
	res.render('map');
})
router.get('/profile',function(req,res){
	res.render('profile');
})
router.get('/livedata',function(req,res){
  res.render('live_stats');
});

module.exports = router;
