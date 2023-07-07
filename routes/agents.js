const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')
const cors = require("cors")


// Getting all agents
router.get('/', async (req, res) => {
    try {
        const agents = await Agent.find()
        res.json(agents)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one agent
router.get('/:number', getAgent, (req, res) => {
    res.json(res.agent)
})

// Creating one agent
router.post('/', async (req, res) => {
    const agent = new Agent({
        name: req.body.name,
        number: req.body.number,
        location: req.body.location,
        specialties: req.body.specialties,
        preferredCombat: req.body.preferredCombat,
        preferredTools: req.body.preferredTools,
        missions: req.body.missions
    })
    try {
        const newAgent = await agent.save()
        res.status(201).json(newAgent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Patching one agent
router.patch('/:number', getAgent, async (req, res) => {
    if(req.body.name != null){
        res.agent.name = req.body.name
    }
    if(req.body.number != null){
        res.agent.number = req.body.number
    }
    if(req.body.location != null){
        res.agent.location = req.body.location
    }
    //appends instead of replacing
    if(req.body.specialties != null){
        // res.agent.specialties = req.body.specialties
        let specialty = req.body.specialties
        specialty.forEach(element => agent.specialties.push(element))
    }
    if(req.body.preferredCombat != null){
        res.agent.preferredCombat = req.body.preferredCombat
    }
    if(req.body.preferredTools != null){
        res.agent.preferredTools = req.body.preferredTools
    }
    // appends instead of replacing
    if(req.body.missions != null){
        // res.agent.missions = req.body.missions
        let mission = req.body.missions
        agent.missions.push(mission)
    }
    try {
        const updatedAgent = await res.agent.save()
        res.json(updatedAgent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.put('/:number', getAgent, async (req, res) => {
    if(req.body.name != null){
        res.agent.name = req.body.name
    }
    if(req.body.number != null){
        res.agent.number = req.body.number
    }
    if(req.body.location != null){
        res.agent.location = req.body.location
    }
    //appends instead of replacing
    if(req.body.specialties != null){
        res.agent.specialties = req.body.specialties
        // let specialty = req.body.specialties
        // specialty.forEach(element => agent.specialties.push(element))
    }
    if(req.body.preferredCombat != null){
        res.agent.preferredCombat = req.body.preferredCombat
    }
    if(req.body.preferredTools != null){
        res.agent.preferredTools = req.body.preferredTools
    }
    // appends instead of replacing
    if(req.body.missions != null){
        res.agent.missions = req.body.missions
        // let mission = req.body.missions
        // agent.missions.push(mission)
    }
    try {
        const updatedAgent = await res.agent.save()
        res.json(updatedAgent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one agent
router.delete('/:number', getAgent, async (req, res) => {
    try {
        await res.agent.deleteOne()
        res.json({ message: 'Agent has been deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get agent middleware
async function getAgent(req, res, next){
    try {
        agent = await Agent.findOne({ number: req.params['number'] })
        if(agent == null){
            return res.status(404).json({ message: 'Cannot find agent' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.agent = agent
    next()
}

module.exports = router