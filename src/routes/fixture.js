import {Router} from 'express'
import FixtureController from '../controllers/fixture.controller'
import FixtureService from '../services/fixture.service'
import {auth, adminAuth} from '../middlewares/auth'

const fixtureService = new FixtureService()
const fixtureController = new FixtureController(fixtureService)

const router = Router()

router.post('/fixtures', auth, adminAuth, (req, res) =>
  fixtureController.createFixture(req, res)
)
router.get('/fixtures', (req, res) => fixtureController.getFixtures(req, res))
router.get('/fixtures/:id', (req, res) =>
  fixtureController.getSpecificFixture(req, res)
)
router.patch('/fixtures/:id', adminAuth, (req, res) =>
  fixtureController.updateFixture(req, res)
)
router.delete('/fixtures/:id', adminAuth, (req, res) =>
  fixtureController.deleteFixture(req, res)
)

export default router
