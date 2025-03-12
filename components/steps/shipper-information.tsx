"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShipperInformationProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function ShipperInformation({ formData, updateFormData, errors }: ShipperInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shipper Information</h2>

      <div className="space-y-2">
        <Label htmlFor="shipperName">
          Shipper Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="shipperName"
          value={formData.shipperName}
          onChange={(e) => updateFormData("shipperName", e.target.value)}
          placeholder="Enter shipper's full name"
          className={errors.shipperName ? "border-red-500" : ""}
        />
        {errors.shipperName && <p className="text-red-500 text-sm">{errors.shipperName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shipperAddress">
          Shipper Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="shipperAddress"
          value={formData.shipperAddress}
          onChange={(e) => updateFormData("shipperAddress", e.target.value)}
          placeholder="Enter complete address"
          className={errors.shipperAddress ? "border-red-500" : ""}
        />
        {errors.shipperAddress && <p className="text-red-500 text-sm">{errors.shipperAddress}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shipperPhone">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="shipperPhone"
          value={formData.shipperPhone}
          onChange={(e) => updateFormData("shipperPhone", e.target.value)}
          placeholder="Enter phone number"
          className={errors.shipperPhone ? "border-red-500" : ""}
        />
        {errors.shipperPhone && <p className="text-red-500 text-sm">{errors.shipperPhone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="shipperEmail">Email Address</Label>
        <Input
          id="shipperEmail"
          type="email"
          value={formData.shipperEmail}
          onChange={(e) => updateFormData("shipperEmail", e.target.value)}
          placeholder="Enter email address"
          className={errors.shipperEmail ? "border-red-500" : ""}
        />
        {errors.shipperEmail && <p className="text-red-500 text-sm">{errors.shipperEmail}</p>}
      </div>
    </div>
  )
}

