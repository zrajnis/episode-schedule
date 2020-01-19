import NodeFactory from 'factories/Node'
import { ENodeChild, INode, INodeSearchResult, TNodeChild } from 'models/node'
import { IMatrixElement, IMatrixRow } from 'models/matrix'
import { ITree } from 'models/tree'
import generateId from 'utils/generateId'

const TreeFactory = (): ITree => {
  let rootNode: INode | null = null
  let matrix: IMatrixRow[] | null = null

  const insertToMatrix = ({ value, id }: INode, matrix: IMatrixRow[] | null, depth: number, nodeIndex: number) => {
    if (!matrix) {
      matrix = []
    }

    if (!matrix[depth]) {
      const elements = [ ...Array(2 ** depth) ].map((_, i: number): IMatrixElement => ({
        id: `el${depth}-${i}`, // wont affect diffing algorithm
        value: null
      }))
  
      matrix[depth] = {
        elements,
        id: `row${depth + 1}`
      }
    }

    matrix[depth].elements[nodeIndex] = {
      id, // value works too but for consistency sake use id everywhere
      value
    }
  }

  const recursiveCreateMatrix = (
    node: INode,
    matrix: IMatrixRow[] = [],
    depth: number = 0,
    nodeIndex: number = 0
  ): IMatrixRow[] => {
    if (node === rootNode) {
      insertToMatrix(node, matrix, depth, nodeIndex)
    }

    if (!node.left && !node.right) {
      return matrix
    }

    if (node.left) {
      insertToMatrix(node.left, matrix, depth + 1, nodeIndex)
      recursiveCreateMatrix(node.left, matrix, depth + 1, nodeIndex * 2)
    }

    if (node.right) {
      insertToMatrix(node.right, matrix, depth + 1, nodeIndex + 1)
      recursiveCreateMatrix(node.right, matrix, depth + 1, (nodeIndex + 1) * 2)
    }

    return matrix
  }

  const createMatrix = () => {
    if (!rootNode) {
      matrix = null

      return matrix
    }

    matrix = recursiveCreateMatrix(rootNode as INode)

    return matrix
  }

  const recursiveSearch = (node: INode, parent: INode | null, el: IMatrixElement): INodeSearchResult => {
    if (node.id === el.id) { // no destructuring as a small optimization / naming would be clunky
      return {
        node,
        parent
      }
    }

    if ((el.value as number) < node.value && node.left) {
      return recursiveSearch(node.left, node, el)
    }

    if ((el.value as number) >= node.value && node.right) {
      return recursiveSearch(node.right, node, el)
    }

    return {
      node: null,
      parent: null
    }
  }

  const recursiveInsert = (node: INode, value: number, depth: number, nodeIndex: number): void => {
    if (value < node.value && !node.left) {
      node.left = NodeFactory(value, generateId())

      return
    }

    if (value >= node.value && !node.right) {
      node.right = NodeFactory(value, generateId())

      return
    }

    if (depth === 4) {
      throw Error('Maximum tree depth of 5 already reached')
    }

    if (value < node.value) {
      return recursiveInsert(node.left as INode, value, depth + 1, nodeIndex * 2)
    }

    if (value >= node.value) {
      return recursiveInsert(node.right as INode, value, depth + 1, (nodeIndex + 1) * 2)
    }
  }

  const insert = (value: number) => {
    if (!rootNode) {
      const id = generateId()

      rootNode = NodeFactory(value, id)
      createMatrix()
      
      return
    }

    const initialDepth = 1
    const initialNodeIndex = 0

    recursiveInsert(rootNode, value, initialDepth, initialNodeIndex)
    createMatrix()

    return
  }

  const recursiveFindMaxLeftChild = (node: INode, parent: INode): INodeSearchResult => {
    if (!node.right) {
      return {
        node, // perhaps it's better returning just parent, and accessing node with parent.right
        parent
      }
    }

    return recursiveFindMaxLeftChild(node.right, node)
  }

  const removeFn = (el: IMatrixElement) => {
    const { node, parent } = recursiveSearch(rootNode as INode, null, el)
    const hasOnlyRightChild = node!.right && !node!.left
    const hasAnyChild = node!.right || node!.left
    const nodeSide = parent && parent.right === node ? ENodeChild.Right : ENodeChild.Left
    const hasLeftMaxChild = node!.left && node!.left.right

    if (!hasAnyChild && !parent) {
      rootNode = null

      return
    }

    if (!hasAnyChild && parent!.right === node) {
      parent![nodeSide] = null

      return
    }

    if (!parent && hasOnlyRightChild) {
      rootNode = node!.right

      return
    }

    if (hasOnlyRightChild) {
      parent!.right = node!.right

      return
    }

    if (hasLeftMaxChild) {
      const {
        node: maxLeftChild,
        parent: maxLeftParent
      } = recursiveFindMaxLeftChild(node!.left as INode, node as INode)

      maxLeftParent!.right = null

      node!.value = maxLeftChild!.value
      node!.id = maxLeftChild!.id

      return
    }

    if (!parent && !hasLeftMaxChild) {
      node!.left!.right = node!.right
      rootNode = node!.left

      return
    }

    if (!hasLeftMaxChild) {
      parent![nodeSide] = node!.left

      return
    } 

    return
  }

  const remove = (el: IMatrixElement) => {
    removeFn(el)
    createMatrix()

    return
  }

  const getMatrix = (): IMatrixRow[] | null => matrix && [ ...matrix ]

  const getNodeChild = (el: IMatrixElement, child: TNodeChild) => {
    if (el.value === null) {
      return null
    }

    const { node } = recursiveSearch((rootNode as INode), null, el as IMatrixElement)

    return node && node[child]
  }

  const getLeftChild = (el: IMatrixElement): null | INode =>
    getNodeChild(el, ENodeChild.Left)

  const getRightChild = (el: IMatrixElement): null | INode =>
    getNodeChild(el, ENodeChild.Right)

  return {
    getLeftChild,
    getMatrix,
    getRightChild,
    insert,
    remove
  }
}

export default TreeFactory
