module.exports = (req, res, next) => {
    // Here we are enabling the address http://local... access the backend
    // I can use the wildcard symbol to enables any address to has access to the server
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // If the request is preflighted: Different of simple request, I need to control the type of the
    // request that can be made, because this can be dangerous
    res.setHeader('Access-Control-Allow-Methods', '*');

    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '10');

    next();
};
