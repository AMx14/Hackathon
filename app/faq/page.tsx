'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from 'lucide-react'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      question: "What data formats are supported?",
      answer: "Our system supports a wide range of data formats including CSV, JSON, and TXT files. We're constantly working on expanding our supported formats to accommodate various user needs."
    },
    {
      question: "How accurate is the algorithm detection?",
      answer: "Our AI model achieves an accuracy rate of over 95% in identifying common cryptographic algorithms. However, accuracy may vary for less common or custom algorithms. We're continuously improving our model to increase accuracy across all types of algorithms."
    },
    {
      question: "What cryptographic algorithms are included?",
      answer: "We support identification of widely used algorithms such as AES, RSA, DES, 3DES, Blowfish, and many more. Our system is designed to recognize both symmetric and asymmetric encryption algorithms, as well as various hash functions."
    },
    {
      question: "Can I train the model myself?",
      answer: "Yes, advanced users have the option to train custom models using their own labeled datasets. This feature allows for improved accuracy on specific types of encrypted data or custom algorithms unique to your organization."
    },
    {
      question: "Is my data safe when I upload it for analysis?",
      answer: "We take data security very seriously. All uploaded data is encrypted in transit and at rest. We do not store your data after analysis is complete, and you have the option to use our on-premise solution for sensitive data that cannot leave your infrastructure."
    },
    {
      question: "How long does the analysis process take?",
      answer: "The analysis time depends on the size and complexity of your dataset. Typically, for datasets under 1GB, the process takes less than a minute. Larger datasets may take longer, but we optimize our algorithms for speed without compromising accuracy."
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            No matching questions found. Please try a different search term.
          </p>
        )}
      </div>
    </div>
  )
}