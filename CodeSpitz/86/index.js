const Binder = class {
  #item = new Set;
  add(v, _= type(v, BinderItem)){this.#items.add(v);}
}