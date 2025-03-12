"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CargoDescriptionProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function CargoDescription({ formData, updateFormData, errors }: CargoDescriptionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Cargo Description</h2>

      <div className="space-y-2">
        <Label htmlFor="cargoDescription">
          Cargo Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="cargoDescription"
          value={formData.cargoDescription}
          onChange={(e) => updateFormData("cargoDescription", e.target.value)}
          placeholder="Describe the cargo in detail"
          className={errors.cargoDescription ? "border-red-500" : ""}
          rows={4}
        />
        {errors.cargoDescription && <p className="text-red-500 text-sm">{errors.cargoDescription}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="packageCount">
          Number of Packages <span className="text-red-500">*</span>
        </Label>
        <Input
          id="packageCount"
          type="number"
          value={formData.packageCount}
          onChange={(e) => updateFormData("packageCount", e.target.value)}
          placeholder="Enter number of packages"
          className={errors.packageCount ? "border-red-500" : ""}
          min="1"
        />
        {errors.packageCount && <p className="text-red-500 text-sm">{errors.packageCount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">
          Total Weight (kg) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="weight"
          type="number"
          value={formData.weight}
          onChange={(e) => updateFormData("weight", e.target.value)}
          placeholder="Enter total weight in kg"
          className={errors.weight ? "border-red-500" : ""}
          min="0"
          step="0.01"
        />
        {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
        <Input
          id="dimensions"
          value={formData.dimensions}
          onChange={(e) => updateFormData("dimensions", e.target.value)}
          placeholder="e.g., 100cm x 50cm x 30cm"
          className={errors.dimensions ? "border-red-500" : ""}
        />
        {errors.dimensions && <p className="text-red-500 text-sm">{errors.dimensions}</p>}
      </div>
    </div>
  )
}

