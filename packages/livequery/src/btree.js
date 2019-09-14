const SortedSet = require("collections/sorted-set")

const defaultOption = {
  order: 7    // b+tree order == order + 1
}

const NodeType = {
  UNKNOWN: 0,
  INTERNAL: 1,
  LEAF: 2,
}

class KeyValue {
  constructor(key, pointer =  null) {
    this.key = key
    this.dataPointer = pointer
  }
}

class SearchKeyValue {
  constructor() {
    this.key = null
    this.nodePointer = null
  }
}

class TreeNode {
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

  get(key) {
    return this.keyValues.get({key})
  }

  sorted() {
    return this.keyValues.sorted()
  }

  findLeastGreaterThanOrEqual(v) {
    return this.keyValues.findLeastGreaterThanOrEqual(v)
  }
}

class InternalNode extends TreeNode {
  constructor() {
    super()
    this.infinityPointer = null
  }

  get type() {
    return NodeType.INTERNAL
  }
}

class LeafNode extends TreeNode {
  constructor() {
    super()
    this.sibling = null
  }

  get type() {
    return NodeType.LEAF
  }

  atLeastHalfFull(order = defaultOption.order) {
    return this.keyValues.length >= Math.floor(order / 2)
  }

  isFull(order = defaultOption.order) {
    return this.keyValues.length >= order
  }
}

class BPlusTree {
  constructor() {
    this.root = null
  }

  findBucket(key) {
    let internalOrLeafNode = this.root

    while(true) {
      let node = internalOrLeafNode.findLeastGreaterThanOrEqual({key})
      if (internalOrLeafNode.type === NodeType.LEAF) {
        break
      }

      if (internalOrLeafNode.type !== NodeType.INTERNAL) {
        throw new Error(`Invalid Node Type ${internalOrLeafNode.type}`)
      }

      if (node == null) {
        internalOrLeafNode = internalOrLeafNode.infinityPointer
      } else {
        if (node.nodePointer == null) break
        internalOrLeafNode = node.nodePointer
      }
    }

    return internalOrLeafNode
  }

  insert(k, v) {
    const kv = new KeyValue(k)

    if (this.root == null) {
      this.root = new LeafNode()
      this.root.add(kv)
      return kv
    }

    const bucket = this.findBucket(k)
    if (!bucket.isFull()) {
      bucket.add(kv)
    } else {

    }

    this.grow()
  }

  grow() {

  }
}


module.exports = {
  BPlusTree,
  LeafNode,
  KeyValue
}

