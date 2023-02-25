class RegisterError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 409;
  }
}

export default RegisterError;
