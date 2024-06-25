const db = require('../db')


class EquipmentController {
  async createEquipment(req, res) {
    try {
      const {type, description, name, phone, email} = req.body
      const {id} = req.user

      const newEquipment = await db.query(
        `INSERT INTO equipments (userid, type, description, name, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
        [id, type, description, name, phone, email]
      )

      res.json(newEquipment.rows[0])
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getEquipments(req, res) {
    try {
      const {id} = req.user

      const equipments = await db.query(`SELECT * FROM equipments WHERE userid=$1`, [id])
      
      return res.json(equipments.rows)
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getAllEquipments(req, res) {
    try {
      const equipments = await db.query('SELECT * FROM equipments')

      res.json(equipments.rows)
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async deleteEquipment(req, res) {
    try {
      const {id} = req.params

      await db.query(`DELETE FROM equipments WHERE id=$1`, [id])

      res.json({id: Number(id)})
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }
}

module.exports = new EquipmentController()