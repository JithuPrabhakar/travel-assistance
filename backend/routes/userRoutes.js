import express from 'express'
import {
  authUser,
  logoutUser,
  registerUser,
  getAllUsers,
  deleteUser,
} from '../controllers/userControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.get('/all', getAllUsers)
router.delete('/:id', deleteUser)

export default router
