const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3010;

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '---';
let smtp_password = process.env.SMTP_PASSWORD || '---';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    // requireTLS: true,
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },

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
    res.send('Message send')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})