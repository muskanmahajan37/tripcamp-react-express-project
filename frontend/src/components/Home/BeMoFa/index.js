
import HomepagePicPanel from '../HomepagePicPanel';

export default function BeMoFa() {
  return (
    <div className="bemofa-main-div">
      <HomepagePicPanel text="Beach/Lake" divClass='bemofa-indidual-div' imgClass="bemofa-img" img='Maldive3.jpeg'/>
      <HomepagePicPanel text="Mountain/Value" divClass='bemofa-indidual-div' imgClass="bemofa-img" img='Monument Valley, UT.jpg'/>
      <HomepagePicPanel text="Farm/Vineyard" divClass='bemofa-indidual-div' imgClass="bemofa-img" img='Vineyard Ukraine.jpg'/>
      {/* <HomepagePicPanel img='ocean coast beach camping in Alentejo, Portugal.jpg'/> */}
    </div>
  );
}