import {UnauthorizedError} from "../model/exceptions/unauthorized-error";
import CryptoUtils from "../util/crypto-utils";
import {User, UserRepository} from "../repository/user-repository";
import {UserRegistration} from "../registration-handler";

export class UserService {

    private userRepository: UserRepository = new UserRepository();
    private SALT_LENGTH = 10;

    public async verifyUserLogin(encodedAuthHeader: string): Promise<User> {
        if(!encodedAuthHeader)
            throw new UnauthorizedError([{errorCode: 'UNAUTHORIZED', reason: 'Authorization header is missing in the request.'}]);
        const parsedHeader = CryptoUtils.parseBasicAuthorizationHeader(encodedAuthHeader);
        const user = await this.userRepository.find(parsedHeader.email);
        this.validatePassword(parsedHeader.password, user);

        return user;
    }

    public async registerUser(userRegistration: UserRegistration) {
        const generatedSalt = CryptoUtils.generateSalt(this.SALT_LENGTH);

        const result = await this.userRepository.create({
            email: userRegistration.email,
            salt: generatedSalt,
            hash: CryptoUtils.hash(userRegistration.password, generatedSalt)
        });

        return result;
    }

    private validatePassword(providedPassword: string, user: User): void {
        if(!user || user.hash !== CryptoUtils.hash(providedPassword, user.salt)) {
            throw new UnauthorizedError([{errorCode: 'UNAUTHORIZED', reason: 'Invalid user or password.'}]);
        }
    }
}