import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { hashPwd } from '../utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { userEntity } from '../entity/user.entity';
import { jwtConstants } from './constatants';

@Injectable()
export class AuthService {
  private static createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, jwtConstants.secret, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private static async generateToken(user: userEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await userEntity.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await userEntity.findOne({
        where: { email: req.email, pwdHash: hashPwd(req.pwd) },
      });
      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }
      const token = AuthService.createToken(
        await AuthService.generateToken(user),
      );
      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
