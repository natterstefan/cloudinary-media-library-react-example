import React, { useEffect, useRef, useState } from 'react'
import useScript from 'react-script-hook'

export const ReactNodeExample = () => {
  const myLibrary = useRef<any>(null)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  const [loading] = useScript({
    src: 'https://media-library.cloudinary.com/global/all.js',
    checkForExisting: true,
  })

  useEffect(() => {
    if (loading || !ref || myLibrary.current) {
      return
    }

    myLibrary.current = (window as any).cloudinary.openMediaLibrary(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
        insert_caption: 'REACT CHOOSE',
        remove_header: true,
        // ATTENTION: it works when rendered as a modal dialog, not when using `inline_container`
        // inline_container: ref,
        // inline_container: document.getElementById('cloudinary-in-react'),
        inline_container: '#cloudinary-in-react',
      },
      {
        insertHandler: (data: any) => {
          console.log('REACT insertHandler App.tsx', data)
        },
      },
    )
  }, [loading, ref, myLibrary])

  return (
    <>
      <h2 className="font-medium mb-2">Render Library in React div</h2>
      <p>Media Library is rendered inside a `div` that is managed by React</p>
      <div
        className="mt-10"
        ref={setRef}
        id="cloudinary-in-react"
        style={{ height: '80vh', paddingBottom: '5vh' }}
      ></div>
    </>
  )
}
