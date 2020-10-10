import * as crypto from "crypto";
import { decode } from 'js-base64';

export default class CryptoUtils {
    public static generateSalt (length: number): string {
        return crypto.randomBytes(length)
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    }

    public static hash(password, salt) {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    };

    public static parseBasicAuthorizationHeader(authHeader: string): AuthorizationHeader {
        const decodedHeader = decode(authHeader.substr('Basic '.length));
        const headerValues = decodedHeader.split(':');

        return {
            email: headerValues[0],
            password: headerValues[1]
        }
    }
}

export interface AuthorizationHeader {
    email: string;
    password: string;
}