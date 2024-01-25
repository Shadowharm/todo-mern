import userService from "../services/user.service";
import {
    Request,
    Response,
    NextFunction
} from 'express'
class UserController {
    async signup (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.signup(email, password);
            return res.json(userData)
        } catch (e) {
            console.error(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async logout (req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async activate (req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async refresh (req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            console.error(e)
        }
    }
}

export default new UserController()