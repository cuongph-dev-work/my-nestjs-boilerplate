import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailConfig } from './mail.config';
import { MailConsumer } from './mail.consumer';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME_ENUM } from '@configs/enum/app';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfig,
    }),
    BullModule.registerQueue({ name: QUEUE_NAME_ENUM.MAIL }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
