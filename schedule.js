(function () {
  function parsePublishDate(element) {
    const value = element.getAttribute('data-publish-at');
    if (!value) return null;

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function updateEmptyStates() {
    document.querySelectorAll('[data-scheduled-empty]').forEach(function (emptyState) {
      const selector = emptyState.getAttribute('data-scheduled-empty');
      const scope = selector ? document.querySelector(selector) : document;
      const hasVisiblePost = scope && scope.querySelector('[data-publish-at]:not([hidden])');
      emptyState.hidden = Boolean(hasVisiblePost);
    });
  }

  function revealPublishedItems() {
    const now = new Date();
    let nextPublishAt = null;

    document.querySelectorAll('[data-publish-at]').forEach(function (element) {
      const publishAt = parsePublishDate(element);
      if (!publishAt) return;

      if (publishAt > now) {
        element.hidden = true;
        element.setAttribute('aria-hidden', 'true');

        if (!nextPublishAt || publishAt < nextPublishAt) {
          nextPublishAt = publishAt;
        }
      } else {
        element.hidden = false;
        element.removeAttribute('aria-hidden');
      }
    });

    updateEmptyStates();

    if (nextPublishAt) {
      const delay = Math.min(nextPublishAt.getTime() - now.getTime() + 1000, 2147483647);
      window.setTimeout(revealPublishedItems, delay);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealPublishedItems);
  } else {
    revealPublishedItems();
  }
})();
