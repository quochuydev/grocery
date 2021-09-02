import config from "../utils/config";

export default function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <a href="#" className="logo">
            <i className="fas fa-shopping-basket" />
            Groco
          </a>
          <p>{config.desciption}</p>
          <div className="share">
            <a href={config.facebookUrl} className="btn fab fa-facebook-f" />
            <a href={config.twitterUrl} className="btn fab fa-twitter" />
            <a href={config.instagramUrl} className="btn fab fa-instagram" />
            <a href={config.linkedinUrl} className="btn fab fa-linkedin" />
          </div>
        </div>
        <div className="box">
          <h3>Our contact</h3>
          <div className="links">
            <a href="#">Phone number: {config.phoneNumber}</a>
            <a href="#">Email: {config.email}</a>
            <a href="#">Address: {config.address}</a>
          </div>
        </div>
        <div className="box">
          <h3>Quick links</h3>
          <div className="links">
            <a href="#">home</a>
            <a href="#">category</a>
            <a href="#">product</a>
            <a href="#">deal</a>
            <a href="#">contact</a>
          </div>
        </div>
      </div>
      <h1 className="credit">
        created by <span> quochuydev </span> | all rights reserved!
      </h1>
    </section>
  );
}
