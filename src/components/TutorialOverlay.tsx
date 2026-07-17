'use client'

import { useState, useEffect, useCallback } from 'react'

interface TutorialStep {
  icon: string
  title: string
  desc: string
  highlight?: string
}

interface TutorialOverlayProps {
  toolName: string
  steps: TutorialStep[]
}

export default function TutorialOverlay({ toolName, steps }: TutorialOverlayProps) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const storageKey = `tutorial-${toolName}`

  useEffect(() => {
    const seen = localStorage.getItem(storageKey)
    if (!seen) {
      setTimeout(() => setVisible(true), 300)
    }
  }, [storageKey])

  const close = useCallback(() => {
    setVisible(false)
    localStorage.setItem(storageKey, '1')
  }, [storageKey])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      animation: 'fadeIn 0.3s ease',
    }} onClick={close}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 32,
        maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.4s ease',
      }} onClick={e => e.stopPropagation()}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? '#2563eb' : '#e5e7eb',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Step content */}
        <div style={{
          fontSize: 36, marginBottom: 12,
          animation: 'fadeIn 0.3s ease',
          animationDelay: '0.1s',
        }} key={step}>
          {steps[step].icon}
        </div>
        <h3 style={{
          fontSize: 18, fontWeight: 600, color: '#1d1d1f',
          marginBottom: 8, animation: 'slideUp 0.3s ease',
        }} key={`t-${step}`}>
          {steps[step].title}
        </h3>
        <p style={{
          fontSize: 14, color: '#6e6e73', lineHeight: 1.6,
          marginBottom: 24, animation: 'slideUp 0.3s ease',
          animationDelay: '0.1s',
        }} key={`d-${step}`}>
          {steps[step].desc}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              padding: '8px 16px', borderRadius: 8,
              background: '#f5f5f7', border: 'none',
              color: '#1d1d1f', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>← Back</button>
          )}
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              padding: '8px 20px', borderRadius: 8,
              background: '#2563eb', border: 'none',
              color: 'white', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>Next →</button>
          ) : (
            <button onClick={close} style={{
              padding: '8px 20px', borderRadius: 8,
              background: '#2563eb', border: 'none',
              color: 'white', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>Got it! ✓</button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
