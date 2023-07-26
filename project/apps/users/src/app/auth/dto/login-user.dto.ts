import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({
    description: 'User unique address',
    example: 'stiv@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  public password: string;
}
