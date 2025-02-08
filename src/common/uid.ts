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
}

export enum SwcUidType {
  character = 1,
  ship = 2,
  vehicle = 3,
  facility = 4,
  station = 5,
  city = 7,
  planet = 8,
  system = 9,
  npc = 10,
  creature = 11,
  item = 12,
  droid = 13,
  datacard = 14,
  material = 16,
  stock = 17,
  weapon = 18,
  faction = 20,
  race = 22,
  sector = 25,
  customImage = 37,
}
