---
outline: deep
---

## [文档](https://help.aliyun.com/zh/oss/user-guide/simple-upload?spm=a2c4g.11186623.help-menu-31815.d_0_3_1_0.167f23bbKFnQwD#0ae4d697938u6)
::: details 代码

```ts
import type {FastifyInstance} from 'fastify'
import process from 'node:process'
import OSS, {type PutResult} from 'ali-oss'
import fp from 'fastify-plugin'

const Oss = fp(async (fastify: FastifyInstance) => {
    // 检查必要的环境变量
    const region = process.env.OSS_REGION
    const accessKeyId = process.env.OSS_ACCESS_KEY_ID
    const accessKeySecret = process.env.OSS_SECRET_ACCESS_KEY
    const bucket = process.env.OSS_BUCKET

    if (!region || !accessKeyId || !accessKeySecret || !bucket) {
        fastify.log.warn(
            'OSS configuration incomplete, skipping client initialization'
        )
        // 即使配置不完整，也要装饰一个空的Oss方法以避免未定义错误
        fastify.decorate('Oss', () => {
            throw new Error('OSS configuration is incomplete. Please set OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, and OSS_BUCKET environment variables.')
        })
        return
    }

    const client = new OSS({
        region,
        accessKeyId,
        accessKeySecret,
        authorizationV4: true,
        // 填写Bucket名称。
        bucket,
    })
    // 自定义请求头
    const headers = {
        // 指定Object的存储类型。
        'x-oss-storage-class': 'Standard',
        // 指定Object的访问权限。  上传以后的资源访问权限。此处设置为public-read，表示开启公共读，所有用户都允许访问。prvate，表示访问链接需要携带签名才能访问。
        'x-oss-object-acl': 'public-read',
        // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
        'x-oss-forbid-overwrite': 'false',
        'Content-Disposition': '',
    }

    // 保存原始的 put 方法
    const originalPut = client.put.bind(client)

    client.put = async (
        objectName: string,
        filePath: string
    ): Promise<PutResult> => {
        headers['Content-Disposition'] = `attachment; filename="${objectName}"`
        try {
            return await originalPut(objectName, filePath, {headers})
        } catch (e) {
            fastify.log.error(e)
            throw e
        }
    }
    fastify.decorate('Oss', () => {
        return client
    })
})
export default Oss

```
:::
