import { SwcPrivileges } from './privilegesResponse'
import { SwcSkills } from './skillsResponse'

export interface CharacterResponseSwc {
  character: CharacterResponseSwcCharacter
}

export interface CharacterResponseSwcCharacter {
  name: string
  image: string
  gender?: 'Male' | 'Female'
  biography?: string
  uid: string
  attributes: {
    isprivate: 'true' | 'false'
    isbasic: 'true' | 'false'
  }
  lastlogin?: {
    years: number
    days: number
    hours: number
    mins: number
    secs: number
    timestamp: string
  }
  shortdescription?: string
  race: {
    attributes?: { uid: string }
    value?: string
  }
  health?: number
  healthMax: number
  XP: number
  XPLevel: number
  force: {
    attributes?: {
      isAware: 'true' | 'false'
    }
  }
  faction: {
    attributes?: {
      uid: string
    }
    value?: string
  }
  factions?: Array<{ attributes: { uid: string }; value: string; primary: boolean }>
  skills: {
    value?: SwcSkills
  }
  privileges: {
    value?: SwcPrivileges
  }
  location?: {
    container: {
      value?: string
      attributes?: {
        uid: string
        type: 'ship' | 'vehicle' | 'station' | 'facility'
      }
    }
    sector: {
      value?: string
      attributes?: {
        uid: string
        type: 'sector'
      }
    }
    system: {
      value?: string
      attributes?: {
        uid: string
        type: 'system' | 'asteroid field' | 'deep space'
      }
    }
    planet: {
      value?: string
      attributes?: {
        uid: string
      }
    }
    city: {
      value?: string
      attributes?: {
        uid: string
      }
    }
    coordinates: {
      galaxy: {
        attributes: { x: number | null; y: number | null }
      }
      system: {
        attributes: { x: string | null; y: string | null }
      }
      surface: {
        attributes: { x: string | null; y: string | null }
      }
      ground: {
        attributes: { x: string | null; y: string | null }
      }
    }
  }
  credits: {
    value?: number
  }
}
