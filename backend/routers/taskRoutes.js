const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // your JWT protect middleware
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

router.use(authMiddleware); // protect all routes below

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;