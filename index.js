const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('<h1>HEY! Du hast den Server von Simon, Juli und Moritz angefragt! Toll gemacht. Da bin ich nun und kann nichts für dich tun -.-</h1>')
})
app.listen(3000, () => console.log('Server running on 3000'))
