import SectionTitle from "../../Shared/SectionTitle";

let brands = [
    {
        "img": "https://i.ibb.co/Y7fhj5Q2/card-5.webp"
    },
    {
        "img": "https://i.ibb.co/3YQ4372Z/card-6.webp"
    },
    {
        "img": "https://i.ibb.co/zVHXx4Gt/card-7.webp"
    },
    {
        "img": "https://i.ibb.co/TBSN17qM/card-8.webp"
    },
    {
        "img": "https://i.ibb.co/DHpvr4DG/card-9.webp"
    },
    {
        "img": "https://i.ibb.co/2BhZ1mX/card-1.webp"
    },
    {
        "img": "https://i.ibb.co/y3YZMVT/card-2.webp"
    },
    {
        "img": "https://i.ibb.co/XZcr7jtD/card-3.webp"
    },
    {
        "img": "https://i.ibb.co/N6FvB68d/card-4.webp"
    }
];

const OurBrands = () => {

    return (
        <div className=" lg:px-0">
          <SectionTitle title={'Our-Brands'} subtitle={'check our toys brands'}></SectionTitle>
            <div className="mt-4  grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {
                    brands.map(brand=> <img className="rounded-xl  w-4/5 mx-auto hover:scale-105 duration-100 cursor-pointer" src={brand.img}></img>)
                }
            </div>
        </div>
    );
};

export default OurBrands;