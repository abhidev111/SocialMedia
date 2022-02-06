class APIError extends Error {
    constructor(code, message) {
      super(message);
      this.statusCode = code;
      this.isOp = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default APIError;