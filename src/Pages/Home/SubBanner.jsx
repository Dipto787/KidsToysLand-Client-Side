import baby1 from '../../assets/baby/baby-1.png'
import baby2 from '../../assets/baby/baby-2.png'
const SubBanner = () => {
    return (
        <div className='mb-16 px-2 lg:px-0'>
            <div className='flex justify-between items-center py-10 rounded-xl bg-[#bce6fc] lg:p-20 '>
                <div><img src={baby1} alt="" /></div>
                <div className='text-center space-y-10'>
                    <h1 className='lg:text-3xl text-2xl font-bold'>All
                        🔥 Damaged Box Deals – 50% OFF!
                    </h1>
                    <p>Get brand new toys with 50% OFF—only the packaging is slightly damaged!
                    </p>
                    <button className="btn px-12 bg-[#ff0000]  text-white rounded-full font-semibold">Shop Now</button>
                </div>
                <div><img src={baby2} alt="" /></div>
            </div>
        </div>
    );
};

export default SubBanner; 