import { Request, Response, Router, NextFunction } from 'express'
import Shopify from '@shopify/shopify-api'

const verifyRequest =
  ({ returnHeader }: { returnHeader: boolean }) =>
  (req: Request, res: Response, next: NextFunction) => {
    next()
  }

export const apiRoutes = (app: Router) => {
  app.post('/graphql', verifyRequest({ returnHeader: true }), async (req, res) => {
    await Shopify.Utils.graphqlProxy(req, res)
  })
}
