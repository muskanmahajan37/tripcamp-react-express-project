
export default function HomepagePicPanel({
  divClass = "glam-camp-indidual-div",
  imgClass = 'glam-camp-img',
  textDivClass = "glam-camp-text-div",
  textClass = "glam-camp-text",
  text="",
  img = "",
  imgFolder = "https://tripcamp.s3.amazonaws.com/resources/images/official/spots/glamping/smalls/",
  backgroundColor = "rgba(200, 200, 200, 0.5)"
}) {
  console.log('backgroundColor', backgroundColor);
  return (
    <div className={divClass}>
      <img className={imgClass} src={imgFolder + img} alt={img} />
      <div className={textDivClass} style={{backgroundColor: backgroundColor}}>
        <p className={textClass}>{text}</p>
      </div>
    </div>
  );
}