"use client"

import { useI18n } from "@/lib/i18n"

export function PlaygroundIntro() {
  const { t } = useI18n()
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.playground.title}
      </h1>
      <p className="mt-3 text-balance text-muted-foreground">
        {t.playground.subtitle}
      </p>
    </div>
  )
}
