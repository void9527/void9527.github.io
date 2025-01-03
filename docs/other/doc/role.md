---
outline: deep
---
# 后端鉴权模型

## JWT（JSON Web Token）

- **说明**：JWT 是一种开放标准（RFC 7519），用于在各方之间作为 JSON 对象安全地传输信息。信息可以被验证和信任，因为它是经过数字签名的。
- **适用场景**：适用于需要在客户端和服务器之间传递信息的场景，尤其是无状态的分布式系统。
- **优点**：无状态，易于扩展，支持跨域。
- **缺点**：令牌一旦签发，无法撤销，可能导致安全风险。

:::details
Json web token (JWT)是为了网络应用环境间传递声明而执行的一种基于JSON的开发标准（RFC7519），该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT的声明一般被用来在身份提供和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可以直接被用于认证，也可以加密。

- 传统的登录保持与接口权限是如何实现的？
  - 用户向服务器发送用户名和密码。
  - 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
  - 服务器向用户返回一个session_id，写入用户Cookie。
  - 用户随后的每一次请求，都会通过Cookie，将session_id传回服务器。
  - 服务器收到session_id，找到前期保存的数据，由此得知用户的身份。
- JWT的特点
  - JWT默认是不加密，但也是可以加密的。生成原始Token以后，可以用密钥在加密一次。
  - JWT不加密的情况下，不能将秘密数据写入JWT。
  - JWT不仅可以用于认证，也可以用于交换信息。有效使用JWT，可以降低服务器查询数据库的次数。
  - JWT的最大缺点是，由服务器不保存session状态，因此无法在使用过程中废止某个token，或者更改token权限。也就是说，一旦JWT签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
  - JWT本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
  - 为了减少盗用，JWT不应该使用HTTP协议明码传输，要使用HTTPS协议传输。

:::

## [OAuth 2.0](/other/doc/oauth)

- **说明**：OAuth 2.0 是一种授权框架，允许第三方应用程序在用户的授权下访问用户的资源，而无需暴露用户的凭据。
- **适用场景**：适用于需要第三方应用访问用户资源的场景，如社交媒体登录。
- **优点**：安全性高，用户体验好，支持多种授权模式。
- **缺点**：实现复杂，依赖于 HTTPS。

## SAML（Security Assertion Markup Language）

- **说明**：SAML 是一种基于 XML 的开放标准，用于在身份提供者和服务提供者之间交换认证和授权数据。
- **适用场景**：适用于企业级应用和单点登录（SSO）场景。
- **优点**：支持单点登录，安全性高。
- **缺点**：实现复杂，依赖于 XML。

## API Key

- **说明**：API Key 是一种简单的鉴权机制，通过在请求中包含一个唯一的密钥来验证请求者的身份。
- **适用场景**：适用于简单的 API 访问控制。
- **优点**：实现简单，易于使用。
- **缺点**：安全性较低，密钥容易被泄露。

## Session-Based Authentication

- **说明**：基于会话的认证通过在服务器上存储用户的会话信息来管理用户的登录状态。
- **适用场景**：适用于需要保持用户登录状态的传统 Web 应用。
- **优点**：安全性高，支持会话管理。
- **缺点**：服务器需要存储会话信息，增加了服务器负担。

## OpenID Connect

- **说明**：OpenID Connect 是基于 OAuth 2.0 的身份层，允许客户端验证用户的身份并获取用户的基本信息。
- **适用场景**：适用于需要用户身份验证的场景，如社交登录。
- **优点**：安全性高，用户体验好，支持多种身份提供者。
- **缺点**：实现复杂，依赖于 HTTPS。
