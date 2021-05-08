import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('confirmation')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Post()
  async confirmation(@Body() body): Promise<any> {
    return await this.service.nodemailer(body.email);
  }
}
