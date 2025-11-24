import './Animation.css';

function AnimatedSVG() {
    return (
        <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center',   // center horizontally on page
        alignItems: 'center',       // center vertically on page (if parent has height)
        height: '500px',            // fill viewport height to center vertically
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center', // center iframe horizontally in crop box
          alignItems: 'flex-start',     // center iframe vertically in crop box,
        }}
        className="animated-crop"
      >
        <iframe
          src="/homeAnimation.svg"
          style={{
            width: '100%',
            minHeight: '1000px',         // iframe bigger than crop box to crop bottom
            border: 'none',
          }}
          className="animated-svg"
          title="Animated SVG"
        />
      </div>
    </div>
    );
  }

export default AnimatedSVG;

