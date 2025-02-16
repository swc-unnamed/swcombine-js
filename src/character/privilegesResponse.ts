export interface PrivilegeResponseSwc {
  privilege: {
    value: 'true' | 'false'
  }
}

export interface PrivilegesResponseSwc {
  privileges: SwcPrivileges
}

export interface SwcPrivileges {
  attributes: {
    faction_id: number
    faction_name: string
    count: number
  }
  privilegegroup: Array<
    | SwcPrivilegeGroup<
        'members',
        'set_infofields' | 'view_memberlist' | 'accept_decline_members' | 'expel_members' | 'faction_leader'
      >
    | SwcPrivilegeGroup<
        'finance',
        | 'view_credits'
        | 'send_credits'
        | 'view_transactions'
        | 'view_budgets'
        | 'modify_budgets'
        | 'set_tax_levels'
        | 'operate_vendors'
      >
    | SwcPrivilegeGroup<
        'privileges',
        | 'give_privs'
        | 'change_passcode'
        | 'protect_assets'
        | 'combat_events'
        | 'manage_templates'
        | 'can_see_overview'
        | 'can_view_panel_requests'
      >
    | SwcPrivilegeGroup<'ship', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<'vehicle', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<'item', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<'droid', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<
        'arrest_execute',
        | 'enforce_arrest_warrant'
        | 'enforce_death_warrant'
        | 'release_prisoners'
        | 'issue_arrest_warrant'
        | 'issue_death_warrant'
        | 'modify_iff_list'
        | 'security_authorisation'
      >
    | SwcPrivilegeGroup<'gns', 'gns_social' | 'gns_military' | 'gns_politics' | 'gns_economics' | 'gns_censorship'>
    | SwcPrivilegeGroup<'station', 'view' | 'assign' | 'rename' | 'makeover' | 'controlroom' | 'permissions'>
    | SwcPrivilegeGroup<'facility', 'view' | 'assign' | 'rename' | 'makeover' | 'controlroom' | 'permissions'>
    | SwcPrivilegeGroup<'materials', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<'npc', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<
        'production',
        | 'produce_in_facilities'
        | 'produce_in_stations'
        | 'can_abort_production'
        | 'assign_datacards'
        | 'revoke_assigned_datacards'
        | 'construct_facilities'
        | 'construct_cities'
        | 'construct_stations'
        | 'can_abort_construction'
        | 'perform_asteroid_mining'
        | 'perform_recycling'
      >
    | SwcPrivilegeGroup<'cities', 'view' | 'assign' | 'rename' | 'makeover' | 'permissions'>
    | SwcPrivilegeGroup<'creature', 'view' | 'assign' | 'rename' | 'makeover'>
    | SwcPrivilegeGroup<'planets', 'view' | 'assign'>
    | SwcPrivilegeGroup<'npc_management', 'npc_purchase' | 'npc_edit' | 'npc_fire'>
    | SwcPrivilegeGroup<'stock', 'view' | 'makeover'>
    | SwcPrivilegeGroup<'datacard', 'view'>
    | SwcPrivilegeGroup<'second_in_command', 'second_in_command'>
    | SwcPrivilegeGroup<'tags', 'assign_tags' | 'rename_tags' | 'create_tags' | 'delete_tags'>
    | SwcPrivilegeGroup<'combat_reports', 'view_combat_reports' | 'launch_garrison_squad' | 'modify_garrison_reserve'>
    | SwcPrivilegeGroup<'npc_transport', 'cargo_squad_launch' | 'cargo_base_link' | 'cargo_squad_view'>
    | SwcPrivilegeGroup<
        'faction_management',
        | 'change_faction_profile'
        | 'rename_faction'
        | 'faction_custom_images'
        | 'create_subfactions'
        | 'manage_subfaction_members'
        | 'subfaction_full_privileges'
        | 'manage_faction_modules'
        | 'manage_alliance'
      >
  >
}

interface SwcPrivilegeGroup<TCategory, TPrivs> {
  attributes: { name: TCategory }
  privilege: Array<SwcPrivilege<TPrivs>>
}

interface SwcPrivilege<T> {
  attributes: { uid: T }
  value: 'true' | 'false'
}

export interface CharacterPrivileges {
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
    abortProduction: boolean
    assignDatacards: boolean
    revokeAssignedDatacards: boolean
    constructFacilities: boolean
    constructCities: boolean
    constructStations: boolean
    abortConstruction: boolean
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

    launchCargoSquadrons: boolean
    manageCargoSourcesAndManifests: boolean
    viewCargoEvents: boolean

    changeFactionProfile: boolean
    renameFaction: boolean
    manageFactionCustomImages: boolean

    createSubfactions: boolean
    manageSubfactionMembers: boolean
    hasFullPrivilegesInSubfactions: boolean
    manageFactionModules: boolean
    manageAlliances: boolean

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
    reviewStationBuildRequests: boolean

    viewFacilities: boolean
    assignFacilities: boolean
    renameFacilities: boolean
    makeoverFacilities: boolean
    facilityControlRoom: boolean
    reviewFacilityBuildRequests: boolean

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
    reviewCityBuildRequests: boolean

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

export function mapResponse(privileges: SwcPrivileges): CharacterPrivileges {
  return {
    factionId: privileges.attributes.faction_id,
    factionName: privileges.attributes.faction_name,
    privilegeCount: privileges.attributes.count,
    privileges: {
      setInfoFields: findPrivilege(privileges, 'members', 'set_infofields'),
      viewMemberList: findPrivilege(privileges, 'members', 'view_memberlist'),
      acceptOrDeclineMembers: findPrivilege(privileges, 'members', 'accept_decline_members'),
      expelMembers: findPrivilege(privileges, 'members', 'expel_members'),
      isFactionLeader: findPrivilege(privileges, 'members', 'faction_leader'),
      viewCredits: findPrivilege(privileges, 'finance', 'view_credits'),
      sendCredits: findPrivilege(privileges, 'finance', 'send_credits'),
      viewTransactions: findPrivilege(privileges, 'finance', 'view_transactions'),
      viewBudgets: findPrivilege(privileges, 'finance', 'view_budgets'),
      modifyBudgets: findPrivilege(privileges, 'finance', 'modify_budgets'),
      setTaxLevels: findPrivilege(privileges, 'finance', 'set_tax_levels'),
      operateVendors: findPrivilege(privileges, 'finance', 'operate_vendors'),
      givePrivileges: findPrivilege(privileges, 'privileges', 'give_privs'),
      changePasscode: findPrivilege(privileges, 'privileges', 'change_passcode'),
      protectAssets: findPrivilege(privileges, 'privileges', 'protect_assets'),
      combatEvents: findPrivilege(privileges, 'privileges', 'combat_events'),
      manageTemplates: findPrivilege(privileges, 'privileges', 'manage_templates'),
      canSeeOverview: findPrivilege(privileges, 'privileges', 'can_see_overview'),
      canViewPanelRequests: findPrivilege(privileges, 'privileges', 'can_view_panel_requests'),
      enforceArrestWarrant: findPrivilege(privileges, 'arrest_execute', 'enforce_arrest_warrant'),
      enforceDeathWarrant: findPrivilege(privileges, 'arrest_execute', 'enforce_death_warrant'),
      releasePrisoners: findPrivilege(privileges, 'arrest_execute', 'release_prisoners'),
      issueArrestWarrant: findPrivilege(privileges, 'arrest_execute', 'issue_arrest_warrant'),
      issueDeathWarrant: findPrivilege(privileges, 'arrest_execute', 'issue_death_warrant'),
      modifyFriendFoeList: findPrivilege(privileges, 'arrest_execute', 'modify_iff_list'),
      hasSecurityAuthorisation: findPrivilege(privileges, 'arrest_execute', 'security_authorisation'),
      postGnsSocial: findPrivilege(privileges, 'gns', 'gns_social'),
      postGnsMilitary: findPrivilege(privileges, 'gns', 'gns_military'),
      postGnsPolitics: findPrivilege(privileges, 'gns', 'gns_politics'),
      postGnsEconomics: findPrivilege(privileges, 'gns', 'gns_economics'),
      gnsCensorship: findPrivilege(privileges, 'gns', 'gns_censorship'),
      produceInFacilities: findPrivilege(privileges, 'production', 'produce_in_facilities'),
      produceInStations: findPrivilege(privileges, 'production', 'produce_in_stations'),
      abortProduction: findPrivilege(privileges, 'production', 'can_abort_production'),
      assignDatacards: findPrivilege(privileges, 'production', 'assign_datacards'),
      revokeAssignedDatacards: findPrivilege(privileges, 'production', 'revoke_assigned_datacards'),
      constructFacilities: findPrivilege(privileges, 'production', 'construct_facilities'),
      constructCities: findPrivilege(privileges, 'production', 'construct_cities'),
      constructStations: findPrivilege(privileges, 'production', 'construct_stations'),
      abortConstruction: findPrivilege(privileges, 'production', 'can_abort_construction'),
      performAsteroidMining: findPrivilege(privileges, 'production', 'perform_asteroid_mining'),
      performRecycling: findPrivilege(privileges, 'production', 'perform_recycling'),
      purchaseNpcs: findPrivilege(privileges, 'npc_management', 'npc_purchase'),
      editNpcs: findPrivilege(privileges, 'npc_management', 'npc_edit'),
      fireNpcs: findPrivilege(privileges, 'npc_management', 'npc_fire'),
      isSecondInCommand: findPrivilege(privileges, 'second_in_command', 'second_in_command'),
      assignTags: findPrivilege(privileges, 'tags', 'assign_tags'),
      renameTags: findPrivilege(privileges, 'tags', 'rename_tags'),
      createTags: findPrivilege(privileges, 'tags', 'create_tags'),
      deleteTags: findPrivilege(privileges, 'tags', 'delete_tags'),
      viewCombatReports: findPrivilege(privileges, 'combat_reports', 'view_combat_reports'),
      launchGarrisonSquad: findPrivilege(privileges, 'combat_reports', 'launch_garrison_squad'),
      modifyGarrisonReserve: findPrivilege(privileges, 'combat_reports', 'modify_garrison_reserve'),
      launchCargoSquadrons: findPrivilege(privileges, 'npc_transport', 'cargo_squad_launch'),
      manageCargoSourcesAndManifests: findPrivilege(privileges, 'npc_transport', 'cargo_base_link'),
      viewCargoEvents: findPrivilege(privileges, 'npc_transport', 'cargo_squad_view'),
      changeFactionProfile: findPrivilege(privileges, 'faction_management', 'change_faction_profile'),
      renameFaction: findPrivilege(privileges, 'faction_management', 'rename_faction'),
      manageFactionCustomImages: findPrivilege(privileges, 'faction_management', 'faction_custom_images'),
      createSubfactions: findPrivilege(privileges, 'faction_management', 'create_subfactions'),
      manageSubfactionMembers: findPrivilege(privileges, 'faction_management', 'manage_subfaction_members'),
      hasFullPrivilegesInSubfactions: findPrivilege(privileges, 'faction_management', 'subfaction_full_privileges'),
      manageFactionModules: findPrivilege(privileges, 'faction_management', 'manage_faction_modules'),
      manageAlliances: findPrivilege(privileges, 'faction_management', 'manage_alliance'),
      viewShips: findPrivilege(privileges, 'ship', 'view'),
      assignShips: findPrivilege(privileges, 'ship', 'assign'),
      renameShips: findPrivilege(privileges, 'ship', 'rename'),
      makeoverShips: findPrivilege(privileges, 'ship', 'makeover'),
      viewVehicles: findPrivilege(privileges, 'vehicle', 'view'),
      assignVehicles: findPrivilege(privileges, 'vehicle', 'assign'),
      renameVehicles: findPrivilege(privileges, 'vehicle', 'rename'),
      makeoverVehicles: findPrivilege(privileges, 'vehicle', 'makeover'),
      viewItems: findPrivilege(privileges, 'item', 'view'),
      assignItems: findPrivilege(privileges, 'item', 'assign'),
      renameItems: findPrivilege(privileges, 'item', 'rename'),
      makeoverItems: findPrivilege(privileges, 'item', 'makeover'),
      viewDroids: findPrivilege(privileges, 'droid', 'view'),
      assignDroids: findPrivilege(privileges, 'droid', 'assign'),
      renameDroids: findPrivilege(privileges, 'droid', 'rename'),
      makeoverDroids: findPrivilege(privileges, 'droid', 'makeover'),
      viewStations: findPrivilege(privileges, 'station', 'view'),
      assignStations: findPrivilege(privileges, 'station', 'assign'),
      renameStations: findPrivilege(privileges, 'station', 'rename'),
      makeoverStations: findPrivilege(privileges, 'station', 'makeover'),
      stationControlRoom: findPrivilege(privileges, 'station', 'controlroom'),
      reviewStationBuildRequests: findPrivilege(privileges, 'station', 'permissions'),
      viewFacilities: findPrivilege(privileges, 'facility', 'view'),
      assignFacilities: findPrivilege(privileges, 'facility', 'assign'),
      renameFacilities: findPrivilege(privileges, 'facility', 'rename'),
      makeoverFacilities: findPrivilege(privileges, 'facility', 'makeover'),
      facilityControlRoom: findPrivilege(privileges, 'facility', 'controlroom'),
      reviewFacilityBuildRequests: findPrivilege(privileges, 'facility', 'permissions'),
      viewMaterials: findPrivilege(privileges, 'materials', 'view'),
      assignMaterials: findPrivilege(privileges, 'materials', 'assign'),
      renameMaterials: findPrivilege(privileges, 'materials', 'rename'),
      makeoverMaterials: findPrivilege(privileges, 'materials', 'makeover'),
      viewNpcs: findPrivilege(privileges, 'npc', 'view'),
      assignNpcs: findPrivilege(privileges, 'npc', 'assign'),
      renameNpcs: findPrivilege(privileges, 'npc', 'rename'),
      makeoverNpcs: findPrivilege(privileges, 'npc', 'makeover'),
      viewCities: findPrivilege(privileges, 'cities', 'view'),
      assignCities: findPrivilege(privileges, 'cities', 'assign'),
      renameCities: findPrivilege(privileges, 'cities', 'rename'),
      makeoverCities: findPrivilege(privileges, 'cities', 'makeover'),
      reviewCityBuildRequests: findPrivilege(privileges, 'cities', 'permissions'),
      viewCreatures: findPrivilege(privileges, 'creature', 'view'),
      assignCreatures: findPrivilege(privileges, 'creature', 'assign'),
      renameCreatures: findPrivilege(privileges, 'creature', 'rename'),
      makeoverCreatures: findPrivilege(privileges, 'creature', 'makeover'),
      viewPlanets: findPrivilege(privileges, 'planets', 'view'),
      assignPlanets: findPrivilege(privileges, 'planets', 'assign'),
      viewStocks: findPrivilege(privileges, 'stock', 'view'),
      makeoverStocks: findPrivilege(privileges, 'stock', 'makeover'),
      viewDatacards: findPrivilege(privileges, 'datacard', 'view'),
    },
  }
}

function findPrivilege(
  privileges: Exclude<SwcPrivileges, undefined>,
  groupName: string,
  privilegeName: string,
): boolean {
  const group = privileges.privilegegroup.find((x) => x.attributes.name === groupName)
  if (!group) return false

  const privilege = group.privilege.find((x) => x.attributes.uid === privilegeName)
  return !!privilege && privilege.value === 'true'
}
