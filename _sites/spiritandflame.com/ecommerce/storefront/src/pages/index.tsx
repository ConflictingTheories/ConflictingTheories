import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Home"
        description="Shop all available models only at the Spirit & Flame. Worldwide Shipping. Secure Payment."
        image="/media/logo-square-xs.png"
      />
      <Hero />
      <FeaturedProducts />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
