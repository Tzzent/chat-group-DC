'use client';

interface TopBoxProps {
  children?: React.ReactNode,
}

export default function TopBox({
  children,
}: TopBoxProps) {
  return (
    <div
      className="
      shadow-black/30
      shadow-md
      -bottom-4
      h-12
      flex
      items-center
      "
    >
      {children}
    </div>
  )
}
