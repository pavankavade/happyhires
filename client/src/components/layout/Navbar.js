import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles"> {t("happy.2")}</Link>
      </li>
      <li>
        <Link to="/posts"> {t("happy.3")}</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm"> {t("happy.4")}</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"> {t("happy.5")}</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles"> {t("happy.2")}</Link>
      </li>
      <li>
        <Link to="/register"> {t("signup.4")}</Link>
      </li>
      <li>
        <Link to="/login"> {t("sign.5")}</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          {t("happy.1")}
        </Link>
      </h1>
      <div class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {t("happy.6")}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <button>
            {" "}
            <a onClick={() => handleClick("en")}> {t("happy.7")}</a>
          </button>

          <button>
            <a onClick={() => handleClick("hin")}> {t("happy.8")}</a>
          </button>
        </div>
      </div>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
