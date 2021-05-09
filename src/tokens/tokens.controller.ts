import { Body, Controller, Put } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private service: TokensService) {}

  @Put()
  async refreshToken(@Body() body): Promise<any> {
    const refreshedData = await this.service.refreshToken(body);
    return refreshedData;
  }
}
