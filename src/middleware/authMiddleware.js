const jwt = require('jsonwebtoken')
function verificarToken(req, res, next) {
const retornoToken = req.header('Authorization')
console.log(retornoToken)

const token = retornoToken

if (!token) return res.status(401).json({ error: 'Acesso negado' })

try {
 const tokenDecodado = jwt.verify(token, '85985958')
 req.userId = tokenDecodado.userId

 next()
 } catch (error) {
 res.status(401).json({ error: 'Token invalido' })
 }
 }

module.exports = verificarToken