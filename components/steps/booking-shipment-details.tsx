"use client"

import type { FormData } from "../bill-of-lading-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface BookingShipmentDetailsProps {
  formData: FormData
  updateFormData: (fieldName: keyof FormData, value: string | boolean) => void
  errors: Record<string, string>
  handleBlur: (fieldName: keyof FormData) => void
}

export default function BookingShipmentDetails({
  formData,
  updateFormData,
  errors,
  handleBlur,
}: BookingShipmentDetailsProps) {
  // List of countries for datalist
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ]

  return (
    <div className="space-y-6">
      {/* Booking Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Booking Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bookingNumber">
              Booking Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bookingNumber"
              value={formData.bookingNumber}
              onChange={(e) => updateFormData("bookingNumber", e.target.value)}
              onBlur={() => handleBlur("bookingNumber")}
              placeholder="Enter booking number"
              className={errors.bookingNumber ? "border-red-500" : ""}
            />
            {errors.bookingNumber && <p className="text-red-500 text-sm">{errors.bookingNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number</Label>
            <Input
              id="referenceNumber"
              value={formData.referenceNumber}
              onChange={(e) => updateFormData("referenceNumber", e.target.value)}
              onBlur={() => handleBlur("referenceNumber")}
              placeholder="Enter reference number"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Origin and Destination */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Origin and Destination</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="originCity">
              Origin City/Port <span className="text-red-500">*</span>
            </Label>
            <Input
              id="originCity"
              value={formData.originCity}
              onChange={(e) => updateFormData("originCity", e.target.value)}
              onBlur={() => handleBlur("originCity")}
              placeholder="Enter origin city or port"
              className={errors.originCity ? "border-red-500" : ""}
            />
            {errors.originCity && <p className="text-red-500 text-sm">{errors.originCity}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="originCountry">
              Origin Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="originCountry"
              list="countries"
              value={formData.originCountry}
              onChange={(e) => updateFormData("originCountry", e.target.value)}
              onBlur={() => handleBlur("originCountry")}
              placeholder="Enter origin country"
              className={errors.originCountry ? "border-red-500" : ""}
            />
            {errors.originCountry && <p className="text-red-500 text-sm">{errors.originCountry}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destinationCity">
              Destination City/Port <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destinationCity"
              value={formData.destinationCity}
              onChange={(e) => updateFormData("destinationCity", e.target.value)}
              onBlur={() => handleBlur("destinationCity")}
              placeholder="Enter destination city or port"
              className={errors.destinationCity ? "border-red-500" : ""}
            />
            {errors.destinationCity && <p className="text-red-500 text-sm">{errors.destinationCity}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationCountry">
              Destination Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="destinationCountry"
              list="countries"
              value={formData.destinationCountry}
              onChange={(e) => updateFormData("destinationCountry", e.target.value)}
              onBlur={() => handleBlur("destinationCountry")}
              placeholder="Enter destination country"
              className={errors.destinationCountry ? "border-red-500" : ""}
            />
            {errors.destinationCountry && <p className="text-red-500 text-sm">{errors.destinationCountry}</p>}
          </div>
        </div>

        {/* Datalist for countries */}
        <datalist id="countries">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
      </div>

      <Separator />

      {/* Vessel Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Vessel Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vesselName">Vessel Name</Label>
            <Input
              id="vesselName"
              value={formData.vesselName}
              onChange={(e) => updateFormData("vesselName", e.target.value)}
              onBlur={() => handleBlur("vesselName")}
              placeholder="Enter vessel name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voyageNumber">Voyage Number</Label>
            <Input
              id="voyageNumber"
              value={formData.voyageNumber}
              onChange={(e) => updateFormData("voyageNumber", e.target.value)}
              onBlur={() => handleBlur("voyageNumber")}
              placeholder="Enter voyage number"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Shipment Dates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipment Dates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={(e) => updateFormData("departureDate", e.target.value)}
              onBlur={() => handleBlur("departureDate")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrivalDate">Estimated Arrival Date</Label>
            <Input
              id="arrivalDate"
              type="date"
              value={formData.arrivalDate}
              onChange={(e) => updateFormData("arrivalDate", e.target.value)}
              onBlur={() => handleBlur("arrivalDate")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

