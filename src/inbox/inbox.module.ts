import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';

@Module({
  providers: [InboxService]
})
export class InboxModule {}
