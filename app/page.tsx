import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/nav-bar"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="h-screen relative w-screen overflow-hidden">
      <NavBar />
      {/* <Image src="/images/hero.jpg" alt="Hero" width={1000} height={1000} /> */}
      <svg className="absolute top-[-5%] right-[-5%] -z-10 w-[1000px] h-[500px]" width="777" height="405" viewBox="0 0 777 405" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M325 148C209 128.5 31.5 181 0.999939 -12L777 0V404C777 404 727 274 669 240C611 206 475 306 441 240C407 174 441 167.5 325 148Z" fill="#3CCB4D" stroke="#3CCB4D" />
      </svg>
      <svg className="absolute bottom-[-10%] left-[-5%] -z-10 w-[1000px] h-[500px]" width="1118" height="408" viewBox="0 0 1118 408" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M413 309.143C283 261.234 367 -136.947 -21 51.1435V417.143L1117 433.143C1117 433.143 1015 239.053 887 177.143C771 95.2336 543 357.053 413 309.143Z" fill="#3CCB4D" stroke="#3CCB4D" />
      </svg>
      <img src="/FLOWER.png" alt="" className="absolute bottom-0 left-0 w-[570px] object-cover h-[330px] pr-[300px]" />
      <img src="/FLOWER2.png" alt="" className="absolute bottom-0 left-12 w-[570px] object-cover h-[330px] pr-[300px]" />
      <img src="/TREE.png" alt="" className='absolute bottom-0 right-10 w-[230px] 
            object-cover h-[400px] pr-[5px]'/>
      <img src="/TREE2.png" alt="" className='absolute bottom-0 right-0 w-[250px] 
            object-cover h-[400px] pr-[2px]'/>
            <img src="/LEAF.png" alt="" className='absolute bottom-[-15px] right-80 w-[300px] object-contain h-[100px] pr-[90px]' />
            <img src="/LEAF4.png" alt="" className='absolute bottom-[-10px] right-80 w-[300px] object-contain h-[100px] pr-[180px]' />
            <img src="/LEAF4.png" alt="" className='absolute bottom-[-10px] right-80 w-[350px] object-contain h-[150px] pr-[250px]' />
            <img src="/LEAF4.png" alt="" className='absolute bottom-[-10px] right-80 w-[450px] object-contain h-[200px] left-[100px]' />
            <img src="/LEAF4.png" alt="" className='absolute bottom-[-10px] right-80 w-[200px] object-contain h-[100px] left-[180px]' />








      <main className="container py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-6xl font-bold leading-tight">Track Your Footprint, Tread Lightly!</h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Track your daily activities, measure your carbon footprint, and discover practical ways to reduce your
            impact on the environment—because every small action leads to a greener future!
          </p>

          <Link href="/register">
            <Button size="lg" className="rounded-full border-2 bg-green-800 text-white transition-all duration-300 px-8 py-6 text-lg hover:bg-green-600 ">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
} 