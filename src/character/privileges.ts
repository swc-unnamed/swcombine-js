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

export enum CombatPrivilege {
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

export enum CityPrivilege {
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

export enum PlanetPrivilege {
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

export type Privilege =
  | MembersPrivilege
  | FinancePrivilege
  | PrivilegesPrivilege
  | ArrestExecutePrivilege
  | GnsPrivilege
  | TagsPrivilege
  | NpcManagementPrivilege
  | ProductionPrivilege
  | NpcTransportPrivilege
  | SecondInCommandPrivilege
  | ShipPrivilege
  | VehiclePrivilege
  | StationPrivilege
  | FacilityPrivilege
  | CityPrivilege
  | ItemPrivilege
  | NpcPrivilege
  | DroidPrivilege
  | CreaturePrivilege
  | MaterialsPrivilege
  | PlanetPrivilege
  | StockPrivilege
  | DatacardPrivilege
  | CombatPrivilege
  | FactionManagementPrivilege

export type PrivilegeDescriptor =
  | { group: 'members'; privilege: MembersPrivilege }
  | { group: 'finance'; privilege: FinancePrivilege }
  | { group: 'privileges'; privilege: PrivilegesPrivilege }
  | { group: 'arrest_execute'; privilege: ArrestExecutePrivilege }
  | { group: 'gns'; privilege: GnsPrivilege }
  | { group: 'tags'; privilege: TagsPrivilege }
  | { group: 'npc_management'; privilege: NpcManagementPrivilege }
  | { group: 'production'; privilege: ProductionPrivilege }
  | { group: 'npc_transport'; privilege: NpcTransportPrivilege }
  | { group: 'second_in_command'; privilege: SecondInCommandPrivilege }
  | { group: 'ship'; privilege: ShipPrivilege }
  | { group: 'vehicle'; privilege: VehiclePrivilege }
  | { group: 'station'; privilege: StationPrivilege }
  | { group: 'facility'; privilege: FacilityPrivilege }
  | { group: 'cities'; privilege: CityPrivilege }
  | { group: 'item'; privilege: ItemPrivilege }
  | { group: 'npc'; privilege: NpcPrivilege }
  | { group: 'droid'; privilege: DroidPrivilege }
  | { group: 'creature'; privilege: CreaturePrivilege }
  | { group: 'materials'; privilege: MaterialsPrivilege }
  | { group: 'planets'; privilege: PlanetPrivilege }
  | { group: 'stock'; privilege: StockPrivilege }
  | { group: 'datacard'; privilege: DatacardPrivilege }
  | { group: 'combat_reports'; privilege: CombatPrivilege }
  | { group: 'faction_management'; privilege: FactionManagementPrivilege }
