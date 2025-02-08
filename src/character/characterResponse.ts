import { SwcUid } from '@/common/uid'
import { SwcTimestamp } from '@/timestamps/SwcTimestamp'
import { CharacterResponseSwcCharacter } from '@/character/characterResponseSwc'

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
  factionPrivileges?: CharacterFactionPrivileges

  /** The amount of credits the character has. Visible if you have the character_location scope. */
  location?: CharacterLocation

  /** The amount of credits the character has. Visible if you have the character_credits scope. */
  credits?: number
}

export interface CharacterFaction {
  uid: SwcUid
  name: string
  isPrimary: boolean
}

export interface CharacterSkills {
  strength: SkillLevel
  dexterity: SkillLevel
  speed: SkillLevel
  dodge: SkillLevel
  projectileWeapons: SkillLevel
  nonProjectileWeapons: SkillLevel

  medical: SkillLevel
  diplomacy: SkillLevel
  crafting: SkillLevel
  management: SkillLevel
  perception: SkillLevel
  stealth: SkillLevel

  rndHull: SkillLevel
  rndElectronics: SkillLevel
  rndEngines: SkillLevel
  rndWeapons: SkillLevel
  repair: SkillLevel
  computerOperations: SkillLevel

  fighterPiloting: SkillLevel
  fighterCombat: SkillLevel
  capitalPiloting: SkillLevel
  capitalCombat: SkillLevel
  spaceCommand: SkillLevel

  vehiclePiloting: SkillLevel
  vehicleCombat: SkillLevel
  infantryCommand: SkillLevel
  vehicleCommand: SkillLevel
  heavyWeapons: SkillLevel
}

type CharacterFactionPrivileges = {
  factionId: number
  factionName: string
  privilegeCount: number
  privileges: {
    setInfoFields: boolean
    viewMemberList: boolean
    acceptOrDeclineMembers: boolean
    expelMembers: boolean
    isFactionLeader: boolean

    viewCredits: boolean
    sendCredits: boolean
    viewTransactions: boolean
    viewBudgets: boolean
    modifyBudgets: boolean
    setTaxLevels: boolean
    operateVendors: boolean

    givePrivileges: boolean
    changePasscode: boolean
    protectAssets: boolean
    combatEvents: boolean
    manageTemplates: boolean
    canSeeOverview: boolean
    canViewPanelRequests: boolean

    enforceArrestWarrant: boolean
    enforceDeathWarrant: boolean
    releasePrisoners: boolean
    issueArrestWarrant: boolean
    issueDeathWarrant: boolean
    modifyFriendFoeList: boolean
    hasSecurityAuthorisation: boolean

    postGnsSocial: boolean
    postGnsMilitary: boolean
    postGnsPolitics: boolean
    postGnsEconomics: boolean
    gnsCensorship: boolean

    produceInFacilities: boolean
    produceInStations: boolean
    canAbortProduction: boolean
    assignDatacards: boolean
    revokeAssignedDatacards: boolean
    constructFacilities: boolean
    constructCities: boolean
    constructStations: boolean
    canAbortConstruction: boolean
    performAsteroidMining: boolean
    performRecycling: boolean

    purchaseNpcs: boolean
    editNpcs: boolean
    fireNpcs: boolean

    isSecondInCommand: boolean

    assignTags: boolean
    renameTags: boolean
    createTags: boolean
    deleteTags: boolean

    viewCombatReports: boolean
    launchGarrisonSquad: boolean
    modifyGarrisonReserve: boolean

    launchCargoSquad: boolean
    linkCargoBase: boolean
    viewCargoSquad: boolean

    changeFactionProfile: boolean
    renameFaction: boolean
    factionCustomImages: boolean

    createSubfactions: boolean
    manageSubfactionMembers: boolean
    subfactionFullPrivileges: boolean
    manageFactionModules: boolean
    manageAlliance: boolean

    viewShips: boolean
    assignShips: boolean
    renameShips: boolean
    makeoverShips: boolean

    viewVehicles: boolean
    assignVehicles: boolean
    renameVehicles: boolean
    makeoverVehicles: boolean

    viewItems: boolean
    assignItems: boolean
    renameItems: boolean
    makeoverItems: boolean

    viewDroids: boolean
    assignDroids: boolean
    renameDroids: boolean
    makeoverDroids: boolean

    viewStations: boolean
    assignStations: boolean
    renameStations: boolean
    makeoverStations: boolean
    stationControlRoom: boolean
    manageStationPermissions: boolean

    viewFacilities: boolean
    assignFacilities: boolean
    renameFacilities: boolean
    makeoverFacilities: boolean
    facilityControlRoom: boolean
    manageFacilityPermissions: boolean

    viewMaterials: boolean
    assignMaterials: boolean
    renameMaterials: boolean
    makeoverMaterials: boolean

    viewNpcs: boolean
    assignNpcs: boolean
    renameNpcs: boolean
    makeoverNpcs: boolean

    viewCities: boolean
    assignCities: boolean
    renameCities: boolean
    makeoverCities: boolean
    manageCityPermissions: boolean

    viewCreatures: boolean
    assignCreatures: boolean
    renameCreatures: boolean
    makeoverCreatures: boolean

    viewPlanets: boolean
    assignPlanets: boolean

    viewStocks: boolean
    makeoverStocks: boolean

    viewDatacards: boolean
  }
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

type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5

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
    skills: mapSwcSkills(swc.skills),
    factionPrivileges: mapSwcPrivileges(swc.privileges),
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

function mapSwcSkills(skills: CharacterResponseSwcCharacter['skills']): CharacterResponse['skills'] {
  if (!skills.value) {
    return undefined
  }

  return {
    strength: skills.value.general[0].skill.find((x) => x.attributes.type === 'strength')!.value,
    dexterity: skills.value.general[0].skill.find((x) => x.attributes.type === 'dexterity')!.value,
    speed: skills.value.general[0].skill.find((x) => x.attributes.type === 'speed')!.value,
    dodge: skills.value.general[0].skill.find((x) => x.attributes.type === 'dodge')!.value,
    projectileWeapons: skills.value.general[0].skill.find((x) => x.attributes.type === 'projectile')!.value,
    nonProjectileWeapons: skills.value.general[0].skill.find((x) => x.attributes.type === 'nonProjectile')!.value,

    medical: skills.value.social[0].skill.find((x) => x.attributes.type === 'medical')!.value,
    diplomacy: skills.value.social[0].skill.find((x) => x.attributes.type === 'diplomacy')!.value,
    crafting: skills.value.social[0].skill.find((x) => x.attributes.type === 'crafting')!.value,
    management: skills.value.social[0].skill.find((x) => x.attributes.type === 'management')!.value,
    perception: skills.value.social[0].skill.find((x) => x.attributes.type === 'perception')!.value,
    stealth: skills.value.social[0].skill.find((x) => x.attributes.type === 'stealth')!.value,

    rndHull: skills.value.science[0].skill.find((x) => x.attributes.type === 'rndHull')!.value,
    rndElectronics: skills.value.science[0].skill.find((x) => x.attributes.type === 'rndElectronics')!.value,
    rndEngines: skills.value.science[0].skill.find((x) => x.attributes.type === 'rndEngines')!.value,
    rndWeapons: skills.value.science[0].skill.find((x) => x.attributes.type === 'rndWeapons')!.value,
    repair: skills.value.science[0].skill.find((x) => x.attributes.type === 'repair')!.value,
    computerOperations: skills.value.science[0].skill.find((x) => x.attributes.type === 'compOps')!.value,

    fighterPiloting: skills.value.space[0].skill.find((x) => x.attributes.type === 'fighterPiloting')!.value,
    fighterCombat: skills.value.space[0].skill.find((x) => x.attributes.type === 'fighterCombat')!.value,
    capitalPiloting: skills.value.space[0].skill.find((x) => x.attributes.type === 'capitalPiloting')!.value,
    capitalCombat: skills.value.space[0].skill.find((x) => x.attributes.type === 'capitalCombat')!.value,
    spaceCommand: skills.value.space[0].skill.find((x) => x.attributes.type === 'spaceCommand')!.value,

    vehiclePiloting: skills.value.ground[0].skill.find((x) => x.attributes.type === 'vehiclePiloting')!.value,
    vehicleCombat: skills.value.ground[0].skill.find((x) => x.attributes.type === 'vehicleCombat')!.value,
    infantryCommand: skills.value.ground[0].skill.find((x) => x.attributes.type === 'infantryCommand')!.value,
    vehicleCommand: skills.value.ground[0].skill.find((x) => x.attributes.type === 'vehicleCommand')!.value,
    heavyWeapons: skills.value.ground[0].skill.find((x) => x.attributes.type === 'heavyWeapons')!.value,
  }
}

function mapSwcPrivileges(
  privileges: CharacterResponseSwcCharacter['privileges'],
): CharacterResponse['factionPrivileges'] {
  if (!privileges.value) {
    return undefined
  }

  return {
    factionId: privileges.value.attributes.faction_id,
    factionName: privileges.value.attributes.faction_name,
    privilegeCount: privileges.value.attributes.count,
    privileges: {
      setInfoFields: findPrivilege(privileges.value, 'members', 'set_infofields'),
      viewMemberList: findPrivilege(privileges.value, 'members', 'view_memberlist'),
      acceptOrDeclineMembers: findPrivilege(privileges.value, 'members', 'accept_decline_members'),
      expelMembers: findPrivilege(privileges.value, 'members', 'expel_members'),
      isFactionLeader: findPrivilege(privileges.value, 'members', 'faction_leader'),
      viewCredits: findPrivilege(privileges.value, 'finance', 'view_credits'),
      sendCredits: findPrivilege(privileges.value, 'finance', 'send_credits'),
      viewTransactions: findPrivilege(privileges.value, 'finance', 'view_transactions'),
      viewBudgets: findPrivilege(privileges.value, 'finance', 'view_budgets'),
      modifyBudgets: findPrivilege(privileges.value, 'finance', 'modify_budgets'),
      setTaxLevels: findPrivilege(privileges.value, 'finance', 'set_tax_levels'),
      operateVendors: findPrivilege(privileges.value, 'finance', 'operate_vendors'),
      givePrivileges: findPrivilege(privileges.value, 'privileges', 'give_privs'),
      changePasscode: findPrivilege(privileges.value, 'privileges', 'change_passcode'),
      protectAssets: findPrivilege(privileges.value, 'privileges', 'protect_assets'),
      combatEvents: findPrivilege(privileges.value, 'privileges', 'combat_events'),
      manageTemplates: findPrivilege(privileges.value, 'privileges', 'manage_templates'),
      canSeeOverview: findPrivilege(privileges.value, 'privileges', 'can_see_overview'),
      canViewPanelRequests: findPrivilege(privileges.value, 'privileges', 'can_view_panel_requests'),
      enforceArrestWarrant: findPrivilege(privileges.value, 'arrest_execute', 'enforce_arrest_warrant'),
      enforceDeathWarrant: findPrivilege(privileges.value, 'arrest_execute', 'enforce_death_warrant'),
      releasePrisoners: findPrivilege(privileges.value, 'arrest_execute', 'release_prisoners'),
      issueArrestWarrant: findPrivilege(privileges.value, 'arrest_execute', 'issue_arrest_warrant'),
      issueDeathWarrant: findPrivilege(privileges.value, 'arrest_execute', 'issue_death_warrant'),
      modifyFriendFoeList: findPrivilege(privileges.value, 'arrest_execute', 'modify_iff_list'),
      hasSecurityAuthorisation: findPrivilege(privileges.value, 'arrest_execute', 'security_authorisation'),
      postGnsSocial: findPrivilege(privileges.value, 'gns', 'gns_social'),
      postGnsMilitary: findPrivilege(privileges.value, 'gns', 'gns_military'),
      postGnsPolitics: findPrivilege(privileges.value, 'gns', 'gns_politics'),
      postGnsEconomics: findPrivilege(privileges.value, 'gns', 'gns_economics'),
      gnsCensorship: findPrivilege(privileges.value, 'gns', 'gns_censorship'),
      produceInFacilities: findPrivilege(privileges.value, 'production', 'produce_in_facilities'),
      produceInStations: findPrivilege(privileges.value, 'production', 'produce_in_stations'),
      canAbortProduction: findPrivilege(privileges.value, 'production', 'can_abort_production'),
      assignDatacards: findPrivilege(privileges.value, 'production', 'assign_datacards'),
      revokeAssignedDatacards: findPrivilege(privileges.value, 'production', 'revoke_assigned_datacards'),
      constructFacilities: findPrivilege(privileges.value, 'production', 'construct_facilities'),
      constructCities: findPrivilege(privileges.value, 'production', 'construct_cities'),
      constructStations: findPrivilege(privileges.value, 'production', 'construct_stations'),
      canAbortConstruction: findPrivilege(privileges.value, 'production', 'can_abort_construction'),
      performAsteroidMining: findPrivilege(privileges.value, 'production', 'perform_asteroid_mining'),
      performRecycling: findPrivilege(privileges.value, 'production', 'perform_recycling'),
      purchaseNpcs: findPrivilege(privileges.value, 'npc_management', 'npc_purchase'),
      editNpcs: findPrivilege(privileges.value, 'npc_management', 'npc_edit'),
      fireNpcs: findPrivilege(privileges.value, 'npc_management', 'npc_fire'),
      isSecondInCommand: findPrivilege(privileges.value, 'second_in_command', 'second_in_command'),
      assignTags: findPrivilege(privileges.value, 'tags', 'assign_tags'),
      renameTags: findPrivilege(privileges.value, 'tags', 'rename_tags'),
      createTags: findPrivilege(privileges.value, 'tags', 'create_tags'),
      deleteTags: findPrivilege(privileges.value, 'tags', 'delete_tags'),
      viewCombatReports: findPrivilege(privileges.value, 'combat_reports', 'view_combat_reports'),
      launchGarrisonSquad: findPrivilege(privileges.value, 'combat_reports', 'launch_garrison_squad'),
      modifyGarrisonReserve: findPrivilege(privileges.value, 'combat_reports', 'modify_garrison_reserve'),
      launchCargoSquad: findPrivilege(privileges.value, 'npc_transport', 'cargo_squad_launch'),
      linkCargoBase: findPrivilege(privileges.value, 'npc_transport', 'cargo_base_link'),
      viewCargoSquad: findPrivilege(privileges.value, 'npc_transport', 'cargo_squad_view'),
      changeFactionProfile: findPrivilege(privileges.value, 'faction_management', 'change_faction_profile'),
      renameFaction: findPrivilege(privileges.value, 'faction_management', 'rename_faction'),
      factionCustomImages: findPrivilege(privileges.value, 'faction_management', 'faction_custom_images'),
      createSubfactions: findPrivilege(privileges.value, 'faction_management', 'create_subfactions'),
      manageSubfactionMembers: findPrivilege(privileges.value, 'faction_management', 'manage_subfaction_members'),
      subfactionFullPrivileges: findPrivilege(privileges.value, 'faction_management', 'subfaction_full_privileges'),
      manageFactionModules: findPrivilege(privileges.value, 'faction_management', 'manage_faction_modules'),
      manageAlliance: findPrivilege(privileges.value, 'faction_management', 'manage_alliance'),
      viewShips: findPrivilege(privileges.value, 'ship', 'view'),
      assignShips: findPrivilege(privileges.value, 'ship', 'assign'),
      renameShips: findPrivilege(privileges.value, 'ship', 'rename'),
      makeoverShips: findPrivilege(privileges.value, 'ship', 'makeover'),
      viewVehicles: findPrivilege(privileges.value, 'vehicle', 'view'),
      assignVehicles: findPrivilege(privileges.value, 'vehicle', 'assign'),
      renameVehicles: findPrivilege(privileges.value, 'vehicle', 'rename'),
      makeoverVehicles: findPrivilege(privileges.value, 'vehicle', 'makeover'),
      viewItems: findPrivilege(privileges.value, 'item', 'view'),
      assignItems: findPrivilege(privileges.value, 'item', 'assign'),
      renameItems: findPrivilege(privileges.value, 'item', 'rename'),
      makeoverItems: findPrivilege(privileges.value, 'item', 'makeover'),
      viewDroids: findPrivilege(privileges.value, 'droid', 'view'),
      assignDroids: findPrivilege(privileges.value, 'droid', 'assign'),
      renameDroids: findPrivilege(privileges.value, 'droid', 'rename'),
      makeoverDroids: findPrivilege(privileges.value, 'droid', 'makeover'),
      viewStations: findPrivilege(privileges.value, 'station', 'view'),
      assignStations: findPrivilege(privileges.value, 'station', 'assign'),
      renameStations: findPrivilege(privileges.value, 'station', 'rename'),
      makeoverStations: findPrivilege(privileges.value, 'station', 'makeover'),
      stationControlRoom: findPrivilege(privileges.value, 'station', 'controlroom'),
      manageStationPermissions: findPrivilege(privileges.value, 'station', 'permissions'),
      viewFacilities: findPrivilege(privileges.value, 'facility', 'view'),
      assignFacilities: findPrivilege(privileges.value, 'facility', 'assign'),
      renameFacilities: findPrivilege(privileges.value, 'facility', 'rename'),
      makeoverFacilities: findPrivilege(privileges.value, 'facility', 'makeover'),
      facilityControlRoom: findPrivilege(privileges.value, 'facility', 'controlroom'),
      manageFacilityPermissions: findPrivilege(privileges.value, 'facility', 'permissions'),
      viewMaterials: findPrivilege(privileges.value, 'materials', 'view'),
      assignMaterials: findPrivilege(privileges.value, 'materials', 'assign'),
      renameMaterials: findPrivilege(privileges.value, 'materials', 'rename'),
      makeoverMaterials: findPrivilege(privileges.value, 'materials', 'makeover'),
      viewNpcs: findPrivilege(privileges.value, 'npc', 'view'),
      assignNpcs: findPrivilege(privileges.value, 'npc', 'assign'),
      renameNpcs: findPrivilege(privileges.value, 'npc', 'rename'),
      makeoverNpcs: findPrivilege(privileges.value, 'npc', 'makeover'),
      viewCities: findPrivilege(privileges.value, 'cities', 'view'),
      assignCities: findPrivilege(privileges.value, 'cities', 'assign'),
      renameCities: findPrivilege(privileges.value, 'cities', 'rename'),
      makeoverCities: findPrivilege(privileges.value, 'cities', 'makeover'),
      manageCityPermissions: findPrivilege(privileges.value, 'cities', 'permissions'),
      viewCreatures: findPrivilege(privileges.value, 'creature', 'view'),
      assignCreatures: findPrivilege(privileges.value, 'creature', 'assign'),
      renameCreatures: findPrivilege(privileges.value, 'creature', 'rename'),
      makeoverCreatures: findPrivilege(privileges.value, 'creature', 'makeover'),
      viewPlanets: findPrivilege(privileges.value, 'planets', 'view'),
      assignPlanets: findPrivilege(privileges.value, 'planets', 'assign'),
      viewStocks: findPrivilege(privileges.value, 'stock', 'view'),
      makeoverStocks: findPrivilege(privileges.value, 'stock', 'makeover'),
      viewDatacards: findPrivilege(privileges.value, 'datacard', 'view'),
    },
  }
}

function findPrivilege(
  privileges: Exclude<CharacterResponseSwcCharacter['privileges']['value'], undefined>,
  groupName: string,
  privilegeName: string,
): boolean {
  const group = privileges.privilegegroup.find((x) => x.attributes.name === groupName)
  if (!group) return false

  const privilege = group.privilege.find((x) => x.attributes.uid === privilegeName)
  return !!privilege && privilege.value === 'true'
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
