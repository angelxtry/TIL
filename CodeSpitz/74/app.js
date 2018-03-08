const APP = (SET=>{

'use strict';

const repeat = (count, ...arg) => {
  const f = arg.pop();
  for(let i = 0; i < count; i++) f(i, ...arg);
};
const PROP = (self, ...v) => Object.assign(self, ...v);
const ERR = v =>  { throw v; };
const IS_OVERRIDE = _ => ERR('override!');
const TMPL = (self, method, ...arg) => '_' + method in self ? self['_' + method](...arg) : ERR();
const HOOK = (p, method) => typeof p.prototype[method] === 'function' ? '_' + method : ERR();
const SubData = class{
  constructor(listener) { PROP(this, {listener}); }
  notify(){ if(this.listener) this.listener() }
  clear() {
    TMPL(this, 'clear');
  }
}
const Stage = class extends SubData {
  [HOOK(SubData, 'clear')]() {
    this.stage = 0;
    this.isNext();
  }
  isNext() {
    if(this.stage++ === SET.stage.max) return false;
    else {
      this.notify();
      return true;
    }
  }
  get speed() {
    const {stage: {speed: [min, max], max: stageMax}} = SET;
    return min - (min - max) * (this.stage - 1) / stageMax;
  }
  get count() {
    const {stage: {count:[base, inc]}} = SET;
    return max + inc * (this.stage - 1);
  }
}
const Score = class extends SubData {
  [HOOK(SubData, 'clear')]() {
    this.stage = this.total = 0;
    this.notify();
  }
  add(list, stage) {
    //...
  }
}
const Block = class {
  static get() { }
  constructor() {}
  left() {}
  right() {}
  get block() {}
}
const Data = class extends Array {
  constructor(row, col) {
    super(row);
    this.fill([]);
    PROP(this, {col});
  }
  cell() {}
  row() {}
  all() {}
}
const Renderer = class {
  constructor() {}
  clear() {
    IS_OVERRIDE();
  }
  render(v) {
    TMPL(this, 'render', v);
  }
}
const TableRenderer = class extends Renderer {
  [HOOK(Renderer, 'render')]() { }
  [OVERRIDE(Renderer, 'clear')]() {}
}
const Panel = class {
  constructor(game, _init, _render){
    PROP(this, {gmae, _init, _render});
  } 
  init(...arg) {
    return this.base = this._init(this.game, ...arg);
  }
  render(...arg) {
    this._render(this.base, this.game, ...arg);
  }
}
const Game = class {
  constructor(col, row, basePanel) {

  }
  addStage(state, {init, render}, f) {
    this.state[state] = f;
    this.panel[panel] = new Panel(this, init, render);
  }
}
return {
  init() {
    const game = new Game(10, 20, {
      init() {
        return self('#stage');
      },
      render(base, game, panel, {base: el = panel.init()}) {
        base.innerHTML = '';
        base.appendChild(el);
      }
    });
    game.addState(Game.title, {
      init(game, ...arg){
        sel('#title').style.display = 'block';
        sel('#title.start').onclick = _=> game.setState(Game.stageIntro);
        return self('#title');
      },
      null
    }, (_, {stage, score}) => {
      stage.clear();
      stage.score();
    });
  }
}
})(SET);
APP.init()