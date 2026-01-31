export const ProviderModulesDiagram = () => {
  return (
    <svg
      viewBox="0 0 820 280"
      width="100%"
      role="img"
      aria-label="Diagram showing how providers and modules produce JSON schema, which a code generator converts into language-specific bindings"
      style={{ maxWidth: 820, margin: "0 auto", display: "block" }}
    >
      <title>Provider and Module Code Generation</title>

      <defs>
        <marker id="pmArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
        </marker>
      </defs>

      {/* Provider box */}
      <rect x="20" y="60" width="140" height="55" rx="8" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="90" y="93" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#15803D">Provider</text>

      {/* Module box */}
      <rect x="20" y="145" width="140" height="55" rx="8" fill="#f0fdf4" stroke="#16A34A" strokeWidth="1.5" />
      <text x="90" y="178" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#15803D">Module</text>

      {/* Lines from Provider and Module merging */}
      <line x1="160" y1="88" x2="200" y2="88" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="200" y1="88" x2="200" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="160" y1="173" x2="200" y2="173" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="200" y1="173" x2="200" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="200" y1="130" x2="250" y2="130" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />

      {/* JSON Schema box */}
      <rect x="260" y="100" width="150" height="60" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="335" y="136" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">JSON Schema</text>

      {/* Arrow to Code Generator */}
      <line x1="410" y1="130" x2="470" y2="130" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />

      {/* Code Generator box */}
      <rect x="480" y="95" width="170" height="70" rx="8" fill="#16A34A" />
      <text x="565" y="136" textAnchor="middle" fontSize="15" fontFamily="system-ui, sans-serif" fontWeight="700" fill="white">Code Generator</text>

      {/* Fan-out lines to language bindings */}
      <line x1="650" y1="130" x2="690" y2="130" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="690" y1="20" x2="690" y2="250" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="690" y1="20" x2="720" y2="20" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />
      <line x1="690" y1="78" x2="720" y2="78" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />
      <line x1="690" y1="135" x2="720" y2="135" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />
      <line x1="690" y1="192" x2="720" y2="192" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />
      <line x1="690" y1="250" x2="720" y2="250" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#pmArrow)" />

      {/* Language binding boxes */}
      <rect x="730" y="2" width="80" height="36" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="770" y="25" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">TypeScript</text>

      <rect x="730" y="60" width="80" height="36" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="770" y="83" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Python</text>

      <rect x="730" y="117" width="80" height="36" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="770" y="140" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Java</text>

      <rect x="730" y="174" width="80" height="36" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="770" y="197" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">C#</text>

      <rect x="730" y="232" width="80" height="36" rx="6" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
      <text x="770" y="255" textAnchor="middle" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600" fill="#374151">Go</text>
    </svg>
  );
};
