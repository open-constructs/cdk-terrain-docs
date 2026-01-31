export const AppArchitectureDiagram = () => {
  return (
    <svg
      viewBox="0 0 740 620"
      width="100%"
      role="img"
      aria-label="CDKTN application architecture showing App containing Stacks with Resources, producing JSON config consumed by OpenTofu or Terraform"
      style={{ maxWidth: 740, margin: "0 auto", display: "block" }}
    >
      <title>CDKTN Application Architecture</title>

      <defs>
        <marker id="aaArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
        </marker>
      </defs>

      {/* App container */}
      <rect x="60" y="20" width="620" height="310" rx="12" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="85" y="48" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#111827">App</text>

      {/* Stack (Development) */}
      <rect x="90" y="65" width="270" height="245" rx="10" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="225" y="92" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Stack (Development)</text>

      {/* Resources in Development stack */}
      <rect x="120" y="110" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="225" y="136" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      <rect x="120" y="162" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="225" y="188" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      <rect x="120" y="214" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="225" y="240" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      {/* Stack (Test) */}
      <rect x="385" y="65" width="270" height="245" rx="10" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="520" y="92" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Stack (Test)</text>

      {/* Resources in Test stack */}
      <rect x="415" y="110" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="520" y="136" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      <rect x="415" y="162" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="520" y="188" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      <rect x="415" y="214" width="210" height="40" rx="6" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="520" y="240" textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="500" fill="#15803D">Resource</text>

      {/* Connector dots */}
      <circle cx="225" cy="330" r="4" fill="#d1d5db" />
      <circle cx="520" cy="330" r="4" fill="#d1d5db" />

      {/* Lines down from stacks to output */}
      <line x1="225" y1="334" x2="225" y2="370" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#aaArrow)" />
      <line x1="520" y1="334" x2="520" y2="370" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#aaArrow)" />

      {/* Output labels */}
      <text x="135" y="365" fontSize="12" fontFamily="system-ui, sans-serif" fill="#9ca3af">Output</text>
      <text x="430" y="365" fontSize="12" fontFamily="system-ui, sans-serif" fill="#9ca3af">Output</text>

      {/* Output box - Development */}
      <rect x="130" y="375" width="190" height="80" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <rect x="155" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="175" y="418" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="600" fill="#6b7280">JSON</text>
      <rect x="210" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="230" y="418" textAnchor="middle" fontSize="10" fontFamily="system-ui, sans-serif" fill="#6b7280">Config</text>
      <rect x="265" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="285" y="418" textAnchor="middle" fontSize="9" fontFamily="system-ui, sans-serif" fill="#6b7280">Artifacts</text>

      {/* Output box - Test */}
      <rect x="425" y="375" width="190" height="80" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <rect x="450" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="470" y="418" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="600" fill="#6b7280">JSON</text>
      <rect x="505" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="525" y="418" textAnchor="middle" fontSize="10" fontFamily="system-ui, sans-serif" fill="#6b7280">Config</text>
      <rect x="560" y="393" width="40" height="42" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <text x="580" y="418" textAnchor="middle" fontSize="9" fontFamily="system-ui, sans-serif" fill="#6b7280">Artifacts</text>

      {/* Connector dots from output boxes */}
      <circle cx="225" cy="455" r="4" fill="#d1d5db" />
      <circle cx="520" cy="455" r="4" fill="#d1d5db" />

      {/* Merge lines down to engine */}
      <line x1="225" y1="459" x2="225" y2="490" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="520" y1="459" x2="520" y2="490" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="225" y1="490" x2="370" y2="490" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="520" y1="490" x2="370" y2="490" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="370" y1="490" x2="370" y2="520" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#aaArrow)" />

      {/* OpenTofu / Terraform Engine box */}
      <rect x="195" y="525" width="350" height="75" rx="10" fill="#15803D" />

      {/* OpenTofu icon */}
      <g transform="translate(240, 538) scale(1.0)">
        <path fill="#E6C220" d="M18.66,2.33c.2-.11,.44-.11,.64,0l14.2,7.81c.46,.25,.46,.91,0,1.16l-14.2,7.81c-.2,.11-.44-.11-.64,0L4.46,11.3c-.46-.25-.46-.91,0-1.16L18.66,2.33Z"/>
        <path fill="#FFFFFF" d="M34.77,13.13c.44-.24,.98,.08,.98,.58v15.61c0,.24-.13,.47-.34,.58l-14.34,7.88c-.44,.24-.98-.08-.98-.58v-15.61c0-.24,.13-.47,.34-.58l14.34-7.88Z"/>
        <path fill="#FEDA15" d="M17.53,21.01L3.2,13.13c-.44-.24-.98,.08-.98,.58v15.61c0,.24,.13,.47,.34,.58l14.34,7.88c.44,.24,.98-.08,.98-.58v-15.61c0-.24-.13-.47-.34-.58Zm-9.3,4.97l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Zm5.29,3.05l-3.36-1.77s0-.01,0-.02c.08-1.05,.89-1.5,1.82-1.01,.93,.49,1.62,1.73,1.54,2.78,0,0,0,.01,0,.02Z"/>
      </g>

      <text x="290" y="570" textAnchor="start" fontSize="19" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">OpenTofu</text>
      <text x="400" y="570" textAnchor="start" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="400" fill="rgba(255,255,255,0.7)">/ Terraform</text>
    </svg>
  );
};
