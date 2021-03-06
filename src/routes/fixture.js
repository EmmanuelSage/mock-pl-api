import {Router} from 'express'
import FixtureController from '../controllers/fixture.controller'
import FixtureService from '../services/fixture.service'
import TeamService from '../services/team.service'
import {auth, adminAuth} from '../middlewares/auth'

const fixtureService = new FixtureService()
const teamService = new TeamService()
const fixtureController = new FixtureController(fixtureService, teamService)

const router = Router()

router.post('/fixtures', auth, adminAuth, (req, res) =>
  fixtureController.createFixture(req, res)
)
router.get('/fixtures', auth, (req, res) =>
  fixtureController.getFixtures(req, res)
)
router.get('/fixtures/:id', auth, (req, res) =>
  fixtureController.getSpecificFixture(req, res)
)
router.get('/search/fixtures', (req, res) =>
  fixtureController.searchFixture(req, res)
)
router.patch('/fixtures/:id', auth, adminAuth, (req, res) =>
  fixtureController.updateFixture(req, res)
)
router.delete('/fixtures/:id', auth, adminAuth, (req, res) =>
  fixtureController.deleteFixture(req, res)
)

export default router
