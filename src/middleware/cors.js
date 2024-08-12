const express = require('express');
const cors = require('cors');

const app = express();

// Permitir todas as origens
app.use(cors());

// Ou permitir apenas um domínio específico
//Front end hospedado para a api
// app.use(cors({
//   origin: 'https://projeto-final-lake.vercel.app/'
// }));

app.get('/', (req, res) => {
  res.send('pega essa api então dhr demais');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
