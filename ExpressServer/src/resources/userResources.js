const express = require('express');
const UserResources = express.Router();
const {UserControllers} = require('../controllers')

UserResources.get('/', UserControllers.getAll);
UserResources.post('/', UserControllers.createUser);

module.exports = UserResources;