import React, { useEffect, useRef } from 'react'
import useScript from 'react-script-hook'

export const ReactIndexExample = () => {
  const myLibrary = useRef<any>(null)
  const [loading] = useScript({
    src: 'https://media-library.cloudinary.com/global/all.js',
    checkForExisting: true,
  })

  useEffect(() => {
    if (loading || myLibrary.current) {
      return () => null
    }

    // ATTACH TO WWW NODE (see index.html)
    myLibrary.current = (window as any).cloudinary.openMediaLibrary(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
        insert_caption: 'REACT CHOOSE',
        remove_header: true,
        inline_container: '#cloudinary-for-react',
      },
      {
        insertHandler: (data: any) => {
          console.log('insertHandler', data)
        },
      },
    )

    return () => {
      document.getElementById('cloudinary-for-react')!.innerHTML = ''
    }
  }, [loading, myLibrary])

  return (
    <>
      <h2 className="font-medium mb-2">
        Render Library in div outside of React
      </h2>
      <p>
        Media Library is rendered inside a `div` that is _not_ managed by React
      </p>
    </>
  )
}
