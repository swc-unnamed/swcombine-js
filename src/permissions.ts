export const permissions = Object.freeze({
  character: Object.freeze({
    auth: 'character_auth',
    read: 'character_read',
    stats: 'character_stats',
    privileges: 'character_privileges',
    skills: 'character_skills',
    credits: Object.freeze({
      read: 'character_credits',
      readWrite: 'character_credits_write',
    }),
    force: 'character_force',
    location: 'character_location',
    events: 'character_events',
    all: 'character_all',
  }),

  messages: Object.freeze({
    read: 'messages_read',
    send: 'messages_send',
    delete: 'messages_delete',
    all: 'messages_all',
  }),

  faction: Object.freeze({
    read: 'faction_read',
    members: 'faction_members',
    stocks: 'faction_stocks',
    credits: Object.freeze({
      read: 'faction_credits_read',
      readWrite: 'faction_credits_write',
    }),
    budgets: Object.freeze({
      read: 'faction_budgets_read',
      readWrite: 'faction_budgets_write',
    }),
    datacards: Object.freeze({
      read: 'faction_datacards_read',
      readWrite: 'faction_datacards_write',
    }),
    all: 'faction_all',
  }),

  personalInventory: Object.freeze({
    ships: Object.freeze({
      read: 'personal_inv_ships_read',
      rename: 'personal_inv_ships_rename',
      assign: 'personal_inv_ships_assign',
      makeover: 'personal_inv_ships_makeover',
      tags: Object.freeze({
        read: 'personal_inv_ships_tags_read',
        readWrite: 'personal_inv_ships_tags_write',
      }),
      all: 'personal_inv_ships_all',
    }),
    vehicles: Object.freeze({
      read: 'personal_inv_vehicles_read',
      rename: 'personal_inv_vehicles_rename',
      assign: 'personal_inv_vehicles_assign',
      makeover: 'personal_inv_vehicles_makeover',
      tags: Object.freeze({
        read: 'personal_inv_vehicles_tags_read',
        readWrite: 'personal_inv_vehicles_tags_write',
      }),
      all: 'personal_inv_vehicles_all',
    }),
    stations: Object.freeze({
      read: 'personal_inv_stations_read',
      rename: 'personal_inv_stations_rename',
      assign: 'personal_inv_stations_assign',
      makeover: 'personal_inv_stations_makeover',
      tags: Object.freeze({
        read: 'personal_inv_stations_tags_read',
        readWrite: 'personal_inv_stations_tags_write',
      }),
      all: 'personal_inv_stations_all',
    }),
    cities: Object.freeze({
      read: 'personal_inv_cities_read',
      rename: 'personal_inv_cities_rename',
      assign: 'personal_inv_cities_assign',
      makeover: 'personal_inv_cities_makeover',
      tags: Object.freeze({
        read: 'personal_inv_cities_tags_read',
        readWrite: 'personal_inv_cities_tags_write',
      }),
      all: 'personal_inv_cities_all',
    }),
    facilities: Object.freeze({
      read: 'personal_inv_facilities_read',
      rename: 'personal_inv_facilities_rename',
      assign: 'personal_inv_facilities_assign',
      makeover: 'personal_inv_facilities_makeover',
      tags: Object.freeze({
        read: 'personal_inv_facilities_tags_read',
        readWrite: 'personal_inv_facilities_tags_write',
      }),
      all: 'personal_inv_facilities_all',
    }),
    planets: Object.freeze({
      read: 'personal_inv_planets_read',
      rename: 'personal_inv_planets_rename',
      assign: 'personal_inv_planets_assign',
      makeover: 'personal_inv_planets_makeover',
      tags: Object.freeze({
        read: 'personal_inv_planets_tags_read',
        readWrite: 'personal_inv_planets_tags_write',
      }),
      all: 'personal_inv_planets_all',
    }),
    items: Object.freeze({
      read: 'personal_inv_items_read',
      rename: 'personal_inv_items_rename',
      assign: 'personal_inv_items_assign',
      makeover: 'personal_inv_items_makeover',
      tags: Object.freeze({
        read: 'personal_inv_items_tags_read',
        readWrite: 'personal_inv_items_tags_write',
      }),
      all: 'personal_inv_items_all',
    }),
    npcs: Object.freeze({
      read: 'personal_inv_npcs_read',
      rename: 'personal_inv_npcs_rename',
      assign: 'personal_inv_npcs_assign',
      makeover: 'personal_inv_npcs_makeover',
      tags: Object.freeze({
        read: 'personal_inv_npcs_tags_read',
        readWrite: 'personal_inv_npcs_tags_write',
      }),
      all: 'personal_inv_npcs_all',
    }),
    droids: Object.freeze({
      read: 'personal_inv_droids_read',
      rename: 'personal_inv_droids_rename',
      assign: 'personal_inv_droids_assign',
      makeover: 'personal_inv_droids_makeover',
      tags: Object.freeze({
        read: 'personal_inv_droids_tags_read',
        readWrite: 'personal_inv_droids_tags_write',
      }),
      all: 'personal_inv_droids_all',
    }),
    materials: Object.freeze({
      read: 'personal_inv_materials_read',
      rename: 'personal_inv_materials_rename',
      assign: 'personal_inv_materials_assign',
      makeover: 'personal_inv_materials_makeover',
      tags: Object.freeze({
        read: 'personal_inv_materials_tags_read',
        readWrite: 'personal_inv_materials_tags_write',
      }),
      all: 'personal_inv_materials_all',
    }),
    creatures: Object.freeze({
      read: 'personal_inv_creatures_read',
      rename: 'personal_inv_creatures_rename',
      assign: 'personal_inv_creatures_assign',
      makeover: 'personal_inv_creatures_makeover',
      tags: Object.freeze({
        read: 'personal_inv_creatures_tags_read',
        readWrite: 'personal_inv_creatures_tags_write',
      }),
      all: 'personal_inv_creatures_all',
    }),
  }),

  factionInventory: Object.freeze({
    ships: Object.freeze({
      read: 'faction_inv_ships_read',
      rename: 'faction_inv_ships_rename',
      assign: 'faction_inv_ships_assign',
      makeover: 'faction_inv_ships_makeover',
      tags: Object.freeze({
        read: 'faction_inv_ships_tags_read',
        readWrite: 'faction_inv_ships_tags_write',
      }),
      all: 'faction_inv_ships_all',
    }),
    vehicles: Object.freeze({
      read: 'faction_inv_vehicles_read',
      rename: 'faction_inv_vehicles_rename',
      assign: 'faction_inv_vehicles_assign',
      makeover: 'faction_inv_vehicles_makeover',
      tags: Object.freeze({
        read: 'faction_inv_vehicles_tags_read',
        readWrite: 'faction_inv_vehicles_tags_write',
      }),
      all: 'faction_inv_vehicles_all',
    }),
    stations: Object.freeze({
      read: 'faction_inv_stations_read',
      rename: 'faction_inv_stations_rename',
      assign: 'faction_inv_stations_assign',
      makeover: 'faction_inv_stations_makeover',
      tags: Object.freeze({
        read: 'faction_inv_stations_tags_read',
        readWrite: 'faction_inv_stations_tags_write',
      }),
      all: 'faction_inv_stations_all',
    }),
    cities: Object.freeze({
      read: 'faction_inv_cities_read',
      rename: 'faction_inv_cities_rename',
      assign: 'faction_inv_cities_assign',
      makeover: 'faction_inv_cities_makeover',
      tags: Object.freeze({
        read: 'faction_inv_cities_tags_read',
        readWrite: 'faction_inv_cities_tags_write',
      }),
      all: 'faction_inv_cities_all',
    }),
    facilities: Object.freeze({
      read: 'faction_inv_facilities_read',
      rename: 'faction_inv_facilities_rename',
      assign: 'faction_inv_facilities_assign',
      makeover: 'faction_inv_facilities_makeover',
      tags: Object.freeze({
        read: 'faction_inv_facilities_tags_read',
        readWrite: 'faction_inv_facilities_tags_write',
      }),
      all: 'faction_inv_facilities_all',
    }),
    planets: Object.freeze({
      read: 'faction_inv_planets_read',
      rename: 'faction_inv_planets_rename',
      assign: 'faction_inv_planets_assign',
      makeover: 'faction_inv_planets_makeover',
      tags: Object.freeze({
        read: 'faction_inv_planets_tags_read',
        readWrite: 'faction_inv_planets_tags_write',
      }),
      all: 'faction_inv_planets_all',
    }),
    items: Object.freeze({
      read: 'faction_inv_items_read',
      rename: 'faction_inv_items_rename',
      assign: 'faction_inv_items_assign',
      makeover: 'faction_inv_items_makeover',
      tags: Object.freeze({
        read: 'faction_inv_items_tags_read',
        readWrite: 'faction_inv_items_tags_write',
      }),
      all: 'faction_inv_items_all',
    }),
    npcs: Object.freeze({
      read: 'faction_inv_npcs_read',
      rename: 'faction_inv_npcs_rename',
      assign: 'faction_inv_npcs_assign',
      makeover: 'faction_inv_npcs_makeover',
      tags: Object.freeze({
        read: 'faction_inv_npcs_tags_read',
        readWrite: 'faction_inv_npcs_tags_write',
      }),
      all: 'faction_inv_npcs_all',
    }),
    droids: Object.freeze({
      read: 'faction_inv_droids_read',
      rename: 'faction_inv_droids_rename',
      assign: 'faction_inv_droids_assign',
      makeover: 'faction_inv_droids_makeover',
      tags: Object.freeze({
        read: 'faction_inv_droids_tags_read',
        readWrite: 'faction_inv_droids_tags_write',
      }),
      all: 'faction_inv_droids_all',
    }),
    materials: Object.freeze({
      read: 'faction_inv_materials_read',
      rename: 'faction_inv_materials_rename',
      assign: 'faction_inv_materials_assign',
      makeover: 'faction_inv_materials_makeover',
      tags: Object.freeze({
        read: 'faction_inv_materials_tags_read',
        readWrite: 'faction_inv_materials_tags_write',
      }),
      all: 'faction_inv_materials_all',
    }),
    creatures: Object.freeze({
      read: 'faction_inv_creatures_read',
      rename: 'faction_inv_creatures_rename',
      assign: 'faction_inv_creatures_assign',
      makeover: 'faction_inv_creatures_makeover',
      tags: Object.freeze({
        read: 'faction_inv_creatures_tags_read',
        readWrite: 'faction_inv_creatures_tags_write',
      }),
      all: 'faction_inv_creatures_all',
    }),
  }),
})
