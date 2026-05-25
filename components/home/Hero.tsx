import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarrousel from "./HeroCarrousel";

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl'>
          A Swift shopping experience
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, earum
          expedita! Eum sit odit voluptatibus eos doloremque magni recusandae
          ipsa, repellat quam fuga, tempore quod rem atque sint, cupiditate nam?
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link href='/products'>Our products</Link>
        </Button>
      </div>
      <HeroCarrousel />
    </section>
  );
}

export default Hero;
