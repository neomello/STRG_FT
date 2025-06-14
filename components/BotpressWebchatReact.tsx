import { Fab, Webchat } from '@botpress/webchat'
import { useState } from 'react'

export default function BotpressWebchatReact() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)
  const toggleWebchat = () => setIsWebchatOpen((prev) => !prev)

  return (
    <>
      <div
        style={{
          width: '400px',
          height: '600px',
          display: isWebchatOpen ? 'flex' : 'none',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
        }}
      >
        <Webchat />
      </div>
      <Fab onClick={toggleWebchat} style={{ position: 'fixed', bottom: '20px', right: '20px' }} />
    </>
  )
}
