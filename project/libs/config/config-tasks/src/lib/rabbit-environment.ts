import { IsNumber, IsString, Max, Min } from 'class-validator';

const enum Ports {
  MIN_PORT = 0,
  MAX_PORT = 65535
}


export enum RabbitValidationMessage {
  RabbitHostRequired = 'Rabbit host is required',
  RabbitPortRequired = 'Rabbit port is required',
  RabbitUserRequired = 'Rabbit user is required',
  RabbitQueueRequired = 'Rabbit queue is required',
  RabbitPasswordRequired = 'Rabbit password is required',
  RabbitExchangeRequired = 'Rabbit exchange is required',
}

export class RabbitEnvironment {
  @IsString({
    message: RabbitValidationMessage.RabbitHostRequired
  })
  public host: string;

  @IsString({
    message: RabbitValidationMessage.RabbitPasswordRequired
  })
  public password: string;

  @IsString({
    message: RabbitValidationMessage.RabbitUserRequired
  })
  public user: string;

  @IsString({
    message: RabbitValidationMessage.RabbitQueueRequired
  })
  public queue: string;

  @IsString({
    message: RabbitValidationMessage.RabbitExchangeRequired
  })
  public exchange: string;

  @IsNumber({}, {
    message: RabbitValidationMessage.RabbitPortRequired
  })
  @Min(Ports.MIN_PORT)
  @Max(Ports.MAX_PORT)
  public port: number;
}
