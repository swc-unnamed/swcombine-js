export interface SkillsResponseSwc {
  skills: SwcSkills
}

export interface SwcSkills {
  general: [SwcSkillGroup<'strength' | 'dexterity' | 'speed' | 'dodge' | 'projectile' | 'nonProjectile'>]
  space: [SwcSkillGroup<'fighterPiloting' | 'fighterCombat' | 'capitalPiloting' | 'capitalCombat' | 'spaceCommand'>]
  ground: [SwcSkillGroup<'vehiclePiloting' | 'vehicleCombat' | 'infantryCommand' | 'vehicleCommand' | 'heavyWeapons'>]
  social: [SwcSkillGroup<'medical' | 'diplomacy' | 'crafting' | 'management' | 'perception' | 'stealth'>]
  science: [SwcSkillGroup<'rndHull' | 'rndElectronics' | 'rndEngines' | 'rndWeapons' | 'repair' | 'compOps'>]
}

interface SwcSkillGroup<T> {
  attributes: { force: 'true' | 'false'; count: number }
  skill: Array<SwcSkill<T>>
}

interface SwcSkill<T> {
  attributes: { type: T }
  value: SkillLevel
}

type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5

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

export function mapResponse(skills: SwcSkills): CharacterSkills {
  return {
    strength: skills.general[0].skill.find((x) => x.attributes.type === 'strength')!.value,
    dexterity: skills.general[0].skill.find((x) => x.attributes.type === 'dexterity')!.value,
    speed: skills.general[0].skill.find((x) => x.attributes.type === 'speed')!.value,
    dodge: skills.general[0].skill.find((x) => x.attributes.type === 'dodge')!.value,
    projectileWeapons: skills.general[0].skill.find((x) => x.attributes.type === 'projectile')!.value,
    nonProjectileWeapons: skills.general[0].skill.find((x) => x.attributes.type === 'nonProjectile')!.value,

    medical: skills.social[0].skill.find((x) => x.attributes.type === 'medical')!.value,
    diplomacy: skills.social[0].skill.find((x) => x.attributes.type === 'diplomacy')!.value,
    crafting: skills.social[0].skill.find((x) => x.attributes.type === 'crafting')!.value,
    management: skills.social[0].skill.find((x) => x.attributes.type === 'management')!.value,
    perception: skills.social[0].skill.find((x) => x.attributes.type === 'perception')!.value,
    stealth: skills.social[0].skill.find((x) => x.attributes.type === 'stealth')!.value,

    rndHull: skills.science[0].skill.find((x) => x.attributes.type === 'rndHull')!.value,
    rndElectronics: skills.science[0].skill.find((x) => x.attributes.type === 'rndElectronics')!.value,
    rndEngines: skills.science[0].skill.find((x) => x.attributes.type === 'rndEngines')!.value,
    rndWeapons: skills.science[0].skill.find((x) => x.attributes.type === 'rndWeapons')!.value,
    repair: skills.science[0].skill.find((x) => x.attributes.type === 'repair')!.value,
    computerOperations: skills.science[0].skill.find((x) => x.attributes.type === 'compOps')!.value,

    fighterPiloting: skills.space[0].skill.find((x) => x.attributes.type === 'fighterPiloting')!.value,
    fighterCombat: skills.space[0].skill.find((x) => x.attributes.type === 'fighterCombat')!.value,
    capitalPiloting: skills.space[0].skill.find((x) => x.attributes.type === 'capitalPiloting')!.value,
    capitalCombat: skills.space[0].skill.find((x) => x.attributes.type === 'capitalCombat')!.value,
    spaceCommand: skills.space[0].skill.find((x) => x.attributes.type === 'spaceCommand')!.value,

    vehiclePiloting: skills.ground[0].skill.find((x) => x.attributes.type === 'vehiclePiloting')!.value,
    vehicleCombat: skills.ground[0].skill.find((x) => x.attributes.type === 'vehicleCombat')!.value,
    infantryCommand: skills.ground[0].skill.find((x) => x.attributes.type === 'infantryCommand')!.value,
    vehicleCommand: skills.ground[0].skill.find((x) => x.attributes.type === 'vehicleCommand')!.value,
    heavyWeapons: skills.ground[0].skill.find((x) => x.attributes.type === 'heavyWeapons')!.value,
  }
}
