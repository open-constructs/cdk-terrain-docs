export const PlatformDiagram = () => {
  return (
    <svg
      viewBox="0 0 800 520"
      width="100%"
      role="img"
      aria-label="CDK Terrain platform diagram showing supported languages, the CDK Terrain layer, OpenTofu and Terraform engine, and cloud providers"
      style={{ maxWidth: 800, margin: "0 auto", display: "block" }}
    >
      <title>CDK Terrain Platform Overview</title>

      <defs>
        <marker id="arrowGray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
        </marker>
      </defs>

      {/* Languages row */}
      <rect x="100" y="20" width="600" height="50" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="175" y="51" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#374151">TypeScript</text>
      <line x1="240" y1="30" x2="240" y2="60" stroke="#d1d5db" strokeWidth="1" />
      <text x="300" y="51" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#374151">Python</text>
      <line x1="360" y1="30" x2="360" y2="60" stroke="#d1d5db" strokeWidth="1" />
      <text x="420" y="51" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#374151">Java</text>
      <line x1="480" y1="30" x2="480" y2="60" stroke="#d1d5db" strokeWidth="1" />
      <text x="540" y="51" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#374151">C#</text>
      <line x1="600" y1="30" x2="600" y2="60" stroke="#d1d5db" strokeWidth="1" />
      <text x="660" y="51" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#374151">Go</text>

      {/* Arrow from languages to CDK Terrain */}
      <line x1="400" y1="70" x2="400" y2="110" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />

      {/* CDK Terrain box */}
      <rect x="200" y="110" width="400" height="60" rx="10" fill="#16A34A" />
      <text x="400" y="147" textAnchor="middle" fontSize="20" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">CDK Terrain (CDKTN)</text>

      {/* Arrow down to engine */}
      <line x1="400" y1="170" x2="400" y2="220" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />

      {/* OpenTofu / Terraform Engine box */}
      <rect x="150" y="220" width="500" height="80" rx="12" fill="#15803D" />

      {/* OpenTofu icon (official symbol-only) */}
      <g transform="translate(290, 235) scale(1.3)">
        <path fill="#E6C220" d="M18.66,2.33c.2-.11,.44-.11,.64,0l14.2,7.81c.46,.25,.46,.91,0,1.16l-14.2,7.81c-.2,.11-.44-.11-.64,0L4.46,11.3c-.46-.25-.46-.91,0-1.16L18.66,2.33Z"/>
        <path fill="#FFFFFF" d="M34.77,13.13c.44-.24,.98,.08,.98,.58v15.61c0,.24-.13,.47-.34,.58l-14.34,7.88c-.44,.24-.98-.08-.98-.58v-15.61c0-.24,.13-.47,.34-.58l14.34-7.88Z"/>
        <path fill="#FEDA15" d="M17.53,21.01L3.2,13.13c-.44-.24-.98,.08-.98,.58v15.61c0,.24,.13,.47,.34,.58l14.34,7.88c.44,.24,.98-.08,.98-.58v-15.61c0-.24-.13-.47-.34-.58Zm-9.3,4.97l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Zm5.29,3.05l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Z"/>
      </g>

      <text x="350" y="270" textAnchor="start" fontSize="22" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">OpenTofu</text>
      <text x="476" y="270" textAnchor="start" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="400" fill="rgba(255,255,255,0.7)">/ Terraform</text>

      {/* Arrow from engine to providers */}
      <line x1="400" y1="300" x2="400" y2="350" stroke="#9ca3af" strokeWidth="2" />

      {/* Fan-out lines to providers */}
      <line x1="400" y1="350" x2="100" y2="350" stroke="#9ca3af" strokeWidth="2" />
      <line x1="400" y1="350" x2="700" y2="350" stroke="#9ca3af" strokeWidth="2" />
      <line x1="100" y1="350" x2="100" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />
      <line x1="220" y1="350" x2="220" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />
      <line x1="340" y1="350" x2="340" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />
      <line x1="460" y1="350" x2="460" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />
      <line x1="580" y1="350" x2="580" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />
      <line x1="700" y1="350" x2="700" y2="390" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowGray)" />

      {/* Provider boxes */}
      <rect x="40" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="100" y="425" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">AWS</text>

      <rect x="160" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="220" y="425" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Azure</text>

      <rect x="280" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="340" y="425" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">GCP</text>

      <rect x="400" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="460" y="425" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Kubernetes</text>

      <rect x="520" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="580" y="425" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Docker</text>

      <rect x="640" y="395" width="120" height="50" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="700" y="419" textAnchor="middle" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">3000+</text>
      <text x="700" y="437" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="400" fill="#6b7280">providers</text>
    </svg>
  );
};
