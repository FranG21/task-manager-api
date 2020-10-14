const sgMail = require('@sendgrid/mail')
//const sendgridAPIkey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'franciscomartinez532@outlook.es',
        subject: 'Gracias por mi mensaje',
        text: `Bienvenido a mi app, ${name}`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'franciscomartinez532@outlook.es',
        subject: 'Adios',
        text: `Gracias por preferirnos, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

// sgMail.send({
//     to: 'franciscomartinez99999@gmail.com',
//     from: 'franciscomartinez532@outlook.es',
//     subject: 'My primer email',
//     text: 'mensaje enviado'
// })