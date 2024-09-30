import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Dr. Alice Johnson",
      role: "Lead Cryptographer",
      bio: "Dr. Johnson has over 15 years of experience in cryptography and machine learning.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Bob Smith",
      role: "AI/ML Engineer",
      bio: "Bob specializes in developing cutting-edge AI models for cryptographic analysis.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Carol Davis",
      role: "Software Architect",
      bio: "Carol designs robust and scalable systems for cryptographic applications.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "David Lee",
      role: "Security Researcher",
      bio: "David focuses on identifying vulnerabilities in cryptographic implementations.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const partners = [
    { name: "CryptoTech Inc.", logo: "/placeholder.svg?height=100&width=200" },
    { name: "SecureAI Labs", logo: "/placeholder.svg?height=100&width=200" },
    {
      name: "DataSafe Solutions",
      logo: "/placeholder.svg?height=100&width=200",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At CryptoAI, our mission is to revolutionize cryptographic algorithm
            identification through the power of artificial intelligence. We
            strive to enhance cybersecurity by providing cutting-edge tools that
            enable quick and accurate detection of encryption methods,
            empowering organizations to better protect their sensitive data in
            an ever-evolving digital landscape.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <p className="text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={100}
                    className="mb-4"
                  />
                  <h3 className="text-lg font-semibold">{partner.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
