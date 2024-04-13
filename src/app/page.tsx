import Card from "@/components/card"
import Navbar from "@/components/navbar"
import Cards from "@/components/cards"
import Footers from "@/components/footers"
export default function Home (){
  return(
<>  
<Navbar/>
<Card/>
<div className="grid px-8 mt-4 bg-slate-500 grid-cols-2 gap-4">
<Cards/><Cards/><Cards/>
<Cards/><Cards/><Cards/>
</div>
<Footers/>

</>
  )
}