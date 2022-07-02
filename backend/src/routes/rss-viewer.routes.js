const express = require('express')
const router = express.Router()
const rssViewerController = require('../controllers/rss-viewer.controller')

router.get('/', rssViewerController.getRSS)

module.exports = router