/**
 * Arquivo que contém as rotas do back end
 */

const express = require('express');
const userController = require('../controllers/sessionController');
const admController = require('../controllers/admController');
const auth = require('../middleaware/auth');

const router = express.Router();

router.post("/", userController.login);
router.get("/admin",auth,admController.getUsers);
router.delete("/admin",auth,admController.deleteUser);
router.put("/admin/user",auth,admController.updateUser);
router.put("/admin/zerarsaldo",auth,admController.resetSaldo);
router.put("/admin/aumentarsaldo",auth,admController.increaseSaldo);
router.post("/admin/new",auth,admController.CreateUser);


module.exports = router;