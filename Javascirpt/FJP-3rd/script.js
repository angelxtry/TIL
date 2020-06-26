// const { log } = require('./fx.js');
const log = console.log;

function *genOdds() {
  let i = -1;
  while(true) {
    i = i + 2;
    yield i;
  }
}

const odds = genOdds();
log(odds.next().value);
log(odds.next().value);
log(odds.next().value);
log(odds.next().value);