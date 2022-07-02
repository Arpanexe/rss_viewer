const RemoteService = require('./remote.service')
const CacheService = require('./cache.service')
class RSSViewerService {
    constructor() {
        //Initialize remote service with base URL
        this.remoteService = new RemoteService(process.env.RSS_API_URL)
        //Initialize cache service with host and port
        this.cacheService = new CacheService(process.env.REDIS_HOST, process.env.REDIS_PORT)
    }

    /**
     * Get RSS feed from URL
     * @param {String} url 
     * @returns Promise<Any>
     */
    async getRSS(url) {
        try {
            const isCacheExist = await this.cacheService.isKeyExits(url)
            //Check whether RSS is already in cache
            if (isCacheExist) {
                //If RSS is available in cache, get it from cache
                const cacheValue = await this.cacheService.getKey(url)
                return JSON.parse(cacheValue)
            } else {
                //If RSS is not available in cache, fetch using remote service 
                const rssJSON = await this.remoteService.get(url)
                if (rssJSON.status === 'ok') {
                    const value = JSON.stringify(rssJSON)
                    //Add RSS feed in cache
                    await this.cacheService.setKey(url, value)
                }
                return rssJSON
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = RSSViewerService