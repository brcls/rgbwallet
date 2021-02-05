const express = require('express');
const userController = require('../controllers/sessionController');
const admController = require('../controllers/admController');

const router = express.Router();

router.post("/", userController.login);
router.get("/admin", admController.getUsers);
router.delete("/admin", admController.deleteUser);
router.put("/admin/user", admController.updateUser);
router.post("/admin/new", admController.create);


module.exports = router;