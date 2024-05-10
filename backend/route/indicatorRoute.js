const express = require('express')
const router = express.Router()
const indicatorController = require('../controller/indicatorController')

router.get('/getallindicator', indicatorController.getAllIndicator) //READ ALL INDICATOR
router.post('/createindicator', indicatorController.createIndicator) //CREATE INDICATOR
router.delete('/deleteindicator/:indicatorid', indicatorController.deleteIndicator) //DELETE INDICATOR
router.put('/updateindicator/:indicatorid', indicatorController.updateIndicator) //UPDATE INDICATOR

module.exports = router