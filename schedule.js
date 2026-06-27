(function () {
  const POST_SCHEDULE_OVERRIDES = {
    31: '2026-06-30T19:00:00+09:00',
    32: '2026-07-02T19:00:00+09:00',
    33: '2026-07-04T19:00:00+09:00',
    34: '2026-07-06T19:00:00+09:00',
    35: '2026-07-08T19:00:00+09:00',
    36: '2026-07-10T19:00:00+09:00',
    37: '2026-07-12T19:00:00+09:00',
    38: '2026-07-14T19:00:00+09:00',
    39: '2026-07-16T19:00:00+09:00',
    40: '2026-07-18T19:00:00+09:00'
  };

  function injectPolishStyles() {
    if (document.querySelector('style[data-ag-polish]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-ag-polish', 'true');
    style.textContent = `
      .article-visual {
        margin: 26px 0 34px;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
      }
      .article-visual img {
        display: block;
        width: 100%;
        height: auto;
      }
      .article-visual figcaption {
        padding: 10px 14px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 14px;
        font-weight: 700;
      }
      .comparison-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-top: 16px;
      }
      .comparison-grid h3 {
        margin: 0 0 10px;
        font-size: 18px;
      }
      .comparison-grid pre {
        min-height: 170px;
        margin: 0;
      }
      @media (max-width: 760px) {
        .category-inner {
          gap: 10px;
          padding: 0 2px 4px;
          scrollbar-width: thin;
        }
        .category-inner a {
          padding: 14px 0 12px;
          font-size: 14px;
          white-space: nowrap;
        }
        .menu-icon {
          width: 16px;
          margin-right: 2px;
        }
        .comparison-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getPostData() {
    try {
      if (Array.isArray(AG_POSTS)) return AG_POSTS;
    } catch (error) {
      return null;
    }

    return null;
  }

  function applyPostScheduleOverrides() {
    const posts = getPostData();
    if (!posts) return;

    posts.forEach(function (post) {
      if (post && POST_SCHEDULE_OVERRIDES[post.seq]) {
        post.publishAt = POST_SCHEDULE_OVERRIDES[post.seq];
      }
    });
  }

  injectPolishStyles();
  applyPostScheduleOverrides();

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
