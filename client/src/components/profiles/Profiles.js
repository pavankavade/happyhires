import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getCurrentProfile, getProfiles } from "../../actions/profile";

const Profiles = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading }
}) => {
  const [formData, setFormData] = useState({ search: "", select: "" });

  const onChange = e =>
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
      profileItems = profiles.map(profile => {
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
          if (
            profile.skills
              .toString()
              .toLowerCase()
              .includes(search)
          ) {
            return !profile.isWorker ? null : (
              <ProfileItem key={profile._id} profile={profile} />
            );
          }
        }
        if (select == "name") {
          if (
            profile.skills
              .toString()
              .toLowerCase()
              .includes(search)
          ) {
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
      profileItems = <h4>No profiles found...</h4>;
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Workers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            Workers
          </p>

          <input
            type="text"
            placeholder="* Search"
            name="search"
            value={search}
            onChange={e => onChange(e)}
            required
          />

          <select name="select" value="select" onChange={e => onChange(e)}>
            <option selected value="select">
              Search By
            </option>
            <option value="bio">Bio</option>
            <option value="location">Location</option>
            <option value="skills">Skill</option>
          </select>

          {profileItems}
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Profiles
);
