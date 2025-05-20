function AnimatedSVG() {
    return (
        <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center',   // center horizontally on page
        alignItems: 'center',       // center vertically on page (if parent has height)
        height: '100vh',            // fill viewport height to center vertically
        width: '100%' 
      }}
    >
      <div
        style={{
          width: '855px',
          height: '270px',          // crop height here
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center', // center iframe horizontally in crop box
          alignItems: 'center',     // center iframe vertically in crop box,
        }}
      >
        <iframe
          src="/animation.svg"
          style={{
            width: '855px',
            height: '600px',         // iframe bigger than crop box to crop bottom
            border: 'none',
            transform: 'translateY(105px)',  // move iframe up inside crop box
          }}
          title="Animated SVG"
        />
      </div>
    </div>
    );
  }

export default AnimatedSVG;