import React from "react"

const GovernmentBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0 -z-10
        h-screen w-full
        overflow-hidden
        pointer-events-none
        bg-gradient-to-br
        from-slate-50
        via-white
        to-slate-100
      "
    >
      {/* Soft atmospheric overlay */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.78)_45%,rgba(241,245,249,0.35)_100%)]
        "
      />

      {/* ========== 3D Hexagonal Pattern (softer) ========== */}
      <div className="absolute inset-0 opacity-[0.42]">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Base subtle blue-gray gradient for hex faces */}
            <linearGradient id="hexFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Highlight gradient (top-left light) */}
            <linearGradient id="hexHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0" />
            </linearGradient>

            {/* Shadow gradient (bottom-right) */}
            <linearGradient id="hexShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
              <stop offset="60%" stopColor="#64748b" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.16" />
            </linearGradient>

            {/* Soft blue accent (very subtle) */}
            <linearGradient id="hexBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.08" />
            </linearGradient>

            {/* Hexagon shape (pointy-top) */}
            <polygon
              id="hex"
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
            />
          </defs>

          {/* Generate a dense hexagonal grid */}
          {Array.from({ length: 14 }).map((_, row) =>
            Array.from({ length: 18 }).map((_, col) => {
              const x = col * 86 + (row % 2 === 1 ? 43 : 0)
              const y = row * 75
              const isEven = (row + col) % 2 === 0

              return (
                <g key={`${row}-${col}`} transform={`translate(${x - 80}, ${y - 60})`}>
                  {/* Main face */}
                  <use
                    href="#hex"
                    fill="url(#hexFace)"
                    stroke="#94a3b8"
                    strokeWidth="0.7"
                    strokeOpacity="0.18"
                  />

                  {/* Soft blue tint on some hexes */}
                  {isEven && (
                    <use
                      href="#hex"
                      fill="url(#hexBlue)"
                      opacity="0.5"
                    />
                  )}

                  {/* Highlight */}
                  <use
                    href="#hex"
                    fill="url(#hexHighlight)"
                    opacity="0.65"
                  />

                  {/* Shadow */}
                  <use
                    href="#hex"
                    fill="url(#hexShadow)"
                    opacity="0.7"
                  />
                </g>
              )
            })
          )}
        </svg>
      </div>

      {/* Soft depth orbs */}
      <div
        className="
          absolute
          -left-40
          -top-40
          h-[480px]
          w-[480px]
          rounded-full
          bg-blue-100/8
          blur-[110px]
        "
      />
      <div
        className="
          absolute
          -bottom-48
          -right-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-slate-200/10
          blur-[120px]
        "
      />

      {/* Stronger center veil – keeps text highly readable */}
      <div
        className="
          absolute
          inset-0
          z-20
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.65)_32%,rgba(255,255,255,0.28)_65%,transparent_100%)]
        "
      />

      {/* Extra soft veil on mobile */}
      <div
        className="
          absolute
          inset-0
          hidden
          max-md:block
          bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.22)_100%)]
        "
      />
    </div>
  )
}

export default GovernmentBackground