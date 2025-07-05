import { UserPayload } from "../src/middleware/authenticate-user";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
