import FAQContent from './FAQContent'

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

export default function FAQPage() {
  return <FAQContent faqs={faqs} />
}