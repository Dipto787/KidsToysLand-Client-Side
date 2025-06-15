import banner from '../../assets/Banner/about banner.jpg'
const AboutHome = () => {
    return (
        <div>
            <div className='py-10    ' style={{
                backgroundImage:
                    `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%'

            }}>
                
                    <h1 className='text-6xl font-semibold text-white text-center'> About Us </h1>
                 
            </div>
        </div>
    );
};

export default AboutHome;