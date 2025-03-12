"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { FormData } from "./bill-of-lading-form"

interface BillOfLadingPreviewProps {
  formData: FormData
  bolId: string
}

export default function BillOfLadingPreview({ formData, bolId }: BillOfLadingPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return

    const canvas = await html2canvas(previewRef.current)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Bill_of_Lading_${bolId}.pdf`)
  }

  return (
    <div className="container mx-auto py-8">
      <div ref={previewRef} className="bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">BILL OF LADING</h1>
        <p className="text-right mb-4">B/L No: {bolId}</p>

        {/* Shipper, Consignee, Notify Party */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipper</h2>
            <p>{formData.shipperName || "N/A"}</p>
            <p>{formData.shipperAddress || "N/A"}</p>
            <p>Contact: {formData.shipperContactPerson || "N/A"}</p>
            <p>Phone: {formData.shipperPhone || "N/A"}</p>
            <p>Email: {formData.shipperEmail || "N/A"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Consignee</h2>
            <p>{formData.consigneeName || "N/A"}</p>
            <p>{formData.consigneeAddress || "N/A"}</p>
            <p>Contact: {formData.consigneeContactPerson || "N/A"}</p>
            <p>Phone: {formData.consigneePhone || "N/A"}</p>
            <p>Email: {formData.consigneeEmail || "N/A"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Notify Party</h2>
            <p>{formData.notifyPartyName || "Same as Consignee"}</p>
            {formData.notifyPartyName && (
              <>
                <p>{formData.notifyPartyAddress || "N/A"}</p>
                <p>Contact: {formData.notifyPartyContactPerson || "N/A"}</p>
                <p>Phone: {formData.notifyPartyPhone || "N/A"}</p>
                <p>Email: {formData.notifyPartyEmail || "N/A"}</p>
              </>
            )}
          </div>
        </div>

        {/* Shipment Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Shipment Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="font-medium">Booking No:</p>
              <p>{formData.bookingNumber || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Origin:</p>
              <p>
                {formData.originCity || "N/A"}, {formData.originCountry || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium">Destination:</p>
              <p>
                {formData.destinationCity || "N/A"}, {formData.destinationCountry || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium">Vessel/Voyage:</p>
              <p>
                {formData.vesselName || "N/A"} / {formData.voyageNumber || "N/A"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium">Departure Date:</p>
              <p>{formData.departureDate || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Estimated Arrival:</p>
              <p>{formData.arrivalDate || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Goods and Container Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Goods and Container Details</h2>
          <p>
            <span className="font-medium">Description:</span> {formData.goodsDescription || "N/A"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div>
              <p className="font-medium">Packages:</p>
              <p>{formData.packageCount || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Gross Weight:</p>
              <p>{formData.grossWeight ? `${formData.grossWeight} kg` : "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Volume:</p>
              <p>{formData.volume ? `${formData.volume} m³` : "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Container:</p>
              <p>{formData.containerNumber || "N/A"}</p>
            </div>
          </div>
          <p className="mt-2">
            <span className="font-medium">Container Type:</span> {formData.containerType || "N/A"}
          </p>
          {formData.isHazardous && (
            <div className="mt-2 p-2 bg-yellow-100 rounded">
              <p className="font-medium">Hazardous Goods:</p>
              <p>UN Number: {formData.unNumber || "N/A"}</p>
              <p>Details: {formData.hazardousDetails || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Freight and Charges */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Freight and Charges</h2>
          <p>
            <span className="font-medium">Freight Amount:</span> ${formData.freightAmount || "N/A"}
          </p>
          <p>
            <span className="font-medium">Payment Terms:</span> {formData.freightPaymentTerms || "N/A"}
          </p>
        </div>

        {/* Remarks */}
        {formData.additionalRemarks && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Remarks</h2>
            <p>{formData.additionalRemarks}</p>
          </div>
        )}

        {/* Carrier's Signature */}
        <div className="mt-8">
          <div className="border-t pt-4">
            <p>
              <span className="font-medium">Carrier:</span> {formData.carrierName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Date:</span> {formData.signatureDate || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
    </div>
  )
}

