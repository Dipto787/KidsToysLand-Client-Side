import Banner from "./Banner";
import MostSoldEdToys from "./MostSoldedToys";
import OurBenefits from "./OurBenefits";
import OurBrands from "./OurBrands";
import OurToys from "./OurToys";
import SubBanner from "./SubBanner";

const Home = () => {
    return (
        <div>
            <div className="mt-10 ">
                <Banner></Banner>
            </div>

            <div className="mt-10 ">
               <OurBrands></OurBrands>
            </div>

            <div className="mt-10 ">
               <OurToys></OurToys>
            </div>

            <div className="mt-32 ">
               <SubBanner></SubBanner>
            </div>
            <div className="mt-10 ">
               <OurBenefits></OurBenefits>
            </div>
            <div className="mt-10 ">
               <MostSoldEdToys></MostSoldEdToys>
            </div>

        </div>
    );
};

export default Home;