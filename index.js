const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('HEY! Du hast den Server von Simon, Juli und Moritz angefragt! \n toll gemacht. Da bin ich nun und kann nichts für dich tun -.-')
})
app.listen(3000, () => console.log('Server running on 3000'))
