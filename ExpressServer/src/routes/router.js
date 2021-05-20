const express = require('express');
const router = express.Router();
const {UserResources} = require('../resources')

router.use('/users', UserResources);

module.exports = router;
