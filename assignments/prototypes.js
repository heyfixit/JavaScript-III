/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

// Colorize for console output
function colorize(text, ansiCode) {
  return `${ansiCode}${text}${"\033[0m"}`;
}

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
function GameObject(attrs) {
  this.createdAt = attrs.createdAt;
  this.dimensions = attrs.dimensions;
  this.ansiCode = attrs.ansiCode;
}
GameObject.prototype.destroy = function() {
  return `${this.name ? this.name : 'Object'} was removed from the game.`;
}
/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(attrs) {
  GameObject.call(this, attrs);
  this.healthPoints = attrs.healthPoints;
  this.name = attrs.name;
  this.maxDmg = attrs.maxDmg;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(dmg = 0) {
  this.healthPoints -= dmg;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

function Humanoid(attrs) {
  CharacterStats.call(this, attrs);
  this.team = attrs.team;
  this.weapons = attrs.weapons;
  this.language = attrs.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};

Humanoid.prototype.attack = function(target, max, min=0) {
  const dmg = Math.floor(Math.random()*(max - min+1) + min);
  target.takeDamage(dmg);
  let actionString = `${colorize(this.name, this.ansiCode)} hits ${colorize(target.name, target.ansiCode)} for ${dmg}.`
  if(target.healthPoints <= 0) {
    actionString += ` ${colorize(target.name, target.ansiCode)} dies.`
  }
  return actionString;
}

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

  // Stretch task:
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain(attrs) {
  Humanoid.call(this, attrs);
  this.difficulty = attrs.difficulty
}

Villain.prototype = Object.create(Humanoid.prototype);

function Hero(attrs) {
  Humanoid.call(this, attrs);
  this.lives = attrs.lives;
}

Hero.prototype = Object.create(Humanoid.prototype);

const villain = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 4,
    height: 4
  },
  healthPoints: 100,
  name: 'Bad Dude',
  team: 'Bad Dudes',
  weapons: [],
  language: 'Haterade',
  maxDmg: 10,
  ansiCode: '\033[31;1;4m'
});

const hero = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 4,
    height: 4
  },
  healthPoints: 60,
  name: 'Good Dude',
  team: 'Good Guys',
  weapons: [],
  language: 'Justice',
  lives: 3,
  maxDmg: 15,
  ansiCode: '\033[32;1;4m'
});

// while the hero and villain are still alive
while(hero.healthPoints > 0 && villain.healthPoints > 0) {

  // make an array of both to randomly choose from (turns are random)
  const entities = [ hero, villain ];
  const turnTaker = entities.splice(Math.floor(Math.random() * entities.length), 1)[0];

  // target is whoever's left
  const target = entities[0];

  console.log(turnTaker.attack(target, turnTaker.maxDmg));

  if(target.healthPoints <= 0) {
    console.log(`${colorize(target.team, target.ansiCode)} ${colorize("lose", "\033[31;1;4m")}!`);
  }
}