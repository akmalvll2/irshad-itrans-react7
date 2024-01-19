const clusterModel = require('../model/clusterModel')

//READ ALL CLUSTER
async function getAllCluster (req,res) {
    try {
        const cluster = await clusterModel.getAllCluster()
        res.json(cluster)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//CREATE CLUSTER
async function createCluster(req,res) {
    const { clusterdata } = req.body
    try {
        const cluster = await clusterModel.createCluster(clusterdata)
        res.json(cluster)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//DELETE CLUSTER
async function deleteCluster (req,res) {
    const clusterid = req.params.clusterid
    try {
        const cluster = await clusterModel.deleteCluster(clusterid)
        res.json(cluster)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//UPDATE CLUSTER
async function updateCluster (req,res) {
    const clusterid = req.params.clusterid
    const { clusterdata } = req.body
    try {
        const cluster = await clusterModel.updateCluster(clusterid,clusterdata)
        res.json(cluster)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getAllCluster,createCluster,deleteCluster,updateCluster}