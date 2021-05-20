const express = require('express');
const BookResources = express.Router();
const {BookControllers} = require('../controllers');
const {body} = require('express-validator');



BookResources.get('/', BookControllers.getAll);
BookResources.get('/:guid', BookControllers.getById); 
BookResources.put('/:guid', [body("publicationYear").isInt( {min: 1454} ), body("author").isString(), body("title").isString(), body('tags').isArray(), body('tags.*').isString()], BookControllers.updateBook);
BookResources.post('/', [body("publicationYear").isInt( {min: 1454} ), body("author").isString(), body("title").isString(), body('tags').isArray(), body('tags.*').isString()], BookControllers.createBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;