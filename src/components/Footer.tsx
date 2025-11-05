export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-segment" />
      <div className="footer-segment">
        <span>
          <small>
            Copyright &copy; {year} <a href="https://jendowns.com/">Jen Downs</a>
          </small>
        </span>
      </div>
    </div>
  );
};
