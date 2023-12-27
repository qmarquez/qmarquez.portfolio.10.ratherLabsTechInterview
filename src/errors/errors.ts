export class AppError {
  constructor(
    public status: number,
    public message: string,
  ) {}
}

export const BaseError = () => new AppError(500, 'something went wrong');

export const BadRequest = (msg = "received information it's wrong") =>
  new AppError(400, msg);
