import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div>
      <br></br>
      <div style={{ width: '90%', margin: '0 auto', overflow: 'hidden' }}>
        <object 
          type="image/svg+xml" 
          data="/homeAnimation.svg" 
          style={{ 
            display: 'block',
            width: '100%',
            height: 'auto',
            marginBottom: '-10%',
            clipPath: 'inset(0px 0px 50px 0px)'
          }}
        ></object>       
      </div>    
    </div>
  );
}

export default Home;