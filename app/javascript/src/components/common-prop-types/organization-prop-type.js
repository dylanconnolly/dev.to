import PropTypes from 'prop-types';

// the shape of this data is ..
// for an org
export const organizationPropType = PropTypes.shape({
  // org needs a number 
  id: PropTypes.number.isRequired,
  // org needs a name string
  name: PropTypes.string.isRequired,
  // org needs a slug string
  slug: PropTypes.string.isRequired,
  // needs a path for image 
  profile_image_90: PropTypes.string.isRequired,
});
