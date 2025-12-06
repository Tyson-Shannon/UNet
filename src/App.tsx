import { useState } from 'react'
import { create } from 'ipfs-http-client'
import type { IPFSHTTPClient } from 'ipfs-http-client'
import UNetGif from './assets/UNet Gif 1.gif' //change gif as needed
import UNetLogo from './assets/UNet.png'
import './App.css'

// connect to a self hosted IPFS node ------------------------------------------------------------------
const client: IPFSHTTPClient = create({ url: 'http://127.0.0.1:5001/api/v0' })

function App() {
  const [videos, setVideos] = useState<string[]>([])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const added = await client.add(file)
      const url = `http://127.0.0.1:8080/ipfs/${added.path}` // local gateway----------------------------
      setVideos((prev) => [...prev, url])
    } catch (err) {
      console.error("IPFS upload error: ", err)
    }
    event.target.value = "" // allows for the same video to be uploaded back to back
  }

  return (
    <>
      <header>
        <a href="#" className='a-logo'><img src={UNetLogo} className="logo" alt="UNet" /></a>
      </header>
      
      <div className="sidenav">
        <a href="#"><button className='sidebut'>Subscriptions</button></a> <br/>
        <a href="#"><button className='sidebut'>Upload</button></a> <br/>
        <a href="#"><button className='sidebut'>Hosting</button></a> <br/>
        <a href="#"><button className='sidebut'>Account</button></a> <br/>
        <a href="#"><button className='sidebut'>Credits</button></a> <br/>
        <a href="#"><button className='sidebut'>Settings</button></a> <br/>

        {/* hidden file input */}
        <input
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          id="videoInput"
          onChange={handleUpload}
        />

        <button
          className="addbut"
          onClick={() => {
            const input = document.getElementById('videoInput') as HTMLInputElement
            input?.click()
          }}
        >
          +
        </button>
      </div>
      <div className="mainContent">
        <div>
          <img src={UNetGif} className="UNetGif" alt="UNet Gif" />
        </div>

        <div className='videonav'>
          <a href="#"><button className='videobut'>Newest</button></a>
          <a href="#"><button className='videobut'>Suggested</button></a>
        </div>

        <div className="videoCards">
          {videos.map((url, i) => (
            <div key={i} className="videoCard">
              <video controls>
                <source src={url} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
