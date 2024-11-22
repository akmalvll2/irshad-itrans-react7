const divisionModel = require('../model/divisionModel')

//READ ALL DIVISION
async function getAllDivision (req,res) {
    try {
        const division = await divisionModel.getAllDivision()
        res.json(division)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE DIVISION
async function createDivision (req,res) {
    const { divisiondata } = req.body
    try {
        const division = await divisionModel.createDivision(divisiondata)
        res.json(division)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE DIVISION
async function deleteDivision (req,res) {
    const divisionid = req.params.divisionid
    try {
        const division = await divisionModel.deleteDivision(divisionid)
        res.json(division)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE DIVISION
async function updateDivision (req,res) {
    const divisionid = req.params.divisionid
    const { divisiondata } = req.body
    try {
        const division = await divisionModel.updateDivision(divisionid,divisiondata)
        res.json(division)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllDivision,createDivision,deleteDivision,updateDivision}