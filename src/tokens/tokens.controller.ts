import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('token')
export class TokensController {
  constructor(private service: TokensService) {}

  @Put('refresh')
  async refreshToken(@Body() body): Promise<any> {
    const refreshedData = await this.service.refreshToken(body);

    return refreshedData;
  }

  @Delete(':token')
  async deleteToken(@Param() { token }): Promise<any> {
    return await this.service.removeToken(token);
  }
}
