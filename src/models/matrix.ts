export interface IMatrixElement {
  id: string,
  value: number | null
}

export interface IMatrixRow {
  id: string,
  elements: IMatrixElement[]
}
