const data = [
  {a: [1, 2, 3, 4], b: '-'},
  [5, 6, 7],
  8, 7
];

const next = () => {
    let v;
    while(v = this.data.shift()){
        switch(true){
        case Array.isArray(v):
            data.unshift(...v);
            break;
        case v && typeof v === 'object':
            for (let k in v) data.unshift(v[k]);
            break;
        default: return { value: v, done: false};
        }
    }
    return { done: true};
};

const a = {
    [Symbol.iterator]() {
        return this;
    },
    next
};
console.log([...a]);