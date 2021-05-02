import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { promisify } from 'util';
import { EmailLayout } from './template/email';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {
  constructor(private jwtService: JwtService) {}

  async nodemailer(data): Promise<any> {
    const payload = { email: data.email, sub: data.id };

    const token = await this.jwtService.sign(payload);
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    const readFile = promisify(fs.readFile);

    const html = await readFile(
      '/home/filipi/Desktop/PersonalProjects/backend-nestjs/src/email/template/index.html',
    );

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'flf.2008brasil@hotmail.com',
        pass: '12Godandme',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'flf.2008brasil@hotmail.com', // sender address
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
