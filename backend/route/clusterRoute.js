const express = require('express')
const router = express.Router()
const clusterController = require('../controller/clusterController')

router.get('/getallcluster', clusterController.getAllCluster) //READ ALL CLUSTER
router.post('/createcluster', clusterController.createCluster) //CREATE CLUSTER
router.delete('/deletecluster/:clusterid', clusterController.deleteCluster) //DELETE CLUSTER
router.put('/updatecluster/:clusterid', clusterController.updateCluster) //UPDATE CLUSTER

module.exports = router