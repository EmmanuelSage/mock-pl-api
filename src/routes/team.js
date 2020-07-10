import {Router} from 'express'
import TeamController from '../controllers/team.controller'
import TeamService from '../services/team.service'
import {auth, adminAuth} from '../middlewares/auth'

const teamService = new TeamService()
const teamController = new TeamController(teamService)

const router = Router()

router.post('/teams', auth, adminAuth, (req, res) =>
  teamController.createTeam(req, res)
)
router.patch('/teams/:id', auth, adminAuth, (req, res) =>
  teamController.updateTeam(req, res)
)
router.delete('/teams/:id', auth, adminAuth, (req, res) =>
  teamController.deleteTeam(req, res)
)
router.get('/teams/:id', auth, (req, res) => teamController.getTeam(req, res))
router.get('/teams', auth, (req, res) => teamController.getTeams(req, res))
router.get('/search/teams', (req, res) => teamController.searchTeam(req, res))

export default router
