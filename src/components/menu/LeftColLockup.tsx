interface ILeftColLockup {
  icon: React.ReactNode;
  boldText: string;
  lightText: string;
}

export const LeftColLockup = (props: ILeftColLockup) => {
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
        <strong style={{ fontSize: "1.2rem", color: '#333' }}>{boldText}</strong>
        <span style={{ color: "#666", textShadow: 'none', fontSize: '0.9rem', fontStyle: 'normal', fontWeight: 400 }}>{lightText}</span>
      </div>
    </div>
  );
};
