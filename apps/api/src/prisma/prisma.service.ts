import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>(
        'NEST_DATABASE_CONNECTION_URL',
      ),
      connectionTimeoutMillis: 3_000,
      idleTimeoutMillis: 10_000,
    });
    super({ adapter });
  }
}
