
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllSpots } from '../../Spot';
import * as bookingActions from '../../../store/booking';
import * as relationshipActions from '../../../store/relationship';
import './MyHome.css';
import { nanoid } from 'nanoid';

export default function MyHome() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => state.spots.allSpots)
  const [bookings, setBookings] = useState([]);
  const [myOwnBookings, setMyOwnBookings] = useState([]);
  const [bookingsForMyProps, setBookingsForMyProps] = useState([]);
  const [relationships, setRelationships] = useState({
    myRequests: [],
    theirRequests: [],
    myFriends: [],
    myFollowers: [],
    myFollowings: []
  });

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

  useEffect(() => {
    dispatch(relationshipActions.getAllRelationships(sessionUser.id))
      .then(res => setRelationships({
        myRequests: res.data.myRequests,
        theirRequests: res.data.theirRequests,
        myFriends: res.data.myFriends,
        myFollowers: res.data.myFollowers,
        myFollowings: res.data.myFollowings,
      }))
      .catch(e => { });
  }, [dispatch]);

  const acceptBooking = (e) => {
    e.preventDefault();
    const bookingId = Number(e.target.id.split('-')[0]);
    const booking = bookingsForMyProps.find(bk => bk.id === bookingId);
    booking.status = 1;
    booking.myUserId = sessionUser.id;
    console.log('booking', booking);
    return dispatch(bookingActions.modifyOneBooking(booking))
      .then(res => {
        //TODO implete this
      })
      .catch(res => {
        //TODO implete this
      });
  }
  const refuseBooking = (e) => {
    e.preventDefault();
    const bookingId = Number(e.target.id.split('-')[0]);
    const booking = bookingsForMyProps.find(bk => bk.id === bookingId);
    booking.status = 2;
    booking.myUserId = sessionUser.id;

    return dispatch(bookingActions.modifyOneBooking(booking))
      .then(res => {
        //TODO implete this
      })
      .catch(res => {
        //TODO implete this
      });
    // return dispatch(bookingActions.deleteOneBooking(bookingId))
    //   .then(res => {
    //     //TODO implete this
    //   })
    //   .catch(res => {
    //     //TODO implete this
    //   });
  }
  const cancelBooking = (e) => {
    e.preventDefault();
    const bookingId = Number(e.target.id.split('-')[0]);
    return dispatch(bookingActions.deleteOneBooking(bookingId))
      .then(res => {
        //TODO implete this
      })
      .catch(res => {
        //TODO implete this
      });
  }

  const actOnRequest = (e, actionText) => {
    e.preventDefault();
    let action;
    switch(actionText.toLowerCase()){
      case "cancel":
        
        break;
    }
  };

  function bookingTextStatus(status) {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Confirmed';
      case 2:
        return 'Refused';
      case 3:
        return 'Trip completed';
      case 4:
        return 'Deleted';
      default:
        return 'Unknown status';
    }
  }

  return (
    <div className="myhome-main-div">
      <AllSpots searchTerm={""} onlyMine={true}
        mainGridClass='spots-myhome-display-grid'
        spotMapClass='myspots-div'
      />
      <div className="myhome-side-info">
        <div className="myhome-booking-div">
          <p>Bookings of My Properties</p>
          <ul>
            {
              bookingsForMyProps && bookingsForMyProps.map(bk =>
                <li key={nanoid()}>
                  <p>Booking ID: {bk.id}</p>
                  <p>SpotID: {spots.find(spot => spot.id === bk.spotId) && spots.find(spot => spot.id === bk.spotId).name}</p>
                  <p>From: {bk.User && (bk.User.username)}</p>
                  <p>Start Date: {bk.startDate.slice(0, 10)}</p>
                  <p>End Date: {bk.endDate.slice(0, 10)}</p>
                  <p>Status: {bookingTextStatus(bk.status)}</p>
                  <p>Special Request: {bk.specialRequest}</p>
                  <button className="button button-Send"
                    onClick={acceptBooking}
                    id={`${bk.id}-accept`}
                  >Accept</button>
                  <button className="button button-Reset"
                    onClick={refuseBooking}
                    id={`${bk.id}-refuse`}
                  >Refuse</button>
                </li>)
            }
          </ul>
          <p>My Upcoming Trips</p>
          <ul>
            {
              myOwnBookings && myOwnBookings.map(bk =>
                <li key={nanoid()}>
                  <p>Booking ID: {bk.id}</p>
                  <p>SpotID: {spots.find(spot => spot.id === bk.spotId) && spots.find(spot => spot.id === bk.spotId).name}</p>
                  <p>Start Date: {bk.startDate.slice(0, 10)}</p>
                  <p>End Date: {bk.endDate.slice(0, 10)}</p>
                  <p>Status: {bookingTextStatus(bk.status)}</p>
                  <button className="button button-Reset"
                    onClick={cancelBooking}
                    id={`${bk.id}-cancel`}
                  >Cancel</button>
                </li>)
            }
          </ul>
        </div>
        <div className='myhome-people-div'>
          <h3>People</h3>
          <div>
            <p>Pending friend request list</p>
            <ul>
              <li>
                <p>I requested</p>
                <ul>
                  {relationships.myRequests.map(rel =>
                    <li key={nanoid()}>
                      <p>
                        <span className='tooltip'>
                          {rel.user1.id !== sessionUser.id ? rel.user1.username : rel.user2.username}
                          <p className='tooltiptext'>To Implement Mini UserProfile</p>
                        </span>
                        <span>
                          <button>
                            Cancel
                          </button>
                        </span>
                      </p>
                    </li>
                  )
                  }
                </ul>
              </li>
              <li>
                <p>People requested me</p>
                <ul>
                  {relationships.theirRequests.map(rel =>
                    <li key={nanoid()}>
                      <p>
                        <span className='tooltip'>
                          {rel.user1.id !== sessionUser.id ? rel.user1.username : rel.user2.username}
                          <p className='tooltiptext'>To Implement Mini UserProfile</p>
                        </span>
                        <span>
                          <button >
                            Accept
                          </button>
                          <button >
                            Refuse
                          </button>
                          <button >
                            Block
                          </button>
                        </span>
                      </p>
                    </li>
                  )
                  }
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <p>My friend list</p>
            <ul>
              {
                relationships.myFriends.map(rel =>
                  <li key={nanoid()}>
                    <p>
                      <span className='tooltip'>
                        {rel.user1.id !== sessionUser.id ? rel.user1.username : rel.user2.username}
                        <p className='tooltiptext'>To Implement Mini UserProfile</p>
                      </span>
                    </p>
                  </li>)
              }
            </ul>
          </div>
          <div>
            <p>My follower list</p>
            <ul>
              {
                relationships.myFollowers.map(rel =>
                  <li key={nanoid()}>
                    <p>
                      <span className='tooltip'>
                        {rel.user1.id !== sessionUser.id ? rel.user1.username : rel.user2.username}
                        <p className='tooltiptext'>To Implement Mini UserProfile</p>
                      </span>
                    </p>
                  </li>)
              }
            </ul>
          </div>
          <div>
            <p>My following list</p>
            <ul>
              {
                relationships.myFollowings.map(rel =>
                  <li key={nanoid()}>
                    <p>
                      <span>{rel.user1.id !== sessionUser.id ? rel.user1.username : rel.user2.username}</span>
                    </p>
                  </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}