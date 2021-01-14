import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'

import { AllSpots } from '../Spot';
import Banner from './Banner';
import MainSearchBar from '../Search';
import GlamCamp from './GlamCamp';
import BeMoFa from './BeMoFa';
import HomeSlogan from './HomeSlogan';

import './Home.css';

export function Home() {
  const location = useLocation();
  const history = useHistory();
  let reduxCurrentSpot = useSelector(state => state.spots.currentSpot);
  if (location.pathname === "/allspots") reduxCurrentSpot = null;

  return (
    reduxCurrentSpot ? <></> : <div className="main-home-view">
      <MainSearchBar className={'search-over-banner-div search-spots-page'} />
      <AllSpots searchTerm={""} />
    </div>
  );
}


export function GlampHome() {
  const history = useHistory();
  return (
    <div className="main-home-view-glampcamp">
      <HomeSlogan />
      <div className='banner-and-search-div' onClick={e => history.push('/allspots')}>
        <MainSearchBar className='search-over-banner-div search-box-home-fixed' />
        <Banner />
      </div>
      {/* <div className="main-home-view-spots" > */}
      {/* <AllSpots searchTerm={""} /> */}
      <GlamCamp />
      <BeMoFa />
      {/* </div> */}
    </div>
  );
}