import React from "react";

export default function PhotoBlog() {
  const eireRef = React.useRef<HTMLDivElement>(null);
  const viennaRef = React.useRef<HTMLDivElement>(null);
  const parisRef = React.useRef<HTMLDivElement>(null);
  const kyotoRef = React.useRef<HTMLDivElement>(null);
  const scotlandRef = React.useRef<HTMLDivElement>(null);

  const handleJump = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });

  const jumpMenu = (
    <div className="jump-to">
      <div>
        <span>jump to: </span>
        <ul>
          <li>
            <button
              className="link-styled-button"
              onClick={() => handleJump(eireRef)}
            >
              Éire 24
            </button>
            <span aria-hidden>{" |"}</span>
          </li>
          <li>
            <button
              className="link-styled-button"
              onClick={() => handleJump(viennaRef)}
            >
              Vienna 23
            </button>
            <span aria-hidden>{" |"}</span>
          </li>
          <li>
            <button
              className="link-styled-button"
              onClick={() => handleJump(parisRef)}
            >
              Paris 23
            </button>
            <span aria-hidden>{" |"}</span>
          </li>
          <li>
            <button
              className="link-styled-button"
              onClick={() => handleJump(kyotoRef)}
            >
              Kyoto 23
            </button>
            <span aria-hidden>{" |"}</span>
          </li>
          <li>
            <button
              className="link-styled-button"
              onClick={() => handleJump(scotlandRef)}
            >
              Scotland 19
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="grid-wrapper">
      {jumpMenu}
      <div style={{ overflowY: "scroll" }}>
        <div className="grid grid-padding-top grid-green" ref={eireRef}>
          <div className="col0-2 row0-1 photo-blog-heading">
            <h2 style={{ fontSize: "2.5rem" }}>
              <em>Éire</em>
            </h2>
            <span style={{ fontSize: "0.9rem" }}>Spring 2024</span>
          </div>
          <div className="col2-3 row1-1">
            <span>
              we drove across Ireland from Dublin to County Clare
              <br />& stayed at Dromoland Castle.
            </span>
            <br />
            <span></span>
          </div>
        </div>
        <div className="grid grid-padding-bottom grid-green">
          <div className="col0-2 row0-2">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886519/jen.computer/images/ireland-castle.webp"
              style={{ objectPosition: "center bottom" }}
              alt="A tower of Dromoland castle with blue sky in the background."
              loading="eager"
            />
          </div>
          <div className="col2-3 row0-4">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886510/jen.computer/images/ireland-cliffs.webp"
              style={{ objectPosition: "center bottom" }}
              alt="The Cliffs of Moher stretch far into the distance. The sheerness of the cliffs drop to the ocean below. The edge of the cliff is full of deep green grass and moss. There's a structure in the distance; it looks like a singular lookout tower, painted white."
              loading="eager"
            />
          </div>
          <div
            className="col0-2 row2-2 grid-caption"
            style={{ textAlign: "right" }}
          >
            <span className="hide-on-mobile">Dromoland Castle ↑</span>
            <br className="hide-on-mobile" />
            <span className="hide-on-mobile">The Cliffs of Moher →</span>
            <br />
            <br />
            <span>
              looking over the Cliffs of Moher
              <br />
              felt like being at the edge of the world.
              <br />
              it was so beautiful and terrifying.
            </span>
          </div>
        </div>
        <div className="grid grid-padding-top grid-bluegray" ref={viennaRef}>
          <div className="col0-2 row0-1 photo-blog-heading">
            <h2 style={{ fontSize: "2.5rem" }}>
              <em>Vienna</em>
            </h2>
            <span style={{ fontSize: "0.9rem" }}>Winter 2023</span>
          </div>
          <div className="col2-3 row1-2">
            <span>
              we spent our time marvelling at art & architecture
              <br />
              and riding trains.
              <br />
              <br />
              we saw Klimt (!!) at Upper Belvedere Palace
              <br />
              and so many incredible medieval pieces in the Lower Belvedere
              gallery.
            </span>
          </div>
        </div>
        <div className="grid grid-padding-bottom grid-bluegray">
          <div className="col0-3 row0-3">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886514/jen.computer/images/vienna-tram.webp"
              style={{ objectPosition: "center bottom" }}
              alt="A parked Vienna tram with a white top half and a red bottom half. Trees are reflected in it's windows. The tram is almost adorable, to be honest."
              loading="lazy"
            />
          </div>
          <div className="col3-2 row0-2">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886517/jen.computer/images/vienna-street.webp"
              style={{ objectPosition: "center bottom" }}
              alt="A rainy street in Vienna showing a bright yellow bicycle in the foreground and a line of bicycles along the street. In the background there's a tram station were a few people are waiting. There are some older apartment-style buildings painted marigold, baby blue, and coral pink."
              loading="lazy"
            />
          </div>
          <div className="col3-2 row2-2 grid-caption">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886510/jen.computer/images/vienna-belvedere.webp"
              style={{ objectPosition: "center bottom" }}
              alt="An angled perspective of part of the fresco in the Marble Hall in Upper Belvedere Palace."
              loading="lazy"
            />
          </div>
          <div
            className="col1-2 row3-1 hide-on-mobile"
            style={{ textAlign: "right" }}
          >
            <span>Tram transportation in Vienna ↑</span>
            <br />
            <span>Marble Hall, Upper Belvedere Palace →</span>
          </div>
        </div>
        <div className="grid grid-padding-top grid-yellow" ref={parisRef}>
          <div className="col0-2 row0-1 photo-blog-heading">
            <h2 style={{ fontSize: "2.5rem" }}>
              <em>Paris</em>
            </h2>
            <span style={{ fontSize: "0.9rem" }}>Winter 2023</span>
          </div>
          <div className="col2-3 row1-1">
            <span>
              we didn't spend much time in Paris, unfortunately. but these
              rooftop views from our hotel balcony were so beautiful.
            </span>
          </div>
        </div>
        <div className="grid grid-padding-bottom grid-yellow">
          <div className="col2-3 row0-3">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886507/jen.computer/images/paris-rooftops2.webp"
              style={{ objectPosition: "left bottom" }}
              alt="Rooftops over Paris. A ferriswheel is visible in the distance."
              loading="lazy"
            />
          </div>
          <div className="col0-2 row1-4">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886520/jen.computer/images/paris-rooftops1.webp"
              style={{ objectPosition: "left bottom" }}
              alt="Rooftops over Paris in the afternoon. The Eiffel tower is just visible in the distance."
              loading="lazy"
            />
          </div>
          <div className="col2-3 row3-2 grid-caption">
            <span className="hide-on-mobile">↑ rooftops over Paris</span>
            <br className="hide-on-mobile" />
            <span className="hide-on-mobile">
              ← and look! more rooftops over Paris
            </span>
            <br />
            <br />
            it made me feel so small to look across an <em>old</em> city like
            Paris. i was overwhelmed thinking about how much history had taken
            place in these streets, in these buildings, in this city.
          </div>
        </div>
        <div className="grid grid-padding-top grid-orange" ref={kyotoRef}>
          <div className="col0-2 row0-1 photo-blog-heading">
            <h2 style={{ fontSize: "2.5rem" }}>
              <em>Kyoto</em>
            </h2>
            <span style={{ fontSize: "0.9rem" }}>Fall 2023</span>
          </div>
          <div className="col2-3 row1-1">
            <span>
              we stayed in the historic Higashiyama district and took trains to
              explore Kyoto, including Nijō Castle and the Arashiyama district.
            </span>
          </div>
        </div>
        <div className="grid grid-orange" style={{ paddingBottom: "1rem" }}>
          <div className="col0-3 row0-3">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886509/jen.computer/images/kyoto-temple.webp"
              style={{ objectPosition: "right bottom" }}
              alt="The roof structure of the Niomon gate at the Kiyomizu-dera in Kyoto. The gate itself is huge, approximately 2 stories tall. The perspective of the photo is focused on the bright orange-ish red paint and the details for the traditional wooden roof, which looks especially beautiful in the sunlight and with a blue sky in the background."
              loading="lazy"
            />
          </div>
          <div className="col3-2 row0-4">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886516/jen.computer/images/kyoto-river.webp"
              style={{ objectPosition: "center" }}
              alt="A forested area along the Katsura River in the Arashiyama region of Kyoto. The water in the river is a bit low and exposes some of the rocks and sand along parts of the river bank, but there are still people on row boats in the distance. Thick canopies of trees line both sides of the river."
              loading="lazy"
            />
          </div>
          <div
            className="col1-2 row3-1 hide-on-mobile"
            style={{ textAlign: "right" }}
          >
            <span>Niomon gate, Kiyomizu-dera ↑</span>
            <br />
            <span>Katsura River bend →</span>
          </div>
        </div>
        <div className="grid grid-padding-bottom grid-orange">
          <div className="col1-3 row0-3">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886515/jen.computer/images/kyoto-boats.webp"
              style={{ objectPosition: "center bottom" }}
              alt="The far bank of the Katsura River, facing the Toketsukyo bridge. It's a sunny day, lot of people are crossing the bridge. The water is peaceful and blue, and there are mountains in the far distance. In the foreground, there are dozens of blue row boats lined up. In the water near the bridge, there are 3 teenagers in a row boat being intercepted by a man in a yellow motorboat."
              loading="lazy"
            />
          </div>
          <div
            className="col4-1 row0-1 hide-on-mobile"
            style={{ textAlign: "left" }}
          >
            <span>
              ← Toketsukyo Bridge,
              <br />
              Katsura River
            </span>
            <br />
            <br />
            <span>
              three teens took their row boat too close
              to the bridge, so an older man rushed over to redirect them.
            </span>
          </div>
        </div>
        <div className="grid grid-padding-top grid-green" ref={scotlandRef}>
          <div className="col0-2 row0-1 photo-blog-heading">
            <h2 style={{ fontSize: "2.5rem" }}>
              <em>Scotland</em>
            </h2>
            <span style={{ fontSize: "0.9rem" }}>Spring 2019</span>
          </div>
          <div className="col2-2 row1-1">
            <span>
              we stayed in Inverness and then drove up to Loch Ness and Glencoe
              to hike around the moorland.
            </span>
          </div>
        </div>
        <div className="grid grid-padding-bottom grid-green">
          <div className="col2-3 row0-3">
            <img
              src="https://res.cloudinary.com/jendowns/image/upload/v1763886515/jen.computer/images/glencoe.webp"
              style={{ objectPosition: "center bottom" }}
              alt="The Cliffs of Moher stretch far into the distance. The sheerness of the cliffs drop to the ocean below. The edge of the cliff is full of deep green grass and moss. There's a structure in the distance; it looks like a singular lookout tower, painted white."
              loading="eager"
            />
          </div>
          <div
            className="col0-2 row1-2 grid-caption"
            style={{ textAlign: "right" }}
          >
            <span className="hide-on-mobile">Glencoe →</span>
            <br />
            <br />
            <span>
              I didn't have a fancy camera for this trip, so unfortunately this
              muddied shot from my iphone SE doesn't do this scenery nearly
              enough justice. this valley near Ballachulish was breathtaking.
            </span>
          </div>
        </div>
      </div>

      <div className="notes">
        <span>
          please don't repost or reuse my photos. thank you for understanding. ♥
        </span>
      </div>
    </div>
  );
}
