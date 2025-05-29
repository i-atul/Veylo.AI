import HomeSearch from "@/components/home-search";
import Image from "next/image";
import { ShieldCheck, CalendarClock, CarFrontIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/car-card";
import Link from "next/link";
import { faqItems } from "@/lib/data";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { getFeaturedCars, getNewestCars, getPublicStats } from "@/actions/home";
import { Badge } from "@/components/ui/badge";




export default async function Home() {
  const newestCars = await getNewestCars(4);
  const featuredCars = await getFeaturedCars(4);
  const statsResult = await getPublicStats();
  const stats = statsResult?.success ? statsResult.data : null;

  return (
    <div className="pt-20 flex flex-col  min-h-screen">
      <section className="relative py-20 md:py-32  text-white shadow-lg rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src="/hero-section.jpg" alt="Hero Cars" fill className="w-full h-full object-cover" priority />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Find Your Perfect Car with <span className="bg-white/20 px-2 rounded">Veylo</span></h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">AI-powered car marketpace, seamless test drives, and the best deals—all in one place.</p>
          </div>
          <HomeSearch />
        </div>
      </section>

      {/* BADGES SECTION */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-2 text-cyan-700 border-cyan-400 bg-cyan-50 flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-5 w-5 text-cyan-500" />
              Verified Listings
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-2 text-blue-700 border-blue-400 bg-blue-50 flex items-center gap-2 text-base font-semibold">
              <CarFrontIcon className="h-5 w-5 text-blue-500" />
              Top Brands
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-2 text-green-700 border-green-400 bg-green-50 flex items-center gap-2 text-base font-semibold">
              <CalendarClock className="h-5 w-5 text-green-500" />
              All Body Types
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-2 text-purple-700 border-purple-400 bg-purple-50 flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-5 w-5 text-purple-500" />
              24/7 Support
            </Badge>
          </div>
        </div>
      </section>

      {/* Explore Cars*/}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Explore New Cars</h2>
            <Button variant="ghost" className="flex items-center text-cyan-600 font-semibold hover:bg-cyan-50" asChild>
              <Link href="/cars?sortBy=newest">
                View All <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {newestCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14 text-gray-900">Why Choose Veylo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9] rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-cyan-100 text-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow">
                <CarFrontIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Extensive Vehicle Selection</h3>
              <p className="text-gray-700">Browse thousands of top vehicles, handpicked by our smart AI for your needs.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-[#e3f2fd] to-[#fffde7] rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Test Drive Booking</h3>
              <p className="text-gray-700">Book test drives online in seconds, with flexible scheduling and instant confirmation.</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-[#ede7f6] to-[#f3e5f5] rounded-2xl shadow hover:shadow-lg transition">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trusted & Secure</h3>
              <p className="text-gray-700">Verified listings, secure transactions, and transparent processes for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION  */}
      {stats && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="relative bg-gradient-to-br from-cyan-50 to-cyan-100 border-t-4 border-cyan-400 rounded-2xl shadow-lg p-8 group transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-2 right-2 opacity-10 text-6xl pointer-events-none select-none">🚗</div>
                <div className="text-4xl font-extrabold text-cyan-700 mb-1 tracking-tight group-hover:text-cyan-800 transition-colors">{stats.totalCars}</div>
                <div className="text-gray-700 text-base font-medium">Total Cars</div>
              </div>
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 border-t-4 border-green-400 rounded-2xl shadow-lg p-8 group transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-2 right-2 opacity-10 text-6xl pointer-events-none select-none">✅</div>
                <div className="text-4xl font-extrabold text-green-700 mb-1 tracking-tight group-hover:text-green-800 transition-colors">{stats.availableCars}</div>
                <div className="text-gray-700 text-base font-medium">Available Cars</div>
              </div>
              <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-4 border-yellow-400 rounded-2xl shadow-lg p-8 group transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-2 right-2 opacity-10 text-6xl pointer-events-none select-none">📅</div>
                <div className="text-4xl font-extrabold text-yellow-700 mb-1 tracking-tight group-hover:text-yellow-800 transition-colors">{stats.reservations}</div>
                <div className="text-gray-700 text-base font-medium">Reservations</div>
              </div>
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 border-t-4 border-purple-400 rounded-2xl shadow-lg p-8 group transition-transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-2 right-2 opacity-10 text-6xl pointer-events-none select-none">📈</div>
                <div className="text-4xl font-extrabold text-purple-700 mb-1 tracking-tight group-hover:text-purple-800 transition-colors">{stats.conversionRate}%</div>
                <div className="text-gray-700 text-base font-medium">Conversion Rate</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e0f7fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-100 text-cyan-600 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Search & Discover</h3>
              <p className="text-gray-700">Use smart filters and AI to find your ideal car from our vast selection.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-100 text-cyan-600 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Book a Test Drive</h3>
              <p className="text-gray-700">Schedule a test drive online at your convenience, with instant confirmation.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-100 text-cyan-600 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Meet & Experience</h3>
              <p className="text-gray-700">Visit the dealership, experience the car, and get all your questions answered.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center">
              <div className="bg-cyan-100 text-cyan-600 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Drive Away</h3>
              <p className="text-gray-700">Complete your purchase securely and drive away in your new car!</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA SECTION  */}
      <section className="py-20 dotted-background text-white rounded-t-3xl bg-gradient-to-br from-[#009efd] to-[#2af598] shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Ready to Drive Your Dream Car?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers who’ve discovered their ideal vehicle with the power of AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-cyan-700 font-bold border-none shadow hover:bg-cyan-50 transition" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" className="bg-gradient-to-r from-[#2af598] to-[#009efd] text-white font-bold border-none shadow hover:from-gray-900 hover:to-gray-700 transition" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>

      

      {/* FAQ SECTION */}

      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col items-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-0 text-left">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="mb-2 border-b border-gray-200">
                <AccordionTrigger className="text-lg font-semibold text-cyan-700 hover:text-cyan-900 transition text-left justify-start">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base text-left">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}
