import React from 'react';

export function SheetData({ name, position, value, children }) {
  return (<div style={{
    border: '1px solid black', position: 'absolute', whiteSpace: 'nowrap',
    left: `${position?.x || 0}%`, top: `${position?.y || 0}%`,
    width: `${position?.w || 100}%`, height: `${position?.h || 100}%`,
    textAlign: `${position?.align || 'left'}`, fontWeight: `${position?.weight || 700}`,
    fontSize: `${position?.size || 100}%`, lineHeight: `${position?.size || 100}%`,
  }}>
    {position?.component && <position.component value={value} />}
    {!position?.component && (position?.transform || ((x) => x))(value || name, name, position)}
    {children}
  </div>);
}
