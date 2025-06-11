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
        <div className="px-5 lg:px-0">
            <h1 className="lg:text-6xl text-4xl text-center  lg:my-20 font-semibold border-b-4 p-10 border-orange-600">Our Brands</h1>
            <div className="mt-10  grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {
                    brands.map(brand=> <img className="rounded-xl hover:scale-105 duration-100 cursor-pointer" src={brand.img}></img>)
                }
            </div>
        </div>
    );
};

export default OurBrands;