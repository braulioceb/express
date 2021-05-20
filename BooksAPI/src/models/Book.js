const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');



module.exports = class Book{
    constructor(data){
        this.title = data.title;
        this.author = data.author;
        this.publicationYear = data.publicationYear;
        this.tags = data.tags;
        this.guid = uuid.v4();
    }

    getGuid(){
        return this.guid 
    }

    save(){        
        fs.readFile(p, (err, data)=>{
            let books = [];
            if (!err) {
                books = JSON.parse(data);
            }
            books.push(this);
            fs.writeFile(p, JSON.stringify(books), (err) => console.log(err))
        });
    }

    static update(books){
        fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    }

    static getAll(cb){
        fs.readFile(p, (err, data)=>{
            let books = [];
            if(!err){
                books = JSON.parse(data);
            }
            cb(books)
        })
    }
}