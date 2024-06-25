const Router = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/registrate', userController.registrate)
router.post('/login', userController.login)
router.get('/', userController.getUsers)
router.get('/auth', authMiddleware, userController.auth)
router.get('/:id', userController.getUser)
router.patch('/', authMiddleware, userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router