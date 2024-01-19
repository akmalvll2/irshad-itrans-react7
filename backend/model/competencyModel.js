const db = require('../config/db')

//READ ALL COMPETENCY
async function getAllCompetency () {
    try {
        const [rows] = await db.query('SELECT * FROM `competency` ORDER BY competency.competency_name')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE COMPETENCY
async function createCompetency (competencydata) {
    try {
        const [result] = await db.query('INSERT INTO `competency` (competency_name,competency_description,cluster_id,competency_level1,competency_level2,competency_level3,competency_level4,competency_level5,competency_indicator1,competency_indicator2,competency_indicator3,competency_indicator4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [
            competencydata.competencyname,
            competencydata.competencydescription,
            competencydata.clusterid,
            competencydata.competencylevel1,
            competencydata.competencylevel2,
            competencydata.competencylevel3,
            competencydata.competencylevel4,
            competencydata.competencylevel5,
            competencydata.competencyindicator1,
            competencydata.competencyindicator2,
            competencydata.competencyindicator3,
            competencydata.competencyindicator4,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE COMPETENCY
async function deleteCompetency (competencyid) {
    try {
        const [result] = await db.query('DELETE FROM `competency` WHERE competency.competency_id = ?', [competencyid])
        return "Competency Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE COMPETENCY
async function updateCompetency (competencyid,competencydata) {
    console.log(competencydata)
    try {
        const [result] = await db.query('UPDATE `competency` SET competency.competency_name = ? , competency.competency_description = ?, competency.cluster_id = ?, competency.competency_level1 = ?, competency.competency_level2 = ?, competency.competency_level3 = ?, competency.competency_level4 = ?, competency.competency_level5 = ?, competency.competency_indicator1 = ?, competency.competency_indicator2 = ?, competency.competency_indicator3 = ?, competency.competency_indicator4 = ? WHERE competency.competency_id = ?', [
            competencydata.competencyname,
            competencydata.competencydescription,
            competencydata.clusterid,
            competencydata.competencylevel1,
            competencydata.competencylevel2,
            competencydata.competencylevel3,
            competencydata.competencylevel4,
            competencydata.competencylevel5,
            competencydata.competencyindicator1,
            competencydata.competencyindicator2,
            competencydata.competencyindicator3,
            competencydata.competencyindicator4,
            competencyid
        ])
        return "Competency Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllCompetency,createCompetency,deleteCompetency,updateCompetency}