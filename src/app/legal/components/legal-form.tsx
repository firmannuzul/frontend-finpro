"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield } from "lucide-react";

export function LegalPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* <div className="mx-auto max-w-4xl px-6 pt-24 pb-12"> */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-foreground text-4xl font-bold">
            Legal Information
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Privacy Policy and Terms of Service for Shark
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="bg-secondary grid w-full grid-cols-2">
            <TabsTrigger
              value="privacy"
              className="flex items-center gap-2 data-[state=active]:bg-[#5E3BEE] data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4" />
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="flex items-center gap-2 data-[state=active]:bg-[#5E3BEE] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Terms of Service
            </TabsTrigger>
          </TabsList>

          {/* Privacy Policy Tab */}
          <TabsContent value="privacy" className="mt-8 space-y-8">
            <div className="border-border bg-card space-y-6 rounded-lg border p-8">
              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  1. Introduction
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Shark ("we," "us," "our," or "Company") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website and use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  2. Information We Collect
                </h2>
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold">
                    Personal Information
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We may collect personal information that you voluntarily
                    provide, including but not limited to:
                  </p>
                  <ul className="text-foreground/80 list-inside space-y-2">
                    <li>
                      • Name and contact information (email, phone number,
                      address)
                    </li>
                    <li>• Resume and professional information</li>
                    <li>• Account credentials and password</li>
                    <li>• Job preferences and search history</li>
                    <li>• Communication history with employers</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold">
                    Automatically Collected Information
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We may automatically collect certain information about your
                    device and browsing activities, including:
                  </p>
                  <ul className="text-foreground/80 list-inside space-y-2">
                    <li>• IP address and browser type</li>
                    <li>• Pages visited and time spent on our site</li>
                    <li>• Referring website and links clicked</li>
                    <li>• Device information and operating system</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  3. How We Use Your Information
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="text-foreground/80 list-inside space-y-2">
                  <li>• To create and maintain your account</li>
                  <li>• To provide job matching and recommendation services</li>
                  <li>• To process job applications on your behalf</li>
                  <li>
                    • To communicate with you about opportunities and updates
                  </li>
                  <li>• To improve our website and services</li>
                  <li>• To prevent fraud and enhance security</li>
                  <li>• To comply with legal obligations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  4. Information Sharing
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We may share your information with employers and recruiters
                  when you apply for jobs through our platform. We do not sell
                  your personal information to third parties. We may share
                  information when required by law or to protect our rights and
                  safety.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  5. Data Security
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information from unauthorized access,
                  alteration, disclosure, or destruction. However, no security
                  system is impenetrable, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  6. Your Privacy Rights
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="text-foreground/80 list-inside space-y-2">
                  <li>• Access the personal information we hold about you</li>
                  <li>• Request correction of inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability rights</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  7. Cookies and Tracking
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance
                  your experience. You can manage cookie preferences through
                  your browser settings. Please note that disabling cookies may
                  affect site functionality.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  8. Changes to Privacy Policy
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any significant changes via email or prominent
                  notice on our website. Your continued use of our services
                  constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  9. Contact Us
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  If you have questions or concerns about our privacy practices,
                  please contact us at:
                </p>
                <div className="text-foreground/80 space-y-2">
                  <p>Email: contact@shark.com</p>
                  <p>
                    Address: Jl. Sultan Iskandar Muda, Gandaria, Kec. Kebayoran
                    Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                    12240
                  </p>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Terms of Service Tab */}
          <TabsContent value="terms" className="mt-8 space-y-8">
            <div className="border-border bg-card space-y-6 rounded-lg border p-8">
              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  1. Agreement to Terms
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  By accessing and using Shark, you accept and agree to be bound
                  by the terms and provision of this agreement. If you do not
                  agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  2. Use License
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) on Shark for personal,
                  non-commercial transitory viewing only. This is the grant of a
                  license, not a transfer of title, and under this license you
                  may not:
                </p>
                <ul className="text-foreground/80 list-inside space-y-2">
                  <li>• Modify or copy the materials</li>
                  <li>
                    • Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    • Attempt to decompile or reverse engineer any software on
                    Shark
                  </li>
                  <li>
                    • Remove any copyright or other proprietary notations from
                    the materials
                  </li>
                  <li>
                    • Transfer the materials to another person or "mirror" the
                    materials on any other server
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  3. Disclaimer
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  The materials on Shark are provided on an 'as is' basis. Shark
                  makes no warranties, expressed or implied, and hereby
                  disclaims and negates all other warranties including, without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  4. Limitations
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  In no event shall Shark or its suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out
                  of the use or inability to use the materials on Shark.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  5. Accuracy of Materials
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  The materials appearing on Shark could include technical,
                  typographical, or photographic errors. Shark does not warrant
                  that any of the materials on our website are accurate,
                  complete, or current. We may make changes to the materials
                  contained on our website at any time without notice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  6. Links
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Shark has not reviewed all of the sites linked to our website
                  and is not responsible for the contents of any such linked
                  site. The inclusion of any link does not imply endorsement by
                  us of the site. Use of any such linked website is at the
                  user's own risk.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  7. Modifications
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Shark may revise these terms of service for our website at any
                  time without notice. By using this website, you are agreeing
                  to be bound by the then current version of these terms of
                  service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  8. Governing Law
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  These terms and conditions are governed by and construed in
                  accordance with the laws of Indonesia, and you irrevocably
                  submit to the exclusive jurisdiction of the courts in that
                  location.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  9. User Content
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  You retain all rights to any content you submit, post, or
                  display on or through Shark. By submitting content to Shark,
                  you grant us a worldwide, non-exclusive, royalty-free license
                  to use, copy, reproduce, process, adapt, modify, publish,
                  transmit, display, and distribute such content in any media or
                  medium.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-semibold">
                  10. Contact for Legal Concerns
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="text-foreground/80 space-y-2">
                  <p>Email: contact@shark.com</p>
                  <p>
                    Address: Jl. Sultan Iskandar Muda, Gandaria, Kec. Kebayoran
                    Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                    12240
                  </p>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
