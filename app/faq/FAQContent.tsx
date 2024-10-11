'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from 'lucide-react'

interface FAQ {
    question: string;
    answer: string;
}

interface FAQContentProps {
    faqs: FAQ[];
}

export default function FAQContent({ faqs }: FAQContentProps) {
    const [searchTerm, setSearchTerm] = useState('')

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