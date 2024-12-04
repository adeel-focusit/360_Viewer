import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { CustomizerProps } from './types'

const LEG_MATERIALS = [
  { id: 'walnut', color: '#854D37', name: 'Walnut' },
  { id: 'oak', color: '#C68E17', name: 'Oak' },
  { id: 'maple', color: '#E3C099', name: 'Maple' },
  { id: 'pine', color: '#DEB887', name: 'Pine' },
]

const FABRIC_COLORS = [
  { id: 'teal', color: '#40A2AB', name: 'Teal' },
  { id: 'rust', color: '#8B4513', name: 'Rust' },
  { id: 'grey', color: '#808080', name: 'Grey' },
  { id: 'rose', color: '#DDA0A0', name: 'Rose' },
  { id: 'aqua', color: '#5F9EA0', name: 'Aqua' },
  { id: 'gold', color: '#DAA520', name: 'Gold' },
  { id: 'cream', color: '#FAEBD7', name: 'Cream' },
]

export function ProductCustomizer({ configuration, onChange }: CustomizerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscar chair</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Legs</Label>
          <div className="grid grid-cols-4 gap-2">
            {LEG_MATERIALS.map((material) => (
              <button
                key={material.id}
                onClick={() => onChange({ ...configuration, legMaterial: material.id })}
                className={`h-12 rounded-md border-2 ${
                  configuration.legMaterial === material.id
                    ? 'border-primary'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: material.color }}
                title={material.name}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Fabric Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {FABRIC_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange({ ...configuration, fabricColor: color.color })}
                className={`h-12 rounded-md border-2 ${
                  configuration.fabricColor === color.color
                    ? 'border-primary'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.color }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

