import { AuthenticatedUser } from './path/to/user.interface';

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}
