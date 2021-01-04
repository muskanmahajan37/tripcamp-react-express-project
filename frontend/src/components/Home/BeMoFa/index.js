
import HomepagePicPanel from '../HomepagePicPanel';

export default function BeMoFa() {
  const textDivClass = 'bemofa-text-div';
  const textClass = 'bemofa-text';
  return (
    <div className="bemofa-main-div">
      <HomepagePicPanel
        text="Beach & Lake"
        divClass='bemofa-indidual-div'
        textDivClass={textDivClass}
        textClass={textClass}
        // backgroundColor='#0F9396'
        // backgroundColor='#D8EBF2'
        backgroundColor='#1FA2BF'
        imgClass="bemofa-img"
        // img='Maldive3.jpeg' 
        img='Pangkor Laut Resort, Malaysia.jpeg' 
        onclick="BeachLake"
        />
      <HomepagePicPanel 
        text="Mountain & Valley" 
        divClass='bemofa-indidual-div' 
        textDivClass={textDivClass}
        textClass={textClass}
        // backgroundColor='#F26849EE'
        // backgroundColor='#BBCEDE'
        backgroundColor='#D93814'
        imgClass="bemofa-img" 
        img='Monument Valley, UT.jpg' 
        onclick='MountainValley'
        />
      <HomepagePicPanel
        text="Farm & Vineyard"
        divClass='bemofa-indidual-div'
        textDivClass={textDivClass}
        textClass={textClass}
        // backgroundColor='#222B14'
        backgroundColor='#282613'
        imgClass="bemofa-img" 
        img='Vineyard Ukraine.jpg' 
        onclick='FarmVineyard'
        />
      {/* <HomepagePicPanel img='ocean coast beach camping in Alentejo, Portugal.jpg'/> */}
    </div>
  );
}