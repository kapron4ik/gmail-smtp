const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3010;

const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://kapron4ik.github.io'];


app.use(cors({
    origin: whitelist,
    methods: "GET,PUT,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204
}));

app.use(function(req, res, next) {
    if(whitelist.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});



// app.options('*', cors())

// app.use(cors());

// app.use(cors({origin: ['http://localhost:3000', "https://kapron4ik.github.io/IT_INCUBATOR_PORTFOLIO"]}))
// app.use(cors({origin: ["https://kapron4ik.github.io/IT_INCUBATOR_PORTFOLIO/", 'http://localhost:3000']}))
//поменять на расшаренную страницу портфолио { origin: "httpы:\\safronman.github.io" }
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

app.get('/', function (req, res) {
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