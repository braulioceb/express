const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'users.json');

module.exports = class User{
    constructor(data){
        // validación
        this.name = data.name;
        this.age = data.age;
        this.guid = uuid.v4();
    }

    save(){        
        fs.readFile(p, (err, data)=>{
            let users = [];
            if (!err) {
                users = JSON.parse(data);
            }
            users.push(this);
            fs.writeFile(p, JSON.stringify(users), (err) => console.log(err))
        });
    }

    static getAll(cb){
        fs.readFile(p, (err, data)=>{
            let users = [];
            if(!err){
                users = JSON.parse(data);
            }
            cb(users)
        })
    }
}