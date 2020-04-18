import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import PostItem from "../posts/PostItem";
import { getPosts } from "../../actions/post";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  post: { posts, loading1 },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  let postitems;
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();
  if (profile != null) {
    postitems = posts.map((post) => {
      if (post.text.toLowerCase().includes(profile.skills)) {
        return <PostItem key={post._id} post={post} />;
      }
    });
  }
  return loading1 && profile && loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary"> {t("dash.1")}</h1>
      <p className="lead">
        <i className="fas fa-user" /> {t("dash.2")} {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="posts">{postitems}</div>
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> {t("dash.3")}
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>{t("dash.4")}</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            {t("dash.5")}
          </Link>
          <Link to="/create-company-profile" className="btn btn-primary my-1">
            {t("dash.6")}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getPosts,
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
