const chai = require('chai')
const sinon = require('sinon')
const mocha = require('mocha')
const expect = chai.expect
chai.use(require('chai-as-promised'))
const sandbox = sinon.createSandbox()

const RSSViewerService = require('../src/services/rss-viewer.service')
const RemoteService = require('../src/services/remote.service')
const CacheService = require('../src/services/cache.service')

let rssViewer = undefined
let remoteService = undefined
let cacheService = undefined

mocha.describe(`RSS-Viewer Service Test: Positive Scenario`, () => {
    let testURL = `http://feeds.test.com/news/rss.xml`
    let successResponse = {
        "status": "ok",
        "feed": {
            "url": "http://feeds.bbci.co.uk/news/rss.xml",
            "title": "BBC News - Home",
            "link": "https://www.bbc.co.uk/news/",
            "author": "",
            "description": "BBC News - Home",
            "image": "https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif"
        },
        "items": [{
            "title": "Texas migrant deaths: Truck driver 'unaware air conditioner had stopped working'",
            "pubDate": "2022-07-02 00:23:25",
            "link": "https://www.bbc.co.uk/news/world-us-canada-62018517?at_medium=RSS&at_campaign=KARANGA",
            "guid": "https://www.bbc.co.uk/news/world-us-canada-62018517",
            "author": "",
            "thumbnail": "",
            "description": "A police informant says he was told that the driver was \"unaware\" the air conditioning had failed.",
            "content": "A police informant says he was told that the driver was \"unaware\" the air conditioning had failed.",
            "enclosure": {},
            "categories": []
        }]
    }
    //const testURL = `http://feeds.test.com/news/rss.xml`

    mocha.beforeEach(() => {
        sandbox.stub(console, 'log')
        sandbox.stub(console, 'info')
        sandbox.stub(console, 'error')

        remoteService = new RemoteService()
        cacheService = new CacheService()
        sandbox.stub(cacheService, 'isKeyExits').resolves(true)
        sandbox.stub(cacheService, 'getKey').resolves(JSON.stringify(successResponse))
        sandbox.stub(cacheService, 'setKey').resolves()

        sandbox.stub(remoteService, 'get').resolves(successResponse)
    })

    mocha.afterEach(function () {
        sandbox.restore()
    })

    mocha.it('Test: Valid RSS URL pass-1', async () => {
        rssViewer = new RSSViewerService()
        const data = await rssViewer.getRSS(testURL)
        expect(data).to.have.property('status', 'ok', 'Data should have code')
    })

})
//mocha.describe(`RSS-Viewer Controller Test: Negative Scenario`, () => { })