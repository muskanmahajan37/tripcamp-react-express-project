
import HomepagePicPanel from '../HomepagePicPanel';

export default function GlamCamp() {
  return (
    <div className="glam-camp-main-div">
      <HomepagePicPanel
        img='Beach+camping+w+dog.jpg'
        text="Camping"
        backgroundColor='#B9A897'
      />
      <HomepagePicPanel
        img='Beach+glamping.jpg'
        text="Glamping"
        backgroundColor='#15BAC6'
      />
    </div>
  );
}