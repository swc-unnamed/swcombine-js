export class SwcUid {
  private readonly _entityType: SwcUidType
  private readonly _id: number

  constructor(entityType: SwcUidType, id: number)
  constructor(uid: string)
  constructor(param1: SwcUidType | string, id?: number) {
    if (typeof param1 === 'string') {
      const [uidType, id] = param1.split(':')
      this._entityType = Number.parseInt(uidType, 10) as SwcUidType
      this._id = Number.parseInt(id, 10)
      return
    }

    this._entityType = param1
    this._id = id!
  }

  get entityType(): SwcUidType {
    return this._entityType
  }

  get id(): number {
    return this._id
  }

  get uid(): string {
    return `${this._entityType}:${this._id}`
  }

  toString(): string {
    return this.uid
  }
}

export enum SwcUidType {
  Character = 1,
  Ship = 2,
  Vehicle = 3,
  Facility = 4,
  Station = 5,
  City = 7,
  Planet = 8,
  System = 9,
  Npc = 10,
  Creature = 11,
  Item = 12,
  Droid = 13,
  Datacard = 14,
  Material = 16,
  Stock = 17,
  Weapon = 18,
  Faction = 20,
  Race = 22,
  Sector = 25,
  CustomImage = 37,
  Message = 38,
}
