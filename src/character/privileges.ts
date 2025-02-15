export enum MembersPrivilege {
  SetInfofields = 'set_infofields',
  ViewMemberList = 'view_memberlist',
  AcceptOrDeclineMembers = 'accept_decline_members',
  ExpelMembers = 'expel_members',
  IsFactionLeader = 'faction_leader',
}

export enum FinancePrivilege {
  ViewCredits = 'view_credits',
  SendCredits = 'send_credits',
  ViewTransactions = 'view_transactions',
  ViewBudgets = 'view_budgets',
  ModifyBudgets = 'modify_budgets',
  SetTaxLevels = 'set_tax_levels',
  OperateVendors = 'operate_vendors',
  PerformCyberneticsOperations = 'cybernetics_operations',
}

export enum PrivilegesPrivilege {
  GivePrivileges = 'give_privs',
  ChangePasscode = 'change_passcode',
  ProtectAssets = 'protect_assets',
  ViewCombatEvents = 'combat_events',
  ManagePrivilegeTemplates = 'manage_templates',
  ViewFactionStatusOverview = 'can_see_overview',
  ViewPanelRequests = 'can_view_panel_requests',
}

export enum ArrestExecutePrivilege {
  EnforceArrestWarrant = 'enforce_arrest_warrant',
  EnforceDeathWarrant = 'enforce_death_warrant',
  ReleasePrisoners = 'release_prisoners',
  IssueArrestWarrant = 'issue_arrest_warrant',
  IssueDeathWarrant = 'issue_death_warrant',
  ModifyIffList = 'modify_iff_list',
  security_authorisation = 'security_authorisation',
}

export enum GnsPrivilege {
  Social = 'gns_social',
  Military = 'gns_military',
  Politics = 'gns_politics',
  Economics = 'gns_economics',
  Censor = 'gns_censorship',
}

export enum ProductionPrivilege {
  ProduceInFacilities = 'produce_in_facilities',
  ProduceInStations = 'produce_in_stations',
  AbortProduction = 'can_abort_production',
  AssignDatacards = 'assign_datacards',
  RevokeAssignedDatacards = 'revoke_assigned_datacards',
  ConstructFacilities = 'construct_facilities',
  ConstructCities = 'construct_cities',
  ConstructStations = 'construct_stations',
  AbortConstruction = 'can_abort_construction',
  PerformAsteroidMining = 'perform_asteroid_mining',
  PerformRecycling = 'perform_recycling',
}

export enum SecondInCommandPrivilege {
  IsSecondInCommand = 'second_in_command',
}

export enum TagsPrivilege {
  Assign = 'assign_tags',
  Rename = 'rename_tags',
  Create = 'create_tags',
  Delete = 'delete_tags',
}

export enum CombatReportsPrivilege {
  ViewCombatReports = 'view_combat_reports',
  LaunchGarrisonSquad = 'launch_garrison_squad',
  ModifyGarrisonReserve = 'modify_garrison_reserve',
}

export enum NpcTransportPrivilege {
  LaunchCargoSquadrons = 'cargo_squad_launch',
  ManageCargoSourcesAndManifests = 'cargo_base_link',
  ViewCargoEvents = 'cargo_squad_view',
}

export enum FactionManagementPrivilege {
  ChangeFactionProfile = 'change_faction_profile',
  RenameFaction = 'rename_faction',
  ManageFactionCustomImages = 'faction_custom_images',
  CreateSubfactions = 'create_subfactions',
  ManageSubfactionMembers = 'manage_subfaction_members',
  HasFullPrivilegesInSubfactions = 'subfaction_full_privileges',
  ManageFactionModules = 'manage_faction_modules',
  ManageAlliances = 'manage_alliance',
}

export enum NpcManagementPrivilege {
  PurchaseNpcs = 'npc_purchase',
  EditNpcs = 'npc_edit',
  FireNpcs = 'npc_fire',
}

export enum ShipPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum VehiclePrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum StationPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
  ControlRoom = 'controlroom',
  ReviewBuildRequests = 'permissions',
}

export enum FacilityPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
  ControlRoom = 'controlroom',
  ReviewBuildRequests = 'permissions',
}

export enum CitiesPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
  ReviewBuildRequests = 'permissions',
}

export enum ItemPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum NpcPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum DroidPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum CreaturePrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum MaterialsPrivilege {
  View = 'view',
  Assign = 'assign',
  Rename = 'rename',
  Makeover = 'makeover',
}

export enum PlanetsPrivilege {
  View = 'view',
  Assign = 'assign',
}

export enum StockPrivilege {
  View = 'view',
  Makeover = 'makeover',
}

export enum DatacardPrivilege {
  View = 'view',
}

export const Privilege = {
  ...MembersPrivilege,
  ...FinancePrivilege,
  ...PrivilegesPrivilege,
  ...ArrestExecutePrivilege,
  ...GnsPrivilege,
  ...TagsPrivilege,
  ...NpcManagementPrivilege,
  ...ProductionPrivilege,
  ...NpcTransportPrivilege,
  ...SecondInCommandPrivilege,
  ...CombatReportsPrivilege,
  ...FactionManagementPrivilege,
  View: 'view',
  Assign: 'assign',
  Rename: 'rename',
  Makeover: 'makeover',
  ReviewBuildRequests: 'permissions',
  view: 'View',
  assign: 'Assign',
  rename: 'Rename',
  makeover: 'Makeover',
  permissions: 'ReviewBuildRequests',
} as const
export type Privilege = (typeof Privilege)[keyof typeof Privilege]

export enum PrivilegeGroup {
  Members = 'members',
  Finance = 'finance',
  Privileges = 'privileges',
  ArrestExecute = 'arrest_execute',
  Gns = 'gns',
  Tags = 'tags',
  NpcManagement = 'npc_management',
  Production = 'production',
  NpcTransport = 'npc_transport',
  SecondInCommand = 'second_in_command',
  Ship = 'ship',
  Vehicle = 'vehicle',
  Station = 'station',
  Facility = 'facility',
  Cities = 'cities',
  Item = 'item',
  Npc = 'npc',
  Droid = 'droid',
  Creature = 'creature',
  Materials = 'materials',
  Planets = 'planets',
  Stock = 'stock',
  Datacard = 'datacard',
  CombatReports = 'combat_reports',
  FactionManagement = 'faction_management',
}

export type PrivilegeDescriptor =
  | {
      group: PrivilegeGroup.Members | `${PrivilegeGroup.Members}`
      privilege: MembersPrivilege | `${MembersPrivilege}`
    }
  | {
      group: PrivilegeGroup.Finance | `${PrivilegeGroup.Finance}`
      privilege: FinancePrivilege | `${FinancePrivilege}`
    }
  | {
      group: PrivilegeGroup.Privileges | `${PrivilegeGroup.Privileges}`
      privilege: PrivilegesPrivilege | `${PrivilegesPrivilege}`
    }
  | {
      group: PrivilegeGroup.ArrestExecute | `${PrivilegeGroup.ArrestExecute}`
      privilege: ArrestExecutePrivilege | `${ArrestExecutePrivilege}`
    }
  | {
      group: PrivilegeGroup.Gns | `${PrivilegeGroup.Gns}`
      privilege: GnsPrivilege | `${GnsPrivilege}`
    }
  | {
      group: PrivilegeGroup.Tags | `${PrivilegeGroup.Tags}`
      privilege: TagsPrivilege | `${TagsPrivilege}`
    }
  | {
      group: PrivilegeGroup.NpcManagement | `${PrivilegeGroup.NpcManagement}`
      privilege: NpcManagementPrivilege | `${NpcManagementPrivilege}`
    }
  | {
      group: PrivilegeGroup.Production | `${PrivilegeGroup.Production}`
      privilege: ProductionPrivilege | `${ProductionPrivilege}`
    }
  | {
      group: PrivilegeGroup.NpcTransport | `${PrivilegeGroup.NpcTransport}`
      privilege: NpcTransportPrivilege | `${NpcTransportPrivilege}`
    }
  | {
      group: PrivilegeGroup.SecondInCommand | `${PrivilegeGroup.SecondInCommand}`
      privilege: SecondInCommandPrivilege | `${SecondInCommandPrivilege}`
    }
  | {
      group: PrivilegeGroup.Ship | `${PrivilegeGroup.Ship}`
      privilege: ShipPrivilege | `${ShipPrivilege}`
    }
  | {
      group: PrivilegeGroup.Vehicle | `${PrivilegeGroup.Vehicle}`
      privilege: VehiclePrivilege | `${VehiclePrivilege}`
    }
  | {
      group: PrivilegeGroup.Station | `${PrivilegeGroup.Station}`
      privilege: StationPrivilege | `${StationPrivilege}`
    }
  | {
      group: PrivilegeGroup.Facility | `${PrivilegeGroup.Facility}`
      privilege: FacilityPrivilege | `${FacilityPrivilege}`
    }
  | {
      group: PrivilegeGroup.Cities | `${PrivilegeGroup.Cities}`
      privilege: CitiesPrivilege | `${CitiesPrivilege}`
    }
  | {
      group: PrivilegeGroup.Item | `${PrivilegeGroup.Item}`
      privilege: ItemPrivilege | `${ItemPrivilege}`
    }
  | {
      group: PrivilegeGroup.Npc | `${PrivilegeGroup.Npc}`
      privilege: NpcPrivilege | `${NpcPrivilege}`
    }
  | {
      group: PrivilegeGroup.Droid | `${PrivilegeGroup.Droid}`
      privilege: DroidPrivilege | `${DroidPrivilege}`
    }
  | {
      group: PrivilegeGroup.Creature | `${PrivilegeGroup.Creature}`
      privilege: CreaturePrivilege | `${CreaturePrivilege}`
    }
  | {
      group: PrivilegeGroup.Materials | `${PrivilegeGroup.Materials}`
      privilege: MaterialsPrivilege | `${MaterialsPrivilege}`
    }
  | {
      group: PrivilegeGroup.Planets | `${PrivilegeGroup.Planets}`
      privilege: PlanetsPrivilege | `${PlanetsPrivilege}`
    }
  | {
      group: PrivilegeGroup.Stock | `${PrivilegeGroup.Stock}`
      privilege: StockPrivilege | `${StockPrivilege}`
    }
  | {
      group: PrivilegeGroup.Datacard | `${PrivilegeGroup.Datacard}`
      privilege: DatacardPrivilege | `${DatacardPrivilege}`
    }
  | {
      group: PrivilegeGroup.CombatReports | `${PrivilegeGroup.CombatReports}`
      privilege: CombatReportsPrivilege | `${CombatReportsPrivilege}`
    }
  | {
      group: PrivilegeGroup.FactionManagement | `${PrivilegeGroup.FactionManagement}`
      privilege: FactionManagementPrivilege | `${FactionManagementPrivilege}`
    }
