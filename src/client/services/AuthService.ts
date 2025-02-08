export interface OAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  /** Indicates if your application needs to access a Resource when the user is not present at the browser. This parameter defaults to online. If your application needs to refresh access tokens when the user is not present at the browser, then use offline. This will result in your application obtaining a refresh token the first time your application exchanges an authorization code for a user. */
  accessType: 'online' | 'offline'
  /** Indicates whether previously granted permissions should be renewed if not explicitly included within the scope parameter. Defaults to not renewing previously granted permissions. **/
  renewPreviouslyGranted?: boolean
  /** Indicates the resource access your application is requesting. The values passed in this parameter inform the consent page shown to the user. There is an inverse relationship between the number of permissions requested and the likelihood of obtaining user consent */
  defaultScopes?: string[]
}

export interface TokenInfo {
  accessToken: string
  refreshToken?: string
  expiryTime: Date
}

type TokenResponse = { access_token: string; expires_in: number; refresh_token?: string }

export class AuthService {
  private config: OAuthConfig
  private tokenInfo?: TokenInfo

  public constructor(config: OAuthConfig) {
    this.config = config
  }

  public get isAuthenticated(): boolean {
    if (!this.tokenInfo) return false

    if (new Date() >= this.tokenInfo.expiryTime && !this.tokenInfo.refreshToken) {
      this.tokenInfo = undefined
      return false
    }

    return true
  }

  public async getAccessToken(): Promise<string> {
    if (this.tokenInfo && new Date() < this.tokenInfo.expiryTime) {
      return this.tokenInfo.accessToken
    }

    if (!this.tokenInfo?.refreshToken) {
      this.tokenInfo = undefined
      throw new Error(
        'No access token available or access token has expired, and no refresh token is available to refresh it.',
      )
    }

    await this.refreshToken()
    return this.tokenInfo.accessToken
  }

  /**
   *
   * @param scopesToRequest Indicates the resource access your application is requesting. The values passed in this parameter inform the consent page shown to the user. There is an inverse relationship between the number of permissions requested and the likelihood of obtaining user consent
   * @param stateToAdd Indicates any state which may be useful to your application upon receipt of the response. The Web Service Authorization Server roundtrips this parameter, so your application receives the same value it sent. Possible uses include redirecting the user to the correct resource in your site, nonces, and cross-site-request-forgery mitigations.
   */
  public getAuthorizationUrl(scopesToRequest?: string[], stateToAdd?: string): string {
    const params = new URLSearchParams()
    params.append('response_type', 'code')
    params.append('client_id', this.config.clientId)
    params.append('redirect_uri', this.config.redirectUri)
    params.append('state', stateToAdd || '')
    params.append('scope', (this.config.defaultScopes || []).concat(scopesToRequest || []).join(' '))
    params.append('access_type', this.config.accessType)
    params.append('renew_previously_granted', this.config.renewPreviouslyGranted ? 'yes' : 'no')
    return `https://www.swcombine.com/ws/oauth2/auth/?${params.toString()}`
  }

  public async exchangeCode(code: string): Promise<void> {
    const form = new FormData()
    form.append('grant_type', 'authorization_code')
    form.append('code', code)
    form.append('client_id', this.config.clientId)
    form.append('client_secret', this.config.clientSecret)
    form.append('redirect_uri', this.config.redirectUri)
    form.append('access_type', this.config.accessType)

    const response = await fetch('https://www.swcombine.com/ws/oauth2/token/', {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Something went wrong while attempting to exchange an authorization code for an access token.')
    }

    const payload = (await response.json()) as TokenResponse
    this.tokenInfo = {
      accessToken: payload.access_token,
      expiryTime: new Date(new Date().getTime() + payload.expires_in * 1000),
      refreshToken: payload.refresh_token,
    }
  }

  public setTokenInfo(tokenInfo: TokenInfo) {
    this.tokenInfo = tokenInfo
  }

  public getTokenInfo(): TokenInfo | undefined {
    return this.tokenInfo ? { ...this.tokenInfo } : undefined
  }

  private async refreshToken(): Promise<void> {
    if (!this.tokenInfo || !this.tokenInfo.refreshToken || this.config.accessType !== 'offline') {
      throw new Error('Cannot refresh access token.')
    }

    const form = new FormData()
    form.append('grant_type', 'refresh_token')
    form.append('access_type', this.config.accessType)
    form.append('client_id', this.config.clientId)
    form.append('client_secret', this.config.clientSecret)
    form.append('refresh_token', this.tokenInfo.refreshToken)

    const response = await fetch('https://www.swcombine.com/ws/oauth2/token/', {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Something went wrong while attempting to exchange a refresh token to an access token.')
    }

    const payload = (await response.json()) as TokenResponse
    this.tokenInfo = {
      accessToken: payload.access_token,
      expiryTime: new Date(new Date().getTime() + payload.expires_in * 1000),
      refreshToken: payload.refresh_token,
    }
  }
}
