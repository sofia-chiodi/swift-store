import Link from 'next/link'
import { Button } from '../ui/button'
import HeroCarrousel from './HeroCarrousel'

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center'>
      <div className='text-center lg:text-left'>
        <h1 className='mx-auto lg:mx-0 max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl'>
          A Swift shopping experience
        </h1>
        <p className='mx-auto lg:mx-0 mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
          We offer a wide range of stylish aesthetic furniture to make your
          house feel like home.
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link href='/products'>Explore our products</Link>
        </Button>
      </div>
      <HeroCarrousel />
    </section>
  )
}

export default Hero
