import { ArrayUtils, GenericResource } from '@/common'
import { SwcUid } from '@/common/uid'
import { AuthService } from '@/client/services/AuthService'
import { HandleCheckResponse, HandleCheckResult } from './handleCheckResponse'
import { CharacterResponse, mapSwcResponseToCharacterResponse } from './characterResponse'
import { CharacterResponseSwc } from './characterResponseSwc'
import {
  TransferCreditsResponse,
  TransferCreditsResponseSwc,
  mapResponse as mapTransferCreditsResponse,
} from './transferCreditsResponse'
import {
  SendMessageResponseSwc,
  SendMessageResult,
  isSuccess,
  SendMessageResponseSwcSuccess,
} from './sendMessageResponse'
import { MessageResponse, MessageResponseSwc, mapResponse as mapMessageResponse } from './messageResponse'
import { SkillsResponseSwc, CharacterSkills, mapResponse as mapSkillsResponse } from './skillsResponse'
import {
  PrivilegesResponseSwc,
  CharacterPrivileges,
  mapResponse as mapPrivilegesResponse,
  PrivilegeResponseSwc,
} from './privilegesResponse'
import { PrivilegeDescriptor } from './privileges'

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

  /**
   * Get info on the current character. Requires at least the **character_read** OAuth scope. The data returned depends on the scopes that were granted.
   * @throws Error
   */
  async getCurrentCharacter(): Promise<CharacterResponse> {
    const response = await this.get<CharacterResponseSwc>('', await this.auth.getAccessToken())
    if ('error_code' in response.swcapi) {
      this.onApiError('GET character', response.swcapi.error_message)
    }

    return mapSwcResponseToCharacterResponse(response.swcapi.character)
  }

  /**
   * Get the current character's credit balance.
   * Requires the **character_credits** OAuth scope.
   * @throws Error
   */
  async getCredits(): Promise<number> {
    const response = await this.get<{ credits: number }>(
      `${this.auth.getUserId()}/credits`,
      await this.auth.getAccessToken(),
    )
    if ('error_code' in response.swcapi) {
      this.onApiError('GET credits', response.swcapi.error_message)
    }

    return response.swcapi.credits
  }

  /**
   * Transfer credits to someone else.
   * Requires the **character_credits_write** OAuth scope.
   * @throws Error
   * @param recipient {string} The name of the character or faction to send credits to.
   * @param amount {number} The amount of credits to send.
   * @param reason {string | undefined } Optional, The reason for the transfer. The name of the API client will be appended regardless of a reason being provided or not.
   */
  async transferCredits(recipient: string, amount: number, reason?: string): Promise<TransferCreditsResponse> {
    const response = await this.post<TransferCreditsResponseSwc>(
      `${this.auth.getUserId()}/credits`,
      { recipient, amount, reason },
      await this.auth.getAccessToken(),
    )

    if ('error_code' in response.swcapi) {
      this.onApiError('Transfer credits', response.swcapi.error_message)
    }

    return mapTransferCreditsResponse(response.swcapi)
  }

  /**
   * Send a message from a character.
   * Requires the **messages_send** OAuth scope.
   * @throws Error
   * @param recipients The recipient or recipients of the message. **note**: If sending a message in bulk, a separate API request will be sent for every 25 recipients.
   * @param communication Text of the message.
   */
  async sendMessage(recipients: string | string[], communication: string): Promise<SendMessageResult> {
    const recipientChunks = ArrayUtils.splitIntoChunks(Array.isArray(recipients) ? recipients : [recipients], 25)
    const result: SendMessageResult = {
      messagesAttempted: recipientChunks.map((chunk) => chunk.length).reduce((a, b) => a + b),
      totalSuccessfullySent: 0,
      successfullySentTo: [],
      failedToSendTo: [],
    }

    for (const recipientChunk of recipientChunks) {
      const response = await this.put<SendMessageResponseSwc>(
        `${this.auth.getUserId()}/messages`,
        {
          receivers: recipientChunk.join(';'),
          communication,
        },
        await this.auth.getAccessToken(),
      )
      if ('error_code' in response.swcapi) {
        this.onApiError('SEND message', response.swcapi.error_message)
      }

      if (!isSuccess(response.swcapi)) {
        result.failedToSendTo.push(...recipientChunk)
        continue
      }

      result.successfullySentTo.push(
        ...response.swcapi.result.data.successes.map((x) => ({ uid: new SwcUid(x.attributes.uid), name: x.value })),
      )
      const failedHandles = recipientChunk.filter((recipient) =>
        (response.swcapi as SendMessageResponseSwcSuccess).result.data.successes.every((x) => x.value != recipient),
      )
      result.failedToSendTo.push(...failedHandles)
    }

    result.totalSuccessfullySent = result.successfullySentTo.length
    return result
  }

  /**
   * Get a single messages that was sent or received.
   * Requires the **messages_read** OAuth scope.
   * @throws Error
   * @param uid {SwcUid} UID of the message
   */
  async getMessage(uid: SwcUid): Promise<MessageResponse> {
    const response = await this.get<MessageResponseSwc>(
      `${this.auth.getUserId()}/messages/${uid}`,
      await this.auth.getAccessToken(),
    )
    if ('error_code' in response.swcapi) {
      this.onApiError('GET message', response.swcapi.error_message)
    }
    return mapMessageResponse(response.swcapi)
  }

  /**
   * Delete a message that was sent or received.
   * Requires the **messages_delete** OAuth scope.
   * @throws Error
   * @param uid {SwcUid} UID of the message
   */
  async deleteMessage(uid: SwcUid): Promise<void> {
    const response = await this.delete<void>(
      `${this.auth.getUserId()}/messages/${uid}`,
      await this.auth.getAccessToken(),
    )
    if (!!response.swcapi && 'error_code' in response.swcapi) {
      this.onApiError('DELETE message', response.swcapi.error_message)
    }
  }

  /**
   * Get a list of the character's skills.
   * Requires the **character_skills** OAuth scope.
   * @throws Error
   */
  async getSkills(): Promise<CharacterSkills> {
    const response = await this.get<SkillsResponseSwc>(
      `${this.auth.getUserId()}/skills`,
      await this.auth.getAccessToken(),
    )
    if ('error_code' in response.swcapi) {
      this.onApiError('GET skills', response.swcapi.error_message)
    }
    return mapSkillsResponse(response.swcapi.skills)
  }

  /**
   * Get the specified (or current) character's privileges.
   * Requires the **character_privileges** OAuth scope.
   * @throws Error
   * @param characterUidOrName {SwcUid | string | undefined} name or UID of character. If not specified, will get the privileges for the current (authenticated) character.
   * @param factionId {number | undefined} Optional, the id of the faction you want to view the privileges for. Defaults to the token owner's own current primary faction
   */
  async getPrivileges(characterUidOrName?: SwcUid | string, factionId?: SwcUid): Promise<CharacterPrivileges> {
    const uid =
      characterUidOrName === undefined
        ? this.auth.getUserId()
        : characterUidOrName instanceof SwcUid
          ? characterUidOrName.uid
          : characterUidOrName

    const response = await this.get<PrivilegesResponseSwc>(
      `${uid}/privileges/${factionId ? `?faction_id=${factionId}` : ''}`,
      await this.auth.getAccessToken(),
    )
    if ('error_code' in response.swcapi) {
      this.onApiError('GET privileges', response.swcapi.error_message)
    }

    return mapPrivilegesResponse(response.swcapi.privileges)
  }

  /**
   * Check if the specified (or current) character has the specified privilege.
   * Requires the **character_privileges** OAuth scope.
   * @throws Error
   * @param privilege The privilege to check
   * @param characterUidOrName name or UID of the character. If not specified, checks the privilege against the current (authenticated) character.
   * @param factionId Optional, the id of the faction you want to check the privilege for. Defaults to the token owner's own current primary faction
   */
  async checkPrivilege(
    privilege: PrivilegeDescriptor,
    characterUidOrName?: SwcUid | string,
    factionId?: SwcUid,
  ): Promise<boolean> {
    const uid =
      characterUidOrName === undefined
        ? this.auth.getUserId()
        : characterUidOrName instanceof SwcUid
          ? characterUidOrName.uid
          : characterUidOrName

    const response = await this.get<PrivilegeResponseSwc>(
      `${uid}/privileges/${privilege.group}/${privilege.privilege}${factionId ? `?faction_id=${factionId}` : ''}`,
      this.auth.getAccessToken(),
    )
    if ('error_code' in response.swcapi) {
      this.onApiError('GET privilege', response.swcapi.error_message)
    }

    return response.swcapi.privilege.value === 'true'
  }

  /**
   * Grant the specified character the specified privilege
   * Requires the **character_privileges** OAuth scope.
   * @throws Error
   * @param privilege the privilege to grant
   * @param characterUidOrName name or UID of the character
   * @param factionId Optional, the id of the faction you want to grant the privilege for. Defaults to the token owner's own current primary faction
   */
  async grantPrivilege(
    privilege: PrivilegeDescriptor,
    characterUidOrName: SwcUid | string,
    factionId?: SwcUid,
  ): Promise<void> {
    const uid = characterUidOrName instanceof SwcUid ? characterUidOrName.uid : characterUidOrName

    const response = await this.post<void>(
      `${uid}/privileges/${privilege.group}/${privilege.privilege}${factionId ? `?faction_id=${factionId}` : ''}`,
      {},
      this.auth.getAccessToken(),
    )
    if (response.swcapi && 'error_code' in response.swcapi) {
      this.onApiError('GRANT privilege', response.swcapi.error_message)
    }
  }

  /**
   * Revoke the specified privilege from the specified character
   * Requires the **character_privileges** OAuth scope.
   * @throws Error
   * @param privilege the privilege to revoke
   * @param characterUidOrName name or UID of the character
   * @param factionId Optional, the id of the faction you want to revoke the privilege for. Defaults to the token owner's own current primary faction
   */
  async revokePrivilege(
    privilege: PrivilegeDescriptor,
    characterUidOrName: SwcUid | string,
    factionId?: SwcUid,
  ): Promise<void> {
    const uid = characterUidOrName instanceof SwcUid ? characterUidOrName.uid : characterUidOrName

    const response = await this.post<void>(
      `${uid}/privileges/${privilege.group}/${privilege.privilege}${factionId ? `?faction_id=${factionId}` : ''}`,
      { revoke: true },
      this.auth.getAccessToken(),
    )
    if (response.swcapi && 'error_code' in response.swcapi) {
      this.onApiError('REVOKE privilege', response.swcapi.error_message)
    }
  }
}
