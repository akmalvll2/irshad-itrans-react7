const indicatorModel = require('../model/indicatorModel')

//READ ALL INDICATOR
async function getAllIndicator (req,res) {
    try {
        const indicator = await indicatorModel.getAllIndicator()
        res.json(indicator)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE INDICATOR
async function createIndicator(req,res) {
    const { indicatordata } = req.body
    try {
        const indicator = await indicatorModel.createIndicator(indicatordata)
        res.json(indicator)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE INDICATOR
async function deleteIndicator (req,res) {
    const indicatorid = req.params.indicatorid
    try {
        const indicator = await indicatorModel.deleteIndicator(indicatorid)
        res.json(indicator)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE INDICATOR
async function updateIndicator (req,res) {
    const indicatorid = req.params.indicatorid
    const { indicatordata } = req.body
    try {
        const indicator = await indicatorModel.updateIndicator(indicatorid,indicatordata)
        res.json(indicator)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllIndicator,createIndicator,deleteIndicator,updateIndicator}