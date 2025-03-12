"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

interface GoodsContainerDetailsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
  handleBlur: (fieldName: keyof FormData) => void
}

export default function GoodsContainerDetails({
  formData,
  updateFormData,
  errors,
  handleBlur,
}: GoodsContainerDetailsProps) {
  // Track if hazardous goods checkbox is checked
  const [isHazardous, setIsHazardous] = useState(formData.isHazardous)

  // Update the form data when the checkbox changes
  useEffect(() => {
    updateFormData("isHazardous", isHazardous)
  }, [isHazardous, updateFormData])

  return (
    <div className="space-y-6">
      {/* Goods Description */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Goods Description</h2>

        <div className="space-y-2">
          <Label htmlFor="goodsDescription">
            Description of Goods <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="goodsDescription"
            value={formData.goodsDescription}
            onChange={(e) => updateFormData("goodsDescription", e.target.value)}
            onBlur={() => handleBlur("goodsDescription")}
            placeholder="Provide a detailed description of the goods"
            className={errors.goodsDescription ? "border-red-500" : ""}
            rows={4}
          />
          {errors.goodsDescription && <p className="text-red-500 text-sm">{errors.goodsDescription}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packageCount">
              Number of Packages <span className="text-red-500">*</span>
            </Label>
            <Input
              id="packageCount"
              type="number"
              value={formData.packageCount}
              onChange={(e) => updateFormData("packageCount", e.target.value)}
              onBlur={() => handleBlur("packageCount")}
              placeholder="Enter number of packages"
              className={errors.packageCount ? "border-red-500" : ""}
              min="1"
            />
            {errors.packageCount && <p className="text-red-500 text-sm">{errors.packageCount}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="grossWeight">
              Gross Weight (kg) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="grossWeight"
              type="number"
              value={formData.grossWeight}
              onChange={(e) => updateFormData("grossWeight", e.target.value)}
              onBlur={() => handleBlur("grossWeight")}
              placeholder="Enter gross weight"
              className={errors.grossWeight ? "border-red-500" : ""}
              min="0"
              step="0.01"
            />
            {errors.grossWeight && <p className="text-red-500 text-sm">{errors.grossWeight}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="volume">Volume (m³)</Label>
            <Input
              id="volume"
              type="number"
              value={formData.volume}
              onChange={(e) => updateFormData("volume", e.target.value)}
              onBlur={() => handleBlur("volume")}
              placeholder="Enter volume"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Hazardous Goods Checkbox */}
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="isHazardous"
            checked={isHazardous}
            onCheckedChange={(checked) => setIsHazardous(checked === true)}
          />
          <Label htmlFor="isHazardous" className="font-medium text-sm cursor-pointer">
            This shipment contains hazardous goods
          </Label>
        </div>

        {/* Conditional Hazardous Goods Fields */}
        {isHazardous && (
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md mt-2 space-y-4">
            <h3 className="font-medium text-yellow-800">Hazardous Goods Information</h3>

            <div className="space-y-2">
              <Label htmlFor="unNumber" className="text-yellow-800">
                UN Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="unNumber"
                value={formData.unNumber}
                onChange={(e) => updateFormData("unNumber", e.target.value)}
                onBlur={() => handleBlur("unNumber")}
                placeholder="Enter UN number (e.g., UN1203)"
                className={errors.unNumber ? "border-red-500" : "border-yellow-300"}
              />
              {errors.unNumber && <p className="text-red-500 text-sm">{errors.unNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hazardousDetails" className="text-yellow-800">
                Hazardous Goods Details <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="hazardousDetails"
                value={formData.hazardousDetails}
                onChange={(e) => updateFormData("hazardousDetails", e.target.value)}
                onBlur={() => handleBlur("hazardousDetails")}
                placeholder="Provide details about the hazardous materials"
                className={errors.hazardousDetails ? "border-red-500" : "border-yellow-300"}
                rows={3}
              />
              {errors.hazardousDetails && <p className="text-red-500 text-sm">{errors.hazardousDetails}</p>}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Container Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Container Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="containerNumber">Container Number</Label>
            <Input
              id="containerNumber"
              value={formData.containerNumber}
              onChange={(e) => updateFormData("containerNumber", e.target.value)}
              onBlur={() => handleBlur("containerNumber")}
              placeholder="Enter container number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="containerType">Container Type/Size</Label>
            <Select
              value={formData.containerType}
              onValueChange={(value) => updateFormData("containerType", value)}
              onOpenChange={() => handleBlur("containerType")}
            >
              <SelectTrigger id="containerType">
                <SelectValue placeholder="Select container type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20DRY">20' Dry Container</SelectItem>
                <SelectItem value="40DRY">40' Dry Container</SelectItem>
                <SelectItem value="40HC">40' High Cube</SelectItem>
                <SelectItem value="20RF">20' Refrigerated</SelectItem>
                <SelectItem value="40RF">40' Refrigerated</SelectItem>
                <SelectItem value="20OT">20' Open Top</SelectItem>
                <SelectItem value="40OT">40' Open Top</SelectItem>
                <SelectItem value="20FR">20' Flat Rack</SelectItem>
                <SelectItem value="40FR">40' Flat Rack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

