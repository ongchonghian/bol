"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, ArrowLeft } from "lucide-react"

export default function BolPrintPage() {
  const searchParams = useSearchParams()
  const bolId = searchParams.get("id")
  const [currentDate] = useState(new Date().toLocaleDateString())

  // In a real application, you would fetch the BOL data from the server
  // For now, we'll use placeholder data
  const bolData = {
    id: bolId || "BOL-12345",
    date: currentDate,
    shipper: {
      name: "ABC Shipping Company",
      address: "123 Shipper St, Shipping City, SC 12345",
      contact: "John Shipper",
      phone: "+1 (555) 123-4567",
      email: "john@abcshipping.com",
    },
    consignee: {
      name: "XYZ Receiving Corp",
      address: "456 Receiver Ave, Receiving City, RC 67890",
      contact: "Jane Receiver",
      phone: "+1 (555) 987-6543",
      email: "jane@xyzreceiving.com",
    },
    shipment: {
      origin: "Los Angeles, USA",
      destination: "Shanghai, China",
      vessel: "Pacific Voyager",
      voyage: "PV-2023-056",
      departureDate: "2023-06-15",
      arrivalDate: "2023-07-05",
    },
    cargo: {
      description: "Electronics - Laptops and Accessories",
      packages: "150",
      weight: "2,500 kg",
      container: "ABCU1234567",
      containerType: "40' High Cube",
    },
    freight: {
      amount: "$4,500.00",
      terms: "Prepaid",
    },
  }

  // Handle print functionality
  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Button variant="outline" asChild>
            <Link href="/bol-confirmation">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Bill of Lading
          </Button>
        </div>

        <Card className="print:shadow-none print:border-none">
          <CardHeader className="border-b pb-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">BILL OF LADING</CardTitle>
              <div className="text-right">
                <p className="font-bold">BOL #: {bolData.id}</p>
                <p className="text-sm text-gray-500">Date: {bolData.date}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* Shipper & Consignee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-700 border-b pb-1">SHIPPER</h3>
                  <p className="font-medium">{bolData.shipper.name}</p>
                  <p className="text-sm">{bolData.shipper.address}</p>
                  <p className="text-sm">Contact: {bolData.shipper.contact}</p>
                  <p className="text-sm">Phone: {bolData.shipper.phone}</p>
                  <p className="text-sm">Email: {bolData.shipper.email}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-gray-700 border-b pb-1">CONSIGNEE</h3>
                  <p className="font-medium">{bolData.consignee.name}</p>
                  <p className="text-sm">{bolData.consignee.address}</p>
                  <p className="text-sm">Contact: {bolData.consignee.contact}</p>
                  <p className="text-sm">Phone: {bolData.consignee.phone}</p>
                  <p className="text-sm">Email: {bolData.consignee.email}</p>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-700 border-b pb-1">SHIPMENT DETAILS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Origin</p>
                    <p>{bolData.shipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Destination</p>
                    <p>{bolData.shipment.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vessel</p>
                    <p>{bolData.shipment.vessel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Voyage</p>
                    <p>{bolData.shipment.voyage}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Departure Date</p>
                    <p>{bolData.shipment.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Arrival Date</p>
                    <p>{bolData.shipment.arrivalDate}</p>
                  </div>
                </div>
              </div>

              {/* Cargo Details */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-700 border-b pb-1">CARGO DETAILS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description of Goods</p>
                    <p>{bolData.cargo.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Packages</p>
                      <p>{bolData.cargo.packages}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gross Weight</p>
                      <p>{bolData.cargo.weight}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Container Number</p>
                    <p>{bolData.cargo.container}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Container Type</p>
                    <p>{bolData.cargo.containerType}</p>
                  </div>
                </div>
              </div>

              {/* Freight Details */}
              <div className="space-y-2">
                <h3 className="font-bold text-gray-700 border-b pb-1">FREIGHT & CHARGES</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Freight Amount</p>
                    <p>{bolData.freight.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Terms</p>
                    <p>{bolData.freight.terms}</p>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t">
                <div className="space-y-2">
                  <div className="h-12 border-b border-dashed"></div>
                  <p className="text-center text-sm font-medium">Carrier Signature</p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 border-b border-dashed"></div>
                  <p className="text-center text-sm font-medium">Date</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-xs text-gray-500 text-center pt-4 border-t">
                <p>This is an electronic Bill of Lading generated by the system.</p>
                <p>
                  BOL ID: {bolData.id} • Generated on: {bolData.date}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

