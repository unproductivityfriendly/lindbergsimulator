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



export class SkillModel {
	constructor(skillID=0) {
		this.entity = {
			skillID: skillID,
			skillProperties: {
				B: {
					t: null, /*target*/
					ef: null, /*effect ratio*/
					eh: null, /*can't be dodged*/
				},
				E1: {
					ef: null, /*effect ratio*/
					h: null, /*chance% to*/
					eh: null, /*can't be dodged*/
					btr: null, /*buff trigger*/
					bt: null, /*buff target*/
					bef: null, /*buff effect*/
					bc: null, /*buff condition (n rounds)*/
				},
				E2: {
					ef: null, /*effect ratio*/
					h: null, /*chance% to*/
					eh: null, /*can't be dodged*/
					btr: null, /*buff trigger*/
					bt: null, /*buff target*/
					bef: null, /*buff effect*/
					bc: null, /*buff condition (n rounds)*/
				},
				E3: {
					ef: null, /*effect ratio*/
					h: null, /*chance% to*/
					eh: null, /*can't be dodged*/
					btr: null, /*buff trigger*/
					bt: null, /*buff target*/
					bef: null, /*buff effect*/
					bc: null, /*buff condition (n rounds)*/
				},
				E4: {
					ef: null, /*effect ratio*/
					h: null, /*chance% to*/
					eh: null, /*can't be dodged*/
					btr: null, /*buff trigger*/
					bt: null, /*buff target*/
					bef: null, /*buff effect*/
					bc: null, /*buff condition (n rounds)*/
				},
			},

			skillName: 0
		}
		this.battle = {
			sortNum: null,
			staticIndex: null,
			staticCol: null,
			hpNum: null,
			speed: null,
		}

		this.init()
	}

	init() {
		if (Skill.hasOwnProperty('id_'+this.entity.skillID)) {
			let skillData = Skill['id_'+this.entity.skillID]

			/* set the properties */
			/* base */
			this.entity.skillProperties.B.t = skillData.Targ
			this.entity.skillProperties.B.ef = skillData.Eff
			this.entity.skillProperties.B.eh = skillData.ExHit
			/* effect 1 */
			this.entity.skillProperties.E1.ef = skillData.Eff_1
			this.entity.skillProperties.E1.h = skillData.Hit_1
			this.entity.skillProperties.E1.eh = skillData.ExHit_1
			this.entity.skillProperties.E1.btr = skillData.BuffTrig_1
			this.entity.skillProperties.E1.bt = skillData.BuffTar_1
			this.entity.skillProperties.E1.bef = skillData.BuffEff_1
			this.entity.skillProperties.E1.bc = skillData.BuffCondi_1
			/* effect 2 */
			this.entity.skillProperties.E2.ef = skillData.Eff_2
			this.entity.skillProperties.E2.h = skillData.Hit_2
			this.entity.skillProperties.E2.eh = skillData.ExHit_2
			this.entity.skillProperties.E2.btr = skillData.BuffTrig_2
			this.entity.skillProperties.E2.bt = skillData.BuffTar_2
			this.entity.skillProperties.E2.bef = skillData.BuffEff_2
			this.entity.skillProperties.E2.bc = skillData.BuffCondi_2
			/* effect 3 */
			this.entity.skillProperties.E3.ef = skillData.Eff_3
			this.entity.skillProperties.E3.h = skillData.Hit_3
			this.entity.skillProperties.E3.eh = skillData.ExHit_3
			this.entity.skillProperties.E3.btr = skillData.BuffTrig_3
			this.entity.skillProperties.E3.bt = skillData.BuffTar_3
			this.entity.skillProperties.E3.bef = skillData.BuffEff_3
			this.entity.skillProperties.E3.bc = skillData.BuffCondi_3
			/* effect 4 */
			this.entity.skillProperties.E4.ef = skillData.Eff_4
			this.entity.skillProperties.E4.h = skillData.Hit_4
			this.entity.skillProperties.E4.eh = skillData.ExHit_4
			this.entity.skillProperties.E4.btr = skillData.BuffTrig_4
			this.entity.skillProperties.E4.bt = skillData.BuffTar_4
			this.entity.skillProperties.E4.bef = skillData.BuffEff_4
			this.entity.skillProperties.E4.bc = skillData.BuffCondi_4

			/* set skill name id */
			this.entity.skillName = skillData.NameLang
		} else {
			throw new Error('SkillModel.init() : wrong skillID ('+this.entity.skillID+')')
		}
		//console.log(this.entity.skillID)
	}





}
