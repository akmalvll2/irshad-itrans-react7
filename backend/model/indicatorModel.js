const db = require('../config/db')

//READ ALL INDICATOR
async function getAllIndicator () {
    try {
        const [rows] = await db.query('SELECT * FROM `indicator` ORDER BY indicator.competency_id')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE INDICATOR
async function createIndicator (indicatordata) {
    try {
        const [result] = await db.query('INSERT INTO `indicator` (competency_id, indicator_description) VALUES (?,?)', [
            indicatordata.competencyid,
            indicatordata.indicatordescription,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE INDICATOR
async function deleteIndicator (indicatorid) {
    try {
        const [result] = await db.query('DELETE FROM `indicator` WHERE indicator.indicator_id = ?', [indicatorid])
        return "Indicator Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE INDICATOR
async function updateIndicator (indicatorid,indicatordata) {
    try {
        const [result] = await db.query('UPDATE `indicator` SET indicator.indicator_description = ? WHERE indicator.indicator_id = ?', [
            indicatordata.indicatordescription,
            indicatorid,
        ])
        return "Indicator Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllIndicator,createIndicator,deleteIndicator,updateIndicator}