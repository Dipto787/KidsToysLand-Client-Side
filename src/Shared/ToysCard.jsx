import notFound from '../assets/cards/card-4.webp'
const ToysCard = ({ toy }) => {  
    return (
        <div className=''>
       
            <div className="flex flex-col h-full border rounded-lg shadow-md">
                <figure>
                    <img
                        className="mx-auto"
                        src={toy.img ? toy.img : notFound}
                        alt="Shoes" />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                    <h2 className="card-title">{toy.name}</h2>
                    <p>{toy.details}</p>
                    <div className=" ">
                        <div className="" >
                            <p className="flex text-lg gap-2"> Brand : <span className="text-red-500">{toy.brand}</span></p>

                            <p className="flex gap-2  text-lg"> sold : <span className="text-red-500">{toy.sold}</span></p>
                        </div>
                    </div>

                    <div className="card-actions  w-full justify-end">
                        <button className="btn w-full mt-6 btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToysCard;