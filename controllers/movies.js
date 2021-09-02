const fs = require('fs');
const Movie = require('../database/models/Movie');

const controller = {
    allmovies: (req, res) => {
        Movie.find({}, (error, documents) => {
            if (error){
                return res.status(500).json(error);
            }
                return res.render('movies', {movies: documents});
            })
    },
   
    formToCreate: (req, res) => {
        return res.render('form-to-create-movies')
    },  
  
    storeInDB: (req, res) => {
        if (req.body.title !== '' && req.body.genre !== '' && req.body.year !== ''&& req.body.rating !== '' && req.file.filename !== undefined) {
            
            Movie.create({
                title: req.body.title,
                genre: req.body.genre,
                year: req.body.year,
                rating: req.body.rating,
                poster: req.file.filename
            }, (error)=>{
                if (error) {
                    return res.render('form-to-create-movies', {
                    error: 'You forgot to send something!!!'});                 
                }
                return res.redirect('/movies');
            })
        }else {
            return res.render('form-to-create-movies',{
            error: 'The form has empty fields'}); 
        }
    },

    details: (req, res) => {
        Movie.findById({ _id: req.params.id}, (error, movie) => {
            if (error) {
                return res.status(500).json (error);
            }
            return res.render('detail-movie', {movie: movie});
        });
    },

    delete: (req, res) => {
        Movie.findOneAndRemove({ _id: req.params.id}, (error) => {
            if (error) {
                return res.status(500).json (error);
            }
            return res.redirect('/movies');
        });
    },
    
    formToEdit: (req, res) => {
        Movie.findById({ _id: req.params.id}, (error, movie) => {
            if (error) { 
                return res.status(500).json (error);
            }
            return res.render('form-to-edit-movies', { movie: movie});       
        });
    },

    update: (req, res) => {
        if (req.body.title !== '' && req.body.genre !== '' && req.body.year !== ''&& req.body.rating !== '') {
            
            Movie.findByIdAndUpdate({_id: req.params.id},{
                title: req.body.title,
                genre: req.body.genre,
                year: req.body.year,
                rating: req.body.rating
            }, (error)=>{
                if (error) {
                    return res.render('form-to-create-movies', {
                        error: 'You forgot to send something!!!'
                    });
                }
                return res.redirect('/movies');
            })
        }else {
             return res.render('form-to-create-movies',{
             error: 'The form has empty fields'});  
        }
    }
} 
module.exports= controller;