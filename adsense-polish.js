(function () {
  function injectFinalStyles() {
    if (document.querySelector('style[data-ag-adsense-polish]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-ag-adsense-polish', 'true');
    style.textContent = `
      html, body {
        max-width: 100%;
        overflow-x: hidden;
      }
      .article-detail,
      .page-copy,
      .post-card,
      .category-card {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .article-detail pre,
      .comparison-grid pre {
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .article-detail code {
        white-space: pre;
        word-break: normal;
      }
      .article-detail table {
        display: block;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .comparison-grid > div {
        min-width: 0;
      }
      @media (max-width: 760px) {
        .article-detail pre,
        .comparison-grid pre {
          padding: 14px;
          font-size: 13px;
        }
        .article-detail code {
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function cleanHeadingText(text) {
    return text
      .replace(/차이을/g, '차이를')
      .replace(/무엇인가을/g, '무엇인지')
      .replace(/언제 사용할까을/g, '언제 쓰는지')
      .replace(/언제 사용해야 할까을/g, '언제 쓰는지')
      .replace(/언제 사용할까를/g, '언제 쓰는지를')
      .replace(/사용법과 예제 실습 흐름/g, '사용법을 예제로 확인하기')
      .replace(/기본 사용법과 예제 실습 흐름/g, '기본 사용법을 예제로 확인하기')
      .replace(/차이의 선택 기준/g, '차이를 고르는 기준')
      .replace(/차이 쉽게의 선택 기준/g, '차이를 고르는 기준')
      .replace(/작업 순서로 보기/g, '작업 흐름으로 보기')
      .replace(/쉽게  /g, '쉽게 ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function uniqueFallback(index, original) {
    const fallbacks = [
      '핵심 개념을 실제 상황에 적용하기',
      '예제 코드에서 확인할 부분',
      '초보자가 자주 놓치는 실수',
      '브라우저에서 결과 확인하기',
      '마지막으로 점검할 기준'
    ];
    return fallbacks[index % fallbacks.length] || original + ' 다시 보기';
  }

  function polishHeadings() {
    const article = document.querySelector('.article-detail');
    if (!article) return;

    const seen = new Map();
    article.querySelectorAll('h2').forEach(function (heading, index) {
      const cleaned = cleanHeadingText(heading.textContent || '');
      const count = seen.get(cleaned) || 0;

      if (count > 0) {
        heading.textContent = uniqueFallback(index, cleaned);
      } else {
        heading.textContent = cleaned;
      }

      seen.set(cleaned, count + 1);
    });
  }

  function runPolish() {
    injectFinalStyles();
    polishHeadings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPolish);
  } else {
    runPolish();
  }

  window.setTimeout(runPolish, 50);
  window.setTimeout(runPolish, 250);
})();
