import AboutHome from "./AboutHome";
import GetInTouch from "./GetInTouch";
import OurMission from "./OurMisson";
import OurVision from "./OurVision";
import WhatWeOffer from "./WhatWeOffer";
import WhyChooseKidsToysLand from "./WhyChooseKidsToysLand";

const AboutUs = () => {
    return (
        <div>
            <AboutHome></AboutHome>

            <div className="text-center space-y-3 mt-14">
                <h1 className="lg:text-5xl text-3xl ">Welcome to KidsToysLand! 🌈
                </h1>
                <p>At KidsToysLand, we believe that childhood should be full of joy, discovery, and imagination. That's why we bring together a magical collection of toys that spark creativity, learning.
                </p>
                <p>

            Whether your little one is building castles, racing toy cars, playing with dolls, or solving puzzles — we have something perfect for every child, every age, and every moment of play.</p>
            </div>


            <div className="mt-20">
                <OurMission></OurMission>
            </div>

            <div className="mt-20">
                <WhyChooseKidsToysLand></WhyChooseKidsToysLand>
            </div>

            <div className="mt-20">
                <WhatWeOffer></WhatWeOffer>
            </div>
            
            <div className="mt-20">
                <OurVision></OurVision>
            </div>

            <div className="mt-20">
              <GetInTouch></GetInTouch>
            </div>

        </div>
    );
};

export default AboutUs;