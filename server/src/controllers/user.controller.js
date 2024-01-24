import userService from "../services/user.service.js";

class UserController {
    async signup (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.signup(email, password);
            return res.json(userData)
        } catch (e) {
            console.error(e)
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async logout (req, res, next) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            console.error(e)
        }
    }

    async refresh (req, res, next) {
        try {

        } catch (e) {
            console.error(e)
        }
    }
}

export default new UserController()