import * as bcrypt from 'bcrypt';

export class BcryptHelper {
    static readonly saltOrRounds = 10;

    static async hash(input: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(input, salt);
    }

    static async isMatch(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
