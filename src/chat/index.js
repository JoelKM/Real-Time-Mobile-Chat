const router = require('express').Router();

const controller = require('./controller');

router.get('/', controller.getChats);

router.post('/', controller.searchChat, controller.openChat)

router.post('/group', controller.groupCreate)

router.put('/edit', controller.groupEdit);

router.put('/add', controller.groupAdd);

router.put('/:id', controller.groupRemove);

module.exports = router;