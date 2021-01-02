
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AllSpots } from '../../Spot';
import * as bookingActions from '../../../store/booking';
import './MyHome.css';

export default function MyHome() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    // getAllBookings
    dispatch(bookingActions.getAllBookings())
      .then(res => setBookings(res))
      .catch(e => {});
  }, [dispatch]);

  return (
    <div className="myhome-main-div">
      <AllSpots searchTerm={""} onlyMine={true}
        mainGridClass='spots-myhome-display-grid'
        spotMapClass='myspots-div'
      />
      <div className="myhome-side-info">
        <div className="myhome-booking-div">
          <p>Bookings for My Properties</p>
          <p>My Own Trip Bookings</p>
        </div>
      </div>
    </div>
  );
}