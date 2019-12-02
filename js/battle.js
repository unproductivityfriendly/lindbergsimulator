import {stringToFunction, toDecimal, GameObject, Flr, Sqrt, Sq, rng, rngmm, log10, getRandomItem} from './utils.js';
import {Atri} from './data/Atri.js';
import {Career} from './data/Career.js';
import {Faction} from './data/Faction.js';
//import * as Data from './data.js';



export class Battle {
	constructor(Attacker={}, Defender={}) {
		this.attacker = Attacker
		this.defender = Defender
		this.entity = {
			round: 1,
			maxrounds: 15,
			heroes: [],
			orderby: {
				position: [],
				speed: [],
				lowHp: [],
				highAttack: [],
				dead: [],
				alive: [],
			}
		}

		this.init()
	}


	init() {
		/* calc heroes stats */

		// buff trigger 1 & 2 & 3
		for (var i = 0; i < this.attacker.length; i++) {
			this.attacker.characters['pos'+(i+1)].entity.heroSkills
		}
		this.triggerSkills()
	}

	play() {
		if (this.entity.round > 15) {
			this.end()
		} else {
			/* one round*/
			this.calcOrder()
			// heroes will attack per speed order (it's already ordered by pos if multiple hero has same speed)
			for (var i = 0; i < this.entity.orderby.speed.length; i++) {
				// calculate order of all heroes alive
				if (i !== 0) {
					this.calcOrder()
				}
				// calculate stats of all heroes alive
				this.calcAllHeroesStats()

				let heroBattleID = this.entity.orderby.speed[i]
				if (heroBattleID <= 6) {
					// attacker hero
					this.attack(true, heroBattleID)
				} else if (heroBattleID <= 12) {
					// defender hero
					this.attack(false, heroBattleID - 6)
				} else {
					throw new Error('Battle.play() : wrong heroID ('+heroBattleID+')')
				}
			}
			
			this.entity.round++
		}
	}

	end() {

	}

	attack(attacker=true, heroPosID=1) {
		let cannotActiveStates = [4,5,6,7]
		let cannotBasicStates = [5,6,7]
		let side = attacker ? 'attacker' : 'defender'
		let isActive = false
		let isDisabled = false /* can't active nor basic because of CC */

		// check if has cc that doesn't allow to attack
		if (attacker) {
			if (this.attacker.characters['pos'+heroPosID].battle.stats.CurrentEnergy === 100 
				&& !this.checkHeroHasAnyState(true, heroPosID, cannotActiveStates)) {
				isActive = true
			} else if (this.checkHeroHasAnyState(true, heroPosID, cannotBasicStates)) {
				isDisabled = true
			}
		} else {
			if (this.defender.characters['pos'+heroPosID].battle.stats.CurrentEnergy === 100 
				&& !this.checkHeroHasAnyState(false, heroPosID, cannotActiveStates)) {
				isActive = true
			} else if (this.checkHeroHasAnyState(false, heroPosID, cannotBasicStates)) {
				isDisabled = true
			}
		}
		console.log(attacker, heroPosID)
		// get targets
		this.getTargetsForAttack(attacker, heroPosID, isActive)
		// deal dmg to target

		let battleTargetIDs = []
		// get targets for effect
		this.getTargetsForEffect(attacker, heroPosID, isActive, battleTargetIDs)
		// buff trigger

		// calc hit rate
		// deal dmg/effect
		// increase self energy & enemy energy of those hit

		// basic or active = 4 5 6

		// basic dodge+active dodge = 7 8 9

		// basic crit+active crit = 10 11 12

		// any dmg	= 13
			// hero dead = 15

		/* LOOP THROUGH HEROES THAT GOT DAMAGED TO PROC THEIR EFFECT */
		// TO DO LOOP OF DAMAGED HEROES
		//this.getTargetAsAttacked()

	}


	checkHeroHasAnyState(attacker=true, heroPosID=1, states=[]) {
		let side = attacker ? 'attacker' : 'defender'

		for (var i = 0; i < states.length; i++) {
			if (this[side].characters['pos'+(heroPosID)].battle.stats['isState_'+states[i]] === true) {
				return true  
			}
		}
		return false
	}

	setAllHeroes() {
		if (this.attacker.characters.pos1) {this.entity.heroes.push(1)}
		if (this.attacker.characters.pos2) {this.entity.heroes.push(2)}
		if (this.attacker.characters.pos3) {this.entity.heroes.push(3)}
		if (this.attacker.characters.pos4) {this.entity.heroes.push(4)}
		if (this.attacker.characters.pos5) {this.entity.heroes.push(5)}
		if (this.attacker.characters.pos6) {this.entity.heroes.push(6)}
		if (this.defender.characters.pos1) {this.entity.heroes.push(7)}
		if (this.defender.characters.pos2) {this.entity.heroes.push(8)}
		if (this.defender.characters.pos3) {this.entity.heroes.push(9)}
		if (this.defender.characters.pos4) {this.entity.heroes.push(10)}
		if (this.defender.characters.pos5) {this.entity.heroes.push(11)}
		if (this.defender.characters.pos6) {this.entity.heroes.push(12)}
		
	}

	triggerSkills(attacker=true, heroPosID=1, triggerID=null) {

	}

	getTargetsForAttack(attacker=true, heroPosID=1, isActive=false) {
		let side = attacker ? 'attacker' : 'defender'
		let heroSkills = this[side].characters['pos'+heroPosID].entity.heroSkills
		if (isActive) {
			let baseTargetIDs = this.getTargetsByTargetType(attacker, heroPosID, heroSkills.active.entity.skillProperties.B.t)
		} else {

		}
	}

	getTargetsForEffect(attacker=true, heroPosID=1, triggerID=null, battleTargetIDs=null) {
		let side = attacker ? 'attacker' : 'defender'
		let heroSkills = this[side].characters['pos'+heroPosID].entity.heroSkills
		if (triggerID === 511000) {
			for (var i = 0; i < battleTargetIDs.length; i++) {
				let e1TargetIDs = this.getTargetsByTargetType(attacker, heroPosID, heroSkills.active.entity.skillProperties.E1.bt, battleTargetIDs[i])
				let e2TargetIDs = this.getTargetsByTargetType(attacker, heroPosID, heroSkills.active.entity.skillProperties.E2.bt, battleTargetIDs[i])
				let e3TargetIDs = this.getTargetsByTargetType(attacker, heroPosID, heroSkills.active.entity.skillProperties.E3.bt, battleTargetIDs[i])
				let e4TargetIDs = this.getTargetsByTargetType(attacker, heroPosID, heroSkills.active.entity.skillProperties.E4.bt, battleTargetIDs[i])
			}
		} else {

		}
	}

	getTargetAsAttacked(attacker=true, heroPosID=1, isActive=false, battleAttackerIDs=null) {

	}

	/* battleTargetID only when the hero has attacked (count dodeged) */
	/* battleAttackerID only when the hero received an attack */
	getTargetsByTargetType(attacker=true, heroPosID=1, targetTypeID=41000, battleTargetID=null, battleAttackerID=null) {
		let battleHeroIDOffset = attacker === true ? 0 : 6
		let battleHeroIDs = []
		if (targetTypeID === 10000) {
			// self
			battleHeroIDs.push(heroPosID+battleHeroIDOffset)
		} else if (targetTypeID === 29001) {
			//enemy warriors
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDFromClass(1, 2)}
			else {battleHeroIDs = this.getBattleHeroesIDFromClass(1, 1)}
		} else if (targetTypeID === 29002) {
			//enemy assassins
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDFromClass(2, 2)}
			else {battleHeroIDs = this.getBattleHeroesIDFromClass(2, 1)}
		} else if (targetTypeID === 29003) {
			//enemy wanderers
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDFromClass(3, 2)}
			else {battleHeroIDs = this.getBattleHeroesIDFromClass(3, 1)}
		} else if (targetTypeID === 29004) {
			//enemy clerics
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDFromClass(4, 2)}
			else {battleHeroIDs = this.getBattleHeroesIDFromClass(4, 1)}
		} else if (targetTypeID === 29005) {
			//enemy mages
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDFromClass(5, 2)}
			else {battleHeroIDs = this.getBattleHeroesIDFromClass(5, 1)}
		} else if (targetTypeID === 29009) {
			//same target as damaged
			if (battleTargetID === null) {
				throw new Error('Battle.getTargetsByTargetType() : battleTargetID parameter required.')
			}
			battleHeroIDs.push(battleTargetID)
		} else if (targetTypeID === 29116) {
			// same target if hp <50%(lindberg)
			// should be called only after skill hit and target hp <50% (trigger 511000)
			if (battleTargetID === null) {
				throw new Error('Battle.getTargetsByTargetType() : battleTargetID parameter required.')
			}
		} else if (targetTypeID === 39009) {
			//attacker
			if (battleAttackerID === null) {
				throw new Error('Battle.getTargetsByTargetType() : battleAttackerID parameter required.')
			}
			battleHeroIDs.push(battleAttackerID)
		} else if (targetTypeID === 41000) {
			//default (enemy tank)
			if (attacker) {battleHeroIDs.push(this.getBattleHeroIDTeamTank(2))}
			else {battleHeroIDs.push(this.getBattleHeroIDTeamTank(1))}
		} else if (targetTypeID === 42129) {
			//2 random frontline enemies
			let frontline = []
			if (attacker) {frontline = this.getBattleHeroesIDByLine(1, 2)} 
			else {frontline = this.getBattleHeroesIDByLine(1, 1)}
			battleHeroIDs = frontline.length <= 2 ? frontline : getRandomItem(frontline, 2)
		} else if (targetTypeID === 42209) {
			//frontline enemies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(1, 2)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(1, 1)}
		} else if (targetTypeID === 43119) {
			//1 random backline enemy
			let backline = []
			if (attacker) {backline = this.getBattleHeroesIDByLine(2, 2)} 
			else {backline = this.getBattleHeroesIDByLine(2, 1)}
			battleHeroIDs = backline.length <= 1 ? backline : getRandomItem(backline, 1)
		} else if (targetTypeID === 43129) {
			//2 random backline enemies
			let backline = []
			if (attacker) {backline = this.getBattleHeroesIDByLine(2, 2)} 
			else {backline = this.getBattleHeroesIDByLine(2, 1)}
			battleHeroIDs = backline.length <= 2 ? backline : getRandomItem(backline, 2)
		} else if (targetTypeID === 43209) {
			//backline enemies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(2, 2)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(2, 1)}
		} else if (targetTypeID === 49119) {
			//1 random enemy
			let enemyteam = []
			if (attacker) {enemyteam = this.getBattleHeroesIDByLine(3, 2)} 
			else {enemyteam = this.getBattleHeroesIDByLine(3, 1)}
			battleHeroIDs = enemyteam.length <= 1 ? enemyteam : getRandomItem(enemyteam, 1)
		} else if (targetTypeID === 49129) {
			//2 random enemies
			let enemyteam = []
			if (attacker) {enemyteam = this.getBattleHeroesIDByLine(3, 2)} 
			else {enemyteam = this.getBattleHeroesIDByLine(3, 1)}
			battleHeroIDs = enemyteam.length <= 2 ? enemyteam : getRandomItem(enemyteam, 2)
		} else if (targetTypeID === 49139) {
			//3 random enemies
			let enemyteam = []
			if (attacker) {enemyteam = this.getBattleHeroesIDByLine(3, 2)} 
			else {enemyteam = this.getBattleHeroesIDByLine(3, 1)}
			battleHeroIDs = enemyteam.length <= 3 ? enemyteam : getRandomItem(enemyteam, 3)
		} else if (targetTypeID === 49149) {
			//4 random enemies
			let enemyteam = []
			if (attacker) {enemyteam = this.getBattleHeroesIDByLine(3, 2)} 
			else {enemyteam = this.getBattleHeroesIDByLine(3, 1)}
			battleHeroIDs = enemyteam.length <= 4 ? enemyteam : getRandomItem(enemyteam, 4)
		} else if (targetTypeID === 49209) {
			//all enemies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(3, 2)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(3, 1)}
		} else if (targetTypeID === 49516) {
			//enemy with lowest HP
			if (attacker) {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamLowHP(2))} 
			else {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamLowHP(1))}
		} else if (targetTypeID === 49818) {
			//enemy with highest ATK
			if (attacker) {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamHighAtk(2))} 
			else {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamHighAtk(1))}
		} else if (targetTypeID === 52119) {
			//1 random frontline ally
			let allyteam = []
			if (attacker) {allyteam = this.getBattleHeroesIDByLine(1, 1)} 
			else {allyteam = this.getBattleHeroesIDByLine(1, 2)}
			battleHeroIDs = getRandomItem(allyteam, 1)
		} else if (targetTypeID === 52209) {
			//frontline allies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(1, 1)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(1, 2)}
		} else if (targetTypeID === 53129) {
			//2 random backline allies
			let backlineAlly = []
			if (attacker) {backlineAlly = this.getBattleHeroesIDByLine(2, 1)} 
			else {backlineAlly = this.getBattleHeroesIDByLine(2, 2)}
			battleHeroIDs = backlineAlly.length <= 2 ? backlineAlly : getRandomItem(backlineAlly, 2)
		} else if (targetTypeID === 53209) {
			//backline allies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(2, 1)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(2, 2)}
		} else if (targetTypeID === 59119) {
			//1 random ally
			let allyTeam = []
			if (attacker) {allyTeam = this.getBattleHeroesIDByLine(3, 1)} 
			else {allyTeam = this.getBattleHeroesIDByLine(3, 2)}
			battleHeroIDs = allyTeam.length <= 1 ? allyTeam : getRandomItem(allyTeam, 1)
		} else if (targetTypeID === 59129) {
			//2 random allies
			let allyTeam = []
			if (attacker) {allyTeam = this.getBattleHeroesIDByLine(3, 1)} 
			else {allyTeam = this.getBattleHeroesIDByLine(3, 2)}
			battleHeroIDs = allyTeam.length <= 2 ? allyTeam : getRandomItem(allyTeam, 2)
		} else if (targetTypeID === 59139) {
			//3 random allies
			let allyTeam = []
			if (attacker) {allyTeam = this.getBattleHeroesIDByLine(3, 1)} 
			else {allyTeam = this.getBattleHeroesIDByLine(3, 2)}
			battleHeroIDs = allyTeam.length <= 3 ? allyTeam : getRandomItem(allyTeam, 3)
		} else if (targetTypeID === 59149) {
			//4 random allies
			let allyTeam = []
			if (attacker) {allyTeam = this.getBattleHeroesIDByLine(3, 1)} 
			else {allyTeam = this.getBattleHeroesIDByLine(3, 2)}
			battleHeroIDs = allyTeam.length <= 4 ? allyTeam : getRandomItem(allyTeam, 4)
		} else if (targetTypeID === 59209) {
			//all allies
			if (attacker) {battleHeroIDs = this.getBattleHeroesIDByLine(3, 1)} 
			else {battleHeroIDs = this.getBattleHeroesIDByLine(3, 2)}
		} else if (targetTypeID === 59516) {
			//ally with lowest HP
			if (attacker) {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamLowHP(1))} 
			else {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamLowHP(2))}
		} else if (targetTypeID === 59826) {
			//dead ally (skuld)
			if (attacker) {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamFirstDead(1))} 
			else {battleHeroIDs = battleHeroIDs.push(this.getBattleHeroIDOfTeamFirstDead(2))}
		} else if (targetTypeID === 69009) {
			//to target (dzie)
			// should only be called after the attack & dodge (trigger 711000)
			if (battleTargetID === null) {
				throw new Error('Battle.getTargetsByTargetType() : battleTargetID parameter required.')
			}
			battleHeroIDs.push(battleTargetID)
		} else if (targetTypeID === 79009) {
			//to target (centaur)
			// should only be called after a crit attack (trigger 1211000)
			if (battleTargetID === null) {
				throw new Error('Battle.getTargetsByTargetType() : battleTargetID parameter required.')
			}
			battleHeroIDs.push(battleTargetID)
		} else {
			throw new Error('Battle.getTargetsByTargetType() : targetTypeID not handled : ('+targetTypeID+')')
		}
	}

	getBattleHeroIDOfTeamFirstDead(teamID=1) {
		for (var i = 0; i < this.entity.orderby.dead.length; i++) {
			if (teamID === 1 & this.entity.orderby.dead[i] <= 6) {
				return this.entity.orderby.dead[i]
			} else if (teamID === 2 & this.entity.orderby.dead[i] >= 7) {
				return this.entity.orderby.dead[i]
			}
		}
	}

	getBattleHeroIDOfTeamLowHP(teamID=1) {
		for (var i = 0; i < this.entity.orderby.lowHp.length; i++) {
			if (teamID === 1 & this.entity.orderby.lowHp[i] <= 6) {
				return this.entity.orderby.lowHp[i]
			} else if (teamID === 2 & this.entity.orderby.lowHp[i] >= 7) {
				return this.entity.orderby.lowHp[i]
			}
		}
	}

	getBattleHeroIDOfTeamHighAtk(teamID=1) {
		for (var i = 0; i < this.entity.orderby.highAttack.length; i++) {
			if (teamID === 1 & this.entity.orderby.highAttack[i] <= 6) {
				return this.entity.orderby.highAttack[i]
			} else if (teamID === 2 & this.entity.orderby.highAttack[i] >= 7) {
				return this.entity.orderby.highAttack[i]
			}
		}
	}

	getAllHeroesWithStat(statname) {
		let heroes = []
		for (var i = 0; i < 6; i++) {
			if (this.attacker.characters['pos'+(i+1)] && this.attacker.characters['pos'+(i+1)].battle.stats.CurrentHp !== 0) {
				let hero = {id: i+1}
				hero[statname] = this.attacker.characters['pos'+(i+1)].battle.stats[statname]
				heroes.push(hero)
			}
		}
		for (var i = 0; i < 6; i++) {
			if (this.defender.characters['pos'+(i+1)] && this.defender.characters['pos'+(i+1)].battle.stats.CurrentHp !== 0) {
				let hero = {id: i+7}
				hero[statname] = this.defender.characters['pos'+(i+1)].battle.stats[statname]
				heroes.push(hero)
			}
		}
		return heroes
	}

	/* line=1 is frontline, line=2 is backline, line=3 is all | ALIVE HEROES ONLY */
	getBattleHeroesIDByLine(line=1, teamID=1) {
		let battleHeroesIDByLine = []
		let indexIndex = {
			/* [start,end]*/
			line_1: [0, 3],
			line_2: [3, 6],
			line_3: [0, 6]
		}
		if (teamID === 1 || teamID === 3) {
			for (var i = indexIndex['line_'+teamID][0]; i < indexIndex['line_'+teamID][1]; i++) {
				let hero = this.attacker.characters['pos'+(i+1)]
				if (hero !== null && hero.battle.CurrentHp > 0) {
					battleHeroesIDByLine.push(i+1)
				}
			}
		}
		if (teamID === 2 || teamID === 3) {
			
			for (let i = indexIndex['line_'+teamID][0]; i < indexIndex['line_'+teamID][1]; i++) {
				let hero = this.defender.characters['pos'+(i+1)]
				if (hero !== null && hero.battle.CurrentHp > 0) {
					battleHeroesIDByLine.push(i+7)
				}
			}
		}
		return battleHeroesIDByLine
	}

	getBattleHeroesIDFromClass(classID, teamID=3) { /*teamID 3 means both teams*/
		let battleHeroesIDWithClass = []
		if (teamID === 1 || teamID === 3) {
			for (var i = 0; i < 6; i++) {
				let hero = this.attacker.characters['pos'+(i+1)]
				if (hero !== null && hero.entity.heroProperties.Class === classID) {
					battleHeroesIDWithClass.push(i+1)
				}
			}
		}
		if (teamID === 2 || teamID === 3) {
			for (var i = 0; i < 6; i++) {
				let hero = this.defender.characters['pos'+(i+1)]
				if (hero !== null && hero.entity.heroProperties.Class === classID) {
					battleHeroesIDWithClass.push(i+7)
				}
			}
		}
		return battleHeroesIDWithClass
	}

	getBattleHeroIDTeamTank(teamID=1) {
		if (teamID === 1) {
			for (var i = 0; i < 6; i++) {
				let hero = this.attacker.characters['pos'+(i+1)]
				if (hero !== null && hero.battle.stats.CurrentHp > 0) {
					return i+1
				}
			}
		}
		if (teamID === 2) {
			for (var i = 0; i < 6; i++) {
				let hero = this.defender.characters['pos'+(i+1)]
				if (hero !== null && hero.battle.stats.CurrentHp > 0) {
					return i+7
				}
			}
		}
		/*if all dead lul*/
		return 0
	}

	calcOrder() {
		this.setOrderSpeed()
		this.setOrderLowHp()

	}

	setOrderSpeed() {
		let speed = []
		let speedHeroes = this.getAllHeroesWithStat('Speed')
		speedHeroes.sort(function (a, b) {return b.Speed - a.Speed})
		for (var i = 0; i < speedHeroes.length; i++) {speed.push(speedHeroes[i].id)}
		this.entity.orderby.speed = speed
	}
	setOrderLowHp() {
		let hp = []
		let hpHeroes = this.getAllHeroesWithStat('CurrentHp')
		hpHeroes.sort(function (a, b) {return a.CurrentHp - b.CurrentHp})
		for (var i = 0; i < hpHeroes.length; i++) {hp.push(hpHeroes[i].id)}
		this.entity.orderby.lowHp = hp
	}
	setOrderHighAtk() {
		let atk = []
		let atkHeroes = this.getAllHeroesByStat('Attack')
		atkHeroes.sort(function (a, b) {return b.Attack - a.Attack})
		for (var i = 0; i < atkHeroes.length; i++) {atk.push(atkHeroes[i].id)}
		this.entity.orderby.highAttack = atk
	}

	calcAllHeroesStats() {

		if (this.attacker.characters.pos1) {
			//console.log(this.attacker.characters.pos1.battle)
		}

		
	}

	calcAllStats() {

	}

	static getFactionAdvantage(factionID=1, targetFactionID=1) {
		if (Faction['id'+factionID].AdvanFact === targetFactionID) {
			return {ExDmg: Faction['id'+factionID].ExDama, ExHit:Faction['id'+factionID].ExHit}
		} else {
			return false
		}
	}
	static getClassAdvantage(factionID=1, targetFactionID=1) {

	}

	static getTargetList(ModelList, Model, targData, notActivateOk) {
		let _list = ModelList
		let _model = Model
		let _targData = _targData
		let _notActivateOk = notActivateOk

		if (!_notActivateOk) {
			_notActivateOk = false
		}

		let _targetList = {}
		let _filtrate = true
		if (!_model) {
			_filtrate = false
		}

		if (_filtrate) {
			for (var i = 0; i < _list.length; i++) {
				if (_list[i].activate || _notActivateOk) {
					_targetList.push(_model)
				}
			}
		}
		/* Filter according to target type
		1. Self 
		2. Attacked party (and hit) 
		3. Attacker 
		4. Enemy 
		5. Friendly 
		6. Attacked party (and dodge) 
		9. All */
		if (_filtrate) {
			if (_targData.Enemy == 1) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (_target != _model) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 2) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (!_target.isDefender != _model.isBait) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 3) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (!_target.isAttacker) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 4) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (_target.isEnemy == _model.isEnemy) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 5) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (_target.isEnemy != _model.isEnemy) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 6) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (!_target.isDefender == _model.isHaveDodge) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 7) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					let _target = _targetList[i]
					if (!_target.isBaoJi) {
						_targetList.splice(i, 1)
					}
				}
			} else if (_targData.Enemy == 9) {
				// do nothing
			}
		}
		/* Filter according to target type 
		0. Invalid 
		1. Order 
		2. Front 
		3. Back row 
		9. All */
		if (_filtrate) {
			if (_targData.Type == 0) {
				_filtrate = false
			} else if (_targData.Type == 1) {
				_targetList.sort(function(a,b){
					return a.staticIndex < b.staticIndex
				})

				for (var i = _targetList.length - 1; i > 0; i--) {
					_targetList.splice(i, 1)
				}
			} else if(_targData.Type == 2) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					if (_targetList[i].staticCol != 1) {
						_targetList.splice(i, 1)
					}
				}
			} else if(_targData.Type == 3) {
				for (var i = _targetList.length - 1; i >= 0; i--) {
					if (_targetList[i].staticCol != 2) {
						_targetList.splice(i, 1)
					}
				}
			} else if(_targData.Type == 9) {
				// othing
			}
		}
		/* Filter according to target occupation 
		0. Invalid 
		1. Warrior 
		2. Assassin 
		3. Ranger 
		4. Pastor 
		5. Master 
		9. All */
		if (_filtrate) {
			if (true) {

			}
		}

	}


}
