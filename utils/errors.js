export const ERROR_CODES = {
  SL02: {
    status: 400,
    code: "SL02",
    message: "Slug is already taken",
  },

  AC01: {
    status: 400,
    code: "AC01",
    message: "access_code is required when access_type is private",
  },

  AC05: {
    status: 400,
    code: "AC05",
    message: "access_code can only be set on private cards",
  },

  NF01: {
    status: 404,
    code: "NF01",
    message: "Creator card not found",
  },

  NF02: {
    status: 404,
    code: "NF02",
    message: "Creator card not found",
  },

  AC03: {
    status: 403,
    code: "AC03",
    message: "This card is private. An access code is required",
  },

  AC04: {
    status: 403,
    code: "AC04",
    message: "Invalid access code",
  },
};


export class AppError extends Error {
  constructor(errorData) {
    super(errorData.message);

    this.status = errorData.status;
    this.code = errorData.code;
  }
}