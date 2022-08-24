import dotenv from "dotenv";
dotenv.config();

jest.mock("../middleware/authMiddleware", () => {
  return {
    protect: jest.fn((req, res, next) => next()),
  };
});
