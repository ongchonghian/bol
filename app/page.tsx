import BillOfLadingForm from "@/components/bill-of-lading-form"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Electronic Bill of Lading</h1>
      <BillOfLadingForm />
    </main>
  )
}

