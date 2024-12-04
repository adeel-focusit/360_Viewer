export interface ProductConfiguration {
  fabricColor: string
  legMaterial: 'walnut' | 'oak' | 'maple' | 'pine'
}

export interface CustomizerProps {
  configuration: ProductConfiguration
  onChange: (config: ProductConfiguration) => void
}

