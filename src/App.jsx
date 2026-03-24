import React, { useState, useEffect } from 'react';
import { ImageAutoSlider } from './components/ui/ImageAutoSlider';
import { HeroReveal } from './components/ui/HeroReveal';
import { ScrollReveal } from './components/ui/ScrollReveal';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      // The HeroReveal container is 400vh. The sticky animation finishes exactly after 300vh of scrolling.
      // So the navbar turns white only after we completely leave the dark hero section.
      setIsScrolled(window.scrollY > window.innerHeight * 3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Base Phone Number for WhatsApp orders
  const whatsappNumber = "1234567890"; // Replace with real number

  // Image URLs (Local assets in the /public folder)
  const heroBackgroundImage = "/hero.jpg";
  const mobileHeroBackgroundImage = "/hero-mobile.jpg";
  const brandStoryBackgroundImage = "/brandhistory.jpg";

  return (
    <div className="font-body text-text-main bg-background-light antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen">

      {/* 1. Shared Navigation */}
      <nav
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] left-0 right-0 mx-auto ${isScrolled
            ? "top-3 sm:top-5 w-[calc(100%-2rem)] md:w-[90%] max-w-screen-xl rounded-full bg-white/60 backdrop-blur-xl border border-white/50 text-stone-900 py-2.5 sm:py-3 shadow-lg shadow-black/5"
            : "top-0 w-full bg-transparent text-white py-5"
          }`}
      >
        <div className={`flex justify-between items-center mx-auto ${isScrolled ? "px-4 sm:px-6" : "px-6 max-w-screen-2xl"}`}>

          {/* Logo Implementation */}
          <a href="#" className={`flex items-center transition-all duration-300 ${!isScrolled ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            {/* Logo image rendered naturally. The brightness/invert depends on how your logo looks against the dark hero vs white nav. Adjust classes if needed. */}
            <img src="/logo.png" alt="Fitsand Logo" className="h-6 md:h-8 object-contain transition-all duration-300" />
          </a>

          <div className="hidden md:flex gap-8 items-center font-nav text-sm tracking-wide uppercase">
            <a className={`transition-colors duration-300 hover:opacity-70`} href="#shop">Shop</a>
            <a className={`transition-colors duration-300 hover:opacity-70`} href="#philosophy">Philosophy</a>
            <a className={`transition-colors duration-300 hover:opacity-70`} href="#community">Community</a>
            <a className={`transition-colors duration-300 hover:opacity-70`} href="#subscribe">Subscribe</a>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative flex items-center">
              <button
                className="flex items-center transition-opacity hover:opacity-70"
                onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
              >
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              </button>

              {/* WhatsApp Order Popup */}
              {isCartPopupOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white shadow-xl rounded-md p-3 border border-stone-100 flex flex-col items-center gap-3 z-50">
                  <p className="text-xs text-stone-500 text-center font-display leading-tight">Ready to make a purchase?</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-[#25D366] text-white text-[11px] uppercase tracking-wider font-semibold py-2.5 rounded-sm hover:bg-[#1DA851] transition-colors"
                  >
                    Make an order
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger Menu (Mobile Only) */}
            <button
              className="md:hidden flex items-center transition-opacity hover:opacity-70"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed inset-0 z-[60] flex md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[250px] bg-background-light shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col py-8 px-6`}>
          <div className="flex justify-end mb-12">
            <button className="text-stone-900 transition-opacity hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-8 text-stone-900 font-nav text-sm tracking-[0.15em] uppercase items-end">
            <a onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity" href="#shop">Shop</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity" href="#philosophy">Philosophy</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity" href="#community">Community</a>
            <a onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity" href="#subscribe">Subscribe</a>
          </div>
        </div>
      </div>

      <main className="flex flex-col w-full flex-grow">

        {/* 2. Hero Section */}
        <HeroReveal heroImage={heroBackgroundImage} mobileHeroImage={mobileHeroBackgroundImage}>
          <h1 className="text-white font-heading font-light text-[40px] md:text-[64px] leading-tight tracking-tight mb-8 drop-shadow-sm">
            Movement, refined.
          </h1>
          <a className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.1em] rounded-sm transition-colors duration-300 hover:bg-stone-200" href="#shop">
            Shop the Collection
          </a>
        </HeroReveal>

        {/* 3. Best Sellers ("The Essentials") */}
        <section id="shop" className="w-full max-w-[1280px] mx-auto px-4 md:px-10 lg:px-20 py-24 scroll-mt-20">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-brand-text tracking-tight mb-4 font-display">The Essentials</h2>
            <p className="text-brand-muted text-base md:text-lg max-w-2xl font-display">Discover our most-loved, foundation pieces designed to move with you through every part of your day.</p>
            <div className="flex justify-start mt-8 mb-4">
              <div className="inline-flex p-1 bg-brand-surface rounded-full border border-gray-100">
                <button aria-label="Switch to Women collection" className="px-8 py-2 text-sm font-semibold rounded-full transition-all duration-300 bg-white text-brand-text shadow-sm font-display">
                  Women
                </button>
                <button aria-label="Switch to Men collection" className="px-8 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-brand-muted hover:text-brand-text font-display">
                  Men
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-16 snap-x snap-mandatory overflow-x-auto hide-scrollbar pb-8 md:pb-0 md:overflow-visible">
            {/* Card 1 */}
            <ScrollReveal delay={0.1} className="shrink-0 snap-center w-[85vw] sm:w-[300px] md:w-auto">
              <div className="group/card flex flex-col w-full h-full font-display cursor-pointer">
                <div className="relative bg-brand-surface rounded-lg aspect-[2/3] overflow-hidden mb-4 isolate">
                  <img alt="Seamless Flow Leggings" className="w-full h-full object-cover product-image group-hover/card:scale-103 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrazpj6Ne2PBm5ZwYiBgEZiXV6qnCCf3vcEyBfB9-Sf2-tQUeBkO67Nf1Rm0SkJn6BWKcUYouQyLGHfT9g2hWUsAozPaySPaeWlSnQ-qLvIhcAohUTXpPCDD8eQClLw7Qwv5-4DElNTfWc72z-rj6dogAwCNNZ9yUbJhyQWhodM39EKNYWkuuT0CEo_aUG0NdntK923NDVK-wBXEZWbEM8GP_VXp_8Gb_iGxsMHlAVbmPVNoDsseqChQX5JBt0jl2-8aWo3J8AAko" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 px-4">
                    <a href={`https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20Seamless%20Flow%20Leggings`} target="_blank" rel="noreferrer" className="w-full max-w-[200px] flex justify-center items-center bg-background-light text-brand-text font-semibold text-[11px] tracking-wide uppercase py-3 rounded-md shadow-sm opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ease-out hover:bg-[#25D366] hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:outline-none focus:opacity-100 focus:translate-y-0">
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-brand-text text-lg font-semibold leading-tight">Seamless Flow Leggings</h3>
                  <p className="text-brand-text font-medium">$88</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2} className="shrink-0 snap-center w-[85vw] sm:w-[300px] md:w-auto">
              <div className="group/card flex flex-col w-full h-full font-display cursor-pointer">
                <div className="relative bg-brand-surface rounded-lg aspect-[2/3] overflow-hidden mb-4 isolate">
                  <img alt="Elevated Crop Top" className="w-full h-full object-cover product-image group-hover/card:scale-103 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-rH3bGa2IYEHl0OXY1RtVLTUBw0_Tes3GUC0JnxxyOuNn_4El1kBhP24oUxOaskKagp-5iICmnAx6o8v7dPrrL0zaNZqucBI6ldHM-MbxgDDejn93W6VjQQWu-CrD_9xbfGLKMeoubtBs29LBwoJw4vWsmuJ_N-fwOUUeECV_b2TNmRNSgN502rTPZpLbNktLQEH-XH4m3lJYvGwVKavMv4fTb67YaltFqfwBu1h3ffUjWsulgoJ45NqVmmExIZ9WIREn5F1k280" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 px-4">
                    <a href={`https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20Elevated%20Crop%20Top`} target="_blank" rel="noreferrer" className="w-full max-w-[200px] flex justify-center items-center bg-background-light text-brand-text font-semibold text-[11px] tracking-wide uppercase py-3 rounded-md shadow-sm opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ease-out hover:bg-[#25D366] hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:outline-none focus:opacity-100 focus:translate-y-0">
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-brand-text text-lg font-semibold leading-tight">Elevated Crop Top</h3>
                  <p className="text-brand-text font-medium">$54</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3} className="shrink-0 snap-center w-[85vw] sm:w-[300px] md:w-auto">
              <div className="group/card flex flex-col w-full h-full font-display cursor-pointer">
                <div className="relative bg-brand-surface rounded-lg aspect-[2/3] overflow-hidden mb-4 isolate">
                  <img alt="Ribbed Bralette" className="w-full h-full object-cover product-image group-hover/card:scale-103 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxlMRJkXyZzkhaiKD2YoEpKJ6YGz5uLpdMzzPbQozLKO9KDw-5gY3blZV1_ZgKbppWe0GCEEwP-UHP76EWA7fZyVV-OEovdgH8gcF7lUm_0qijHtpftqw3P1WwTDYzIJ8oOqGk9JIffGSsQ5RZGWVrvG8amC-CV9D_p8bX4rQqBxGIWIFJaBR0no73fR1pplbbBXVTS01fSbodkPwCitQVXFsQDbxnD-GTfPeVDESVspv1JKCc06qdDIEqgjt4pt84Sw_TdDMwe-g" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 px-4">
                    <a href={`https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20Ribbed%20Bralette`} target="_blank" rel="noreferrer" className="w-full max-w-[200px] flex justify-center items-center bg-background-light text-brand-text font-semibold text-[11px] tracking-wide uppercase py-3 rounded-md shadow-sm opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ease-out hover:bg-[#25D366] hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:outline-none focus:opacity-100 focus:translate-y-0">
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-brand-text text-lg font-semibold leading-tight">Ribbed Bralette</h3>
                  <p className="text-brand-text font-medium">$48</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.4} className="shrink-0 snap-center pr-4 md:pr-0 w-[85vw] sm:w-[300px] md:w-auto">
              <div className="group/card flex flex-col w-full h-full font-display cursor-pointer">
                <div className="relative bg-brand-surface rounded-lg aspect-[2/3] overflow-hidden mb-4 isolate">
                  <img alt="Lounge Joggers" className="w-full h-full object-cover product-image group-hover/card:scale-103 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJXG-Qus5MwYiH3wU-7XCOVMRkKKFRSkYWmLQI7La--GjW32oWVVQOr5ZeJPiFsmbFn6NIK2liSyyFEpqHOUHsvbug1lRT6GlvFqxXFGsLElotAuCaRomb_VUOeYNkDUFmAqL23Ed7TG6r4QV8IhpXcw7Wk6hrVHlnxiB0cra8GdpQf4gmZPo_pFmXyz4juA6b7vYfjS3dkkNN98snvm_t-h5p9O-qVl88ENLXrDFOGoISP0bO-IedMVWlRZYtuU9TrR90ctzK2pE" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 px-4">
                    <a href={`https://wa.me/${whatsappNumber}?text=I'm%20interested%20in%20the%20Lounge%20Joggers`} target="_blank" rel="noreferrer" className="w-full max-w-[200px] flex justify-center items-center bg-background-light text-brand-text font-semibold text-[11px] tracking-wide uppercase py-3 rounded-md shadow-sm opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ease-out hover:bg-[#25D366] hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:outline-none focus:opacity-100 focus:translate-y-0">
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-brand-text text-lg font-semibold leading-tight">Lounge Joggers</h3>
                  <p className="text-brand-text font-medium">$98</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. Brand Story */}
        <section id="philosophy" className="relative w-full h-[600px] md:h-[800px] overflow-hidden flex items-center justify-end bg-white scroll-mt-20">
          <img alt="Woman walking a dog in sunlit urban street" className="absolute inset-0 w-full h-full object-cover" src={brandStoryBackgroundImage} />
          <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8 md:px-16 flex justify-end">
            <div className="w-full max-w-[500px] py-12">
              <ScrollReveal>
                <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-white mb-6 leading-[1.1] shadow-sm drop-shadow-lg">
                  Designed for the spaces between.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="font-display text-base font-normal text-white leading-[1.6] mb-10 text-opacity-95 shadow-sm drop-shadow-md">
                  Fitsand redefines modern activewear, blending high-performance fabrics with elevated silhouettes. Luxury comfort designed to flow seamlessly from morning Pilates to a casual lunch.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <button className="inline-flex items-center justify-center h-12 px-8 rounded-sm bg-white text-stone-900 text-[12px] font-medium tracking-[0.1em] uppercase transition-all hover:bg-stone-200 w-fit">
                  Read Our Story
                </button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 5. Comunidad Fitsand */}
        <section id="community" className="pt-32 pb-24 bg-stone-50 text-stone-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-stone-800 mb-6 leading-[1.1]">Comunidad Fitsand</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="max-w-2xl mx-auto text-lg text-stone-600 leading-relaxed font-body">
                Join our movement for organic movement. Tag <span className="text-clay-600 font-medium">@fitsand</span> and use <span className="text-clay-600 font-medium">#FitsandLife</span> to be featured in our curated gallery of comfort.
              </p>
            </ScrollReveal>
          </div>
          <div className="w-full">
            <ScrollReveal delay={0.2} noBlur>
              <ImageAutoSlider whatsappNumber={whatsappNumber} />
            </ScrollReveal>

            <div className="mt-20 flex flex-col items-center border-t border-stone-200 pt-16 font-body mb-20">
              <ScrollReveal delay={0.3}>
                <span className="font-heading italic text-2xl text-stone-400 mb-8 block text-center">Live in the Light.</span>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <a href="#shop" className="px-12 py-4 bg-stone-900 text-stone-50 font-body tracking-[0.2em] uppercase text-[11px] hover:bg-stone-800 transition-colors duration-500 rounded-sm">
                  Discover the Collection
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6. Upcoming Collections / Soft Clay Capsule (Moved to the end) */}
        <section id="subscribe" className="flex-grow flex items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8 bg-surface min-h-[400px] overflow-hidden scroll-mt-20">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#B47A65]/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          </div>
          <div className={`relative z-10 w-full max-w-[500px] mx-auto text-center flex flex-col gap-6 ${isFormSubmitted ? 'form-submitted' : ''}`}>
            <div className="space-y-4">
              <ScrollReveal>
                <h2 className="text-4xl md:text-[40px] font-semibold tracking-tight text-text-dark font-heading">
                  The Soft Clay Capsule
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-base text-text-dark font-normal font-display">
                  Sign up for early access to our upcoming seasonal drops. Designed for the spaces between.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2} className="mt-2 relative h-16 flex items-center justify-center">
              {!isFormSubmitted && (
                <div className="input-group w-full max-w-[400px] flex items-center relative">
                  <input aria-label="Email address for early access" className="input-underline w-full bg-transparent border-0 border-b border-muted text-text-dark placeholder:text-muted focus:ring-0 focus-visible:border-primary focus-visible:outline-none px-0 py-3 text-base font-normal leading-normal transition-all font-display" placeholder="Enter your email" type="email" />
                  <button
                    onClick={() => setIsFormSubmitted(true)}
                    className="submit-btn absolute right-0 bottom-3 text-primary hover:text-text-dark transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:outline-none rounded-full"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl font-light">arrow_forward</span>
                  </button>
                </div>
              )}
              {isFormSubmitted && (
                <div className="success-message text-[24px] text-text-dark font-medium font-heading">
                  You're on the list.
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="w-full pt-16 pb-8 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between px-8 max-w-7xl mx-auto gap-12">
          <div className="space-y-4">
            <div className="font-heading italic text-lg text-stone-800 dark:text-stone-200">Fitsand Activewear</div>
            <p className="text-stone-500 font-body text-sm max-w-xs leading-relaxed">
              Designed for the mindful mover. Sustainable materials, timeless silhouettes, and the softest touch for your skin.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="text-stone-900 dark:text-stone-100 font-semibold text-xs font-body tracking-wider uppercase">Customer Care</h4>
              <a className="text-stone-500 dark:text-stone-400 text-sm hover:underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 font-body" href="#">Shipping</a>
              <a className="text-stone-500 dark:text-stone-400 text-sm hover:underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 font-body" href="#">Returns</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-stone-900 dark:text-stone-100 font-semibold text-xs font-body tracking-wider uppercase">Brand</h4>
              <a className="text-stone-500 dark:text-stone-400 text-sm hover:underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 font-body" href="#">Sustainability</a>
              <a className="text-stone-500 dark:text-stone-400 text-sm hover:underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4 font-body" href="#">Privacy</a>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-stone-400 text-xl">social_leaderboard</span>
              <span className="material-symbols-outlined text-stone-400 text-xl">spa</span>
              <span className="material-symbols-outlined text-stone-400 text-xl">public</span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 font-body text-xs tracking-wide">
              © 2026 Fitsand Activewear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
