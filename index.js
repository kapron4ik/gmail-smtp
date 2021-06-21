const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
const port = 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    // requireTLS: true,
    auth: {
        user: 'danna.nikitina@gmail.com', // generated ethereal user
        pass: 'greece06', // generated ethereal password
    },
    // tls:{
    //     rejectUnauthorized: false
    // }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {
    let {name, email, subject, message} = req.body

    let info = await transporter.sendMail({
        from: 'Portfolio', // sender address
        to: "sapronov.vitalik@gmail.com", // list of receivers
        subject: "Message Portfolio", // Subject line
        // text: "Тест отправки формы",
        html: `<b>Сообщение с Portfolio Page</b>
            <div>
                <b>name: </b>${name}
            </div>
            <div>
                <b>contacts: </b>${email}
            </div>
            <div>
                <b>subject: </b>${subject}
            </div>
            <div>
                <b>message: </b>${message}
            </div>`
    });
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})