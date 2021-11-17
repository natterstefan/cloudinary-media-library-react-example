import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ReactIndexExample } from './ReactIndexExample'
import { ReactModalExample } from './ReactModalExample'

import { ReactNodeExample } from './ReactNodeExample'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <ul className="list-inside list-disc space-x-8 border-b pb-2 mb-6">
            <li className="hover:underline inline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline inline">
              <Link to="/react-node-example">ReactNodeExample</Link>
            </li>
            <li className="hover:underline inline">
              <Link to="/react-index-example">ReactIndexExample</Link>
            </li>
            <li className="hover:underline inline">
              <Link to="/react-modal-example">ReactModalExample</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/react-node-example" element={<ReactNodeExample />} />
            <Route
              path="/react-index-example"
              element={<ReactIndexExample />}
            />
            <Route
              path="/react-modal-example"
              element={<ReactModalExample />}
            />
            <Route
              path="/"
              element={
                <>
                  <h2 className="font-medium mb-2">EXAMPLES</h2>
                  <span>Click on a link above to see a dedicated example</span>
                </>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
