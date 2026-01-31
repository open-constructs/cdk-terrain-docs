export const WorkflowDiagram = () => {
  return (
    <svg
      viewBox="0 0 700 520"
      width="100%"
      role="img"
      aria-label="CDK Terrain workflow diagram showing the init, synth, and deploy phases"
      style={{ maxWidth: 700, margin: "0 auto", display: "block" }}
    >
      <title>CDK Terrain Workflow</title>

      <defs>
        <marker id="wfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
        </marker>
      </defs>

      {/* Phase 1: cdktn init */}
      <text x="30" y="50" fontSize="16" fontFamily="monospace" fontWeight="700" fill="#16A34A">cdktn init</text>
      <text x="30" y="72" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">CDKTN creates a project</text>
      <text x="30" y="88" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">where you define infrastructure</text>

      {/* CDKTN App box */}
      <rect x="300" y="25" width="250" height="65" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="425" y="64" textAnchor="middle" fontSize="18" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#111827">CDKTN App</text>

      {/* Arrow down */}
      <line x1="425" y1="90" x2="425" y2="145" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#wfArrow)" />

      {/* Phase 2: cdktn synth */}
      <text x="30" y="185" fontSize="16" fontFamily="monospace" fontWeight="700" fill="#16A34A">cdktn synth</text>
      <text x="30" y="207" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">CDKTN generates</text>
      <text x="30" y="223" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">configuration files</text>

      {/* Output label */}
      <text x="302" y="140" fontSize="12" fontFamily="system-ui, sans-serif" fill="#9ca3af">Output</text>

      {/* Output box */}
      <rect x="300" y="150" width="250" height="90" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />

      {/* JSON Config icon */}
      <rect x="330" y="168" width="44" height="52" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="352" y="200" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill="#6b7280">JSON</text>

      {/* Config files icon */}
      <rect x="394" y="168" width="44" height="52" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="416" y="200" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#6b7280">Config</text>

      {/* Artifacts icon */}
      <rect x="458" y="168" width="44" height="52" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="480" y="200" textAnchor="middle" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#6b7280">Artifacts</text>

      {/* Arrow down */}
      <line x1="425" y1="240" x2="425" y2="300" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#wfArrow)" />

      {/* Phase 3: cdktn deploy */}
      <text x="30" y="345" fontSize="16" fontFamily="monospace" fontWeight="700" fill="#16A34A">cdktn deploy</text>
      <text x="30" y="367" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">OpenTofu / Terraform provisions</text>
      <text x="30" y="383" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">your infrastructure</text>

      {/* OpenTofu / Terraform Engine box */}
      <rect x="280" y="305" width="290" height="80" rx="10" fill="#15803D" />

      {/* OpenTofu icon */}
      <g transform="translate(310, 320) scale(1.1)">
        <path fill="#E6C220" d="M18.66,2.33c.2-.11,.44-.11,.64,0l14.2,7.81c.46,.25,.46,.91,0,1.16l-14.2,7.81c-.2,.11-.44-.11-.64,0L4.46,11.3c-.46-.25-.46-.91,0-1.16L18.66,2.33Z"/>
        <path fill="#FFFFFF" d="M34.77,13.13c.44-.24,.98,.08,.98,.58v15.61c0,.24-.13,.47-.34,.58l-14.34,7.88c-.44,.24-.98-.08-.98-.58v-15.61c0-.24,.13-.47,.34-.58l14.34-7.88Z"/>
        <path fill="#FEDA15" d="M17.53,21.01L3.2,13.13c-.44-.24-.98,.08-.98,.58v15.61c0,.24,.13,.47,.34,.58l14.34,7.88c.44,.24,.98-.08,.98-.58v-15.61c0-.24-.13-.47-.34-.58Zm-9.3,4.97l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Zm5.29,3.05l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Z"/>
      </g>

      <text x="360" y="352" textAnchor="start" fontSize="20" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">OpenTofu</text>
      <text x="470" y="352" textAnchor="start" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="400" fill="rgba(255,255,255,0.7)">/ Terraform</text>

      {/* Arrow down + fan out */}
      <line x1="425" y1="385" x2="425" y2="420" stroke="#9ca3af" strokeWidth="2" />
      <line x1="160" y1="420" x2="690" y2="420" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="160" y1="420" x2="160" y2="455" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#wfArrow)" />
      <line x1="290" y1="420" x2="290" y2="455" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#wfArrow)" />
      <line x1="425" y1="420" x2="425" y2="455" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#wfArrow)" />
      <line x1="560" y1="420" x2="560" y2="455" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#wfArrow)" />
      <line x1="690" y1="420" x2="690" y2="455" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#wfArrow)" />

      {/* Provider boxes */}
      <rect x="100" y="460" width="120" height="45" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="160" y="488" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">AWS</text>

      <rect x="230" y="460" width="120" height="45" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="290" y="488" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Azure</text>

      <rect x="365" y="460" width="120" height="45" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="425" y="488" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">GCP</text>

      <rect x="500" y="460" width="120" height="45" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="560" y="488" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Kubernetes</text>

      <rect x="630" y="460" width="120" height="45" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="690" y="482" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">3000+</text>
      <text x="690" y="498" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400" fill="#6b7280">providers</text>
    </svg>
  );
};
