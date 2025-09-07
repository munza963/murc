"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import Image from "next/image"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0", // Стандартный размер для чекбокса (16x16px)
      "disabled:cursor-not-allowed disabled:opacity-50", // Стили для отключенного состояния

      // Пользовательские стили для фонового изображения (пустой квадрат)
      "border-none rounded-none bg-transparent", // Удаляем стандартные границы, скругления и устанавливаем прозрачный фон
      "bg-[url('/images/1-1.png')] bg-no-repeat bg-center bg-auto", // Используем bg-auto для естественного размера изображения

      // Когда чекбокс отмечен, убеждаемся, что фоновое изображение остается
      "data-[state=checked]:bg-[url('/images/1-1.png')]",

      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center h-full w-full")}>
      {/* Уменьшаем размер изображения галочки до 10x10px */}
      <Image src="/images/1-2.png" alt="Checkmark" width={10} height={10} className="object-contain" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
