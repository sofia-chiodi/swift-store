import hero1 from '@/public/images/hero-1.jpg'
import hero2 from '@/public/images/hero-2.jpeg'
import hero3 from '@/public/images/hero-3.jpg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'

const carouselImages = [hero1, hero2, hero3]

function HeroCarrousel() {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className='p-2'>
                    <Image
                      src={image}
                      alt='Hero'
                      className='w-full aspect-[4/3] rounded-md object-cover'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselNext className='right-3' />
        <CarouselPrevious className='left-3' />
      </Carousel>
    </div>
  )
}

export default HeroCarrousel
