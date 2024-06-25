const db = require('../db')


class OrderController {
  async createOrder(req, res) {
    try {
      const {userId, name, phone, email, type, description, pay, time, address} = req.body

      const newOrder = await db.query(
        `INSERT INTO orders (userid, name, phone, email, type, description, pay, time, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, 
        [userId, name, phone, email, type, description, pay, time, address]
      )

      res.json(newOrder.rows[0])
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getOrders(req, res) {
    try {
      const {id} = req.user

      const orders = await db.query(`SELECT * FROM orders WHERE userid=$1`, [id])
      
      return res.json(orders.rows)
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await db.query('SELECT * FROM orders')

      res.json(orders.rows)
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async deleteOrder(req, res) {
    try {
      const {id} = req.params

      await db.query(`DELETE FROM orders WHERE id=$1`, [id])

      res.json({id: Number(id)})
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }
}

module.exports = new OrderController()