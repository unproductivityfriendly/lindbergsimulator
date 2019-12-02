/* Core Components*/
import {stringToFunction, GameObject} from './utils.js';
import {GameEngine} from './game.js';
import {UserInterface} from './ui.js';

/* Load Custom Characters */

/* Load Custom Skills */
window.gamesettings = {
	framerate : 20
}
const GameInstance = {
	engine: null,
	ui: null,
	debug: {lastsecondframe: 0, lastsecondtime: 0},
}


GameInstance.engine = new GameEngine()
GameInstance.ui = new UserInterface(GameInstance)
console.log(GameInstance.engine)
console.log(GameInstance.ui)

/*function gameGELoop() {
	GameInstance.currentWorld.tick()
	GameInstance.engine.loop()
	window.setTimeout(gameGELoop, 1000 / window.gamesettings.framerate)
}
let gameUILoop = function () { 
	GameInstance.ui.loop(GameInstance.engine, GameInstance.currentWorld.dateFormat)
	if (GameInstance.ui.initialized === true) {
		UserInterface.updateTextByID("rangevalue",window.gamesettings.framerate)
		//UserInterface.updateTextByID("gamenginefps",GameInstance.engine.fps)
	}
}
function gameDebugLoop() {
	GameInstance.currentWorld.tick()
	GameInstance.engine.loop()
	window.setTimeout(gameDebugLoop, 1000)
}
let _gameGELoop = gameGELoop()
let _gameUILoopId = setInterval(gameUILoop, 1000 / 20)
*/

function gametest() {
	let attacker = {
		heroes: {
			pos1: 10219, pos2: 10123, pos3: 10611,
			pos4: 10515, pos5: 10319, pos6: 10419,
		}
	}
	let defender = {
		heroes: {
			pos1: 10515, pos2: 10515, pos3: 10515,
			pos4: 10515, pos5: 10515, pos6: 10515,
		}
	}
	GameInstance.engine.loadTeam(1, attacker.heroes)
	GameInstance.engine.loadTeam(2, defender.heroes)
	GameInstance.engine.simulateBattle()
	try {
		//GameInstance.engine.createHero(10515)
		//GameInstance.engine.createHero(100515)

	} catch (e) {
		console.log(e)		
	}
}

gametest()

let test1 = function() {
	let testObj = {t1: 1, t2: 2, t3: 3, t4: 4, t5: 5}
	let val1 = 1
	for (var i = 0; i < 10000000; i++) {
		testObj['t'+val1]
	}
}
let test2 = function() {
	let testObj = {t1: 1, t2: 2, t3: 3, t4: 4, t5: 5}
	let val1 = 1
	for (var i = 0; i < 10000000; i++) {
		testObj['t'+val1.toString()]
	}
}

function testperf(test) {
	let start = Date.now();
	test()
	let millis = Date.now() - start;
	console.log(millis)
}

testperf(test1)
testperf(test2)
