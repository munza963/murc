"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface UserContextMenuProps {
  username: string
  position: { x: number; y: number }
  onClose: () => void
  onAction: (action: string, username: string) => void
}

export function UserContextMenu({ username, position, onClose, onAction }: UserContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Adjust position if menu would go off screen
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 120),
    y: Math.min(position.y, window.innerHeight - 180),
  }

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        width: "120px",
        zIndex: 1000,
        border: "2px solid #69AFD1",
        backgroundColor: "#fff",
        fontSize: "10px",
      }}
    >
      {/* Картинка пользователя */}
      <div style={{ padding: "3px", textAlign: "center" }}>
        <Image
          src="/images/male-user-icon.png"
          alt="User photo"
          width={50}
          height={35}
          style={{ objectFit: "cover", width: "100%" }}
        />
      </div>

      {/* Черта под картинкой */}
      <div style={{ borderBottom: "1px solid #69AFD1" }}></div>

      {/* Ссылки без имени пользователя */}
      <div style={{ padding: "3px" }}>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onAction("write", username)
            }}
            style={{ color: "#09F", textDecoration: "none", display: "block", fontSize: "10px", marginBottom: "1px" }}
          >
            Написать для {username}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onAction("draw", username)
            }}
            style={{ color: "#09F", textDecoration: "none", display: "block", fontSize: "10px" }}
          >
            Рисовать для {username}
          </a>
        </div>
      </div>

      {/* Черта над списком действий */}
      <div style={{ borderBottom: "1px solid #69AFD1" }}></div>

      {/* Список действий */}
      <div style={{ padding: "1px 0" }}>
        <button
          onClick={() => onAction("private", username)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "1px 3px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          Открыть приват
        </button>
        <button
          onClick={() => onAction("profile", username)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "1px 3px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          Посмотреть анкету
        </button>
        <button
          onClick={() => onAction("photo", username)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "1px 3px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          Сфотографировать
        </button>
        <button
          onClick={() => onAction("ignore", username)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "1px 3px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          Игнорировать
        </button>
        <button
          onClick={() => onAction("report", username)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "1px 3px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          Пожаловаться
        </button>
      </div>

      {/* Черта над кнопкой "Подарить" */}
      <div style={{ borderBottom: "1px solid #69AFD1" }}></div>

      {/* Кнопка "Подарить" внизу */}
      <div style={{ padding: "3px" }}>
        <button
          onClick={() => onAction("gift", username)}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            textAlign: "left",
            padding: "1px 0",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "10px",
          }}
        >
          <span style={{ marginRight: "2px", fontSize: "9px" }}>🎁</span>
          Подарить
        </button>
      </div>
    </div>
  )
}
