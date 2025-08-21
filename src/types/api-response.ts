export type APISuccessResponse<T> = {
  message: string;
  status: number;
  success: true;
  data: T;
};

export type APIErrorResponse = {
  message: string;
  status: number;
  success: false;
};
