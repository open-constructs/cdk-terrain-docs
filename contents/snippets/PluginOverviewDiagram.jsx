export const PluginOverviewDiagram = () => {
  return (
    <svg
      viewBox="0 0 900 150"
      width="100%"
      role="img"
      aria-label="Diagram showing how OpenTofu or Terraform Core communicates with providers via RPC, which use Go client libraries to call target APIs over HTTPS"
      style={{ maxWidth: 900, margin: "0 auto", display: "block" }}
    >
      <title>Plugin Communication Overview</title>

      <defs>
        <marker id="poArrowRight" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
        </marker>
        <marker id="poArrowLeft" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#9ca3af" />
        </marker>
      </defs>

      {/* OpenTofu / Terraform Core */}
      <rect x="10" y="20" width="150" height="90" rx="10" fill="#15803D" />

      {/* OpenTofu icon */}
      <g transform="translate(40, 30) scale(0.8)">
        <path fill="#E6C220" d="M18.66,2.33c.2-.11,.44-.11,.64,0l14.2,7.81c.46,.25,.46,.91,0,1.16l-14.2,7.81c-.2,.11-.44-.11-.64,0L4.46,11.3c-.46-.25-.46-.91,0-1.16L18.66,2.33Z"/>
        <path fill="#FFFFFF" d="M34.77,13.13c.44-.24,.98,.08,.98,.58v15.61c0,.24-.13,.47-.34,.58l-14.34,7.88c-.44,.24-.98-.08-.98-.58v-15.61c0-.24,.13-.47,.34-.58l14.34-7.88Z"/>
        <path fill="#FEDA15" d="M17.53,21.01L3.2,13.13c-.44-.24-.98,.08-.98,.58v15.61c0,.24,.13,.47,.34,.58l14.34,7.88c.44,.24,.98-.08,.98-.58v-15.61c0-.24-.13-.47-.34-.58Zm-9.3,4.97l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Zm5.29,3.05l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Z"/>
      </g>

      <text x="85" y="82" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">OPENTOFU</text>
      <text x="85" y="97" textAnchor="middle" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="400" fill="rgba(255,255,255,0.7)">/ TERRAFORM CORE</text>

      {/* RPC bidirectional arrow */}
      <line x1="170" y1="65" x2="240" y2="65" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#poArrowRight)" markerStart="url(#poArrowLeft)" />
      <text x="205" y="55" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#6b7280">RPC</text>

      {/* Provider box */}
      <rect x="250" y="20" width="160" height="90" rx="10" fill="#f9fafb" stroke="#16A34A" strokeWidth="2" />
      <text x="330" y="60" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#374151">PROVIDER</text>
      <text x="330" y="78" textAnchor="middle" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="400" fill="#6b7280">(Go plugin)</text>

      {/* Go arrow */}
      <line x1="420" y1="65" x2="490" y2="65" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#poArrowRight)" />
      <text x="455" y="55" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#6b7280">GOLANG</text>

      {/* Client Library box */}
      <rect x="500" y="20" width="150" height="90" rx="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="575" y="60" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#374151">CLIENT</text>
      <text x="575" y="78" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#374151">LIBRARY</text>

      {/* HTTP(S) arrow */}
      <line x1="660" y1="65" x2="730" y2="65" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#poArrowRight)" />
      <text x="695" y="55" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#6b7280">HTTP(S)</text>

      {/* Target API box */}
      <rect x="740" y="20" width="150" height="90" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M815,50 a12,12 0 0,1 0,24 h-30 a10,10 0 0,1 -2,-19.9 a14,14 0 0,1 27,-4 a12,12 0 0,1 5,-0.1z" fill="#d1d5db" stroke="none" />
      <text x="815" y="96" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#374151">TARGET API</text>
    </svg>
  );
};
