const config = require('config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const {filterUser} = require('../utils/user.utils')


class UserController {
  async registrate(req, res) {
    try {
      const {email, password, role} = req.body

      const users = await db.query(`SELECT * FROM users WHERE email=$1`, [email])

      if(!users.rows.length) {
        const hashPassword = await bcrypt.hash(password, 8)
        const newUser = await db.query(`INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *`, [email, hashPassword, role])

        res.json(newUser.rows[0])
      }
      else res.status(402).json({message: 'user already exists'})
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body

      const userFromDB = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
      const user = userFromDB.rows[0]

      if(!user) return res.status(402).json({message: 'user doesnt exist'})
      
      const isPassValid = bcrypt.compare(password, user.password)
      const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})

      if(!isPassValid) return res.status(402).json({message: 'invalid password'})

      return res.json({
        token,
        user: user
      })
    }
    catch(e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async auth(req, res) {
    try {
      const user = await db.query(`SELECT * FROM users WHERE id=$1`, [req.user.id])

      if(!user) return res.status(400).json({message: 'token error'})
      
      return res.json({
        token: req.token,
        user: user.rows[0]
      })
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM users')

      res.json(users.rows.filter(user => user.role !== 'admin').map(filterUser))
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async getUser(req, res) {
    try {
      const {id} = req.params

      const user = await db.query(`SELECT * FROM users WHERE id=$1`, [id])

      res.json(filterUser(user.rows[0]))
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async updateUser(req, res) {
    try {
      const {email, phone, firstname, lastname, middlename} = req.body
      console.log(req.body)
      const {id} = req.user

      const userFromDB = await db.query(`SELECT * FROM users WHERE id=$1`, [id])
      const user = userFromDB.rows[0]

      const newUser = await db.query(
        `UPDATE users SET email=$1, phone=$2, firstname=$3, lastname=$4, middlename=$5 WHERE id=$6 RETURNING *`, 
        [email || user.email, phone || user.phone, firstname || user.firstname, lastname || user.lastname, middlename || user.middlename, id]
      )

      res.json(newUser.rows[0])
    }
    catch (e) {
      console.log(e)
      res.send({message: 'server error'})
    }
  }

  async deleteUser(req, res) {
    const {id} = req.params

    const user = await db.query(`DELETE FROM users WHERE id=$1`, [id])

    res.json(user.rows[0])
  }
}

module.exports = new UserController()