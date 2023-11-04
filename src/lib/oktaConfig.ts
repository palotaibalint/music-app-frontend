export const oktaConfig = {
    clientId: 'KJk9VJyVkpytcxdMsiBU6hGTothL9lJO',
    issuer: 'https://dev-sgxjgc87tlf6cgg5.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true,
}