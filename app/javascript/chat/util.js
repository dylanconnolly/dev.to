import 'intersection-observer';

export function getCsrfToken() {
  const element = document.querySelector(`meta[name='csrf-token']`);

  return element !== null ? element.content : undefined;
}

const getWaitOnUserDataHandler = ({ resolve, reject, waitTime = 20 }) => {
  let totalTimeWaiting = 0;

  return function waitingOnUserData() {
    if (totalTimeWaiting === 3000) {
      reject(new Error("Couldn't find user data on page."));
      return;
    }

    // grabs the CSRF token from the webpage and sets it to a constant
    const csrfToken = getCsrfToken(document);
    // grabs the user that is passed as a dataset on the webpage and stores it as a constant
    const { user } = document.body.dataset;

    // if both return true, resolve with the currentUser and CSRF token
    if (user && csrfToken !== undefined) {
      const currentUser = JSON.parse(user);

      resolve({ currentUser, csrfToken });
      return;
    }

    totalTimeWaiting += waitTime;
    setTimeout(waitingOnUserData, waitTime);
  };
};

// creates a promise that either resolves or rejects and stops the process
export function getUserDataAndCsrfToken() {
  return new Promise((resolve, reject) => {
    getWaitOnUserDataHandler({ resolve, reject })();
  });
}

export function scrollToBottom() {
  const element = document.getElementById('messagelist');
  element.scrollTop = element.scrollHeight;
}

export function setupObserver(callback) {
  const sentinel = document.querySelector('#messagelist__sentinel');
  const somethingObserver = new IntersectionObserver(callback, {
    threshold: [0, 1],
  });
  somethingObserver.observe(sentinel);
}

export function hideMessages(messages, userId) {
  const cleanedMessages = Object.keys(messages).reduce(
    (accumulator, channelId) => {
      const newMessages = messages[channelId].map(message => {
        if (message.user_id === userId) {
          const messageClone = Object.assign({ type: 'hidden' }, message);
          messageClone.message = '<message removed>';
          messageClone.messageColor = 'lightgray';
          return messageClone;
        }
        return message;
      });
      return { ...accumulator, [channelId]: newMessages };
    },
    {},
  );
  return cleanedMessages;
}

export function adjustTimestamp(timestamp) {
  let time = new Date(timestamp);
  const options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  time = new Intl.DateTimeFormat('en-US', options).format(time);
  return time;
}
