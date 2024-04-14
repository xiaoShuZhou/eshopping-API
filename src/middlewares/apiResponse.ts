export class ApiResponse<T> {
    constructor(readonly statusCode: number, readonly message: string, readonly data: T) {}
  }
  
  export class SuccessResponse<T> extends ApiResponse<T> {
    constructor(readonly message: string = "Success", readonly data: T) {
      super(200, message, data);
    }
  }
  
  export class CreatedResponse<T> extends ApiResponse<T> {
    constructor(readonly message: string = "Created", readonly data: T) {
      super(201, message, data);
    }
  }
  
  export class NoContentResponse extends ApiResponse<null> {
    constructor(readonly message: string = "No Content") {
      super(204, message, null);
    }
  }
  
  