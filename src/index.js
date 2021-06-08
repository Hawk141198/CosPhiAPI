const Device = require('../lib/Device');
const lib = require('../lib/index');

// Beispiel der Library

// Objekt mit den Geräten und ihren Attributen. Es muss immer mindestens zwei Attribute enthalten.
// Typischerweise sind dies Wirkleistung mit cosPhi.
const devices = [
  new Device('Moving-Head', { p: 100, cosPhi: 1 }),
  new Device('Amp', { s: 150, cosPhi: 1 }),
  new Device('Pult', { q: 150, s: 150 }),
];

// Verteilung der Geräte auf den Phasen.
const deviceDistribution = {
  L1: ['Moving-Head', 'Amp', 'Moving-Head'],
  L2: ['Pult', 'Amp'],
  L3: ['Amp', 'Amp', 'Amp'],
};

console.log(lib.getPowerSourceValues(deviceDistribution, devices));

const deviceDistributionSinglePhase = ['Moving-Head', 'Amp', 'Moving-Head'];
console.log(lib.getPhaseValues(deviceDistributionSinglePhase, devices));
