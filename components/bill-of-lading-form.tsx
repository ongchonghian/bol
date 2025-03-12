"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import ShipperConsigneeDetails from "./steps/shipper-consignee-details"
import BookingShipmentDetails from "./steps/booking-shipment-details"
import GoodsContainerDetails from "./steps/goods-container-details"
import FreightTermsDetails from "./steps/freight-terms-details"
import CarrierSignature from "./steps/carrier-signature"

// Define the form data structure
export type FormData = {
  // Shipper Information
  shipperName: string
  shipperAddress: string
  shipperContactPerson: string
  shipperPhone: string
  shipperEmail: string

  // Consignee Information
  consigneeName: string
  consigneeAddress: string
  consigneeContactPerson: string
  consigneePhone: string
  consigneeEmail: string

  // Notify Party Information
  notifyPartyName: string
  notifyPartyAddress: string
  notifyPartyContactPerson: string
  notifyPartyPhone: string
  notifyPartyEmail: string

  // Booking & Shipment Details
  bookingNumber: string
  referenceNumber: string
  originCity: string
  originCountry: string
  destinationCity: string
  destinationCountry: string
  vesselName: string
  voyageNumber: string
  departureDate: string
  arrivalDate: string

  // Goods Description & Container Details
  goodsDescription: string
  packageCount: string
  grossWeight: string
  volume: string
  containerNumber: string
  containerType: string
  isHazardous: boolean
  hazardousDetails: string
  unNumber: string

  // Freight & Charges
  freightAmount: string
  freightPaymentTerms: string
  additionalRemarks: string
  termsAccepted: boolean

  // Carrier's Signature
  carrierName: string
  carrierCompany: string
  signatureDate: string
}

// Initial form data
const initialFormData: FormData = {
  shipperName: "",
  shipperAddress: "",
  shipperContactPerson: "",
  shipperPhone: "",
  shipperEmail: "",

  consigneeName: "",
  consigneeAddress: "",
  consigneeContactPerson: "",
  consigneePhone: "",
  consigneeEmail: "",

  notifyPartyName: "",
  notifyPartyAddress: "",
  notifyPartyContactPerson: "",
  notifyPartyPhone: "",
  notifyPartyEmail: "",

  bookingNumber: "",
  referenceNumber: "",
  originCity: "",
  originCountry: "",
  destinationCity: "",
  destinationCountry: "",
  vesselName: "",
  voyageNumber: "",
  departureDate: new Date().toISOString().split("T")[0],
  arrivalDate: "",

  goodsDescription: "",
  packageCount: "",
  grossWeight: "",
  volume: "",
  containerNumber: "",
  containerType: "",
  isHazardous: false,
  hazardousDetails: "",
  unNumber: "",

  freightAmount: "",
  freightPaymentTerms: "Prepaid",
  additionalRemarks: "",
  termsAccepted: false,

  carrierName: "",
  carrierCompany: "Your Shipping Company",
  signatureDate: new Date().toISOString().split("T")[0],
}

// LocalStorage key
const STORAGE_KEY = "bill_of_lading_form_data"

// Validation patterns
export const validationPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
  numeric: /^\d+(\.\d+)?$/,
}

export default function BillOfLadingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set())

  const router = useRouter()
  const { toast } = useToast()

  const totalSteps = 5

  // Load form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        toast({
          title: "Form data restored",
          description: "Your previously entered data has been loaded.",
        })
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [toast])

  // Mark a field as touched when it loses focus
  const handleBlur = (fieldName: keyof FormData) => {
    setTouchedFields((prev) => {
      const newTouched = new Set(prev)
      newTouched.add(fieldName)
      return newTouched
    })

    // Validate the field when it loses focus
    validateField(fieldName, formData[fieldName])
  }

  // Validate a single field
  const validateField = (fieldName: keyof FormData, value: string | boolean): boolean => {
    let isValid = true
    let errorMessage = ""

    // Skip validation for untouched fields
    if (!touchedFields.has(fieldName)) {
      return true
    }

    // Field-specific validation
    switch (fieldName) {
      // Email validation
      case "shipperEmail":
      case "consigneeEmail":
      case "notifyPartyEmail":
        if (value && !validationPatterns.email.test(value as string)) {
          isValid = false
          errorMessage = "Please enter a valid email address"
        }
        break

      // Phone validation
      case "shipperPhone":
      case "consigneePhone":
      case "notifyPartyPhone":
        if (value && !validationPatterns.phone.test(value as string)) {
          isValid = false
          errorMessage = "Please enter a valid phone number"
        }
        break

      // Numeric validation
      case "packageCount":
      case "grossWeight":
      case "volume":
      case "freightAmount":
        if (value && !validationPatterns.numeric.test(value as string)) {
          isValid = false
          errorMessage = "Please enter a valid number"
        }
        break

      // Required fields validation
      case "shipperName":
      case "shipperAddress":
      case "consigneeName":
      case "consigneeAddress":
      case "bookingNumber":
      case "originCity":
      case "originCountry":
      case "destinationCity":
      case "destinationCountry":
      case "goodsDescription":
      case "packageCount":
      case "grossWeight":
      case "freightAmount":
      case "freightPaymentTerms":
      case "carrierName":
      case "signatureDate":
        if (!value) {
          isValid = false
          errorMessage = `${fieldName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`
        }
        break

      // Conditional required fields
      case "hazardousDetails":
      case "unNumber":
        if (formData.isHazardous && !value) {
          isValid = false
          errorMessage = `${fieldName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required for hazardous goods`
        }
        break

      // Boolean validation
      case "termsAccepted":
        if (!value) {
          isValid = false
          errorMessage = "You must accept the terms and conditions"
        }
        break
    }

    // Update errors state
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (!isValid) {
        newErrors[fieldName] = errorMessage
      } else {
        delete newErrors[fieldName]
      }
      return newErrors
    })

    return isValid
  }

  // Update form data and save to localStorage
  const updateFormData = (fieldName: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [fieldName]: value,
      }

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))

      return updatedData
    })

    // Validate the field if it's been touched
    if (touchedFields.has(fieldName)) {
      validateField(fieldName, value)
    }
  }

  // Validate current step
  const validateStep = (): boolean => {
    const fieldsToValidate: Record<number, Array<keyof FormData>> = {
      1: ["shipperName", "shipperAddress", "consigneeName", "consigneeAddress"],
      2: ["bookingNumber", "originCity", "originCountry", "destinationCity", "destinationCountry"],
      3: [
        "goodsDescription",
        "packageCount",
        "grossWeight",
        ...(formData.isHazardous ? (["hazardousDetails", "unNumber"] as Array<keyof FormData>) : []),
      ],
      4: ["freightAmount", "freightPaymentTerms", "termsAccepted"],
      5: ["carrierName", "signatureDate"],
    }

    // Mark all fields in the current step as touched
    const currentStepFields = fieldsToValidate[currentStep]
    setTouchedFields((prev) => {
      const newTouched = new Set(prev)
      currentStepFields.forEach((field) => newTouched.add(field))
      return newTouched
    })

    // Validate all fields in the current step
    let isValid = true
    currentStepFields.forEach((field) => {
      const fieldIsValid = validateField(field, formData[field])
      if (!fieldIsValid) isValid = false
    })

    return isValid
  }

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      window.scrollTo(0, 0)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      const response = await fetch("/api/submit-bol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit Bill of Lading")
      }

      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY)

      // Show success message
      toast({
        title: "Submission successful",
        description: `Bill of Lading ${data.bolId} has been submitted successfully.`,
      })

      // Redirect to success page
      setTimeout(() => {
        router.push(`/bol-confirmation?id=${data.bolId}`)
      }, 1000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmissionError(error instanceof Error ? error.message : "An unknown error occurred")

      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShipperConsigneeDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            handleBlur={handleBlur}
          />
        )
      case 2:
        return (
          <BookingShipmentDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            handleBlur={handleBlur}
          />
        )
      case 3:
        return (
          <GoodsContainerDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            handleBlur={handleBlur}
          />
        )
      case 4:
        return (
          <FreightTermsDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            handleBlur={handleBlur}
          />
        )
      case 5:
        return (
          <CarrierSignature
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            handleBlur={handleBlur}
          />
        )
      default:
        return null
    }
  }

  // Check if the current step has any errors
  const hasStepErrors = (): boolean => {
    const fieldsToCheck: Record<number, Array<keyof FormData>> = {
      1: [
        "shipperName",
        "shipperAddress",
        "consigneeName",
        "consigneeAddress",
        "shipperEmail",
        "consigneeEmail",
        "shipperPhone",
        "consigneePhone",
      ],
      2: ["bookingNumber", "originCity", "originCountry", "destinationCity", "destinationCountry"],
      3: [
        "goodsDescription",
        "packageCount",
        "grossWeight",
        ...(formData.isHazardous ? (["hazardousDetails", "unNumber"] as Array<keyof FormData>) : []),
      ],
      4: ["freightAmount", "freightPaymentTerms", "termsAccepted"],
      5: ["carrierName", "signatureDate"],
    }

    return fieldsToCheck[currentStep].some((field) => errors[field])
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-6">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${
                    currentStep > index + 1
                      ? "bg-primary text-primary-foreground border-primary"
                      : currentStep === index + 1
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-400"
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center font-medium">
            Step {currentStep} of {totalSteps}:{" "}
            {currentStep === 1
              ? "Shipper/Consignee/Notify Party Details"
              : currentStep === 2
                ? "Booking & Shipment Details"
                : currentStep === 3
                  ? "Goods Description & Container Details"
                  : currentStep === 4
                    ? "Freight & Charges, Terms & Conditions"
                    : "Carrier's Signature and Submission"}
          </div>
        </div>

        {/* Form Step Content */}
        <div className="mb-8">{renderStep()}</div>

        {/* Submission Error */}
        {submissionError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">{submissionError}</div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isSubmitting}>
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={isSubmitting || hasStepErrors()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting || hasStepErrors()} className="min-w-[100px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

