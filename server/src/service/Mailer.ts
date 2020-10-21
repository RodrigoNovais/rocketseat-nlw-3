import nodeMailer from 'nodemailer'

import { mailTransporter } from '../config'

export default nodeMailer.createTransport(mailTransporter)
