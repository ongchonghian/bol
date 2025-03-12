"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface FreightTermsDetailsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
  handleBlur: (fieldName: keyof FormData) => void
}

export default function FreightTermsDetails({
  formData,
  updateFormData,
  errors,
  handleBlur,
}: FreightTermsDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Freight & Charges */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Freight & Charges</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="freightAmount">
              Freight Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="freightAmount"
                type="number"
                value={formData.freightAmount}
                onChange={(e) => updateFormData("freightAmount", e.target.value)}
                onBlur={() => handleBlur("freightAmount")}
                placeholder="Enter freight amount"
                className={`pl-7 ${errors.freightAmount ? "border-red-500" : ""}`}
                min="0"
                step="0.01"
              />
            </div>
            {errors.freightAmount && <p className="text-red-500 text-sm">{errors.freightAmount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="freightPaymentTerms">
              Payment Terms <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.freightPaymentTerms}
              onValueChange={(value) => updateFormData("freightPaymentTerms", value)}
              onOpenChange={() => handleBlur("freightPaymentTerms")}
            >
              <SelectTrigger id="freightPaymentTerms" className={errors.freightPaymentTerms ? "border-red-500" : ""}>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prepaid">Prepaid</SelectItem>
                <SelectItem value="Collect">Collect</SelectItem>
              </SelectContent>
            </Select>
            {errors.freightPaymentTerms && <p className="text-red-500 text-sm">{errors.freightPaymentTerms}</p>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Additional Remarks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Additional Remarks</h2>

        <div className="space-y-2">
          <Label htmlFor="additionalRemarks">Special Instructions or Remarks</Label>
          <Textarea
            id="additionalRemarks"
            value={formData.additionalRemarks}
            onChange={(e) => updateFormData("additionalRemarks", e.target.value)}
            onBlur={() => handleBlur("additionalRemarks")}
            placeholder="Enter any special instructions or remarks"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Terms & Conditions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>

        <div className="bg-gray-50 p-4 rounded-md mb-6 max-h-60 overflow-y-auto">
          <h3 className="font-medium mb-2">Bill of Lading Terms and Conditions</h3>
          <p className="text-sm text-gray-700 mb-2">
            1. DEFINITIONS: "Carrier" means the party on whose behalf this Bill of Lading has been issued. "Merchant"
            includes the shipper, consignee, owner of the goods, and any person entitled to possession of the goods.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            2. CARRIER'S TARIFF: The terms of the Carrier's applicable tariff are incorporated herein. Copies of the
            relevant provisions of the applicable tariff are available from the Carrier upon request.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            3. LIABILITY UNDER THE CONTRACT: The Carrier shall be liable for loss of or damage to the goods occurring
            between the time when it receives the goods into its charge and the time of delivery.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            4. LAW AND JURISDICTION: Disputes arising under this Bill of Lading shall be determined by the courts and
            according to the law at the place where the Carrier has its principal place of business.
          </p>
          <p className="text-sm text-gray-700">
            5. LIMITATION OF LIABILITY: The Carrier shall in no case be liable for an amount greater than the actual
            loss to the person entitled to make the claim. The Carrier shall not be liable for any consequential or
            special damages.
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => updateFormData("termsAccepted", checked === true)}
            className={errors.termsAccepted ? "border-red-500" : ""}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="termsAccepted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions <span className="text-red-500">*</span>
            </Label>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

