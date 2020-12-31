import { AllSpots } from '../Spot';
import Banner from './Banner';
import MainSearchBar from '../Search';

import './Home.css';

export default function Home() {
  return (
    <div className="main-home-view">
      <div className='banner-and-search-div'>
        <MainSearchBar />
        <Banner />
      </div>
      <div className="main-home-view-spots" >
        <AllSpots searchTerm={""} />
      </div>
    </div>
  );
}