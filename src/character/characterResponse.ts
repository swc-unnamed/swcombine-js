import { SwcUid } from '@/common/uid'
import { SwcTimestamp } from '@/timestamps/SwcTimestamp'
import { CharacterResponseSwcCharacter } from './characterResponseSwc'
import { CharacterPrivileges, mapResponse as mapPrivileges } from './privilegesResponse'
import { CharacterSkills, mapResponse as mapSkills } from './skillsResponse'

export interface CharacterResponse {
  /** Unique ID referring to this character */
  uid: SwcUid
  /** Character's handle. Always available */
  name: string
  /** Link to the character's avatar. Always available. */
  image: string

  /** The character's current HP. Visible if you have the character_stats scope. */
  hp?: number
  /** The character's maximum HP. Visible if you have the character_stats scope. */
  maxHp?: number
  /** The character's current XP. Visible if you have the character_stats scope. */
  xp?: number
  /** The character's current level. Visible if you have the character_stats scope. */
  level?: number

  /** Whether the character's profile is private. */
  isProfilePrivate: boolean
  /** The character's gender. Visible if their profile is NOT private. */
  gender?: 'Male' | 'Female'
  /** The character's biography. Visible if their profile is NOT private. */
  biography?: string
  /** Last login time of this character. Visible if their profile is NOT private. */
  lastLogin?: SwcTimestamp
  /** short description for this character. Visible if their profile is NOT private. */
  shortDescription?: string
  /** The character's race. Visible if their profile is NOT private. */
  race?: { uid: SwcUid; name: string }
  /** Whether the character is aware of the force. Visible if you have the character_force scope. */
  isForceAware?: boolean

  /** The character's factions. Always visible. */
  factions: Array<CharacterFaction>

  /** The character's skill sheet. Visible if you have the character_skills scope. */
  skills?: CharacterSkills

  /** The character's privileges within their factions. Visible if you have the character_privileges scope. */
  privileges?: CharacterPrivileges

  /** The amount of credits the character has. Visible if you have the character_location scope. */
  location?: CharacterLocation

  /** The amount of credits the character has. Visible if you have the character_credits scope. */
  credits?: number
}

interface CharacterFaction {
  uid: SwcUid
  name: string
  isPrimary: boolean
}

interface CharacterLocation {
  container?: {
    type: 'ship' | 'vehicle' | 'station' | 'facility'
    uid: SwcUid
    name: string
  }
  sector?: {
    uid: SwcUid
    name: string
  }
  system?: {
    uid: SwcUid
    name: string
  }
  planet?: {
    uid: SwcUid
    name: string
  }
  city?: {
    uid: SwcUid
    name: string
  }
  coordinates: {
    galaxy: { x: number | null; y: number | null }
    system: { x: number | null; y: number | null }
    surface: { x: number | null; y: number | null }
    ground: { x: number | null; y: number | null }
  }
}

export function mapSwcResponseToCharacterResponse(swc: CharacterResponseSwcCharacter): CharacterResponse {
  return {
    uid: new SwcUid(swc.uid),
    name: swc.name,
    image: swc.image,

    hp: swc.health,
    maxHp: swc.healthMax,
    xp: swc.XP,
    level: swc.XPLevel,

    isProfilePrivate: swc.attributes.isprivate === 'true',
    gender: swc.gender,
    biography: swc.biography,
    lastLogin: !swc.lastlogin
      ? undefined
      : SwcTimestamp.fromUnixTimestamp(Number.parseInt(swc.lastlogin.timestamp, 10)),
    shortDescription: swc.shortdescription,
    race: !swc.race.value ? undefined : { uid: new SwcUid(swc.race.attributes!.uid), name: swc.race.value },
    isForceAware: !swc.force?.attributes?.isAware ? undefined : swc.force.attributes.isAware === 'true',
    credits: !swc.credits.value ? undefined : swc.credits.value,

    factions: mapSwcFactions(swc.factions),
    skills: swc.skills?.value ? mapSkills(swc.skills.value) : undefined,
    privileges: swc.privileges?.value ? mapPrivileges(swc.privileges.value) : undefined,
    location: mapSwcLocation(swc.location),
  }
}

function mapSwcFactions(factions: CharacterResponseSwcCharacter['factions']): CharacterResponse['factions'] {
  if (factions === undefined || factions.length === 0) {
    return []
  }

  return factions.map((faction) => ({
    uid: new SwcUid(faction.attributes.uid),
    name: faction.value,
    isPrimary: faction.primary,
  }))
}

function mapSwcLocation(location: CharacterResponseSwcCharacter['location']): CharacterResponse['location'] {
  if (!location) return undefined

  return {
    container: !location.container.value
      ? undefined
      : {
          uid: new SwcUid(location.container.attributes!.uid),
          name: location.container.value,
          type: location.container.attributes!.type,
        },
    sector: !location.sector?.value
      ? undefined
      : { uid: new SwcUid(location.sector.attributes!.uid), name: location.sector.value },
    system: !location.system?.value
      ? undefined
      : { uid: new SwcUid(location.system.attributes!.uid), name: location.system.value },
    planet: !location.planet?.value
      ? undefined
      : { uid: new SwcUid(location.planet.attributes!.uid), name: location.planet.value },
    city: !location.city?.value
      ? undefined
      : { uid: new SwcUid(location.city.attributes!.uid), name: location.city.value },
    coordinates: {
      galaxy: parseCoords(location.coordinates.galaxy.attributes?.x, location.coordinates.galaxy.attributes?.y),
      system: parseCoords(location.coordinates.system.attributes?.x, location.coordinates.system.attributes?.y),
      surface: parseCoords(location.coordinates.surface.attributes?.x, location.coordinates.surface.attributes?.y),
      ground: parseCoords(location.coordinates.ground.attributes?.x, location.coordinates.ground.attributes?.y),
    },
  }
}

function parseCoords(x?: string | number | null, y?: string | number | null): { x: number | null; y: number | null } {
  if (x === null || x === undefined || y === null || y === undefined) return { x: null, y: null }

  const intX = typeof x === 'number' ? x : Number.parseInt(x, 10)
  const intY = typeof y === 'number' ? y : Number.parseInt(y, 10)
  if (!Number.isFinite(intX) || !Number.isFinite(intY)) return { x: null, y: null }
  return { x: intX, y: intY }
}
