import {stringToFunction, toDecimal, GameObject, Flr, Sqrt, Sq, rng, rngmm, log10} from './utils.js';
import {Atri} from './data/Atri.js';
import {Career} from './data/Career.js';
import {Faction} from './data/Faction.js';
import {Hero} from './data/Hero.js';
import {HeroLv} from './data/HeroLv.js';
import {HeroStar} from './data/HeroStar.js';
import {HeroTier} from './data/HeroTier.js';
import {ItemEquipComp} from './data/ItemEquipComp.js';
import {Skill} from './data/Skill.js';

import {SkillModel} from './skillmodel.js'


export class UnitModel {
	constructor(heroID=0, heroLV=0, ) {
		this.entity = {
			heroID: heroID,
			heroLV: heroLV,
			heroProperties: {
				Faction: null,
				Class: null,
				Star: null,
			},
			heroEquips: {
				weaponID: null,
				armorID: null,
				helmetID: null,
				accessoryID: null
			},
			heroArtifactID: null,
			heroRuneID: null,
			heroStats: {
				Armor: {base: 0, total: 0},
				ArmorBreak: {base: 0, total: 0},
				Attack: {base: 0, total: 0},
				ControlImmune: {base: 0, total: 0},
				CritDamage: {base: 0, total: 0},
				CritRate: {base: 0, total: 0},
				Dodge: {base: 0, total: 0},
				Energy: {base: 0, total: 0},
				HitRate: {base: 0, total: 0},
				MaxHp: {base: 0, total: 0},
				ReduceDamage: {base: 0, total: 0},
				SkillDamage: {base: 0, total: 0},
				Speed: {base: 0, total: 0},
				TrueDamage: {base: 0, total: 0},
			},
			heroSkills: {
				base: null,
				active: null,
				passive1: null,
				passive2: null,
				passive3: null,
			},
			heroName: 0
		}
		this.battle = {
			teamID: null,
			stats: {
				Armor: {base: null, bonusPerma: null, bonusBuff: null},
				ArmorBreak: {base: null, bonusPerma: null, bonusBuff: null},
				Attack: {base: null, bonusPerma: null, bonusBuff: null},
				ControlImmune: {base: null, bonusPerma: null, bonusBuff: null},
				CritDamage: {base: null, bonusPerma: null, bonusBuff: null},
				CritRate: {base: null, bonusPerma: null, bonusBuff: null},
				Dodge: {base: null, bonusPerma: null, bonusBuff: null},
				Energy: {base: null, bonusPerma: null, bonusBuff: null},
				HitRate: {base: null, bonusPerma: null, bonusBuff: null},
				MaxHp: {base: null, bonusPerma: null, bonusBuff: null},
				ReduceDamage: {base: null, bonusPerma: null, bonusBuff: null},
				SkillDamge: {base: null, bonusPerma: null, bonusBuff: null},
				Speed: {base: null, bonusPerma: null, bonusBuff: null},
				TrueDamage: {base: null, bonusPerma: null, bonusBuff: null},

				CareerExt_1: {base: null, bonusPerma: null, bonusBuff: null}, /* Damage Bonus to Warrior */
				CareerExt_2: {base: null, bonusPerma: null, bonusBuff: null}, /* Damage Bonus to Assassin */
				CareerExt_3: {base: null, bonusPerma: null, bonusBuff: null}, /* Damage Bonus to Wanderer */
				CareerExt_4: {base: null, bonusPerma: null, bonusBuff: null}, /* Damage Bonus to Cleric */
				CareerExt_5: {base: null, bonusPerma: null, bonusBuff: null}, /* Damage Bonus to Mage */
				CareerRedu_1: {base: null, bonusPerma: null, bonusBuff: null}, /* Less damage received from Warrior */
				CareerRedu_2: {base: null, bonusPerma: null, bonusBuff: null}, /* Less damage received from Assassin */
				CareerRedu_3: {base: null, bonusPerma: null, bonusBuff: null}, /* Less damage received from Wanderer */
				CareerRedu_4: {base: null, bonusPerma: null, bonusBuff: null}, /* Less damage received from Cleric */
				CareerRedu_5: {base: null, bonusPerma: null, bonusBuff: null}, /* Less damage received from Mage */
				StateExt_1: {base: null, bonusPerma: null, bonusBuff: null}, /*Bleed */
				StateExt_2: {base: null, bonusPerma: null, bonusBuff: null}, /*Burn */
				StateExt_3: {base: null, bonusPerma: null, bonusBuff: null}, /*Poison */
				StateExt_4: {base: null, bonusPerma: null, bonusBuff: null}, /*Silence */
				StateExt_5: {base: null, bonusPerma: null, bonusBuff: null}, /*Stun */
				StateExt_6: {base: null, bonusPerma: null, bonusBuff: null}, /*Freeze */
				StateExt_7: {base: null, bonusPerma: null, bonusBuff: null}, /*Petrify */
				StateRisi_1: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Bleed */
				StateRisi_2: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Burn */
				StateRisi_3: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Poison */
				StateRisi_4: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Silence */
				StateRisi_5: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Stun */
				StateRisi_6: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Freeze */
				StateRisi_7: {base: null, bonusPerma: null, bonusBuff: null}, /* Resistance to Petrify */
				PerAtta_1: {base: null, bonusPerma: null, bonusBuff: null},
				PerArmo_1: {base: null, bonusPerma: null, bonusBuff: null},
				PerHp_1: {base: null, bonusPerma: null, bonusBuff: null},
				PerAtta_2: {base: null, bonusPerma: null, bonusBuff: null},
				PerArmo_2: {base: null, bonusPerma: null, bonusBuff: null},
				PerHp_2: {base: null, bonusPerma: null, bonusBuff: null},

				ExtraControl : {base: null, bonusPerma: null, bonusBuff: null}, 
				ExtraHeal : {base: null, bonusPerma: null, bonusBuff: null}, 
				ExtraGetHeal: {base: null, bonusPerma: null, bonusBuff: null},

				isState_1: false,
				isState_2: false,
				isState_3: false,
				isState_4: false,
				isState_5: false,
				isState_6: false,
				isState_7: false,

				CurrentHp: 100,
				CurrentEnergy: 100,
			},
			sortNum: null,
			staticIndex: null,
			staticCol: null
		}
	}

	init() {
		if (Hero.hasOwnProperty('id_'+this.entity.heroID)) {
			let heroData = Hero['id_'+this.entity.heroID]

			/* set the properties */
			this.entity.heroProperties.Faction = heroData.Faction
			this.entity.heroProperties.Class = heroData.Career
			this.entity.heroProperties.Star = heroData.Star

			/* set base stats */
			this.entity.heroStats.Armor = heroData.Armor
			this.entity.heroStats.ArmorBreak = heroData.ArmorBreak
			this.entity.heroStats.Attack = heroData.Attack
			this.entity.heroStats.ControlImmune = heroData.ControlImmune
			this.entity.heroStats.CritDamage = heroData.CritDamage
			this.entity.heroStats.CritRate = heroData.CritRate
			this.entity.heroStats.Dodge = heroData.Dodge
			this.entity.heroStats.Energy = heroData.Energy
			this.entity.heroStats.HitRate = heroData.HitRate
			this.entity.heroStats.MaxHp = heroData.MaxHp
			this.entity.heroStats.ReduceDamage = heroData.ReduceDamage
			this.entity.heroStats.SkillDamge = heroData.SkillDamge
			this.entity.heroStats.Speed = heroData.Speed
			this.entity.heroStats.TrueDamage = heroData.TrueDamage

			/* set hero name id */
			this.entity.heroName = heroData.NameLang

			/* set skills */
			if (heroData.Skill_1 != 0) {
				this.entity.heroSkills.base = new SkillModel(heroData.Skill_1)
			}
			if (heroData.Skill_2 != 0) {
				this.entity.heroSkills.active = new SkillModel(heroData.Skill_2)
			}
			if (heroData.Skill_3 != 0) {
				this.entity.heroSkills.passive1 = new SkillModel(heroData.Skill_3)
			}
			if (heroData.Skill_4 != 0) {
				this.entity.heroSkills.passive2 = new SkillModel(heroData.Skill_4)
			}
			if (heroData.Skill_5 != 0) {
				this.entity.heroSkills.passive3 = new SkillModel(heroData.Skill_5)
			}


			this.computeStatLevel(this.entity.heroLV)

		} else {
			throw new Error('UnitModel.init() : wrong heroID ('+this.entity.heroID+')')
		}
		//console.log(this.entity.heroID)
	}

	computeStatLevel(base, lv) {
		return base * (1 + (lv - 1) * 0.1)
	}
}

export class PlayerUnitModel {
	constructor(heroID=0, heroLV=0) {
		super(heroID, heroLV)
	}

	calculateStats(pets={}, tech=[]) {
		
	}

	/*HP,ATK*/
	compute_player_base(statname, pet=0, techRatio=0) {
		let tierRatio = this.entity.heroStats[statname].base
		let equip = null
		let rune = null
		let artifact = null
		/*pet*/

		let suitRatio = null /*equip set bonus*/
		let runeRatio = null
		let artifactRatio = null
		/*techRatio*/
		let factionRatio = 0
		let skinRatio = 0

		let value = this.entity.heroLV * tierRatio + equip + rune + artifact + pet

		return value * (1 + suitRatio) * (1 + runeRatio) * (1 + artifactRatio) * (1 + techRatio) * (1 + factionRatio) * (1 + skinRatio)
	}

	/*Armor*/
	compute_player_baseEx() {

	}

	/*Battle Power (CE)*/
	compute_power() {

	}

	/*Speed*/
	compute_player_speed() {

	}

	/*battle attributes*/
	compute_player_other() {

	}


}
