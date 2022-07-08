'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Contrary', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should invert relative stat changes', function () {
		this.timeout(0);
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Spinda", ability: 'contrary', moves: ['superpower']}]});
		battle.setPlayer('p2', {team: [{species: "Dragonite", ability: 'multiscale', moves: ['dragondance']}]});
		const contraryMon = battle.p1.active[0];
		battle.makeChoices('move superpower', 'move dragondance');
		assert.statStage(contraryMon, 'atk', 1);
		assert.statStage(contraryMon, 'def', 1);
	});

	it('should not invert absolute stat changes', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Serperior", ability: 'contrary', moves: ['leechseed']}]});
		battle.setPlayer('p2', {team: [{species: "Growlithe", ability: 'intimidate', moves: ['topsyturvy']}]});
		const contraryMon = battle.p1.active[0];
		battle.makeChoices('move leechseed', 'move topsyturvy');
		assert.statStage(contraryMon, 'atk', -1);
	});

	it('should invert Belly Drum\'s maximizing Attack', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Spinda", ability: 'contrary', moves: ['bellydrum']}]});
		battle.setPlayer('p2', {team: [{species: "Dragonite", ability: 'multiscale', moves: ['dragondance']}]});
		const contraryMon = battle.p1.active[0];
		battle.makeChoices('move bellydrum', 'move dragondance');
		assert.statStage(contraryMon, 'atk', -6);
	});

	it('should be suppressed by Mold Breaker', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Spinda", ability: 'contrary', moves: ['tackle']}]});
		battle.setPlayer('p2', {team: [{species: "Dragonite", ability: 'moldbreaker', moves: ['growl']}]});
		const contraryMon = battle.p1.active[0];
		battle.makeChoices('move tackle', 'move growl');
		assert.statStage(contraryMon, 'atk', -1);
	});
});
