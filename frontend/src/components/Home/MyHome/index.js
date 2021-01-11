
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { AllSpots } from '../../Spot';
import * as bookingActions from '../../../store/booking';
import * as relationshipActions from '../../../store/relationship';
import * as messageActions from '../../../store/message';
import * as profileActions from '../../../store/userProfile'
import UploadForm from '../../UploadForm';

import './MyHome.css';

export default function MyHome() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const relationships = useSelector(state => state.relationships);
  const bookings = useSelector(state => state.bookings);
  const spots = useSelector(state => state.spots.allSpots)
  const [myOwnBookings, setMyOwnBookings] = useState([]);
  const [bookingsForMyProps, setBookingsForMyProps] = useState([]);

  // useEffect(() => {
  //   dispatch(messageActions.getAllMessages())
  //     .then(res => setMessages(res.data.messages))
  //     .catch(e => { });
  // }, [dispatch]);

  useEffect(() => {
    if (!relationships.all) {
      dispatch(relationshipActions.getAllRelationships(sessionUser.id))
        .then(res => { })
        .catch(e => { });
    }
    if (!bookings.length) {
      dispatch(bookingActions.getAllBookings())
        .then(res => { })
        .catch(e => { });
    }
  }, [dispatch]);

  useEffect(() => {
    if (bookings.length) {
      setMyOwnBookings(bookings.filter(bk => bk.userId === sessionUser.id));
      setBookingsForMyProps(bookings.filter(bk => bk.userId !== sessionUser.id));
    }
  }, [bookings])

  const acceptBooking = (e) => {
    e.preventDefault();
    const bookingId = Number(e.target.id.split('-')[0]);
    const booking = bookingsForMyProps.find(bk => bk.id === bookingId);
    booking.status = 1;
    booking.myUserId = sessionUser.id;
    console.log('booking', booking);
    return dispatch(bookingActions.modifyOneBooking(booking))
      .then(res => {
        // setBookingsForMyProps(bookings.filter(bk => bk.userId !== sessionUser.id));
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
        // setBookingsForMyProps(bookings.filter(bk => bk.userId !== sessionUser.id));
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
        // setMyOwnBookings(bookings.filter(bk => bk.userId === sessionUser.id));
      })
      .catch(res => {
        //TODO implete this
      });
  }

  function actOnRequest(e, actionText) {
    e.preventDefault();
    let action;
    let id = Number(e.target.id.split('-')[0]);
    let relationshipId;
    switch (actionText.toLowerCase()) {
      case "accept":
        action = 1;
        relationshipId = relationships.theirRequests[id].id;
        break;
      case "ignore":
        relationshipId = relationships.theirRequests[id].id;
        action = 2;
        break;
      case "block":
        relationshipId = relationships.theirRequests[id].id;
        action = 3;
        break;
      case "cancel":
        relationshipId = relationships.myRequests[id].id;
        action = 4;
        break;
    }
    const relationship = {
      id: relationshipId,
      myUserId: sessionUser.id,
      status: action,
      lastActionUserId: sessionUser.id
    }
    dispatch(relationshipActions.modifyOneRelationship(relationship))
      .then(res => {
        dispatch(relationshipActions.getAllRelationships(sessionUser.id))
          .then(res => { })
          .catch(e => { });
      })
      .catch(err => {

      });
  }

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

  function FriendNameAndMessage({ name, friendId }) {
    const [showChat, setShowChat] = useState(false);
    const [messageBody, setMessageBody] = useState("");
    // const [thisFriendMessages, setThisFriendMessages] = useState(messages.filter(m => m.senderId === sessionUser.id || m.recipientId === sessionUser.id));
    const [thisFriendMessages, setThisFriendMessages] = useState([]);
    const chatboxRef = useRef(null);

    useEffect(() => {
      dispatch(messageActions.getAllMessages(friendId))
        .then(res => setThisFriendMessages(res.data.messages))
        .catch(e => { });
    }, [dispatch]);

    useEffect(() => {
      if (chatboxRef.current) chatboxRef.current.scrollIntoView(false, { behavior: "smooth" });
    }, [thisFriendMessages, showChat]);

    // const [unreadMessages, setUnreadMessages] = useState([]);

    // useEffect(async () => {
    //   if(showChat) {
    //     setUnreadMessages(messages.filter(m => m.status === 0));
    //     for(let i = 0; i < unreadMessages.length; i++){
    //       const m = unreadMessages[i];
    //       useDispatch(messageActions.readOneMessage(m.id))
    //         .then(res => {})
    //         .catch(e => {});
    //     }
    //   }
    // }, [showChat]);

    function handleFriendClick(e) {
      e.preventDefault();
      setShowChat(!showChat);
    }

    function handleSubmit(e) {
      e.preventDefault();
      dispatch(messageActions.createOneMessage({
        senderId: sessionUser.id,
        recipientId: friendId,
        body: messageBody
      }))
        .then(res => {
          setMessageBody("");
          setShowChat(true);
          setThisFriendMessages([...thisFriendMessages, res.data.message]);
        })
        .catch(e => {

        })
    }
    return (
      <div>
        <span className='tooltip' id={`${friendId}-friend`}
          onClick={handleFriendClick}
        >
          {name}
        </span>
        {
          showChat && <div>
            <div className='chat-box' >
              {
                thisFriendMessages.map(m => <div key={nanoid()}>
                  {m.senderId === sessionUser.id ?
                    (m.recipientId === friendId ?
                      <p className="my-message">{m.body}<b>{' Me'}</b></p> : <></>)
                    :
                    (m.senderId === friendId ?
                      <p><b>{name}:</b> {m.body}</p> :
                      <></>)
                  }
                </div>)
              }
              <div ref={chatboxRef} />
            </div>
            <form type='submit' onSubmit={handleSubmit}>
              <input type='text' value={messageBody} onChange={e => setMessageBody(e.target.value)}></input>
              <button>Send</button>
            </form>
          </div>
        }
      </div>
    );
  }

  function MyProfile() {
    const dispatch = useDispatch();
    const media = useSelector(state => state.media);

    const [showEditProfile, setShowEditProfile] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [myUserProfile, setMyUserProfile] = useState(sessionUser.userProfile);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
      if (!myUserProfile) {
        dispatch(profileActions.getUserProfile(sessionUser.id))
          .then(res => {
            setMyUserProfile(res.data.userProfile);
          })
          .catch(err => {

          });
      }
    }, [showEditProfile, sessionUser]);

    useEffect(() => {
      if (myUserProfile) {
        setFirstName(myUserProfile.firstName);
        setLastName(myUserProfile.lastName);
        setStreetAddress(myUserProfile.streetAddress);
        setCity(myUserProfile.city);
        setStateProvince(myUserProfile.stateProvince);
        setZipCode(myUserProfile.zipCode);
        setCountry(myUserProfile.country);
      }
    }, [myUserProfile]);

    const handleSubmit = e => {
      e.preventDefault();
      setErrors([]);

      console.log("handleSubmit media", media, " id", media[media.length - 1] && media[media.length - 1].id);
      return dispatch(profileActions.updateUserProfile({
        userProfile: {
          userId: sessionUser.id,
          firstName,
          lastName,
          mediaUrlIds: media[media.length - 1] && [media[media.length - 1].id],
          streetAddress,
          city,
          stateProvince,
          zipCode,
          country,
        }
      }))
        .then(res => {
          setMyUserProfile(res.data.userProfile);
          setShowEditProfile(false);
        })
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    };

    const handleCancelClick = e => {
      e.preventDefault();
      setShowEditProfile(false);
    }
    const EditMyProfile =
      <form
        onSubmit={handleSubmit}
      >
        <ul className='error-messages'>
          {errors.map((error) => <li key={nanoid()}>{error}</li>)}
        </ul>
        <div className="inputs-div">
          <div className="input-div">
            <label>First Name</label>
            <input
              className="input"
              type='text'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              autoFocus={true}
            />
          </div>
          <div className="input-div">
            <label>Last Name</label>
            <input
              className="input"
              type='text'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-div">
            <label>Street</label>
            <input
              className="input"
              type='text'
              value={streetAddress}
              onChange={e => setStreetAddress(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>City</label>
            <input
              className="input"
              type='text'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>State/Prov</label>
            <input
              className="input"
              type='text'
              value={stateProvince}
              onChange={e => setStateProvince(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>Zip Code</label>
            <input
              className="input"
              type='text'
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label>Country</label>
            <input
              className="input"
              type='text'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div className="input-div">
            <button
              className='button button-small button-Send'
              onClick={e => { e.preventDefault(); setShowUploadForm(!showUploadForm) }}
            >Upload Pic/Vid</button>
          </div>
          <div className="buttons-div">
            <button
              className='button'
              type='submit'
            >Save</button>
            <button
              className='button button-Reset'
              onClick={handleCancelClick}
            > Cancel </button>
          </div>
        </div>
      </form>

    const NameAddressPicture = () =>
      <div className="inputs-div">
        <div>
          <img
            src={myUserProfile.urls ? myUserProfile.urls[0] : null}
            alt="User Profile Img"
            className='userprofile-pic'
          />
        </div>
        <div className="input-div">
          <label><b>{`${myUserProfile.firstName} ${myUserProfile.lastName}`}</b></label>
        </div>
        <div className="input-div">
          <label>{sessionUser.email}</label>
        </div>
        <div className="input-div">
          <label>{`${myUserProfile.streetAddress}`}</label>
        </div>
        <div className="input-div">
          <label>{`${myUserProfile.city} ${myUserProfile.stateProvince},`}</label>
        </div>
        <div className="input-div">
          <label>{`${myUserProfile.zipCode ? myUserProfile.zipCode : ""}, ${myUserProfile.country}`}</label>
        </div>
      </div>

    return (
      <div className='myhome-profile-div'>
        <h3>My Profile</h3>
        {
          myUserProfile && <NameAddressPicture />
        }
        <button onClick={e => { e.preventDefault(); setShowEditProfile(!showEditProfile) }}>
          Edit Profile</button>
        {
          showEditProfile && EditMyProfile
        }
        {
          showUploadForm && <UploadForm
            link={
              window.location.origin.includes('localhost') ?
                `local/users/id${sessionUser.id}/profile` :
                `users/id${sessionUser.id}/profile`
            }
            divClass="side-modal"
            redirectHome={false}
            displayed="block"
          />
        }
      </div>
    );
  }

  const usernameOrName = user => {
    let name = "";
    console.log('\n\n\n\n user', user.userProfile);
    if (user.userProfile) {
      if (user.userProfile.firstName) {
        name = user.userProfile.firstName;
      }
      if (user.userProfile.lastName) {
        name += " " + user.userProfile.lastName;
      }
    } else {
      name = user.username;
    }
    return name;
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
            <p>My friends</p>
            <ul>
              {
                relationships.myFriends && relationships.myFriends.map((rel, i) =>
                  <li key={nanoid()}>
                    <FriendNameAndMessage
                      name={rel.user1.id !== sessionUser.id ? usernameOrName(rel.user1) : usernameOrName(rel.user2)}
                      friendId={rel.user1.id !== sessionUser.id ? rel.user1.id : rel.user2.id} />
                  </li>)
              }
            </ul>
          </div>
          <div>
            <p>Pending friend requests</p>
            <ul>
              <li>
                <p>I requested</p>
                <ul>
                  {
                    relationships.myRequests && relationships.myRequests.map((rel, i) =>
                      <li key={nanoid()}>
                        <div>
                          <span className='tooltip'>
                            {rel.user1.id !== sessionUser.id ? usernameOrName(rel.user1) : usernameOrName(rel.user2)}
                            <p className='tooltiptext'>To Implement Mini UserProfile</p>
                          </span>
                          <span>
                            <button onClick={e => actOnRequest(e, 'cancel')} id={`${i}-cancel`}>
                              Cancel
                          </button>
                          </span>
                        </div>
                      </li>
                    )
                  }
                </ul>
              </li>
              <li>
                <p>People requested me</p>
                <ul>
                  {
                    relationships.theirRequests && relationships.theirRequests.map((rel, i) =>
                      <li key={nanoid()}>
                        <div>
                          <span className='tooltip'>
                            {rel.user1.id !== sessionUser.id ? usernameOrName(rel.user1) : usernameOrName(rel.user2)}
                            <p className='tooltiptext'>To Implement Mini UserProfile</p>
                          </span>
                          <span>
                            <button onClick={e => actOnRequest(e, 'accept')} id={`${i}-accept`}>
                              Accept
                          </button>
                            <button onClick={e => actOnRequest(e, 'ignore')} id={`${i}-ignore`}>
                              Ignore
                          </button>
                            <button onClick={e => actOnRequest(e, 'block')} id={`${i}-block`}>
                              Block
                          </button>
                          </span>
                        </div>
                      </li>
                    )
                  }
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <p>My follower list</p>
            <ul>
              {
                relationships.myFollowers && relationships.myFollowers.map(rel =>
                  <li key={nanoid()}>
                    <div>
                      <span className='tooltip'>
                        {rel.user1.id !== sessionUser.id ? usernameOrName(rel.user1) : usernameOrName(rel.user2)}
                        <p className='tooltiptext'>To Implement Mini UserProfile</p>
                      </span>
                    </div>
                  </li>)
              }
            </ul>
          </div>
          <div>
            <p>My following list</p>
            <ul>
              {
                relationships.myFollowings && relationships.myFollowings.map(rel =>
                  <li key={nanoid()}>
                    <div>
                      <span>{rel.user1.id !== sessionUser.id ? usernameOrName(rel.user1) : usernameOrName(rel.user2)}</span>
                    </div>
                  </li>)
              }
            </ul>
          </div>
        </div>
        <MyProfile />
      </div>
    </div>
  );
}