const notFound = (req, res, next) => {
    res.status(404).render('404-not-found');
    next();
}
module.exports= notFound;