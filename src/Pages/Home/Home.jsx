import Banner from "./Banner";
import MostSoldEdToys from "./MostSoldedToys";
import OurBenefits from "./OurBenefits";
import OurBrands from "./OurBrands";
import OurToys from "./OurToys";
import SubBanner from "./SubBanner";
import TestimonalSwiper from "./TestiMonalSwiper";

const Home = () => {
    return (
        <div>
            <div className="mt-4 ">
                <Banner></Banner>
            </div>

            <div className="lg:mt-5 mt-0 ">
               <OurBrands></OurBrands>
            </div>

            <div className="lg:mt-5 mt-0 ">
               <OurToys></OurToys>
            </div>

            <div className="mt-20 ">
               <SubBanner></SubBanner>
            </div>
            <div className="lg:mt-5 mt-0 ">
               <OurBenefits></OurBenefits>
            </div>
            <div className="lg:mt-5 mt-0 ">
               <MostSoldEdToys></MostSoldEdToys>
            </div>

            <div className="lg:mt-5 mt-0 ">
              <TestimonalSwiper></TestimonalSwiper>
            </div>

        </div>
    );
};

export default Home;