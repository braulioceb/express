const {User} = require('../models');

const getAll = (req, res) => {
    User.getAll((users)=>{
        res.send(users);
    });
};

const createUser = (req, res) =>{
    const {body} = req;
    const newUser = new User(body);
    newUser.save();
    res.send({
        messege: 'created'
    });
}

module.exports = {
    getAll,
    createUser,
}