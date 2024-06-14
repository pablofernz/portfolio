import { useState, useEffect } from 'react';

function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    // Limpieza del event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useViewportWidth;