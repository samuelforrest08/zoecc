"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton, WhatsAppLink } from "@/components/WhatsAppButton";
import {
  Heart,
  Camera,
  Coffee,
  Droplets,
  Sparkles,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Shield,
  Menu,
  X,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

const PHONE = "+44 7434 869115";
const ENQUIRY_MSG = "Hi Zoe! I'd like to enquire about cat care services.";
const AVAILABILITY_MSG =
  "Hi Zoe! I'd like to check your availability for cat care services.";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Page() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Nav ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-soft border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-serif text-xl font-semibold text-gradient"
          >
            ZoeCC
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <WhatsAppButton
              phoneNumber={PHONE}
              message={ENQUIRY_MSG}
              className="text-sm px-5 py-2.5"
            />
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden glass border-t border-border/50 px-4 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground"
                onClick={() => setNavOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <WhatsAppButton
              phoneNumber={PHONE}
              message={ENQUIRY_MSG}
              className="text-sm w-full justify-center"
            />
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden gradient-hero">
        {/* Decorative blobs */}
        <div className="absolute top-24 right-8 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-4 w-56 h-56 rounded-full bg-primary/8 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left animate-fade-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <MapPin className="h-3.5 w-3.5" />
              Teddington &amp; surrounding areas
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                Gentle Cat Care
                <br />
                with <span className="text-gradient">Zoe</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Loving, personalised visits while you're away — feeding,
                playtime, photos and peace of mind.
              </p>
            </div>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                {
                  icon: <Clock className="h-4 w-4" />,
                  label: "3 years experience",
                },
                {
                  icon: <Shield className="h-4 w-4" />,
                  label: "Trusted locally",
                },
                {
                  icon: <Sparkles className="h-4 w-4" />,
                  label: "£8 per visit",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-soft text-sm text-foreground font-medium"
                >
                  <span className="text-primary">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-start gap-2">
              <WhatsAppButton
                phoneNumber={PHONE}
                message={ENQUIRY_MSG}
                className="text-base px-8 py-4 shadow-elegant"
              />
              <p className="text-sm text-muted-foreground">{PHONE}</p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-fade-in-right">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border/40 hover-lift">
              <img
                src="/photos/cat1.webp"
                alt="Zoe holding a beautiful fluffy cat"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              {/* Floating price badge */}
              <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2.5 shadow-elegant">
                <p className="font-serif text-2xl font-bold text-primary leading-none">
                  £8
                </p>
                <p className="text-xs text-muted-foreground">per visit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-pulse-soft">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-border" />
          <p className="text-xs tracking-widest uppercase">Scroll</p>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary/70">
            About Zoe
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Every cat is different — and that's the fun part
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            With 3 years of hands-on experience caring for cats of all
            personalities, I understand that shy cats need patience and playful
            cats need energy. I tailor every visit so your cat stays
            comfortable, stimulated and loved while you're away.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-16 md:py-24 px-4 gradient-warm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary/70 mb-3">
              Services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Everything included, every visit
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: <Coffee className="h-6 w-6" />,
                title: "Feeding & Water",
                desc: "Your cat's usual food and fresh water, exactly as you leave instructions.",
              },
              {
                icon: <Droplets className="h-6 w-6" />,
                title: "Litter Cleaning",
                desc: "Daily maintenance so the litter tray is always clean and odour-free.",
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Play & Cuddles",
                desc: "Interactive play and affection tailored to your cat's personality.",
              },
              {
                icon: <Camera className="h-6 w-6" />,
                title: "Photo Updates",
                desc: "Regular photos and WhatsApp updates so you always know they're happy.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="gradient-card border-gradient rounded-2xl p-6 shadow-soft hover-lift"
              >
                <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground mb-4 shadow-soft">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary/70 mb-3">
              Gallery
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Cats I've cared for
            </h2>
            <p className="text-muted-foreground mt-3">Swipe to explore</p>
          </div>

          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-3 md:-ml-5">
              {[
                {
                  src: "/photos/cat2.webp",
                  name: "Sweep",
                  alt: "Adorable tabby cat named Sweep",
                },
                {
                  src: "/photos/cat3.webp",
                  name: "Lily",
                  alt: "Sleepy cat named Lily",
                },
                {
                  src: "/photos/cat4.webp",
                  name: "Sooty",
                  alt: "Black cat named Sooty with food bowls",
                },
                {
                  src: "/photos/cat5.webp",
                  name: "Lily again",
                  alt: "Beautiful cat named Lily",
                },
                {
                  src: "/photos/cat6.webp",
                  name: "Lisa",
                  alt: "Beautiful grey cat named Lisa",
                },
                {
                  src: "/photos/cat7.webp",
                  name: "Neli",
                  alt: "Beautiful cat named Neli",
                },
                {
                  src: "/photos/cat8.webp",
                  name: "Boo",
                  alt: "Beautiful cat named Boo",
                },
              ].map((cat) => (
                <CarouselItem
                  key={cat.name}
                  className="pl-3 md:pl-5 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group border-gradient rounded-2xl overflow-hidden shadow-soft hover-lift bg-card">
                    <div className="overflow-hidden">
                      <img
                        src={cat.src}
                        alt={cat.alt}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="py-3 px-4 flex items-center gap-2">
                      <Heart className="h-3.5 w-3.5 text-primary fill-primary/30" />
                      <p className="font-medium text-foreground text-sm">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex -left-14 bg-card border-border hover:bg-primary/5 text-primary hover:text-primary shadow-soft" />
            <CarouselNext className="hidden sm:flex -right-14 bg-card border-border hover:bg-primary/5 text-primary hover:text-primary shadow-soft" />
          </Carousel>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === current
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-primary/25 hover:bg-primary/45"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-16 md:py-24 px-4 gradient-warm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary/70 mb-3">
              Reviews
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              What cat parents say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: `"Our cat Lily had a fabulous holiday with Zoe! She is a cat who thrives on love and attention, so it was very reassuring to know that she was being pampered while we were away!"`,
                initial: "K",
                name: "Karen",
                detail: "🏡 Cat stayed at mine",
              },
              {
                text: `"Zoe has cared for our cats Sooty and Sweep since they were kittens. She has always made sure they have clean water and fresh food. She is kind, friendly, gentle and trustworthy — our go-to cat carer."`,
                initial: "FJ",
                name: "Fiona Jones",
                detail: "📍 Teddington",
              },
            ].map((r) => (
              <div
                key={r.name}
                className="gradient-card border-gradient rounded-2xl p-8 shadow-soft hover-lift"
              >
                <StarRating />
                <p className="text-muted-foreground italic leading-relaxed mb-6 text-[15px]">
                  {r.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="gradient-primary w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold shadow-soft">
                    {r.initial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm">
                        {r.name}
                      </p>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 md:py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Pricing
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10">
            Simple, honest pricing
          </h2>

          <div className="border-gradient rounded-2xl shadow-elegant overflow-hidden">
            <div className="gradient-primary p-8 text-center">
              <div className="flex items-end justify-center gap-2 mb-2">
                <span className="font-serif text-7xl font-bold text-primary-foreground leading-none">
                  £8
                </span>
                <span className="text-primary-foreground/70 mb-2 text-lg">
                  / visit
                </span>
              </div>
              <p className="text-primary-foreground/80">
                No hidden fees. Ever.
              </p>
            </div>

            <div className="gradient-card p-8">
              <ul className="space-y-3 text-left mb-8">
                {[
                  "Feeding with your cat's usual food",
                  "Fresh water topped up",
                  "Litter tray cleaned",
                  "Play time & affection",
                  "WhatsApp photo updates",
                  "Local to Teddington area",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                phoneNumber={PHONE}
                message={AVAILABILITY_MSG}
                className="w-full justify-center text-base py-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-12 px-4 pb-28 md:pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="font-serif text-2xl text-gradient font-semibold">
            ZoeCC
          </span>
          <p className="text-muted-foreground text-sm">
            Gentle, loving cat care in Teddington · £8/visit · Cat Sitter
            Teddington
          </p>
          <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground/70">
            © 2026 ZoeCC · Site by{" "}
            <a
              href="https://www.samuelforrest.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
            >
              Samuel Forrest
            </a>
          </div>
        </div>
      </footer>

      {/* ── Mobile sticky CTA ── */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-border/50 px-4 py-3 transition-all duration-300 ${
          pastHero
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <WhatsAppButton
          phoneNumber={PHONE}
          message={ENQUIRY_MSG}
          className="w-full justify-center text-sm py-3"
        />
      </div>
    </div>
  );
}
