
export default function HomepagePicPanel({
  divClass = "glam-camp-indidual-div",
  imgClass = 'glam-camp-img',
  text="",
  img = "",
  imgFolder = "https://tripcamp.s3.amazonaws.com/resources/images/official/spots/glamping/smalls/",
}) {
  return (
    <div className={divClass}>
      <img className={imgClass} src={imgFolder + img} alt={img} />
      <div className="glam-camp-text-div">
        <p className="glam-camp-text">{text}</p>
      </div>
    </div>
  );
}