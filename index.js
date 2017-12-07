const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send("<h1>HEY! Du hast den Server von Simon, Juli und Moritz angefragt!</h1> <h3>Hier ein Witz von Jerry Seinfeld:</h3> <p>Well, birthdays are merely symbolic of how another year has gone by and how little we've grown. No matter how desperate we are that someday a better self will emerge, with each flicker of the candles on the cake, we know it's not to be, that for the rest of our sad, wretched pathetic lives, this is who we areto the bitter end. Inevitably, irrevocably; happy birthday? No such thing.</p>")
})
app.listen(3000, () => console.log('Server running on 3000'))
