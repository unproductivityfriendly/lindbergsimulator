import {stringToFunction, toDecimal, GameObject, Flr, rng, rngmm, unique, arrsign} from './utils.js';
import {UnitModel} from './unitmodel.js';
import {Battle} from './battle.js';
//import {PartyModel} from './party.js';

export class GameEngine {
	constructor() {
		this.frame = 1000
		this.fps = 1
		this.lastFrameTimeStamp = 0
		this.fpsmeter = null

		this.constances = {
			entitylists			: {
				units 			: {},
				resources 		: {},
				technologies 	: {},
				events 			: {},
				quests 			: {},

			},

			scenes 				: {},

			ui 					: {},
			uil 				: {},
			uie 				: {},

			buffs 				: {},
			modifiers 			: {}
		}

		this.entity = {
			attacker: {
				characters : {
					pos1: null, pos2: null, pos3: null,
					pos4: null, pos5: null, pos6: null,
				},
				aura : [],
				pet : [],
				guildtech: []
			},
			defender: {
				characters : {
					pos1: null, pos2: null, pos3: null,
					pos4: null, pos5: null, pos6: null,
				},
				aura : [],
				pet : [],
				guildtech: []
			},
			maxHeroPerTeam: 6,
		}
		

		this.charListBySpeed = []

		this.nextid = {unit: 1, party: 1}
	}

	init(entitydata) {
		this.initConstances(entitydata.constances)
	}

	/* Add all entities as template */

	initConstances(cnstdata) {
		//let battle = new Battle(this.entity.attacker,this.entity.defender)
	}

	loop() {
		let now = performance.now()
		this.frame += 1
		this.fps = toDecimal(1000 / (now - this.lastFrameTimeStamp), 0)
		this.lastFrameTimeStamp = now

		if (this.fpsmeter === null && document.getElementById("fpsmeterengine")) {
			this.fpsmeter = new FPSMeter(document.getElementById("fpsmeterengine"), {graph: 1, history: 20})
		}
		/**************************\
		|* CHECK QUEUES
		\**************************/


	}

	simulateBattle() {
		let testbattle = new Battle(this.entity.attacker, this.entity.defender)
		testbattle.play()
		console.log(testbattle)
	}

	loadTeam(teamID=1, heroes={}) {
		let _team = teamID === 1 ? 'attacker' : 'defender'
		let _heroes = heroes

		this.entity[_team].characters.pos1 = this.constructor.createHero(_heroes.pos1)
		this.entity[_team].characters.pos2 = this.constructor.createHero(_heroes.pos2)
		this.entity[_team].characters.pos3 = this.constructor.createHero(_heroes.pos3)
		this.entity[_team].characters.pos4 = this.constructor.createHero(_heroes.pos4)
		this.entity[_team].characters.pos5 = this.constructor.createHero(_heroes.pos5)
		this.entity[_team].characters.pos6 = this.constructor.createHero(_heroes.pos6)
	}

	loadData() {

	}

	static createHero(heroID=0) {
		let newHero = new UnitModel(heroID)
		newHero.init()
		return newHero
	}

}

export class SimpleBattle extends GameEngine {

}