const express = rquire('express');
const router = require('express.router');
const toDos = require('../controllers/toDos');
const catchAsync = require('../utils/catchAsync');
const { isUser } = require('../utils/middleware');

router
  .route('/toDos/:userId')
  .get(isUser, catchAsync(toDos.getAllToDos))
  .post(isUser, catchAsync(toDos.addNewToDo));
router
  .route('/toDos/:userId/:toDoId')
  .get(isUser, catchAsync(toDos.getOneToDo))
  .delete(isUser, catchAsync(toDos.deleteToDo))
  .put(isUser, catchAsync(tDos.updateToDo));

module.exports.router;
