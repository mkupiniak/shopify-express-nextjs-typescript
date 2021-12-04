import { Router } from 'express'
import { apiRoutes } from './api'
import { authRoutes } from './auth'

export const routes = (app: Router) => {
  apiRoutes(app)
  authRoutes(app)
}
