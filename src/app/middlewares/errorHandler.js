module.exports = (error, req, res, next) => { // We need to take these 4 params for Express get that this is a handle error
    console.log('Error Handler', error);
    res.sendStatus(500);
};
