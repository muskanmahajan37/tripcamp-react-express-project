
export default function Footer(props) {
  return (
    <div className="main-footer">
      {/* <hr /> */}
      <div className='to-center-footer'>
        <div className="footerdiv">
          <span>
            <img src='https://media-exp1.licdn.com/dms/image/C4D0BAQGKL_RPA6YaQA/company-logo_200_200/0/1519867546077?e=1617840000&v=beta&t=Y5Pix25CKSO7_Gq50AXzpvMxw3MUN8Svy41ZACHrEyc'
              alt='app academy icon'
              style={{width: '30px'}}
            /> Student Project</span>
          <span><a href='https://github.com/suasllc' target='_blank' style={{textDecoration: 'none'}}> Github profile</a></span>
          <span>Github Repo</span>
          <span>LinkedIn</span>
          <span>YouTube</span>
        </div>
      </div>
    </div>
  );
}