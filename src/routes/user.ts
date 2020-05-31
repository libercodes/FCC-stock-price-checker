import { Router } from 'express'
import * as userController from '../controller/user'
const router: Router = Router()

router.get('/stock-prices', userController.GetStock)


export default router