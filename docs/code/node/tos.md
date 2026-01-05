---
outline: deep
---


::: details 代码

```ts
import type {FastifyInstance, FastifyPluginCallback} from 'fastify'
import process from 'node:process'
import {TosClient, TosClientError, TosServerError} from '@volcengine/tos-sdk'
import fp from 'fastify-plugin'

const Tos: FastifyPluginCallback = fp(async (fastify) => {
    // 检查必要的环境变量
    const accessKeyId = process.env.TOS_ACCESS_KEY;
    const accessKeySecret = process.env.TOS_SECRET_KEY;
    const region = process.env.TOS_REGION;
    const bucket = process.env.TOS_BUCKET;

    if (!accessKeyId || !accessKeySecret || !region || !bucket) {
        fastify.log.warn('TOS configuration incomplete, skipping client initialization');
        return;
    }

    const client = new TosClient({
        accessKeyId,
        accessKeySecret,
        region,
        bucket,
    })

    // 给所有 SDK 方法包一层 try/catch，业务方无需再手动捕获
    const clientWithAutoCatch = new Proxy(client, {
        get(target: TosClient, prop) {
            const value = (target as any)[prop]

            if (typeof value !== 'function') {
                return value
            }

            return function (...args: any[]) {
                try {
                    const result = value.apply(target, args)
                    if (result && typeof result.then === 'function') {
                        return result.catch((error: TosClientError | TosServerError) => {
                            handleError(error, fastify)
                            throw error
                        })
                    }
                    return result
                } catch (error: any) {
                    handleError(error, fastify)
                    throw error
                }
            }
        },
    })

    fastify.decorate('Tos', () => {
        return clientWithAutoCatch
    })

    fastify.decorate('tosHandleError', (e: TosClientError) => {
        handleError(e, fastify)
    })
})

function handleError(
    error: TosClientError | TosServerError,
    fastify: FastifyInstance
) {
    if (error instanceof TosClientError) {
        fastify.log.error(`Client Err Msg:${error.message}`)
        fastify.log.error(`Client Err Stack:${error.stack}`)
    } else if (error instanceof TosServerError) {
        fastify.log.error(`Request ID:${error.requestId}`)
        fastify.log.error(`Response Status Code:${error.statusCode}`)
        fastify.log.error(`Response Header:${error.headers}`)
        fastify.log.error(`Response Err Code:${error.code}`)
        fastify.log.error(`Response Err Msg:${error.message}`)
    } else {
        fastify.log.error('unexpected exception, message: ', error)
    }
}

export default Tos
```
:::
