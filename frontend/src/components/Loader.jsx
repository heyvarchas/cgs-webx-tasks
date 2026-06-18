import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div style={{ color: 'white', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '4px solid rgba(255,255,255,0.2)',
            borderTopColor: 'white',
            borderRadius: '50%',
            margin: '0 auto 8px',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p>{Math.round(progress)}%</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  )
}