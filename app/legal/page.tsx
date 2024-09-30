'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LegalPages() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleAcceptTerms = () => {
    setAcceptedTerms(!acceptedTerms)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Legal Information</h1>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
              <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h3 className="text-xl font-semibold mb-2">1. Data Collection</h3>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you use our services. This may include your name, email address, and any other information you choose to provide.
              </p>
              <h3 className="text-xl font-semibold mb-2">2. Data Usage</h3>
              <p className="mb-4">
                We use the collected data to provide and improve our services. This includes analyzing usage patterns to enhance our AI models and customer support.
              </p>
              <h3 className="text-xl font-semibold mb-2">3. Third-Party Services</h3>
              <p className="mb-4">
                We may use third-party services to help us operate our business and the Website or administer activities on our behalf, such as sending out newsletters or surveys.
              </p>
              <h3 className="text-xl font-semibold mb-2">4. Security Measures</h3>
              <p className="mb-4">
                We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
              </p>
              <h3 className="text-xl font-semibold mb-2">5. User Rights</h3>
              <p className="mb-4">
                You have the right to access, update, or delete the information we have on you. You can do this by contacting us directly.
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="terms">
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
              <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
              <p className="mb-4">
                By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <h3 className="text-xl font-semibold mb-2">2. Use License</h3>
              <p className="mb-4">
                Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only.
              </p>
              <h3 className="text-xl font-semibold mb-2">3. Disclaimer</h3>
              <p className="mb-4">
                The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties,
                expressed or implied, and hereby disclaim and negate all other warranties including, without limitation,
                implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
              <h3 className="text-xl font-semibold mb-2">4. Limitations</h3>
              <p className="mb-4">
                In no event shall we or our suppliers be liable for any damages (including, without limitation, damages
                for loss of data or profit, or due to business interruption) arising out of the use or inability to use
                our services.
              </p>

              <h3 className="text-xl font-semibold mb-2">5. Revisions and Errata</h3>
              <p className="mb-4">
                The materials appearing on our website could include technical, typographical, or photographic errors.
                We do not warrant that any of the materials on our website are accurate, complete, or current.
              </p>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex items-center space-x-2">
          <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={handleAcceptTerms} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms of service and privacy policy
          </label>
        </div>

        <Button className="mt-4 w-full" disabled={!acceptedTerms}>
          Accept Terms and Continue
        </Button>
      </div>
    </div>
  )
}