import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserService from '../services/user.service'

dotenv.config()
// eslint-disable-next-line consistent-return
export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({status: 401, error: 'Token is not provided'})
    }

    try {
      const userService = new UserService()
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await userService.getUser(decoded._id)
      // req.session.user = user
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({status: 401, error: 'Token is incorrect'})
    }
  } catch (e) {
    return res.status(401).json({status: 401, error: 'Please authenticate.'})
  }
}

// eslint-disable-next-line consistent-return
export const adminAuth = (req, res, next) => {
  // const {user} = req.session
  const {user} = req
  if (user && user.role !== 'admin') {
    return res
      .status(403)
      .json({status: 403, message: 'Admin Authorization needed'})
  }
  next()
}

export default {auth, adminAuth}
