
import { useEffect } from 'react';

export default function Banner() {

  let myIndex = 0;

  function carousel() {
    let i;
    let x = document.getElementsByClassName("slides");
    if (!x.length) return;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 10000); // Change image every 2 seconds
  }

  useEffect(() => {
    carousel();
  })

  return (
    <div className='home-banner-div'>
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home1.jpg" /> */}
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home2.jpg" /> */}
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home5.jpg" /> */}
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home4.jpg" /> */}
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home6.jpg" /> */}
      {/* <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/spots/glamping/smalls/Smoky+Mountain%2C+TN+crop.jpg" /> */}
      {/* <img className="slides" src="https://image.shutterstock.com/z/stock-photo-panoramic-view-of-a-camping-site-with-x-vehicles-on-top-of-a-hill-on-the-borderline-between-684904897.jpg" /> */}
      <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/spots/glamping/smalls/Valley Views Glamping, NZ.jpg" />
      <img className="slides" src="https://tripcamp.s3.amazonaws.com/resources/images/official/tripcamp-home7.jpg" />
    </div>
  );
}