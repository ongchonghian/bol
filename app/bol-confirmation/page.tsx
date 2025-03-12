"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import BillOfLadingPreview from "@/components/bill-of-lading-preview"
import type { FormData } from "@/components/bill-of-lading-form"

export default function BolConfirmationPage() {
  const searchParams = useSearchParams()
  const bolId = searchParams.get("id") || "BOL-12345"
  const [currentDate] = useState(() => new Date().toLocaleDateString())
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedData = localStorage.getItem("bill_of_lading_form_data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  if (!formData) {
    return <div className="container mx-auto py-10 px-4 text-center">Loading...</div>
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Bill of Lading Submitted Successfully</CardTitle>
          <CardDescription>Your Bill of Lading has been processed and recorded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bill of Lading ID</p>
                  <p className="font-medium">{bolId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Submission Date</p>
                  <p>{currentDate}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Next Steps</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>A copy of this Bill of Lading has been saved to our system</li>
                <li>You can access and print this document from your account dashboard</li>
                <li>The relevant parties will be notified about this shipment</li>
                <li>Track the shipment status using the Bill of Lading ID</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Create New Bill of Lading</Link>
          </Button>
        </CardFooter>
      </Card>

      <BillOfLadingPreview formData={formData} bolId={bolId} />
    </main>
  )
}

