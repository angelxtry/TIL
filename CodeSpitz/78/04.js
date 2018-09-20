const prop = (target, v) => Object.assign(target, v);

const Stage = class{
  constructor(last, min, max, listener){
    prop(this, {last, min, max, listener});
  }
  clear(){
    this.curr = 0;
    this.next();
  }
  next(){
    if(this.curr++ < Stage.last){
      const rate = (this.curr - 1) / (this.last - 1);
      this.speed = this.min + (this.max - this.min) * (1- rate);
      this.listener();
    }
  }
  score(line){
    // Score와 Stage과 통신하다.
    return parseInt((this.curr * 5) * (2 ** line));
  }
};
// 속도는 누구의 속성인가?
// 일단 Stage가 가지는 것이 적당하다.

const Score = class{
  constructor(stage, listener){
    prop(this, {stage, listener});
  }
  clear(){this.curr = this.total = 0;}
  add(line){
    const score = this.stage.score(line); 
    this.curr += score;
    this.total += score;
    this.listener();
  }
};

const Block = class{
  constructor(color){prop(this, {color, rotate:0});}
  left(){if(--this.rotate < 0) this.rotate = 3;}
  right(){if(++this.rotate > 3) this.rotate = 0;}
  getBlock(){throw 'override!';}
};
// JavaScript는 class도 값이다. 그래서 배열에 넣을 수 있다.
const blocks = [
  class extends Block{
    constructor(){super('#f8cbad');}
    getBlock(){
      return this.rotate % 2 ?
      [[1], [1], [1], [1]] :
      [[1, 1, 1, 1]];
    }
  }
];

const Renderer = class{
  constructor(col, row){
    prop(this, {col, row, blocks:[]});
    while(row--) this.blocks.push([]);
  }
  clear(){throw 'override';}
  render(data){
    if(!data instanceof Data) throw 'invalid data';
    this._render(data);
  }
  _render(data){throw 'override!';}
};

const Data = class extends Array{
  constructor(row, col){prop(this, {row, col});}
};

const el = el=>document.createElement(el);
const back = (s, v)=>s.backgroundColor = v;

const TableRenderer = class extends Renderer{
  constructor(base, back, col, row){
    super(col, row);
    this.back = back;
    while(row--){
      const tr = base.appendChild(el('tr')), curr = [];
      this.blocks.push(curr);
      let i = col;
      while(i--) curr.push(tr.appendChild(el('td')).style);
    }
    this.clear();
  }
  clear(){
    this.blocks.forEach(
      curr=>curr.forEach(s=>back(s, this.back))
    );
  }
  _render(v){
    this.blocks.forEach(
      (curr, row)=>curr.forEach((s, col)=>back(s, v[row][col]))
    );
  }
}