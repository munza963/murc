"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface SettingsModalProps {
  onClose: () => void
}

interface CustomCheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
}

function CustomCheckbox({ id, checked, onChange, children }: CustomCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative w-4 h-4 flex items-center justify-center"
        id={id}
      >
        <Image src="/images/1-1.png" alt="Checkbox" width={16} height={16} className="absolute inset-0" />
        {checked && <Image src="/images/1-2.png" alt="Checked" width={10} height={10} className="relative z-10" />}
      </button>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        onClick={() => onChange(!checked)}
      >
        {children}
      </label>
    </div>
  )
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  // Checkbox states
  const [soundMessage, setSoundMessage] = useState(true)
  const [graphicalEmoticons, setGraphicalEmoticons] = useState(false)
  const [showJoinLeave, setShowJoinLeave] = useState(false)
  const [highlightFriends, setHighlightFriends] = useState(true)
  const [useAnimation, setUseAnimation] = useState(true)
  const [watchTv, setWatchTv] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      setIsDragging(true)
      setOffset({
        x: e.clientX - modalRef.current.getBoundingClientRect().left,
        y: e.clientY - modalRef.current.getBoundingClientRect().top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={modalRef}
      className="absolute z-50"
      style={{
        left: position.x,
        top: position.y,
        backgroundColor: "#69AFD1",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <div className="flex flex-col bg-white shadow-lg" style={{ borderRadius: "4px", overflow: "hidden" }}>
        <div
          className="relative flex items-center justify-between text-black text-sm font-bold p-2 cursor-move h-8"
          onMouseDown={handleMouseDown}
          style={{
            backgroundImage: "url('/images/90.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span className="text-white relative z-10">Настройки</span>
          <button onClick={onClose} className="p-1 rounded-full relative z-10">
            <Image src="/images/crest.png" alt="Close" width={16} height={16} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-3 text-sm border-t border-gray-300">
          <CustomCheckbox id="sound-message" checked={soundMessage} onChange={setSoundMessage}>
            Звук при входящем сообщении
          </CustomCheckbox>

          <CustomCheckbox id="graphical-emoticons" checked={graphicalEmoticons} onChange={setGraphicalEmoticons}>
            Графические смайлы
          </CustomCheckbox>

          <CustomCheckbox id="show-join-leave" checked={showJoinLeave} onChange={setShowJoinLeave}>
            Показывать сообщения о входах/выходах
          </CustomCheckbox>

          <CustomCheckbox id="highlight-friends" checked={highlightFriends} onChange={setHighlightFriends}>
            Выделять цветами ники друзей
          </CustomCheckbox>

          <CustomCheckbox id="use-animation" checked={useAnimation} onChange={setUseAnimation}>
            Использовать анимацию
          </CustomCheckbox>

          <CustomCheckbox id="watch-tv" checked={watchTv} onChange={setWatchTv}>
            Смотреть телевизор
          </CustomCheckbox>

          <a href="#" className="no-underline hover:underline mt-2" style={{ color: "#09F" }}>
            Сменить пароль
          </a>

          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="username-input" className="text-sm font-medium leading-none">
              Имя
            </label>
            <Input
              id="username-input"
              type="text"
              defaultValue="CcСолНышКoО"
              className="flex-1 h-8 focus:outline-none focus:ring-0 focus:border-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-400 focus:shadow-none focus-visible:shadow-none"
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 p-4">
          <button
            className="relative h-10 w-full max-w-[250px] flex items-center justify-center text-sm text-black cursor-pointer"
            onClick={onClose}
            style={{ padding: 0, border: "none", background: "none" }}
          >
            <Image src="/images/1-4.png" alt="OK Button" fill className="object-contain absolute inset-0" />
            <span className="relative z-10">OK</span>
          </button>
          <button
            className="relative h-10 w-full max-w-[250px] flex items-center justify-center text-sm text-black cursor-pointer"
            onClick={onClose}
            style={{ padding: 0, border: "none", background: "none" }}
          >
            <Image src="/images/1-4.png" alt="Отмена Button" fill className="object-contain absolute inset-0" />
            <span className="relative z-10">Отмена</span>
          </button>
        </div>
      </div>
    </div>
  )
}
