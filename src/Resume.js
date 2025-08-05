import 'bootstrap/dist/css/bootstrap.min.css';
import myResume from './media/Resume.png';

function Resume() {
  return (
    <div>
      <img
        className="resumePic"
        src={myResume}
        alt={'my resume'}
        style={{
          width: '80%',
          padding: '50px'
        }}
      />
    </div>
  );
}

export default Resume;