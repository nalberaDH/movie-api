const db = require('../database/models');
const fetch = require('node-fetch');

const {User} = db;

const userRegister = async (req,res) => {
    try {
        const {email, password} = req.body;
       
        if(!email) return res.status(400).json({message: 'Email es obligatorio'});

        if(!password) return res.status(400).json({message: 'La password es obligatorio'});

        const user = await User.findOne({
            where:{
                email
            }
        });

        if(user) return res.status(400).json({message: 'Ese email ya se encuentra registrado'});

        await User.create({
            email,
            password
        });

        res.status(200).json({message: 'Usuario registrado correctamente'});
    } catch (error) {
        throw new Error(error);
    }
}

const userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email) return res.status(400).json({message: 'Email es obligatorio'});

        if(!password) return res.status(400).json({message: 'La password es obligatorio'});

        const userLogged = await User.findAll({
            where:{
                email
            }
        });

        if(!userLogged.length) return res.status(400).json({message: 'Usuario o contraseña incorrecto'});
        
        if(userLogged[0].password !== password) return res.status(400).json({message: 'Usuario o contraseña incorrecto'});
        
        res.status(200).json({message: 'Usuario logueado correctamente'});

    } catch (error) {
        throw new Error(error);    
    }
}

const randomUserGenerator = async (req,res) => {
    try {
        const url = 'https://randomuser.me/api/';

        const response = await fetch(url);
        const randomUser = await response.json();

        const obj = {
            name: randomUser.results[0].name.first,
            email:  randomUser.results[0].email,
            password:  randomUser.results[0].login.password
        }

        await User.create(obj);

        res.status(200).json({message: 'Usuario random creado correctamente..'});
    } catch (error) {
        throw new Error(error);
    }
}

const getPost = async (req,res) => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';

        const response = await fetch(url);
        const json = await response.json();

        res.send(json);

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    userRegister,
    userLogin,
    randomUserGenerator,
    getPost
}