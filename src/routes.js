const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get(
    '/contacts',
    // Middleware
    (req, res, next) => {
        req.appId = 'MyAppId';

        // If something goes wrong we can stop the request with res.send or others res method
        next();
    },
    ContactController.index
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
