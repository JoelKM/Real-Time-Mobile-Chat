const router = require('express').Router();

const controller = require('./controller');

router.get('/', controller.get);

router.get('/:id', controller.connect);

router.post('/', controller.new);

router.put('/:id', controller.message)

module.exports = router;