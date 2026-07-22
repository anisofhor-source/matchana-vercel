import { MenuHero } from '@/components/menu-hero'
import { MatchaBuilder } from '@/components/matcha-builder'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <MenuHero />

      <section id="crea-tu-matcha" className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="font-serif text-sm tracking-[0.3em] text-primary">
            抹茶を作ろう
          </p>
          <h2 className="mt-2 font-serif text-3xl text-foreground text-balance">
            Crea tu Matcha
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Arma tu bebida paso a paso: base, tamaño, leche, foam y extras.
            Elige recogerlo en tienda o pedirlo a domicilio.
          </p>
        </div>
        <MatchaBuilder />
      </section>

      <footer className="border-t border-border py-10 text-center">
        <p className="font-serif text-3xl text-primary">抹茶</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Kaze Matcha · 12 Yanaka Lane · Abierto todos los días, 8am–8pm
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Ingredientes ceremoniales de Uji, Kioto. Avísanos de cualquier
          alergia.
        </p>
      </footer>
    </main>
  )
}
