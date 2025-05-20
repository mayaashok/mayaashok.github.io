// import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import myResume from './myresume.png';

function Resume() {
  return (
    <div>
      <img
        className="resumePic"
        src={myResume}
        alt={'my resume'}
        style={{
          width: '800px',
          padding: '50px'
        }}
      />
    </div>
  );
}

export default Resume;