import {BPlusTree} from './btree'

export default class VirtualTable {
  constructor(pageSize = 10) {
    this.pageSize = pageSize

    this.records = new Map()
  }

  get size() {
    return this.records.size
  }

  insert() {

  }

  remove() {

  }

  update() {

  }
}
