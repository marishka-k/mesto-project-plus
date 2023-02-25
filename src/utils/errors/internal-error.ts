class InternalError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = 500;
  }
}

export default InternalError;
