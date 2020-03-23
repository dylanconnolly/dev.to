//require validations
import PropTypes from 'prop-types';

// put the tag prop type in there
import { tagPropTypes } from './tag-prop-types';
// org validations
import { organizationPropType } from './organization-prop-type';

export const articleSnippetResultPropTypes = PropTypes.shape({
  body_text: PropTypes.shape({
    matchLevel: PropTypes.oneOf(['full', 'none']),
    value: PropTypes.string.isRequired,
  }),
  comments_blob: PropTypes.shape({
    matchLevel: PropTypes.oneOf(['full', 'none']),
    value: PropTypes.string.isRequired,
  }),
});

// something about this shape thing 
// this is shape - key value pairs for what is what
export const articlePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  cloudinary_video_url: PropTypes.string,
  video_duration_in_minutes: PropTypes.number,
  type_of: PropTypes.oneOf(['podcast_episodes']),
  class_name: PropTypes.oneOf(['PodcastEpisode', 'User', 'Article']),
  flare_tag: tagPropTypes,
  //
  // check that it's an array and aray of strings 
  tag_list: PropTypes.arrayOf(PropTypes.string),
  cached_tag_list_array: PropTypes.arrayOf(PropTypes.string),
  podcast: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }),
  user_id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  organization: organizationPropType,
  _snippetResult: articleSnippetResultPropTypes,
  positive_reactions_count: PropTypes.number,
  reactions_count: PropTypes.number,
  comments_count: PropTypes.number,
});
