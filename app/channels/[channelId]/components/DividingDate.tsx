'use client';

interface DividingDateProps {
  date: string,
}

export default function DividingDate({
  date
}: DividingDateProps) {
  return (
    <div className="flex items-center">
      <div className="flex-1 h-[.5px] bg-[#828282]" />
      <p
        className="
        text-[#828282] 
        text-xs 
        mx-3
        "
      >
        {date}
      </p>
      <div className="flex-1 h-[.5px] bg-[#828282]" />
    </div>
  )
}
