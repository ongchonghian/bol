import type { FormData } from "../bill-of-lading-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TermsAndConditionsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function TermsAndConditions({ formData, updateFormData, errors }: TermsAndConditionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>

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
          5. LIMITATION OF LIABILITY: The Carrier shall in no case be liable for an amount greater than the actual loss
          to the person entitled to make the claim. The Carrier shall not be liable for any consequential or special
          damages.
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
  )
}

