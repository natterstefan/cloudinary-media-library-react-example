import React, { useEffect, useRef } from 'react'
import useScript from 'react-script-hook'

export const ReactModalExample = () => {
  const myLibrary = useRef<any>(null)

  const [loading] = useScript({
    src: 'https://media-library.cloudinary.com/global/all.js',
    checkForExisting: true,
  })

  useEffect(() => {
    if (loading || myLibrary.current) {
      return
    }

    // RENDER AS MODAL (ATTENTION: this works, mediaLibrary's case not)
    myLibrary.current = (window as any).cloudinary.openMediaLibrary(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
        insert_caption: 'REACT CHOOSE',
        remove_header: true,
      },
      {
        insertHandler: (data: any) => {
          console.log('MODAL insertHandler App.tsx', data)
        },
      },
    )

    myLibrary.current.on('close', () => {
      console.log('MODAL modalView closed')
    })
  }, [loading, myLibrary])

  const onOpenAgain = () => {
    myLibrary.current.show()
  }

  return (
    <>
      <h2 className="font-medium mb-2">Render Library in Modal</h2>
      <p>Media Library is rendered as a Modal</p>
      <button
        className="inline-flex items-center mt-6 px-4 py-2 border border-blue-400 text-base leading-6 font-medium rounded-md text-blue-800 bg-white hover:text-blue-400 focus:border-blue-300"
        onClick={onOpenAgain}
      >
        Open again
      </button>
    </>
  )
}
