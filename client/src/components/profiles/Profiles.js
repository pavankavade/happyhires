import React, { Fragment, useEffect } from "react";
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
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile =>
                !profile.isWorker ? null : (
                  <ProfileItem key={profile._id} profile={profile} />
                )
              )
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
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
