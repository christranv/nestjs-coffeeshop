import { v4 as uuidv4 } from 'uuid';


export class IdHelper {
    static GetNewUUID(): string {
        return uuidv4()
    }
}