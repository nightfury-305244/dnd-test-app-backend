var express = require('express');
var router = express.Router();

const shirtRoutes = require('./shirtRoutes');
const symbolRoutes = require('./symbolRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Use shirtRoutes
router.use('/api', shirtRoutes);
router.use('/api', symbolRoutes);
router.use('/api', productRoutes);
router.use('/api', orderRoutes);

module.exports = router;
