const RSSViewerService = require('../services/rss-viewer.service')
const rssViewer = new RSSViewerService()
const utils = require('../utils/utils')

const _getRSS = async (req, res) => {
    try {
        const { rss_url } = req.query
        const isValidURL = utils.isValidURL(rss_url)
        if (!isValidURL) {
            res.status(400)
            res.json({ message: 'Invalid RSS url passed' })
        }
        const rssJSON = await rssViewer.getRSS(rss_url)
        if (rssJSON.status && rssJSON.status === 'error') {
            res.status(412)
            res.json(rssJSON)
        } else {
            res.status(200)
            res.json(rssJSON)
        }
    } catch (error) {
        res.status(500)
        res.end()
    }
}

module.exports = {
    getRSS: _getRSS
}