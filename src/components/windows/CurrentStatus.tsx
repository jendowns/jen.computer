const List = ({ items, date }: { items: React.ReactNode[]; date: string }) => {
  const things = (
    <>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h2
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span aria-hidden>⠂⠄⠄⠂*⠂⠄&nbsp;&nbsp;</span>
        <span style={{ flexShrink: 0 }}>{date}</span>
        <span aria-hidden>&nbsp;&nbsp;⠄⠂*⠂⠄⠄⠂</span>
      </h2>
      <ul className="list">{things}</ul>
    </div>
  );
};

export const CurrentStatus = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      padding: "24px",
      backgroundColor: "#f9f8f4"
    }}
  >
    <List
      date="Winter 2025/2026"
      items={[
        <span>baby-proofing my apartment</span>,
        <span>
          redesigning my blog
        </span>,
        <span>trying to stay warm</span>
      ]}
    />
    <List
      date="Fall 2025"
      items={[
        <span>
          particpating in <a href="https://weird.jen.dev">Weird Web October</a>
        </span>,
        <span>
          refactoring this website
        </span>,
      ]}
    />
    <List
      date="Summer 2025"
      items={[
        <span>caring for my newborn son ♥</span>,
        <span lang="fr">
          practiquer le français{" "}
          <small>
            (parce que je préfère jouer à{" "}
            <a
              href="https://en.wikipedia.org/wiki/Clair_Obscur:_Expedition_33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clair Obscur
            </a>{" "}
            avec les sous-titres français)
          </small>
        </span>,
        <span>
          listening to{" "}
          <a
            href="https://americanprestige.supportingcast.fm/welcome-to-the-crusades-the-first-crusade"
            target="_blank"
            rel="noopener noreferrer"
          >
            Welcome to the Crusades
          </a>
        </span>,
        <span>getting back on my bike</span>,
      ]}
    />
    <List
      date="Summer 2025"
      items={[
        <span>growing a human</span>,
        <span>
          reading:
          <ul className="list">
            <li>
              <a
                href="https://www.goodreads.com/book/show/223436601-careless-people"
                target="_blank"
                rel="noopener noreferrer"
              >
                Careless People
              </a>
            </li>
            <li>
              <a
                href="https://www.goodreads.com/book/show/210407880-the-mechanic-and-the-luddite"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Mechanic and the Luddite
              </a>
            </li>
          </ul>
        </span>,
        <span>
          playing:
          <ul className="list">
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Kingdom_Come:_Deliverance_II"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kingdom Come: Deliverance II
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Clair_Obscur:_Expedition_33"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clair Obscur: Expedition 33
              </a>
            </li>
          </ul>
        </span>,
        <span>building silly things like this website</span>,
        <span>watching cherry blossoms</span>,
      ]}
    />
  </div>
);
