const db = require('../config/db')

//READ ALL CLUSTER
async function getAllCluster () {
    try {
        const [rows] = await db.query('SELECT * FROM `cluster` ORDER BY cluster.cluster_level')
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

//CREATE CLUSTER
async function createCluster (clusterdata) {
    try {
        const [result] = await db.query('INSERT INTO `cluster` (cluster_name,cluster_description) VALUES (?,?)', [
            clusterdata.clustername,
            clusterdata.clusterdescription,
        ])
        return result.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

//DELETE CLUSTER
async function deleteCluster (clusterid) {
    try {
        const [result] = await db.query('DELETE FROM `cluster` WHERE cluster.cluster_id = ?', [clusterid])
        return "Cluster Deleted"
    } catch (error) {
        throw new Error(error.message)
    }
}

//UPDATE CLUSTER
async function updateCluster (clusterid,clusterdata) {
    try {
        const [result] = await db.query('UPDATE `cluster` SET cluster.cluster_name = ? , cluster.cluster_description = ? WHERE cluster.cluster_id = ?', [
            clusterdata.clustername,
            clusterdata.clusterdescription,
            clusterid,
        ])
        return "Cluster Updated"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {getAllCluster,createCluster,deleteCluster,updateCluster}