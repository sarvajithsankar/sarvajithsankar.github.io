import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { PortfolioScripts } from './portfolio-scripts'

const markup = readFileSync(join(process.cwd(), 'src/portfolio/page.html'), 'utf8')

/**
 * The page is authored as one static document and server-rendered verbatim so
 * the cinematic layout keeps its hand-tuned SVG and inline diagram geometry.
 * Enhancement scripts attach only after hydration.
 */
export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <PortfolioScripts />
    </>
  )
}
