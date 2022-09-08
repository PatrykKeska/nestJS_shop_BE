import { Module } from '@nestjs/common';
import mailerConfig = require('../mailerconfig');
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
