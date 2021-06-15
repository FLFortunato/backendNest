import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('sendMail-queue')
export class SendMailProducerService {
  constructor(private readonly sendEmailService: EmailService) {}
  @Process('sendMail-queue')
  async sendEmail(job) {
    await this.sendEmailService.nodemailer(
      { email: job.data.created.email },
      job.data.token,
    );
  }
}
