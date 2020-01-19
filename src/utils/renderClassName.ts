const renderClassName = (staticClass: string, dynamicClass: string, condition: boolean) =>
  `${staticClass} ${condition ? dynamicClass : ''}`

export default renderClassName
