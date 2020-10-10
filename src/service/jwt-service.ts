import * as jwt from 'jsonwebtoken';
import * as moment from "moment";
import {User} from "../repository/user-repository";
import {TokenRepository} from "../repository/token-repository";
import {v4 as uuid} from 'uuid';
import * as crypto from 'crypto';
import {UnauthorizedError} from "../model/exceptions/unauthorized-error";

export class JwtService {
    private tokenRepository = new TokenRepository();
    private static readonly ISSUER = 'benkhard-authorizer';

    public async createWebToken(user: User): Promise<JwtToken> {
        const secret = this.generateSecret(user);
        await this.tokenRepository.create(secret);

        return this.sign(user, secret);
    }

    private sign(user: User, secret: Secret): JwtToken {
        const now = moment();
        const expirationDate = now.add(30, 'm');
        const token = jwt.sign({email: user.email}, secret.secret, {expiresIn: '24h', issuer: JwtService.ISSUER, algorithm: "HS256", keyid: secret.tid});

        return {
            token,
            issuedAt: now.unix(),
            expiresAt: expirationDate.unix()
        }
    }

    private generateSecret(user: User): Secret {
        return {
            tid: uuid(),
            secret: crypto.randomBytes(128).toString('hex')
        }
    }

    public async validate(authorizationToken: string) {
        const decodedToken = jwt.decode(authorizationToken, {complete: true}) as any;
        if(decodedToken.header) {
            const secret = await this.tokenRepository.find(decodedToken.header.kid);
            if(secret) {
                try {
                    const token = jwt.verify(authorizationToken, secret.secret);
                    return token;
                } catch (exception) {
                    console.log(`Exception validating token: ${exception}`);
                    throw new UnauthorizedError([{errorCode: 'UNAUTHORIZED', reason: 'Invalid token.'}]);
                }
            }
        }

        throw Error('Unauthorized');
    }
}

export interface JwtToken {
    token: string;
    issuedAt: number;
    expiresAt: number;
}

export interface Secret {
    tid: string;
    secret: string;
}