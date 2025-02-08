import { PublicApiResource } from '@/api/ApiResource'
import {
  AuthenticatedCharacterResource,
  CharacterResource,
  PublicCharacterResource,
} from '@/character/CharacterResource'
import { AuthService, OAuthConfig } from '@/client/services/AuthService'

export class SwcClient<TOAuth extends boolean> {
  api: PublicApiResource
  character: CharacterResource<TOAuth>

  protected constructor() {
    this.api = new PublicApiResource()
    this.character = new PublicCharacterResource() as CharacterResource<TOAuth>
  }

  static public(): SwcClient<false> {
    return new SwcClient()
  }

  static withOAuth(oAuthConfig: OAuthConfig): SwcClientWithOAuth {
    return new SwcClientWithOAuth(oAuthConfig)
  }
}

export class SwcClientWithOAuth extends SwcClient<true> {
  auth: AuthService

  public constructor(config: OAuthConfig) {
    super()

    this.auth = new AuthService(config)
    this.character = new AuthenticatedCharacterResource()
  }
}
