import { Module } from '@nestjs/common';
import { FileTransferService } from './file-transfer.service';
import { FileTransferController } from './file-transfer.controller';

@Module({
  providers: [FileTransferService],
  controllers: [FileTransferController]
})
export class FileTransferModule {}
