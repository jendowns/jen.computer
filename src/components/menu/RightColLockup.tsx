interface IRightColLockup {
  icon: React.ReactNode;
  boldText?: string;
  lightText?: string;
}

export const RightColLockup = (props: IRightColLockup) => {
  const { icon, boldText, lightText } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
      {icon}
      <div
        style={{
          display: 'flex',
          flexDirection: "column",
          alignItems: 'start',
          lineHeight: '1.2rem',
        }}
      >
        {boldText && <strong style={{ fontSize: "1.1rem", color: '#000055' }}>{boldText}</strong>}
        {lightText && <span style={{ fontSize: "1.1rem", color: '#000055' }}>{lightText}</span>}
      </div>
    </div>
  );
};
