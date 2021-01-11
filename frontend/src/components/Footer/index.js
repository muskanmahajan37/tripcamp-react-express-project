
export default function Footer(props) {
  return (
    <div className="main-footer">
      {/* <hr /> */}
      <div className='to-center-footer'>
        <div className="footerdiv">
          <span>
            <a href='https://appacademy.io' target='_blank' style={{ textDecoration: 'none' }}>
              <img src='https://media-exp1.licdn.com/dms/image/C4D0BAQGKL_RPA6YaQA/company-logo_200_200/0/1519867546077?e=1617840000&v=beta&t=Y5Pix25CKSO7_Gq50AXzpvMxw3MUN8Svy41ZACHrEyc'
                alt='app academy icon'
                style={{ width: '30px' }}
              /> Student Project
            </a>
          </span>
          <span><a href='https://github.com/suasllc' target='_blank' style={{ textDecoration: 'none' }}> Github profile</a></span>
          <span><a target="_blank" href='https://github.com/suasllc/tripcamp-react-express-project' style={{ textDecoration: 'none' }}>Github Repo</a></span>
          <span><a target="_blank" href='https://www.linkedin.com/in/tony-ngo-suas/' style={{ textDecoration: 'none' }}>LinkedIn</a></span>
          <span><a target="_blank" href='https://www.youtube.com/sUAScom' style={{ textDecoration: 'none' }}>YouTube</a></span>
        </div>
      </div>
    </div>
  );
}