const express = require('express');
const router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const AuthController = require('../controllers/auth.controller');
const { body, param } = require('express-validator');

// GET all experts
router.get('/', AuthController.checkAuth, ExpertController.get);

// GET one expert by ID
router.get('/:id', AuthController.checkAuth, [param('id').isMongoId()], ExpertController.getOne);

// CREATE new expert
router.post(
  '/',
  AuthController.checkAuth,
  [
    body('name').isString(),
    body('country').isString(),
    body('email').isEmail(),
    body('institution').isString(),
    body('animal').isString(),
    body('active').isBoolean()
  ],
  ExpertController.create
);

// UPDATE expert
router.put(
  '/:id',
  AuthController.checkAuth,
  [
    param('id').isMongoId(),
    body('name').isString(),
    body('country').isString(),
    body('email').isEmail(),
    body('institution').isString(),
    body('animal').isString(),
    body('active').isBoolean()
  ],
  ExpertController.update
);

// DELETE expert
router.delete('/:id', AuthController.checkAuth, [param('id').isMongoId()], ExpertController.delete);

// Activate / Deactivate
router.put('/activate/:id', AuthController.checkAuth, [param('id').isMongoId()], ExpertController.activate);
router.put('/deactivate/:id', AuthController.checkAuth, [param('id').isMongoId()], ExpertController.deactivate);

module.exports = router;



