import 'bootstrap/dist/css/bootstrap.min.css';

import resume from './media/Resume.png';


function Resume() {

  return (
    <div className='tabs' 
      style={{ flexGrow: 1, display: 'flex',  justifyContent: 'center', alignItems: 'center', maxWidth: "800px",  margin: "0 auto"}}>
      <img className="resumePic" src={resume} alt={'my resume'} style={{ width: '100%', padding: '10px'}}/>
    </div>
  );
}

export default Resume;