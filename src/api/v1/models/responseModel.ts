export const successResponse = <T>(data?: T, message?: string) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, code: string) => ({
  success: false,
  error: {
    message,
    code,
  },
  timestamp: new Date().toISOString(),
});