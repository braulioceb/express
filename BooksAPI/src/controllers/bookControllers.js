const {Book} = require('../models');
const {validationResult} = require('express-validator');
const _ = require('lodash');

const getAll = (req, res) => {
    const {query} = req;
    if (_.isEqual(query, {})){
        Book.getAll((books)=>{
            res.send(books);
        });
    } else {
        Book.getAll((books)=>{
            const book = books.filter((ent)=>{
                for (let key of Object.keys(query)){
                    if (key === "author" && query.author !== ent.author){
                        return false
                    }
                    if (key === "tag" && (!ent.tags.includes(query.tag))){
                        return false
                    }
                    if (key === "publicationYear" &&  ent.publicationYear !== Number(query.publicationYear)){
                        return false
                    }
                    if (key === "title" && query.title !== ent.title){
                        return false
                    }
                }
                return true
            });
            if (book.length !== 0){
                res.send(book);
            } else{
                res.send(book);
    
            }
        })
    }
};

const getById = (req,res) => {
    const { params: {guid},  body} = req;

    Book.getAll((books) =>{
        const book = books.find(end => end.guid === guid);
        if (book){
            res.send(book);
        } else{
            res.status(404).send({
                message: "Resource Not Found",
            })
        }
    });    
}


const getByAuthor = (req,res) => {
    const {params: {author}, body} = req;

    Book.getAll((books) =>{
        const book = books.filter(end => end.author === author);
        if (book.length !== 0){
            res.send(book);
        } else{
            res.status(404).send({
                message: "Resource Not Found- params-bbb",
            })
        }
    });    
}

const getByPublicationYear = (req,res) => {
    const {params: {publicationYear}, body} = req;

    Book.getAll((books) =>{
        const book = books.filter(end => end.publicationYear === Number(publicationYear));
        if (book.length !== 0){
            res.send(book);
        } else{
            res.status(404).send({
                message: "Resource Not Found- params- ccc",
            })
        }
    });    
}

const getByTitle = (req,res) => {
    const {params: {title}, body} = req;

    Book.getAll((books) =>{
        const book = books.filter(end => end.title === title);
        if (book.length !== 0){
            res.send(book);
        } else{
            res.status(404).send({
                message: "Resource Not Found- params-ddd",
            })
        }
    });    
}

const getByTag = (req,res) => {
    const {params: {tag}, body} = req;

    Book.getAll((books) =>{
        const book = books.filter(end => (end.tags).includes(tag) === true);
        if (book.length !== 0){
            res.send(book);
        } else{
            res.status(404).send({
                message: "Resource Not Found- params-gggg",
            });
        }
    });    
}



const createBook = (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { body} = req;

    Book.getAll((users)=>{
        const user = users.find(ent => _.isEqual(body, _.pick(ent, ['title', 'author', 'publicationYear', 'tags'])));
        if (user){
            res.status(409).send({
                message: "El elemento ya existe"
            });
        } else{
            const newBook = new Book(body);
            newBook.save();
            res.send({
                guid: newBook.getGuid(),    
            });
        }
    });
}

const deleteBook = (req, res)=>{
    const {params: {guid}, body} = req;
    Book.getAll((users)=>{
        const userIdx = users.findIndex(ent => ent.guid === guid);
        if (userIdx !== -1){
            users.splice(userIdx,1)
            Book.update(users);
            res.send({
                massage: "Book sucessfully deleted",
            });
        } else {
            res.status(404).send({
                message: "Resource Not Found"
            })
        }
    });
}

const updateBook = (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {params: {guid}, body} = req;
    Book.getAll((users)=>{
        const user = users.find(ent => ent.guid === guid);
        if (user){
            Object.assign(user, body);
            Book.update(users);
            res.send({
                massage: "Book sucessfully updated",
            });
        } else {
            res.status(404).send({
                message: "Resource Not Found"
            })
        }
    });
}

module.exports = {
    getAll,
    createBook,
    getById,
    getByAuthor,
    getByTitle,
    getByPublicationYear,
    getByTag,
    deleteBook,
    updateBook, 
}