import React, { useEffect, useRef, useState } from 'react';
import useScript from 'react-script-hook'

function App() {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
// ATTENTION: ensure we only initialised _one_ media library!
const [rendered, setHasRendered] = useState(false)
const [loading, setLoading] = useState(true)

  useScript({
    src: 'https://media-library.cloudinary.com/global/all.js',
    checkForExisting: true,
    onload: () => {
      console.log('Script loaded!')
      setLoading(false)
      
      // @ts-expect-error see index.html
      initMediaLibrary()
    },
  })
  const mediaLibrary = useRef<any>()

  useEffect(() => {
    if (loading || !ref || rendered) {
      return
    }

    const config = {
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      insert_caption: "REACT CHOOSE",
      remove_header: true,
    }

    // ATTACH TO REACT NODE
    console.log('REACT start useEffect')
    mediaLibrary.current = (window as any).cloudinary.openMediaLibrary(
      {
        ...config,
        // ATTENTION: it works when rendered as a modal dialog, not when using `inline_container`
        // inline_container: ref,
        inline_container: document.getElementById('cloudinary-in-react'),
      },
      {
        insertHandler: (data: any) => {
          console.log('REACT insertHandler App.tsx', data)
        },
      },
    )

    // ATTACH TO WWW NODE (see index.html)
    const wwwMediaLibrary = (window as any).cloudinary.openMediaLibrary(
      {
        ...config,
        inline_container: document.getElementById('cloudinary-for-react'),
      },
      {
        insertHandler: (data: any) => {
          console.log('REACT insertHandler App.tsx', data)
        },
      },
    )

    // RENDER AS MODAL (ATTENTION: this works, mediaLibrary's case not)
    const modalView = (window as any).cloudinary.openMediaLibrary(
      {
        ...config,
      },
      {
        insertHandler: (data: any) => {
          console.log('MODAL insertHandler App.tsx', data)
        },
      },
    )

    modalView.on('close', () => {
      console.log('MODAL modalView closed')
    })
    

    setHasRendered(true)
    console.log('REACT mediaLibrary instance', mediaLibrary);
    console.log('REACT WWW wwwMediaLibrary instance', wwwMediaLibrary);
  }, [loading, ref, rendered])

  return (
    <div className="App">
      <h2>REACT</h2>
      <div ref={setRef} id="cloudinary-in-react" style={{height: '45vh', paddingBottom: '5vh'}}></div>
    </div>
  );
}

export default App;
