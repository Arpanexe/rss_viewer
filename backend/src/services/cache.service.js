const { createClient } = require('redis')

class CacheService {
    constructor(host, port) {
        this.host = host
        this.port = port
        this.client = undefined
    }

    /**
     * Create connection with Redis server
     * @returns 
     */
    async connect() {
        //Check if connection already exits or not
        if (this.client) return this.client
        this.client = createClient({ socket: { host: this.host, port: this.port } })
        await this.client.connect()
        console.log(`Cache client is connected`)
    }

    /**
     * Check whether giver key exits or not
     * @param {String} key 
     * @returns Boolean
     */
    async isKeyExits(key) {
        await this.connect()
        return this.client.exists(key)
    }

    /**
     * Set key value in Redis
     * @param {String} key 
     * @param {String} value 
     * @param {Number} ttl 
     */
    async setKey(key, value, ttl) {
        await this.connect()
        await this.client.set(key, value, { EX: ttl || parseInt(process.env.CACHE_TTL) })
        console.log(`Key added in cache`)
    }

    /**
     * Get key from Redis
     * @param {String} key 
     * @returns Promise<String>
     */
    async getKey(key) {
        await this.connect()
        const resp = await this.client.get(key)
        console.log(`Key is fetched from cache`)
        return resp
    }
}

module.exports = CacheService