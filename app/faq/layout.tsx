import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our cryptographic algorithm detection service',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function FAQLayout({
                                      children,
                                  }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}