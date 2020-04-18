import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getCurrentProfile, getProfiles } from "../../actions/profile";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Profiles = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading },
}) => {
  const [formData, setFormData] = useState({ search: "", select: "" });

  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const { t } = useTranslation();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { search, select } = formData;

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  let profileItems;

  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    //let slct = profile.select;
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => {
        if (select == "location") {
          if (profile.location.toLowerCase().includes(search)) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }
        if (select == "bio") {
          if (profile.bio.toLowerCase().includes(search)) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }
        if (select == "skills") {
          if (profile.skills.toString().toLowerCase().includes(search)) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }
        if (select == "name") {
          if (profile.skills.toString().toLowerCase().includes(search)) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }

        if (select == "") {
          if (profile.bio.toLowerCase().includes(search)) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }
      });
    } else {
      profileItems = <h4>{t("profi.2")}</h4>;
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary"> {t("profi.3")}</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> {t("profi.4")}
          </p>

          <div class="s01">
            <form>
              <div class="inner-form">
                <div class="input-field first-wrap">
                  <input
                    type="text"
                    placeholder={t("post.8")}
                    name="search"
                    value={search}
                    id="search"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div class="input-field second-wrap">
                  <select
                    name="select"
                    className="browser-default custom-select"
                    value="select"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected value="select">
                      {t("profi.5")}
                    </option>
                    <option value="bio"> {t("profi.6")}</option>
                    <option value="location"> {t("profi.7")}</option>
                    <option value="skills"> {t("profi.8")}</option>
                  </select>{" "}
                </div>
                <div class="input-field third-wrap">
                  <button class="btn-search" type="button">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {profileItems}
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Profiles
);
