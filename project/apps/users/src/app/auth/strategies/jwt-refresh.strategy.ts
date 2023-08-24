import { TokenNotExistsException } from './../exceptions/token-not-exists.exception';
import { RefreshTokenPayload } from '@project/shared/app-types';
import { RefreshTokenService } from './../../refresh-token/refresh-token.service';
import { AuthService } from './../auth.service';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/config/config-users';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new TokenNotExistsException(payload.tokenId)
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUser(payload.sub);
  }
}
