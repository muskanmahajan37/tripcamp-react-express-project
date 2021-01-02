
import HomepagePicPanel from '../HomepagePicPanel';

export default function GlamCamp() {
  return (
    <div className="glam-camp-main-div">
      <HomepagePicPanel img='Beach+glamping.jpg' text="Glamorous"/>
      <HomepagePicPanel img='https://tripcamp.s3.amazonaws.com/resources/images/official/spots/BullRun6.jpg'
        imgFolder="" text="Camping"/>
      {/* <HomepagePicPanel img='ocean coast beach camping in Alentejo, Portugal.jpg'/> */}
    </div>
  );
}