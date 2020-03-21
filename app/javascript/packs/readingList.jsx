/* Preact provides an h() function that turns JSX into virtual DOM elements */
/* Preact also provides a render() function that creates a DOM tree from that virtual DOM */
import { h, render } from 'preact';
/* Imports a function that gets user data and that user's CSRF (cross site request forgery) token */
import { getUserDataAndCsrfToken } from '../chat/util';
/* Imports readingList/readingList.jsx */
import { ReadingList } from '../readingList/readingList';

/* Invokes a function called loadElement that calls getUserDataAndCsrfToken function */
function loadElement() {
  /* get getUserDataAndCsrfToken returns a promise/returns the current user. */
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    /* Sets a variable called root to the reading list element on the DOM */
    const root = document.getElementById('reading-list');
    /* If the root (the reading list element) exists, render the ReadingList */
    if (root) {
      render(
        <ReadingList
          /* The ReadingList element contains availableTags (the tags that the current user follows) and the status of the articles on the reading list. The status is either archived or valid. */
          availableTags={currentUser.followed_tag_names}
          statusView={root.dataset.view}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

/* When a user hovers over 'change', InstantClick will prefetch the page while the user is hovering over the hyperlink
so that when they click on it, it's instantaneous. In this case, it prefetches the ReadingList element */
window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
