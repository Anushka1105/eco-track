import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-0.5">
      <div className="relative h-10 w-10">
        <Image 
          src="/logo.png" 
          alt="EcoTrack Logo" 
          fill
          className="object-cover" 
          priority
        />
      </div>
    </Link>
  )
}

