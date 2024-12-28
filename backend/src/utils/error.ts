
class CustomError extends Error{
    statuscode: number;

    constructor(statuscode:number, message: string) {
        super(message);
        this.statuscode = statuscode;
        this.name = "CustomError"
    }
}

const errorHandler = (statuscode: number, message: string) => {
    return new CustomError(statuscode, message);
}

export default errorHandler;