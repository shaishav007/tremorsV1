import { SpinnerRoundFilled } from 'spinners-react';
import './styles/HeroStatsLoader.css';

const HeroStatsLoader = () => {
    return(
        <div className='heroStatsLoader'>
            <div className="loadingWrapper">
                <h3 className='loadingH3'>Search to generate Hero Stats...</h3>
                <SpinnerRoundFilled size={90} thickness={180} speed={100} color="rgba(244, 21, 50, 1)" className='loadingSpinner'/>
            </div>
        </div>
    )
}

export default HeroStatsLoader;
