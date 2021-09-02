const express= require ('express');
const app = express ();
const path = require('path');
const mongoose = require ('mongoose');

const mongoDb= 'mongodb://localhost/moviesDB';
mongoose.connect( mongoDb,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set( 'port', process.env.PORT || 3000 )

app.listen( app.get( 'port' ), () => {
    console.log( `Server on port ${app.get('port')}` );
});

app.set( 'view engine', 'ejs' );
app.use( express.urlencoded({ extended: false}) );
app.use( express.json() );
app.use( express.static(__dirname + '/public' ));

const moviesRoutes = require( './routes/movies' );
app.use( '/movies/', moviesRoutes );

const notFound = require( './middlewares/notfound.js' );
app.use( notFound ); 