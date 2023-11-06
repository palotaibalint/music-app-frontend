export const oktaConfig = {
    clientId: '0oad45q2epflty5jD5d7',
    issuer: 'https://dev-73176178.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true,
}