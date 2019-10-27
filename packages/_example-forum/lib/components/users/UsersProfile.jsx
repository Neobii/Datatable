import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router-dom';
import mapProps from 'recompose/mapProps';
import get from 'lodash/get';

const UsersProfile = ({ currentUser, loading, document: user }) => {
  if (loading) {
    return (
      <div className="page users-profile">
        <Components.Loading />
      </div>
    );
  } else if (!user) {
    // console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return (
      <div className="page users-profile">
        <FormattedMessage id="app.404" />
      </div>
    );
  } else {
    const terms = { view: 'userPosts', userId: user._id };

    return (
      <div className="page users-profile">
        <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        <h2 className="page-title">{Users.getDisplayName(user)}</h2>
        {user.htmlBio ? <div dangerouslySetInnerHTML={{ __html: user.htmlBio }} /> : null}
        <ul>
          {user.twitterUsername ? (
            <li>
              <a href={'http://twitter.com/' + user.twitterUsername}>@{user.twitterUsername}</a>
            </li>
          ) : null}
          {user.website ? (
            <li>
              <a href={user.website}>{user.website}</a>
            </li>
          ) : null}
          {Users.canUpdate({ collection: Users, document: user, user: currentUser }) && (
            <li>
              <Link to={Users.getEditUrl(user)}>
                <FormattedMessage id="users.edit_account" />
              </Link>
            </li>
          )}
        </ul>
        <h3>
          <FormattedMessage id="users.posts" />
        </h3>
        <Components.PostsList terms={terms} showHeader={false} />
      </div>
    );
  }
};

UsersProfile.displayName = 'UsersProfile';

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

// make router slug param available as `slug` prop
const mapPropsFunction = props => ({ ...props, slug: get(props, 'match.params.slug') });

registerComponent({
  name: 'UsersProfile',
  component: UsersProfile,
  hocs: [mapProps(mapPropsFunction), withCurrentUser, [withDocument, options]],
});
