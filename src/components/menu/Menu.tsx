import { LeftColLockup } from "../menu/LeftColLockup";
import { RightColLockup } from "../menu/RightColLockup";
import { ToggleWindowButton } from "../ToggleWindowButton";

export const Menu = () => (
  <div className="menu desktop-window">
    <div className="menu-heading">
      <div
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/jendowns/image/upload/v1763962575/jen.computer/images/gray.webp")',
          border: "2px solid white",
          height: "4rem",
          width: "4rem",
          backgroundPosition: "center",
          backgroundSize: "100%",
          borderRadius: "3px",
          boxShadow: "3px 3px 12px rgba(4, 4, 4, 0.5)",
        }}
      ></div>
      <span
        style={{
          fontSize: "1.7rem",
          fontStyle: "normal",
          color: "white",
          textShadow: "1px 1px 3px #000000bb",
          fontWeight: "normal",
          alignSelf: "center",
        }}
      >
        jen.computer
      </span>
    </div>
    <div className="menu-content">
      <div style={{ padding: "0.5rem 1rem" }}>
        <ul>
          <li>
            <ToggleWindowButton id="email">
              <LeftColLockup
                boldText="E-mail"
                lightText="Contact me"
                icon={
                  <img
                    src="https://res.cloudinary.com/jendowns/image/upload/v1763886508/jen.computer/images/email.png"
                    style={{ height: "50px", width: "50px", border: "none" }}
                    alt="email icon"
                  />
                }
              />
            </ToggleWindowButton>
          </li>
        </ul>
      </div>
      <div
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#D2E6FB",
          borderLeft: "1px solid #A8BDD3",
        }}
      >
        <ul>
          <li>
            <ToggleWindowButton id="help">
              <RightColLockup
                icon={
                  <img
                    src="https://res.cloudinary.com/jendowns/image/upload/v1763965114/jen.computer/images/winxp-help.png"
                    style={{ height: "26px", width: "26px", border: "none" }}
                    alt=""
                  />
                }
                lightText="Help and Support"
              />
            </ToggleWindowButton>
          </li>
        </ul>
      </div>
    </div>
    <div className="menu-footer"></div>
  </div>
);
