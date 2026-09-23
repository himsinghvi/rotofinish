import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './ContactLottie.css'

const LOTTIE_JSON = '/animations/contact-us.lottie.json'
const LOTTIE_MP4 = '/animations/contact-us.lottie.mp4'

export default function ContactLottie() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (event) => setReduceMotion(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="contact-lottie" aria-hidden="true">
      {reduceMotion ? (
        <video
          className="contact-lottie-video"
          src={LOTTIE_MP4}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <DotLottieReact
          src={LOTTIE_JSON}
          loop
          autoplay
          layout={{ fit: 'contain', align: [0.5, 0.55] }}
          renderConfig={{ autoResize: true }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      )}
    </div>
  )
}
