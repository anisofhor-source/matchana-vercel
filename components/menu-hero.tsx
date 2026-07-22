import Image from 'next/image'

export function MenuHero() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 scale-105">
        <Image
          src="/images/hero-matcha.jpg"
          alt="Bol de matcha en polvo, chasen de bambú y tazón de matcha batido sobre bandeja de cobre"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 12%, oklch(0.2 0.02 60 / 0.28), transparent 60%), linear-gradient(180deg, oklch(0.18 0.02 50 / 0.5) 0%, oklch(0.16 0.02 50 / 0.66) 100%)',
          }}
        />
      </div>

      <div
        className="reveal-on-mount relative mx-auto flex min-h-[62vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center sm:py-24"
      >
        <span className="mb-4 font-serif text-4xl text-background/90">抹茶</span>
        <p className="mb-3 text-xs uppercase tracking-[0.42em] text-background/80">
          matcha
        </p>
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-background text-balance sm:text-6xl md:text-7xl">
          Matchana
        </h1>
        <p className="mt-6 max-w-md text-pretty leading-[1.75] text-background/85">
          Diseña tu matcha perfecto. Empieza con matcha ceremonial de Uji,
          personaliza cada detalle y disfruta una bebida preparada al
          momento, hecha especialmente para ti.
        </p>
        <div className="mt-9 flex items-center gap-3 text-background/70">
          <span className="h-px w-11 bg-background/45" />
          <span className="font-serif text-sm tracking-[0.18em]">おしながき</span>
          <span className="h-px w-11 bg-background/45" />
        </div>
      </div>
    </header>
  )
}
