import { GenericResource } from '@/common'
import { HandleCheckResponse, HandleCheckResult } from '@/character/handleCheckResponse'
import { SwcUid } from '@/common/uid'
import { AuthService } from '@/client/services/AuthService'
import { CharacterResponse, mapSwcResponseToCharacterResponse } from '@/character/characterResponse'
import { CharacterResponseSwc } from '@/character/characterResponseSwc'

export type CharacterResource<TOAuth extends boolean> = TOAuth extends true
  ? AuthenticatedCharacterResource
  : PublicCharacterResource

export class PublicCharacterResource extends GenericResource {
  public constructor() {
    super('character')
  }

  async handleCheck(handle: string): Promise<HandleCheckResult | undefined> {
    const response = await this.get<HandleCheckResponse>(`handlecheck/${handle}`)
    if ('error_code' in response.swcapi) {
      return undefined
    }

    return { handle: response.swcapi.character.handle, uid: new SwcUid(response.swcapi.character.uid) }
  }
}

export class AuthenticatedCharacterResource extends PublicCharacterResource {
  private auth: AuthService

  constructor(auth: AuthService) {
    super()

    this.auth = auth
  }

  async getCurrentCharacter(): Promise<CharacterResponse> {
    const accessToken = await this.auth.getAccessToken()
    const response = await this.get<CharacterResponseSwc>('character', accessToken)
    if ('error_code' in response.swcapi) {
      throw new Error(
        `Something went wrong while attempting to call the GET character endpoint: ${response.swcapi.error_message}`,
      )
    }

    return mapSwcResponseToCharacterResponse(response.swcapi)
  }
}
