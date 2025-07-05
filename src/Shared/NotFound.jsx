import { Link } from 'react-router-dom';
import notFound from '../assets/not found/404 page.png'
const NotFound = () => {
    return (
        <div className='text-center'>
            <img className='mx-auto' src={notFound}></img>
            <Link to={'/'} className='btn text-center btn-secondary'>Back home</Link>
        </div>
    );
};

export default NotFound;