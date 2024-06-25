const Router = require('express')
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/', orderController.createOrder)
router.get('/', authMiddleware, orderController.getAllOrders)
router.get('/user', authMiddleware, orderController.getOrders)
router.delete('/:id', orderController.deleteOrder)

module.exports = router