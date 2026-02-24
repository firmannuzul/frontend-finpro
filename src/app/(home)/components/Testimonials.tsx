'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Friedrich Nietzsche',
    role: 'Photographer',
    avatar: '/nietzsche.jpg',
    quote: 'As a freelancer, I found amazing job opportunities here. The platform connects me with clients who truly value my skills.',
    rating: 5,
  },
  {
    id: 2,
    name: 'René Descartes',
    role: 'Software Engineer',
    avatar: '/descartes.jpg',
    quote: 'Shark helped me land my dream job as a senior developer. The application process was smooth and efficient.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Archimedes',
    role: 'UI/UX Designer',
    avatar: '/archimedes.jpg',
    quote: 'Great platform with diverse opportunities. I received multiple job offers within two weeks of registering.',
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoPlay(false)
  }

  const testimonial = testimonials[current]

  return (
    <section className="relative bg-primary/2 from-background via-background to-secondary py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold text-foreground">Testimonial</h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#5E3BEE] to-[#5E3BEE] rounded-full" />
        </div>

        {/* Testimonial Card */}
        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-card p-12 shadow-lg">
            {/* Quote Icon */}
            <div className="absolute -top-6 right-8">
              <Quote className="h-12 w-12 text-[#5E3BEE] opacity-30" />
            </div>

            {/* Rating */}
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Quote Text */}
            <p className="mb-8 text-center text-lg text-foreground leading-relaxed">
              {testimonial.quote}
            </p>

            {/* User Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#5E3BEE]">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 rounded-full bg-card border border-border p-3 text-foreground transition-all hover:bg-secondary hover:border-[#5E3BEE] md:flex hidden"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 rounded-full bg-card border border-border p-3 text-foreground transition-all hover:bg-secondary hover:border-[#5E3BEE] md:flex hidden"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? 'h-3 w-8 bg-[#5E3BEE]'
                  : 'w-2 bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
