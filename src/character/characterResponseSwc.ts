export interface CharacterResponseSwc {
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
    value?: {
      general: CharacterResponseSwcSkillGroup<
        'strength' | 'dexterity' | 'speed' | 'dodge' | 'projectile' | 'nonProjectile'
      >[]
      space: CharacterResponseSwcSkillGroup<
        'fighterPiloting' | 'fighterCombat' | 'capitalPiloting' | 'capitalCombat' | 'spaceCommand'
      >[]
      ground: CharacterResponseSwcSkillGroup<
        'vehiclePiloting' | 'vehicleCombat' | 'infantryCommand' | 'vehicleCommand' | 'heavyWeapons'
      >[]
      social: CharacterResponseSwcSkillGroup<
        'medical' | 'diplomacy' | 'crafting' | 'management' | 'perception' | 'stealth'
      >[]
      science: CharacterResponseSwcSkillGroup<
        'rndHull' | 'rndElectronics' | 'rndEngines' | 'rndWeapons' | 'repair' | 'compOps'
      >[]
    }
  }
  privileges: {
    value?: {
      attributes: {
        faction_id: number
        faction_name: string
        count: number
      }
      privilegegroup: Array<
        | CharacterResponseSwcPrivilegeGroup<
            'members',
            'set_infofields' | 'view_memberlist' | 'accept_decline_members' | 'expel_members' | 'faction_leader'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'finance',
            | 'view_credits'
            | 'send_credits'
            | 'view_transactions'
            | 'view_budgets'
            | 'modify_budgets'
            | 'set_tax_levels'
            | 'operate_vendors'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'privileges',
            | 'give_privs'
            | 'change_passcode'
            | 'protect_assets'
            | 'combat_events'
            | 'manage_templates'
            | 'can_see_overview'
            | 'can_view_panel_requests'
          >
        | CharacterResponseSwcPrivilegeGroup<'ship', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'vehicle', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'item', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'droid', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<
            'arrest_execute',
            | 'enforce_arrest_warrant'
            | 'enforce_death_warrant'
            | 'release_prisoners'
            | 'issue_arrest_warrant'
            | 'issue_death_warrant'
            | 'modify_iff_list'
            | 'security_authorisation'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'gns',
            'gns_social' | 'gns_military' | 'gns_politics' | 'gns_economics' | 'gns_censorship'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'station',
            'view' | 'assign' | 'rename' | 'makeover' | 'controlroom' | 'permissions'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'facility',
            'view' | 'assign' | 'rename' | 'makeover' | 'controlroom' | 'permissions'
          >
        | CharacterResponseSwcPrivilegeGroup<'materials', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'npc', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<
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
        | CharacterResponseSwcPrivilegeGroup<'cities', 'view' | 'assign' | 'rename' | 'makeover' | 'permissions'>
        | CharacterResponseSwcPrivilegeGroup<'creature', 'view' | 'assign' | 'rename' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'planets', 'view' | 'assign'>
        | CharacterResponseSwcPrivilegeGroup<'npc_management', 'npc_purchase' | 'npc_edit' | 'npc_fire'>
        | CharacterResponseSwcPrivilegeGroup<'stock', 'view' | 'makeover'>
        | CharacterResponseSwcPrivilegeGroup<'datacard', 'view'>
        | CharacterResponseSwcPrivilegeGroup<'second_in_command', 'second_in_command'>
        | CharacterResponseSwcPrivilegeGroup<'tags', 'assign_tags' | 'rename_tags' | 'create_tags' | 'delete_tags'>
        | CharacterResponseSwcPrivilegeGroup<
            'combat_reports',
            'view_combat_reports' | 'launch_garrison_squad' | 'modify_garrison_reserve'
          >
        | CharacterResponseSwcPrivilegeGroup<
            'npc_transport',
            'cargo_squad_launch' | 'cargo_base_link' | 'cargo_squad_view'
          >
        | CharacterResponseSwcPrivilegeGroup<
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

interface CharacterResponseSwcSkillGroup<T> {
  attributes: { force: 'true' | 'false'; count: number }
  skill: Array<CharacterResponseSwcSkill<T>>
}

interface CharacterResponseSwcSkill<T> {
  attributes: { type: T }
  value: 0 | 1 | 2 | 3 | 4 | 5
}

interface CharacterResponseSwcPrivilegeGroup<TCategory, TPrivs> {
  attributes: { name: TCategory }
  privilege: Array<CharacterResponseSwcPrivilege<TPrivs>>
}

interface CharacterResponseSwcPrivilege<T> {
  attributes: { uid: T }
  value: 'true' | 'false'
}
