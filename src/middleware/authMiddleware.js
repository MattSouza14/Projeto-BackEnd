const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
// resgatar o token da requisição
const retornoToken = req.header('Authorization');
//Bearer aksjalsjaldjsdlhasfdhaisudhbc.sklcajlsdjkal.sdjlkasdjl
//aksjalsjaldjsdlhasfdhaisudhbcsklcajlsdjkalsdjlkasdjl

// o retorno de token é uma string no formato 'Bearer token'
console.log(retornoToken);

// o token será somente a segunda parte da string
const token = retornoToken.split(' ')[1]

// se não tiver token, retornar erro
if (!token) return res.status(401).json({ error: 'Acesso negado' });
// se tiver token, verificar se é valido
try {
 const tokenDecodado = jwt.verify(token, process.env.JWT_SECRET);
 req.userId = tokenDecodado.userId;
 // passar para o proximo middleware
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verificarToken;