import { Router } from 'express'
import type { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

function resourceRouter(model: Model<any>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean())
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body)
      response.status(201).json(document)
    } catch (error) {
      next(error)
    }
  })

  return router
}

const leaderboardRouter = Router()
leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().sort({ points: -1 }).populate('user').lean())
  } catch (error) {
    next(error)
  }
})
leaderboardRouter.post('/', async (request, response, next) => {
  try {
    const entry = await Leaderboard.create(request.body)
    response.status(201).json(entry)
  } catch (error) {
    next(error)
  }
})

export const apiRouter = Router()
apiRouter.use('/users', resourceRouter(User))
apiRouter.use('/teams', resourceRouter(Team))
apiRouter.use('/activities', resourceRouter(Activity))
apiRouter.use('/leaderboard', leaderboardRouter)
apiRouter.use('/workouts', resourceRouter(Workout))