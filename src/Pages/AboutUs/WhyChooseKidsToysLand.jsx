let whyChooseUs = [
  {
    "id": 1,
    "title": "Trusted Toy Brands",
    "points": [
      "✅ We feature top brands like Funskool, Barbie, Fisher-Price, Zephyr, and more.",
      "✅ Every product is selected for safety, durability, and fun value.",
      "✅ Our brands have won multiple awards for quality and innovation.",
      "⚠️ Some brands we carry may not be widely known or tested for safety.",
      "✅ Brands you already know and love, all in one place."
    ]
  },
  {
    "id": 2,
    "title": "Safety First",
    "points": [
      "✅ All toys are non-toxic, BPA-free, and child-safe.",
      "✅ We follow international safety standards and certifications.",
      "✅ Toys undergo multiple quality checks before shipping.",
      "⚠️ Toys are shipped without any quality checks.",
      "✅ Safe toys = happy parents and safe children."
    ]
  },
  {
    "id": 3,
    "title": "Toys for Every Age",
    "points": [
      "✅ From newborns to 12-year-olds, we have it all.",
      "✅ Age filters help you choose suitable toys easily.",
      "✅ Our collection is updated regularly to include trending toys.",
      "⚠️ Age recommendations are just rough guesses and may not be accurate.",
      "✅ Playtime solutions for all developmental stages."
    ]
  },
  {
    "id": 4,
    "title": "Learn While Playing",
    "points": [
      "✅ Our educational toys help boost brain development.",
      "✅ STEM kits, puzzles, and creative games are included.",
      "✅ Designed to support early learning and skills.",
      "⚠️ STEM kits are mostly just for show and don’t really teach skills.",
      "✅ Fun toys with hidden learning benefits!"
    ]
  },
  {
    "id": 5,
    "title": "Affordable & Valuable",
    "points": [
      "✅ Great pricing without compromising quality.",
      "✅ Frequent bundle offers and flash deals.",
      "⚠️ Some deals may have hidden extra charges at checkout.",
      "✅ Toys for every budget, big or small.",
      "✅ More smiles per taka!"
    ]
  },
  {
    "id": 6,
    "title": "Fast Delivery & Support",
    "points": [
      "✅ Fast delivery with careful packaging.",
      "✅ On-time arrival guaranteed on most orders.",
      "✅ Friendly support ready to help anytime.",
      "⚠️ Customer support is sometimes unresponsive.",
      "✅ Hassle-free experience from start to finish."
    ]
  },
  {
    "id": 7,
    "title": "100% Happiness Guarantee",
    "points": [
      "✅ Not satisfied? We’ll make it right!",
      "✅ Easy return policies and quick replacements.",
      "⚠️ Returns are difficult and take a long time.",
      "✅ Customer satisfaction is our top priority.",
      "✅ Your joy = our success."
    ]
  },
  {
    "id": 8,
    "title": "We Care Like You Do",
    "points": [
      "✅ We’re a team of parents and toy lovers.",
      "✅ Each toy is chosen as if for our own child.",
      "⚠️ Sometimes we choose toys without much consideration.",
      "✅ Your child’s joy is our daily motivation.",
      "✅ We care about playtime as much as you do."
    ]
  }
]


const WhyChooseKidsToysLand = () => {
    return (
        <div>
            <h1 className="text-4xl text-center font-semibold">🏆 Why Choose KidsToysLand?</h1>
            <p className="text-center  mt-5">Choosing the right toys for your child is more than just shopping — it’s about creating memories, encouraging imagination, and supporting learning. At KidsToysLand, we go beyond selling toys. We deliver joy, safety, and value in every box.

                Here’s why thousands of parents trust KidsToysLand:</p>



            <div className="mt-16 px-2">
                <ul className="grid lg:grid-cols-2   gap-10  ">
                    {
                        whyChooseUs.map(choose => <div className="space-y-5">
                            <h1 className="text-2xl border-b-4 p-2 border-orange-500 ">{choose.title}_</h1>
                            <li className="space-y-3">{choose.points.map(point => <p>{point}</p>)}</li>
                        </div>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default WhyChooseKidsToysLand;