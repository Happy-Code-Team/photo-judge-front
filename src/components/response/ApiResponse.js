export default class ApiResponse {
  constructor(code, message, data) {
    this.data = {
      code: code,
      message: message,
      data: data
    };
  }
}
