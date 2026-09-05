import { Contact } from '@/components/sections/Contact'
import { CurrentlyBuilding } from '@/components/sections/CurrentlyBuilding'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { Work } from '@/components/sections/Work'

/**
 * Single-page portfolio. Section order follows the three questions the site has
 * to answer: who is this (Hero), why care (Work), how deep (Experience, Skills,
 * Currently Building), and how to reach them (Contact).
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Skills />
      <CurrentlyBuilding />
      <Contact />
    </>
  )
}
