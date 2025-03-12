"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShipmentDetailsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function ShipmentDetails({ formData, updateFormData, errors }: ShipmentDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>

      <div className="space-y-2">
        <Label htmlFor="pickupLocation">
          Pickup Location <span className="text-red-500">*</span>
        </Label>
        <Input
          id="pickupLocation"
          value={formData.pickupLocation}
          onChange={(e) => updateFormData("pickupLocation", e.target.value)}
          placeholder="Enter pickup location"
          className={errors.pickupLocation ? "border-red-500" : ""}
        />
        {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryLocation">
          Delivery Location <span className="text-red-500">*</span>
        </Label>
        <Input
          id="deliveryLocation"
          value={formData.deliveryLocation}
          onChange={(e) => updateFormData("deliveryLocation", e.target.value)}
          placeholder="Enter delivery location"
          className={errors.deliveryLocation ? "border-red-500" : ""}
        />
        {errors.deliveryLocation && <p className="text-red-500 text-sm">{errors.deliveryLocation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupDate">
          Pickup Date <span className="text-red-500">*</span>
        </Label>
        <Input
          id="pickupDate"
          type="date"
          value={formData.pickupDate}
          onChange={(e) => updateFormData("pickupDate", e.target.value)}
          className={errors.pickupDate ? "border-red-500" : ""}
        />
        {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</Label>
        <Input
          id="estimatedDeliveryDate"
          type="date"
          value={formData.estimatedDeliveryDate}
          onChange={(e) => updateFormData("estimatedDeliveryDate", e.target.value)}
          className={errors.estimatedDeliveryDate ? "border-red-500" : ""}
        />
        {errors.estimatedDeliveryDate && <p className="text-red-500 text-sm">{errors.estimatedDeliveryDate}</p>}
      </div>
    </div>
  )
}

