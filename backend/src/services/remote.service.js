const axios = require('axios').default
const url = require('url')

class RemoteService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL
        })
    }

    /**
     * Get RSS feed for given URL
     * @param {String} rssURL 
     * @returns Promise<Any>
     */
    async get(rssURL) {
        try {
            const json = await this.client.get(`v1/api.json?rss_url=${rssURL}`)
            console.log(`Fetched data from RSS feed`)
            return json.data
        } catch (error) {
            console.error(error)
            if (error.response && error.response.data) {
                return error.response.data
            }
            else throw error
        }
    }
}

module.exports = RemoteService