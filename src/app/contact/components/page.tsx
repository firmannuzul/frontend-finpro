"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";

const faqData = [
  {
    id: "1",
    question: "How do I create an account?",
    answer:
      'To create an account, click on the "Sign Up" button on the homepage, fill in your email and password, and follow the verification steps. Once verified, you can start applying for jobs immediately.',
  },
  {
    id: "2",
    question: "How can I search for jobs?",
    answer:
      'Use our advanced search feature on the "Find Jobs" page. You can filter by location, job category, company, salary range, and more. Save your favorite jobs to apply later or set job alerts.',
  },
  {
    id: "3",
    question: "What should I include in my application?",
    answer:
      "Include a complete profile with your resume/CV, professional photo, education history, work experience, and skills. The more complete your profile, the higher your chances of getting noticed by recruiters.",
  },
  {
    id: "4",
    question: "How will I know if I got the job?",
    answer:
      'You can track your applications in the "My Applications" section. Recruiters will contact you via email or phone if they want to interview you. Check your notifications regularly for updates.',
  },
  {
    id: "5",
    question: "Can I edit my application after submitting?",
    answer:
      "Applications cannot be edited after submission. However, you can update your profile information anytime, which will help with future applications. Contact support if you need to withdraw an application.",
  },

  {
    id: "7",
    question: "How do I reset my password?",
    answer:
      'Click "Forgot Password" on the login page, enter your email, and we will send you a password reset link. Follow the link to create a new password.',
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-foreground text-4xl font-bold">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            We're here to help. Reach out to us with any questions or feedback.
          </p>
        </div>

        {/* Contact Section + FAQ Section */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="border-border bg-card rounded-lg border p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="font-heading text-foreground text-2xl font-semibold">
                Send us a Message
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[hsl(270,60%,50%)] to-[hsl(270,60%,60%)]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-foreground text-sm font-semibold"
                >
                  Your Name <span className="text-[#5E3BEE]">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-foreground text-sm font-semibold"
                >
                  Email Address <span className="text-[#5E3BEE]">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-foreground text-sm font-semibold"
                >
                  Subject <span className="text-[#5E3BEE]">*</span>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-foreground text-sm font-semibold"
                >
                  Message <span className="text-[#5E3BEE]">*</span>
                </Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-[#5E3BEE] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                  Failed to send message. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#5E3BEE] font-semibold text-white shadow-md transition-all hover:bg-[#5E3BEE] hover:shadow-lg"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@shark.com",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+62 822 1236 6613",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: MapPin,
                  title: "Address",
                  content:
                    "Jl. Sultan Iskandar Muda, Gandaria, Kec. Kebayoran Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
                  color: "from-pink-500 to-pink-600",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="border-border bg-card flex gap-4 rounded-lg border p-6"
                  >
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br ${item.color} flex flex-shrink-0 items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="rounded-lg bg-gradient-to-br from-[#5E3BEE] to-[#5E3BEE] p-6 text-white">
              <div className="flex gap-3">
                <MessageSquare className="h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold">Quick Response</h3>
                  <p className="mt-1 text-sm text-white/90">
                    We typically respond to inquiries within 24 hours during
                    business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-foreground text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4">
              Find answers to common questions about Shark
            </p>
          </div>

          <div className="border-border bg-card rounded-lg border p-8 shadow-sm">
            <Accordion type="single" collapsible>
              {faqData.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left hover:text-[#5E3BEE] data-[state=open]:text-[#5E3BEE]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
