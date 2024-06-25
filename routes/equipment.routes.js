const Router = require('express')
const equipmentController = require('../controllers/equipment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/', authMiddleware, equipmentController.createEquipment)
router.get('/', authMiddleware, equipmentController.getAllEquipments)
router.get('/user', authMiddleware, equipmentController.getEquipments)
router.delete('/:id', equipmentController.deleteEquipment)

module.exports = router