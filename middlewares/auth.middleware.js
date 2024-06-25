const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
  console.log(1, req.headers)
  if(req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
      return res.status(411).json({message: 'auth error'})
    }
    const user = jwt.verify(token, config.get('secretKey'))
    console.log(2, token, user)
    req.user = user
    req.token = token
    next()
  }
  catch(e) {
    return res.status(401).json({message: 'auth error'})
  }
}