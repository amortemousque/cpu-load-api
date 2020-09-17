const express = require('express')
const os = require('os');
const app = express()
const port = process.env.PORT


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT');
    if (req.method == 'OPTIONS') {
        res.sendStatus('200')
    }
    else {
        console.log(`${req.ip}`)
        next();
    }
})

app.get('/cpu-load', function (req, res) {
    const cpus = os.cpus().length
    let loadAverage = os.loadavg()[0] / cpus
    loadAverage = Math.round((loadAverage + Number.EPSILON) * 100) / 100

    res.json({recordedAt: Date.now(), value: loadAverage})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))