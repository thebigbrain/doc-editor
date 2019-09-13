const SortedSet = require("collections/sorted-set")

const defaultOption = {
  order: 7
}

const NodeType = {
  UNKNOWN: 0,
  INTERNAL: 1,
  LEAF: 2,
}

class InternalNode {
  constructor() {
    this.keyPointers = new SortedSet()

    this.infinityPointer = new InfinityPointer()
  }
}

class KeyValue {
  constructor(key, pointer =  null) {
    this.key = key
    this.dataPointer = pointer
  }
}

class LeafNode {
  constructor() {
    this.keyValues = new SortedSet(
      null,
      (a, b) => a.key === b.key,
      (a, b) => a.key - b.key
    )
  }

  add(...values) {
    this.keyValues.push(...values)
  }

  sorted() {
    return this.keyValues.sorted()
  }
}

class SearchKeyPointer {
  constructor() {
    this.key = null
    this.pointer = null
  }
}

class ChildPointer  {
  constructor() {
    this.child = null
  }
}

class InfinityPointer {

}

class DataPointer {

}

class SiblingPointer {

}

class Tree {

}

class BPlusTree {

}


module.exports = {
  BPlusTree,
  LeafNode,
  KeyValue
}

