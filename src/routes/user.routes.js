import { Router } from "express";
import { userModel} from "../dao/mongoDB/models/user.model.js"

const router = Router()

router.get('/', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({result: "succes", payload:users})
    } catch (error) {
        console.log("Cannot get users with mongoose: " + error)
    }
})