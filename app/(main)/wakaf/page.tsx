import Hero from '@/app/(main)/wakaf/_components/hero'
import WhatIsDonate from '@/app/(main)/wakaf/_components/what-is-donate'
import OurPlatform from './_components/our-platform'
import ContactUs from '@/components/shared/contact-us'
import CallToAction from './_components/call-to-action'
import TopDonator from './_components/top-donator'
import Statistic from './_components/statistic'
import HistoryLanding from './_components/history-landing'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsDonate />
      <OurPlatform />
      <TopDonator />
      <HistoryLanding />
      <Statistic />
      <CallToAction />
      <ContactUs />
    </>
  )
}
