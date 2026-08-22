/**
 * Product-specific SVG illustrations for platform pages.
 * Pure CSS animations — no JS, renders server-side.
 */

/** CRM: Kanban board with cards sliding between columns */
export function CrmSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Columns */}
      {[80, 200, 320].map((x, i) => (
        <g key={i}>
          <rect x={x - 40} y={20} width={80} height={260} rx={0} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
          <rect x={x - 30} y={30} width={60} height={8} rx={0} fill="var(--border)" />
          {/* Cards */}
          <rect x={x - 30} y={50 + i * 20} width={60} height={40} rx={0} fill="var(--elevated)" stroke="var(--border)" strokeWidth="0.5" className="animate-[slideDown_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.8}s` }} />
          <rect x={x - 30} y={100 + i * 15} width={60} height={40} rx={0} fill="var(--elevated)" stroke="var(--border)" strokeWidth="0.5" />
        </g>
      ))}
      {/* Moving card */}
      <rect x={70} y={180} width={60} height={35} rx={0} fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" className="animate-[slideRight_4s_ease-in-out_infinite]" />
      <style>{`@keyframes slideRight{0%,100%{transform:translateX(0)}50%{transform:translateX(120px)}}@keyframes slideDown{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}`}</style>
    </svg>
  );
}

/** Flow: Node graph with connections pulsing */
export function FlowSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Nodes */}
      <rect x={40} y={130} width={60} height={40} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <rect x={170} y={80} width={60} height={40} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
      <rect x={170} y={180} width={60} height={40} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
      <rect x={300} y={130} width={60} height={40} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Connections */}
      <path d="M100 150 L170 100" stroke="var(--border)" strokeWidth="1" />
      <path d="M100 150 L170 200" stroke="var(--border)" strokeWidth="1" />
      <path d="M230 100 L300 150" stroke="var(--border)" strokeWidth="1" />
      <path d="M230 200 L300 150" stroke="var(--border)" strokeWidth="1" />
      {/* Pulse dots on paths */}
      <circle r="3" fill="var(--accent)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M100,150 L170,100 L230,100 L300,150" />
      </circle>
      <circle r="3" fill="var(--accent)" opacity="0.5">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M100,150 L170,200 L230,200 L300,150" />
      </circle>
      {/* Node labels */}
      <text x={55} y={155} fontSize="8" fill="var(--text-muted)" textAnchor="middle">Trigger</text>
      <text x={330} y={155} fontSize="8" fill="var(--text-muted)" textAnchor="middle">Action</text>
    </svg>
  );
}

/** LAIE: Search rays scanning, data enriching */
export function LaieSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Central node */}
      <circle cx={200} cy={150} r={30} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x={200} y={154} fontSize="9" fill="var(--accent)" textAnchor="middle">LAIE</text>
      {/* Scanning rays */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 200 + Math.cos(rad) * 100;
        const y2 = 150 + Math.sin(rad) * 80;
        return (
          <g key={i}>
            <line x1={200} y1={150} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx={x2} cy={y2} r={8} fill="var(--elevated)" stroke="var(--border)" strokeWidth="1">
              <animate attributeName="r" values="6;10;6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
      {/* Pulse ring */}
      <circle cx={200} cy={150} r={30} fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="r" values="30;80;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** Connect: Channel icons converging to one point */
export function ConnectSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Central hub */}
      <rect x={175} y={125} width={50} height={50} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x={200} y={155} fontSize="8" fill="var(--accent)" textAnchor="middle">API</text>
      {/* Channel nodes */}
      {[
        { x: 60, y: 80, label: "WA" },
        { x: 60, y: 200, label: "Email" },
        { x: 340, y: 80, label: "IG" },
        { x: 340, y: 200, label: "Meet" },
        { x: 200, y: 30, label: "SMS" },
        { x: 200, y: 260, label: "Tel" },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={200} y2={150} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
          <rect x={n.x - 18} y={n.y - 12} width={36} height={24} fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x={n.x} y={n.y + 4} fontSize="7" fill="var(--text-muted)" textAnchor="middle">{n.label}</text>
          {/* Pulse toward center */}
          <circle r="2" fill="var(--accent)">
            <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={`M${n.x},${n.y} L200,150`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/** Storage: Files floating into a container */
export function StorageSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Storage container */}
      <rect x={130} y={180} width={140} height={80} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
      <rect x={130} y={180} width={140} height={16} fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
      <text x={200} y={192} fontSize="7" fill="var(--text-muted)" textAnchor="middle">R2 BUCKET</text>
      {/* Files dropping in */}
      {[150, 185, 220, 255].map((x, i) => (
        <rect key={i} x={x} y={40 + i * 10} width={20} height={25} fill="var(--elevated)" stroke="var(--border)" strokeWidth="0.5" className="animate-[drop_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
      {/* CDN arrows out */}
      <path d="M270 220 L330 200" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arrow)" />
      <path d="M270 240 L330 260" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arrow)" />
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" /></marker></defs>
      <text x={345} y={200} fontSize="7" fill="var(--text-muted)">CDN</text>
      <text x={345} y={264} fontSize="7" fill="var(--text-muted)">SDK</text>
      <style>{`@keyframes drop{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(120px);opacity:0.3}}`}</style>
    </svg>
  );
}

/** ErixStore: Queue/cache pulse animation */
export function StoreSvg() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
      {/* Memory blocks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={60 + i * 35} y={120} width={30} height={60} fill="var(--surface)" stroke="var(--border)" strokeWidth="1">
          <animate attributeName="fill-opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* Labels */}
      <text x={200} y={100} fontSize="9" fill="var(--text-muted)" textAnchor="middle">IN-MEMORY</text>
      <text x={200} y={210} fontSize="8" fill="var(--accent)" textAnchor="middle">SUB-MILLISECOND</text>
      {/* Arrows in/out */}
      <path d="M30 150 L55 150" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr2)" />
      <path d="M345 150 L370 150" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr2)" />
      <defs><marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" /></marker></defs>
      <text x={15} y={140} fontSize="7" fill="var(--text-muted)">IN</text>
      <text x={372} y={140} fontSize="7" fill="var(--text-muted)">OUT</text>
    </svg>
  );
}
