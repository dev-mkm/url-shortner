const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.redirect(403, '/login')

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.redirect(403, '/login')

    req.user = user

    next()
  })
}

module.exports = auth