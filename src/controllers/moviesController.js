const db = require('../database/models');
const Op = db.Sequelize.Op;

const {Movie, Genre} = db;

const now = new Date();

const listAllMovies = async (req,res) => {

    /*Movie.findAll({
        include: ['genre']
    }).then((movies) => {
        return res.status(200).json({
            status: 'OK',
            total: movies.length,
            data: movies
        }).catch((error) => {
            res.status(500).json({
                status: 'ERROR',
                message: error
            })
        })
    })*/
    const movies = await Movie.findAll({include: ['genre']});
    
    res.status(200).json({
        status: 'OK',
        date: now,
        total: movies.length,
        data: movies
    });
};

const getMovieById = async (req,res) => {
    const {id} = req.params;

    const movie = await Movie.findByPk(id,{
        include: ['genre']
    });

    return movie ? res.status(200).json({
        status: 'OK',
        data: movie
    }) : res.status(400).json({
        status: 'ERROR',
        message: 'No se encuentra la pelicula'
    });
}

const getMoviesByGenre = async (req,res) => {
    const { genre } = req.query;

    const moviesByGenre = await Genre.findAll({
        where:{
            name:{
                [Op.like]: `%${genre}%`
            }
        },
        include: ['movies']
    });

    return moviesByGenre.length ? res.status(200).json({
        status: 'OK',
        total: moviesByGenre.length,
        data: moviesByGenre
    }) : res.status(400).json({
        status: 'ERROR',
        message: `No existen películas con el genro ${genre}`
    });
}

module.exports = {
    listAllMovies,
    getMovieById,
    getMoviesByGenre
}