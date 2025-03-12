"use client"

import { type FormData, validationPatterns } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ShipperConsigneeDetailsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
  handleBlur: (fieldName: keyof FormData) => void
}

export default function ShipperConsigneeDetails({
  formData,
  updateFormData,
  errors,
  handleBlur,
}: ShipperConsigneeDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Shipper Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipper Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shipperName">
              Shipper Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shipperName"
              value={formData.shipperName}
              onChange={(e) => updateFormData("shipperName", e.target.value)}
              onBlur={() => handleBlur("shipperName")}
              placeholder="Enter company name"
              className={errors.shipperName ? "border-red-500" : ""}
            />
            {errors.shipperName && <p className="text-red-500 text-sm">{errors.shipperName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipperContactPerson">Contact Person</Label>
            <Input
              id="shipperContactPerson"
              value={formData.shipperContactPerson}
              onChange={(e) => updateFormData("shipperContactPerson", e.target.value)}
              onBlur={() => handleBlur("shipperContactPerson")}
              placeholder="Enter contact person's name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shipperAddress">
            Shipper Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="shipperAddress"
            value={formData.shipperAddress}
            onChange={(e) => updateFormData("shipperAddress", e.target.value)}
            onBlur={() => handleBlur("shipperAddress")}
            placeholder="Enter complete address"
            className={errors.shipperAddress ? "border-red-500" : ""}
          />
          {errors.shipperAddress && <p className="text-red-500 text-sm">{errors.shipperAddress}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shipperPhone">Phone Number</Label>
            <Input
              id="shipperPhone"
              value={formData.shipperPhone}
              onChange={(e) => updateFormData("shipperPhone", e.target.value)}
              onBlur={() => handleBlur("shipperPhone")}
              placeholder="Enter phone number"
              className={errors.shipperPhone ? "border-red-500" : ""}
              pattern={validationPatterns.phone.source}
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
              onBlur={() => handleBlur("shipperEmail")}
              placeholder="Enter email address"
              className={errors.shipperEmail ? "border-red-500" : ""}
            />
            {errors.shipperEmail && <p className="text-red-500 text-sm">{errors.shipperEmail}</p>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Consignee Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Consignee Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="consigneeName">
              Consignee Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="consigneeName"
              value={formData.consigneeName}
              onChange={(e) => updateFormData("consigneeName", e.target.value)}
              onBlur={() => handleBlur("consigneeName")}
              placeholder="Enter company name"
              className={errors.consigneeName ? "border-red-500" : ""}
            />
            {errors.consigneeName && <p className="text-red-500 text-sm">{errors.consigneeName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="consigneeContactPerson">Contact Person</Label>
            <Input
              id="consigneeContactPerson"
              value={formData.consigneeContactPerson}
              onChange={(e) => updateFormData("consigneeContactPerson", e.target.value)}
              onBlur={() => handleBlur("consigneeContactPerson")}
              placeholder="Enter contact person's name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="consigneeAddress">
            Consignee Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="consigneeAddress"
            value={formData.consigneeAddress}
            onChange={(e) => updateFormData("consigneeAddress", e.target.value)}
            onBlur={() => handleBlur("consigneeAddress")}
            placeholder="Enter complete address"
            className={errors.consigneeAddress ? "border-red-500" : ""}
          />
          {errors.consigneeAddress && <p className="text-red-500 text-sm">{errors.consigneeAddress}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="consigneePhone">Phone Number</Label>
            <Input
              id="consigneePhone"
              value={formData.consigneePhone}
              onChange={(e) => updateFormData("consigneePhone", e.target.value)}
              onBlur={() => handleBlur("consigneePhone")}
              placeholder="Enter phone number"
              className={errors.consigneePhone ? "border-red-500" : ""}
              pattern={validationPatterns.phone.source}
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
              onBlur={() => handleBlur("consigneeEmail")}
              placeholder="Enter email address"
              className={errors.consigneeEmail ? "border-red-500" : ""}
            />
            {errors.consigneeEmail && <p className="text-red-500 text-sm">{errors.consigneeEmail}</p>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Notify Party Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notify Party Information</h2>
        <p className="text-sm text-gray-500">Optional - Fill in if different from Consignee</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="notifyPartyName">Notify Party Name</Label>
            <Input
              id="notifyPartyName"
              value={formData.notifyPartyName}
              onChange={(e) => updateFormData("notifyPartyName", e.target.value)}
              onBlur={() => handleBlur("notifyPartyName")}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notifyPartyContactPerson">Contact Person</Label>
            <Input
              id="notifyPartyContactPerson"
              value={formData.notifyPartyContactPerson}
              onChange={(e) => updateFormData("notifyPartyContactPerson", e.target.value)}
              onBlur={() => handleBlur("notifyPartyContactPerson")}
              placeholder="Enter contact person's name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notifyPartyAddress">Notify Party Address</Label>
          <Input
            id="notifyPartyAddress"
            value={formData.notifyPartyAddress}
            onChange={(e) => updateFormData("notifyPartyAddress", e.target.value)}
            onBlur={() => handleBlur("notifyPartyAddress")}
            placeholder="Enter complete address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="notifyPartyPhone">Phone Number</Label>
            <Input
              id="notifyPartyPhone"
              value={formData.notifyPartyPhone}
              onChange={(e) => updateFormData("notifyPartyPhone", e.target.value)}
              onBlur={() => handleBlur("notifyPartyPhone")}
              placeholder="Enter phone number"
              className={errors.notifyPartyPhone ? "border-red-500" : ""}
              pattern={validationPatterns.phone.source}
            />
            {errors.notifyPartyPhone && <p className="text-red-500 text-sm">{errors.notifyPartyPhone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notifyPartyEmail">Email Address</Label>
            <Input
              id="notifyPartyEmail"
              type="email"
              value={formData.notifyPartyEmail}
              onChange={(e) => updateFormData("notifyPartyEmail", e.target.value)}
              onBlur={() => handleBlur("notifyPartyEmail")}
              placeholder="Enter email address"
              className={errors.notifyPartyEmail ? "border-red-500" : ""}
            />
            {errors.notifyPartyEmail && <p className="text-red-500 text-sm">{errors.notifyPartyEmail}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

