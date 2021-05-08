import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import { promisify } from 'util';
import { EmailLayout } from '../emailConfirmation/template/email';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class EmailService {
  async nodemailer(data, token?: any): Promise<any> {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    const readFile = promisify(fs.readFile);

    const html = await readFile(
      '/home/filipi/Desktop/PersonalProjects/backend-nestjs/src/emailConfirmation/template/index.html',
    );

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: data.email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: EmailLayout(
        ` http://localhost:3030/users/confirmation?token=${token}`,
      ), // html body
    });

    return 'Sent';
  }
}
