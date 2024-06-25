const express = require('express');
const userRouter = require('./routes/user.routes')
const orderRouter = require('./routes/order.routes')
const equipmentRouter = require('./routes/equipment.routes')
const corsMiddleware = require('./middlewares/cors.middleware')

const PORT = process.env.PORT || 8080

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/equipment', equipmentRouter)

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})

const {num, str} = {num: 1}