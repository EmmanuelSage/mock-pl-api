import {Router} from 'express'
import TeamController from '../controllers/team.controller'
import TeamService from '../services/team.service'

const teamService = new TeamService()
const teamController = new TeamController(teamService)

const router = Router()

router.post('/teams', (req, res) => teamController.createTeam(req, res))
router.patch('/teams/:id', (req, res) => teamController.updateTeam(req, res))
router.delete('/teams/:id', (req, res) => teamController.deleteTeam(req, res))
router.get('/teams/:id', (req, res) => teamController.getTeam(req, res))
router.get('/teams', (req, res) => teamController.getTeams(req, res))
router.get('/search/teams', (req, res) => teamController.searchTeam(req, res))

export default router
