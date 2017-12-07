const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.send("<h1>HEY! Du hast den Server von Simon, Juli und Moritz angefragt!</h1> " +
        "<p>Du wirst hier nie viel sehen, weil wir eigentlich gerade eine App entwickeln. Das klingt nicht nur verrückt. Das ist auch verrückt. </br>" +
        "und jetzt rate mal worum es dabei geht... um METEORITEN!!! Waaaaas? PSCHHUUUU. Mindblown was? Also warte noch ein bisschen und dann weisst du mehr </p>"
    )
})
app.listen(3000, () => console.log('Server running on 3000'))
