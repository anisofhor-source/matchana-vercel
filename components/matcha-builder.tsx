'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  bases,
  sizes,
  milks,
  foams,
  sweetness,
  extras,
  DELIVERY_FEE,
  type Option,
} from '@/lib/matcha-options'

type Accent = 'matcha' | 'sakura' | 'indigo' | 'gold'

const accentTheme: Record<
  Accent,
  {
    badge: string
    selected: string
    unselected: string
    chip: string
    bar: string
    button: string
    soft: string
  }
> = {
  matcha: {
    badge: 'bg-matcha text-matcha-foreground',
    selected: 'border-matcha bg-matcha/15 ring-2 ring-matcha',
    unselected: 'border-matcha/30 bg-matcha/5 hover:border-matcha/60',
    chip: 'bg-matcha/15 text-matcha',
    bar: 'bg-matcha',
    button: 'bg-matcha text-matcha-foreground',
    soft: 'bg-matcha/10',
  },
  sakura: {
    badge: 'bg-sakura text-sakura-foreground',
    selected: 'border-sakura bg-sakura/25 ring-2 ring-sakura',
    unselected: 'border-sakura/35 bg-sakura/10 hover:border-sakura/70',
    chip: 'bg-sakura/30 text-sakura-foreground',
    bar: 'bg-sakura',
    button: 'bg-sakura text-sakura-foreground',
    soft: 'bg-sakura/15',
  },
  indigo: {
    badge: 'bg-indigo text-indigo-foreground',
    selected: 'border-indigo bg-indigo/15 ring-2 ring-indigo',
    unselected: 'border-indigo/30 bg-indigo/5 hover:border-indigo/60',
    chip: 'bg-indigo/15 text-indigo',
    bar: 'bg-indigo',
    button: 'bg-indigo text-indigo-foreground',
    soft: 'bg-indigo/10',
  },
  gold: {
    badge: 'bg-gold text-gold-foreground',
    selected: 'border-gold bg-gold/30 ring-2 ring-gold',
    unselected: 'border-gold/35 bg-gold/10 hover:border-gold/70',
    chip: 'bg-gold/30 text-gold-foreground',
    bar: 'bg-gold',
    button: 'bg-gold text-gold-foreground',
    soft: 'bg-gold/15',
  },
}

type StepMeta = {
  key: string
  title: string
  jp: string
  accent: Accent
}

const steps: StepMeta[] = [
  { key: 'base', title: 'Elige tu base', jp: 'ベース', accent: 'sakura' },
  { key: 'size', title: 'Tamaño', jp: 'サイズ', accent: 'sakura' },
  { key: 'milk', title: 'Tipo de leche', jp: 'ミルク', accent: 'sakura' },
  { key: 'foam', title: 'Foam', jp: 'フォーム', accent: 'sakura' },
  { key: 'sweet', title: 'Nivel de dulzor', jp: '甘さ', accent: 'sakura' },
  { key: 'extras', title: 'Extras', jp: 'トッピング', accent: 'sakura' },
  { key: 'delivery', title: '¿Cómo lo quieres?', jp: 'お届け', accent: 'sakura' },
  { key: 'review', title: 'Revisa tu pedido', jp: 'ご注文', accent: 'sakura' },
]

function OptionCard({
  option,
  selected,
  accent,
  onSelect,
}: {
  option: Option
  selected: boolean
  accent: Accent
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      data-selected={selected}
      className={`option-card relative flex flex-col items-start rounded-xl border-2 p-4 pr-8 text-left ${
        selected
          ? accentTheme[accent].selected
          : accentTheme[accent].unselected
      }`}
    >
      {selected ? (
        <span
          className={`check-pop absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${accentTheme[accent].button}`}
        >
          ✓
        </span>
      ) : null}
      <span className="flex w-full items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {option.label}
        </span>
        {option.jp ? (
          <span className="font-serif text-sm text-muted-foreground">
            {option.jp}
          </span>
        ) : null}
      </span>
      <span className="mt-1.5 flex w-full items-center justify-between text-xs text-muted-foreground">
        <span>{option.note ?? ''}</span>
        <span className="font-medium">
          {option.price > 0 ? `+$${option.price}` : ''}
        </span>
      </span>
    </button>
  )
}

export function MatchaBuilder() {
  const [step, setStep] = useState(0)
  const [baseId, setBaseId] = useState(bases[0].id)
  const [sizeId, setSizeId] = useState(sizes[0].id)
  const [milkId, setMilkId] = useState(milks[0].id)
  const [foamId, setFoamId] = useState(foams[0].id)
  const [sweetId, setSweetId] = useState(sweetness[1].id)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [delivery, setDelivery] = useState<'pickup' | 'domicilio'>('pickup')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [orderStage, setOrderStage] = useState<'form' | 'preparing' | 'done'>(
    'form',
  )

  const toggleExtra = (id: string) =>
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  const base = bases.find((b) => b.id === baseId)!
  const size = sizes.find((s) => s.id === sizeId)!
  const milk = milks.find((m) => m.id === milkId)!
  const foam = foams.find((f) => f.id === foamId)!
  const sweet = sweetness.find((s) => s.id === sweetId)!
  const chosenExtras = extras.filter((e) => selectedExtras.includes(e.id))

  const total = useMemo(() => {
    const extrasTotal = chosenExtras.reduce((sum, e) => sum + e.price, 0)
    const deliveryTotal = delivery === 'domicilio' ? DELIVERY_FEE : 0
    return (
      base.price +
      size.price +
      milk.price +
      foam.price +
      extrasTotal +
      deliveryTotal
    )
  }, [base, size, milk, foam, chosenExtras, delivery])

  const meta = steps[step]
  const accent = accentTheme[meta.accent]
  const isLast = step === steps.length - 1
  const canOrder =
    name.trim().length > 0 &&
    (delivery === 'pickup' || address.trim().length > 5)

  const goNext = () => {
    if (isLast) {
      if (canOrder) {
        setOrderStage('preparing')
        window.setTimeout(() => setOrderStage('done'), 2200)
      }
      return
    }
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const pickAndAdvance = (setter: (v: string) => void, id: string) => {
    setter(id)
    window.setTimeout(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 260)
  }

  if (orderStage === 'preparing') {
    return (
      <div className="relative overflow-hidden rounded-3xl border-2 border-matcha/40 bg-gradient-to-b from-matcha/[0.08] to-card p-10 text-center shadow-[0_30px_60px_-30px_oklch(0.4_0.08_60_/_0.4)] animate-in fade-in zoom-in-95 duration-500">
        <div className="relative mx-auto w-[220px] max-w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-20px_oklch(0.4_0.1_152_/_0.55)]">
          <Image
            src="/images/matcha-whisking.gif"
            alt="Batiendo matcha con chasen"
            width={220}
            height={220}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
        <p className="mt-6 font-serif text-3xl tracking-wide text-matcha-strong">
          抹茶を点てています
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">
          Estamos preparando tu orden
        </h3>
        <div className="mt-3.5 flex items-center justify-center gap-1.5">
          <span className="h-[7px] w-[7px] animate-[dotPulse_1.2s_ease-in-out_infinite] rounded-full bg-matcha" />
          <span className="h-[7px] w-[7px] animate-[dotPulse_1.2s_ease-in-out_infinite_0.2s] rounded-full bg-matcha" />
          <span className="h-[7px] w-[7px] animate-[dotPulse_1.2s_ease-in-out_infinite_0.4s] rounded-full bg-matcha" />
        </div>
      </div>
    )
  }

  if (orderStage === 'done') {
    const trackSteps = [
      { label: 'Pedido recibido', sub: 'Confirmamos tu orden', done: true },
      { label: 'Preparando tu matcha', sub: 'Batido a mano, al momento', done: true },
      {
        label: delivery === 'domicilio' ? 'En camino' : 'Listo para recoger',
        sub: delivery === 'domicilio' ? `Hacia: ${address}` : 'Te esperamos en Kaze',
        done: false,
      },
      { label: 'Disfrútalo', sub: '¡Buen provecho!', done: false },
    ]
    return (
      <div className="relative overflow-hidden rounded-3xl border-2 border-matcha/40 bg-card p-10 text-center shadow-[0_30px_60px_-30px_oklch(0.4_0.08_60_/_0.4)] animate-in fade-in zoom-in-95 duration-500">
        <Image
          src="/images/matcha-thanks.jpg"
          alt="Matcha listo, con motivo de celebración"
          width={260}
          height={260}
          className="mx-auto block h-auto w-[260px] max-w-full rounded-2xl shadow-[0_16px_36px_-20px_oklch(0.4_0.1_152_/_0.5)]"
        />
        <p className="mt-4 font-serif text-4xl text-matcha-strong">ありがとう</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">
          Gracias por tu orden, {name}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tu {base.label} ({size.label}) con {milk.label.toLowerCase()}
          {foam.id !== 'ninguno' ? ` y ${foam.label.toLowerCase()}` : ''} está en
          preparación.{' '}
          {delivery === 'domicilio'
            ? `Lo llevaremos a: ${address}.`
            : 'Puedes recogerlo en Kaze en unos 15 minutos.'}
        </p>
        <p className="mt-4 text-lg font-semibold text-foreground">
          Total: ${total}
        </p>

        <div className="mx-auto mt-8 max-w-[360px] border-t border-border pt-6 text-left">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Seguimiento del pedido
          </p>
          {trackSteps.map((ts, i) => (
            <div key={ts.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border-2 text-[13px] font-extrabold transition-colors duration-300 ${
                    ts.done
                      ? 'border-matcha bg-matcha text-matcha-foreground'
                      : 'border-border bg-card text-muted-foreground'
                  }`}
                >
                  {ts.done ? '✓' : i + 1}
                </span>
                {i < trackSteps.length - 1 ? (
                  <span
                    className={`h-[30px] w-[2.5px] rounded transition-colors duration-500 ${
                      ts.done ? 'bg-matcha' : 'bg-border'
                    }`}
                  />
                ) : null}
              </div>
              <div className="pb-3.5">
                <p
                  className={`mt-0.5 text-[15px] font-semibold transition-colors duration-300 ${
                    ts.done ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {ts.label}
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  {ts.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setOrderStage('form')
            setStep(0)
          }}
          className="btn-hover-lift mt-2 rounded-full bg-matcha px-6 py-2.5 text-sm font-semibold text-matcha-foreground"
        >
          Crear otro
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Progress header */}
      <div className={`relative ${accent.soft} px-6 pt-6 pb-5 transition-colors duration-300`}>
        <Image
          src="/images/sakura-branch.png"
          alt=""
          aria-hidden="true"
          width={120}
          height={120}
          className="pointer-events-none absolute -right-2 -top-3 h-24 w-24 opacity-40 mix-blend-multiply"
        />
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-lg ${accent.badge}`}
          >
            {meta.jp}
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Paso {step + 1} de {steps.length}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              {meta.title}
            </h3>
          </div>
        </div>

        {/* Step dots */}
        <div className="mt-5 flex items-center gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-label={`Ir a ${s.title}`}
              onClick={() => setStep(i)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? accent.bar : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step body */}
      <div key={meta.key} className="px-6 py-6 animate-in fade-in slide-in-from-right-3 duration-300">
        {meta.key === 'base' ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {bases.map((b) => (
              <OptionCard
                key={b.id}
                option={b}
                accent={meta.accent}
                selected={baseId === b.id}
                onSelect={() => pickAndAdvance(setBaseId, b.id)}
              />
            ))}
          </div>
        ) : null}

        {meta.key === 'size' ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {sizes.map((s) => (
              <OptionCard
                key={s.id}
                option={s}
                accent={meta.accent}
                selected={sizeId === s.id}
                onSelect={() => pickAndAdvance(setSizeId, s.id)}
              />
            ))}
          </div>
        ) : null}

        {meta.key === 'milk' ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {milks.map((m) => (
              <OptionCard
                key={m.id}
                option={m}
                accent={meta.accent}
                selected={milkId === m.id}
                onSelect={() => pickAndAdvance(setMilkId, m.id)}
              />
            ))}
          </div>
        ) : null}

        {meta.key === 'foam' ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {foams.map((f) => (
              <OptionCard
                key={f.id}
                option={f}
                accent={meta.accent}
                selected={foamId === f.id}
                onSelect={() => pickAndAdvance(setFoamId, f.id)}
              />
            ))}
          </div>
        ) : null}

        {meta.key === 'sweet' ? (
          <div className="flex flex-wrap gap-2.5">
            {sweetness.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => pickAndAdvance(setSweetId, s.id)}
                aria-pressed={sweetId === s.id}
                className={`rounded-full border-2 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 ${
                  sweetId === s.id ? accent.selected : accent.unselected
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}

        {meta.key === 'extras' ? (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              Elige todos los que quieras (opcional).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {extras.map((e) => (
                <OptionCard
                  key={e.id}
                  option={e}
                  accent={meta.accent}
                  selected={selectedExtras.includes(e.id)}
                  onSelect={() => toggleExtra(e.id)}
                />
              ))}
            </div>
          </>
        ) : null}

        {meta.key === 'delivery' ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDelivery('pickup')}
                aria-pressed={delivery === 'pickup'}
                className={`rounded-xl border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${
                  delivery === 'pickup' ? accent.selected : accent.unselected
                }`}
              >
                <span className="block text-sm font-semibold text-foreground">
                  Recoger en tienda
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Gratis · listo en ~15 min
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDelivery('domicilio')}
                aria-pressed={delivery === 'domicilio'}
                className={`rounded-xl border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${
                  delivery === 'domicilio' ? accent.selected : accent.unselected
                }`}
              >
                <span className="block text-sm font-semibold text-foreground">
                  A domicilio
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  +${DELIVERY_FEE} · 30–45 min
                </span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                >
                  Tu nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Hana"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-sakura focus:ring-2 focus:ring-sakura/40"
                />
              </div>
              {delivery === 'domicilio' ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label
                    htmlFor="address"
                    className="mb-1 block text-xs font-medium text-muted-foreground"
                  >
                    Dirección de entrega
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, número, colonia"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-sakura focus:ring-2 focus:ring-sakura/40"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {meta.key === 'review' ? (
          <div className="space-y-4">
            <dl className="space-y-2 rounded-xl bg-secondary/50 p-4 text-sm">
              <Row label={base.label} value={`$${base.price}`} />
              <Row
                label={`Tamaño ${size.label}`}
                value={size.price > 0 ? `+$${size.price}` : '—'}
              />
              <Row
                label={milk.label}
                value={milk.price > 0 ? `+$${milk.price}` : '—'}
              />
              {foam.id !== 'ninguno' ? (
                <Row label={foam.label} value={`+$${foam.price}`} />
              ) : null}
              <Row label={`Dulzor: ${sweet.label}`} value="—" />
              {chosenExtras.map((e) => (
                <Row key={e.id} label={e.label} value={`+$${e.price}`} />
              ))}
              <Row
                label={delivery === 'domicilio' ? 'A domicilio' : 'Recoger en tienda'}
                value={delivery === 'domicilio' ? `+$${DELIVERY_FEE}` : 'Gratis'}
              />
            </dl>
            {!canOrder ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs text-destructive">
                {name.trim().length === 0
                  ? 'Vuelve al paso de entrega y escribe tu nombre.'
                  : 'Falta tu dirección de entrega.'}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          Atrás
        </button>

        <span
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${accent.chip}`}
        >
          Total ${total}
        </span>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast && !canOrder}
          className={`btn-hover-lift rounded-full px-6 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${accent.button}`}
        >
          {isLast ? `Ordenar · $${total}` : 'Siguiente'}
        </button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}
