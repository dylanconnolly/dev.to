import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { ReadingList } from '../readingList/readingList';

function loadElement() {
  // getUserDataAndCsrfToken returns a current user, then the next method is chained using that returned user
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    // sets constant root equal to the reading-list element on the page)
    const root = document.getElementById('reading-list');
    // if reading-list does exist on the page, run the following block
    if (root) {
      // renders another component
      render(
        <ReadingList
          // passes data in available tags as the tags that a user follows
          availableTags={currentUser.followed_tag_names}
          // sets statusView set to the @view variable that was set in the controller
          statusView={root.dataset.view}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
