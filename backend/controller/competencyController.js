const competencyModel = require('../model/competencyModel')

//READ ALL COMPETENCY
async function getAllCompetency (req,res) {
    try {
        const competency = await competencyModel.getAllCompetency()
        res.json(competency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE COMPETENCY
async function createCompetency(req,res) {
    const { competencydata } = req.body
    try {
        const competency = await competencyModel.createCompetency(competencydata)
        res.json(competency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE COMPETENCY
async function deleteCompetency (req,res) {
    const competencyid = req.params.competencyid
    try {
        const competency = await competencyModel.deleteCompetency(competencyid)
        res.json(competency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE COMPETENCY
async function updateCompetency (req,res) {
    const competencyid = req.params.competencyid
    const { competencydata } = req.body
    try {
        const competency = await competencyModel.updateCompetency(competencyid,competencydata)
        res.json(competency)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllCompetency,createCompetency,deleteCompetency,updateCompetency}