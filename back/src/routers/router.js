const express = require('express');
const userController = require('../controllers/sessionController');
const admController = require('../controllers/admController');

const router = express.Router();

router.post("/", userController.login);
router.get("/admin", admController.getUsers);
router.post("/admin/new", admController.create);


module.exports = router;