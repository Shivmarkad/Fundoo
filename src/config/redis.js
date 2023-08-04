import { createClient } from 'redis';

export const client = createClient();

const redis = async () => {
    try {
        await client.connect();
        console.log("successfully connect to the redis client")

    } catch (error) {
        console.log("redis connection failed ", error);
    }
}

export default redis;
