
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllSpots } from '../../Spot';
import * as bookingActions from '../../../store/booking';
import './MyHome.css';

export default function MyHome() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [bookings, setBookings] = useState([]);
  const [myOwnBookings, setMyOwnBookings] = useState([]);
  const [bookingsForMyProps, setBookingsForMyProps] = useState([]);
  useEffect(() => {
    dispatch(bookingActions.getAllBookings())
      .then(res => setBookings(res.data.bookings))
      .catch(e => { });
  }, [dispatch]);

  useEffect(() => {
    if (bookings.length) {
      setMyOwnBookings(bookings.filter(bk => bk.userId === sessionUser.id));
      setBookingsForMyProps(bookings.filter(bk => bk.userId !== sessionUser.id));
    }
  }, [bookings.length])

  console.log(bookings, myOwnBookings, bookingsForMyProps);

  return (
    <div className="myhome-main-div">
      <AllSpots searchTerm={""} onlyMine={true}
        mainGridClass='spots-myhome-display-grid'
        spotMapClass='myspots-div'
      />
      <div className="myhome-side-info">
        <div className="myhome-booking-div">
          <p>Bookings for My Properties</p>
          <ul>
            {
              bookingsForMyProps && bookingsForMyProps.map(bk => <li>
                <p>Booking ID: {bk.id}</p>
                <p>SpotID {bk.spotId}</p>
                <p>Start Date {bk.startDate}</p>
                <p>End Date {bk.endDate}</p>
                <p>Status {bk.status ? "Confirmed" : "Pending"}</p>
              </li>)
            }
          </ul>
          <p>My Own Trip Bookings</p>
          <ul>
            {
              myOwnBookings && myOwnBookings.map(bk => <li>
                <p>Booking ID: {bk.id}</p>
                <p>SpotID {bk.spotId}</p>
                <p>Start Date {bk.startDate}</p>
                <p>End Date {bk.endDate}</p>
                <p>Status {bk.status ? "Confirmed" : "Pending"}</p>
              </li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
}