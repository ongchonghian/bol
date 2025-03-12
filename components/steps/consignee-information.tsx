"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ConsigneeInformationProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function ConsigneeInformation({ formData, updateFormData, errors }: ConsigneeInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Consignee Information</h2>

      <div className="space-y-2">
        <Label htmlFor="consigneeName">
          Consignee Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="consigneeName"
          value={formData.consigneeName}
          onChange={(e) => updateFormData("consigneeName", e.target.value)}
          placeholder="Enter consignee's full name"
          className={errors.consigneeName ? "border-red-500" : ""}
        />
        {errors.consigneeName && <p className="text-red-500 text-sm">{errors.consigneeName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="consigneeAddress">
          Consignee Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="consigneeAddress"
          value={formData.consigneeAddress}
          onChange={(e) => updateFormData("consigneeAddress", e.target.value)}
          placeholder="Enter complete address"
          className={errors.consigneeAddress ? "border-red-500" : ""}
        />
        {errors.consigneeAddress && <p className="text-red-500 text-sm">{errors.consigneeAddress}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="consigneePhone">Phone Number</Label>
        <Input
          id="consigneePhone"
          value={formData.consigneePhone}
          onChange={(e) => updateFormData("consigneePhone", e.target.value)}
          placeholder="Enter phone number"
          className={errors.consigneePhone ? "border-red-500" : ""}
        />
        {errors.consigneePhone && <p className="text-red-500 text-sm">{errors.consigneePhone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="consigneeEmail">Email Address</Label>
        <Input
          id="consigneeEmail"
          type="email"
          value={formData.consigneeEmail}
          onChange={(e) => updateFormData("consigneeEmail", e.target.value)}
          placeholder="Enter email address"
          className={errors.consigneeEmail ? "border-red-500" : ""}
        />
        {errors.consigneeEmail && <p className="text-red-500 text-sm">{errors.consigneeEmail}</p>}
      </div>
    </div>
  )
}

