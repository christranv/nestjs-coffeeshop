export interface SerializedException {
    message: string;
    stack?: string;
}


/**
 * Domain exception.
 *
 * @abstract
 * @class DomainException
 * @extends {Error}
 */
export class DomainException extends Error {
    constructor(
        readonly message: string,
    ) {
        super(message);
    }

    /**
     * By default in NodeJS Error objects are not
     * serialized properly when sending plain objects
     * to external processes. This method is a workaround.
     * Keep in mind not to return a stack trace to user when in production.
     * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
     */
    toJSON(): SerializedException {
        return {
            message: this.message,
            stack: this.stack
        };
    }
}
