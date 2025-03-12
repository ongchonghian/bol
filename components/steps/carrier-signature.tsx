"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CarrierSignatureProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
  handleBlur: (fieldName: keyof FormData) => void
}

export default function CarrierSignature({ formData, updateFormData, errors, handleBlur }: CarrierSignatureProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Carrier's Signature</h2>
      <p className="text-sm text-gray-500 mb-4">
        By signing below, you confirm that all the information provided in this Bill of Lading is accurate and complete.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="carrierName">
            Carrier's Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="carrierName"
            value={formData.carrierName}
            onChange={(e) => updateFormData("carrierName", e.target.value)}
            onBlur={() => handleBlur("carrierName")}
            placeholder="Enter your full name"
            className={errors.carrierName ? "border-red-500" : ""}
          />
          {errors.carrierName && <p className="text-red-500 text-sm">{errors.carrierName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="carrierCompany">Company Name</Label>
          <Input
            id="carrierCompany"
            value={formData.carrierCompany}
            onChange={(e) => updateFormData("carrierCompany", e.target.value)}
            onBlur={() => handleBlur("carrierCompany")}
            placeholder="Enter your company name"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="signatureDate">
            Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="signatureDate"
            type="date"
            value={formData.signatureDate}
            onChange={(e) => updateFormData("signatureDate", e.target.value)}
            onBlur={() => handleBlur("signatureDate")}
            className={errors.signatureDate ? "border-red-500" : ""}
          />
          {errors.signatureDate && <p className="text-red-500 text-sm">{errors.signatureDate}</p>}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">
          This electronic Bill of Lading serves as a legal document. By submitting this form, you acknowledge that the
          information provided is accurate and complete to the best of your knowledge.
        </p>
      </div>
    </div>
  )
}

