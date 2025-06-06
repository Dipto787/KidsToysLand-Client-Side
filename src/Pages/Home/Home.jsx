import Banner from "./Banner";
import OurBrands from "./OurBrands";

const Home = () => {
    return (
        <div>
            <div className="mt-10 ">
                <Banner></Banner>
            </div>

            <div className="mt-10 ">
               <OurBrands></OurBrands>
            </div>
        </div>
    );
};

export default Home;