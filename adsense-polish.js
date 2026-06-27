(function () {
  function injectFinalStyles() {
    if (document.querySelector('style[data-ag-adsense-polish]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-ag-adsense-polish', 'true');
    style.textContent = `
      html, body { max-width: 100%; overflow-x: hidden; }
      .article-detail, .page-copy, .post-card, .category-card { min-width: 0; overflow-wrap: anywhere; }
      .article-detail pre, .comparison-grid pre { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .article-detail code { white-space: pre; word-break: normal; }
      .article-detail table { display: block; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .comparison-grid > div { min-width: 0; }
      @media (max-width: 760px) {
        .article-detail pre, .comparison-grid pre { padding: 14px; font-size: 13px; }
        .article-detail code { font-size: 13px; }
      }
    `;
    document.head.appendChild(style);
  }

  function currentTitle() {
    const title = document.querySelector('.article-detail h1');
    return title ? title.textContent.trim() : '프론트엔드 기초';
  }

  function currentCategory() {
    const meta = document.querySelector('.article-detail > .meta');
    if (!meta) return '웹 개발';
    return (meta.textContent.split('·')[0] || '웹 개발').trim();
  }

  function topicKeyword(title) {
    return title
      .replace(/쉽게/g, '')
      .replace(/정리/g, '')
      .replace(/이해하기/g, '')
      .replace(/기본 사용법과 예제/g, '기본 사용법')
      .replace(/란 무엇인가/g, '')
      .replace(/는 언제 사용할까/g, ' 사용 시점')
      .replace(/는 언제 사용해야 할까/g, ' 사용 기준')
      .trim();
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

  function specificFallback(index, keyword) {
    const fallbacks = [
      keyword + '을 실제 화면에서 확인하기',
      keyword + ' 예제에서 바꿔볼 부분',
      keyword + '을 처음 배울 때 흔한 실수',
      keyword + ' 결과를 브라우저에서 점검하기',
      keyword + '을 다음 학습과 연결하기'
    ];
    return fallbacks[index % fallbacks.length];
  }

  function polishHeadings() {
    const article = document.querySelector('.article-detail');
    if (!article) return;

    const keyword = topicKeyword(currentTitle());
    const seen = new Map();
    article.querySelectorAll('h2').forEach(function (heading, index) {
      let cleaned = cleanHeadingText(heading.textContent || '');

      if (/예제 코드에서 확인할 부분/.test(cleaned)) cleaned = keyword + ' 코드에서 먼저 볼 부분';
      if (/검토와 보완 기준/.test(cleaned)) cleaned = keyword + ' 검토 기준';
      if (/참고 자료/.test(cleaned)) cleaned = keyword + ' 참고 문서';

      const count = seen.get(cleaned) || 0;
      heading.textContent = count > 0 ? specificFallback(index, keyword) : cleaned;
      seen.set(cleaned, count + 1);
    });
  }

  function rewriteRepeatedParagraphs() {
    const article = document.querySelector('.article-detail');
    if (!article) return;

    const title = currentTitle();
    const keyword = topicKeyword(title);
    const category = currentCategory();
    const slug = new URLSearchParams(location.search).get('slug') || '';
    const variant = Array.from(slug).reduce(function (sum, char) { return sum + char.charCodeAt(0); }, 0) % 5;

    const intros = [
      title + '은 처음에는 용어보다 쓰임새를 먼저 잡는 편이 좋습니다. 이 글에서는 ' + keyword + '을 실제 코드에서 어떻게 확인하는지에 초점을 맞춥니다.',
      category + '를 배우다 보면 ' + keyword + '에서 비슷한 개념이 섞여 보일 수 있습니다. 아래 예제는 그 차이를 눈으로 확인하도록 구성했습니다.',
      title + '을 익힐 때는 정답 코드를 외우기보다 왜 그런 순서가 필요한지 보는 것이 중요합니다. 작은 예제부터 바꿔보면 흐름이 더 선명해집니다.',
      '이 글의 핵심은 ' + keyword + '을 실제 작업 중 어떤 기준으로 판단하느냐입니다. 문법 설명과 함께 흔히 막히는 지점을 같이 정리했습니다.',
      keyword + '은 초보자가 한 번쯤 헷갈리는 주제입니다. 결과 화면, 코드 위치, 브라우저 확인 순서를 나누어 보면 실수를 줄일 수 있습니다.'
    ];

    const docNotes = [
      keyword + '의 세부 문법은 공식 문서에서 확인하되, 이 글에서는 초보자가 바로 적용할 수 있는 최소 예제로 좁혀 설명했습니다.',
      '공식 문서는 전체 규칙을 확인할 때 유용합니다. 먼저 이 글의 예제로 ' + keyword + '의 흐름을 잡고, 필요한 속성이나 옵션을 문서에서 이어서 보면 좋습니다.',
      keyword + '은 브라우저와 도구 버전에 따라 세부 표현이 달라질 수 있습니다. 그래서 글에서는 원리와 확인 순서를 중심으로 정리했습니다.',
      '아래 참고 링크는 원문 기준을 확인하기 위한 자료입니다. 예제 자체는 입문자가 실습하기 쉽도록 ' + title + ' 상황에 맞게 줄였습니다.',
      '문법을 더 깊게 확인해야 할 때는 공식 문서를 함께 보는 것이 안전합니다. 이 글은 그 전에 ' + keyword + '의 판단 기준을 잡는 데 목적이 있습니다.'
    ];

    const authorNotes = [
      '이 글은 ' + title + '을 처음 접하는 사람이 실제 코드에서 바로 확인할 수 있도록 예제, 비교, 점검 순서 중심으로 정리했습니다.',
      '작성 기준은 단순 요약이 아니라 초보자가 실습 중 만나는 오류를 줄이는 것입니다. ' + keyword + '에서 특히 헷갈리는 지점을 우선 설명했습니다.',
      '검토 과정에서는 예제 코드가 너무 길어지지 않으면서도 ' + title + '의 핵심이 드러나는지 확인했습니다.',
      '이 문서는 ' + category + ' 입문자가 다음 개념으로 넘어가기 전에 ' + keyword + '을 스스로 점검할 수 있게 구성했습니다.',
      '예제와 설명은 실제 브라우저에서 확인 가능한 흐름을 기준으로 작성했습니다. ' + keyword + '의 결과가 예상과 다를 때 다시 볼 수 있는 기준을 남겼습니다.'
    ];

    article.querySelectorAll('p').forEach(function (paragraph) {
      const text = paragraph.textContent.trim();

      if (text.indexOf('이 글은 처음 보는 개념의 큰 틀') >= 0 ||
          text.indexOf('비교형 글에서는') >= 0 ||
          text.indexOf('실습형 글은') >= 0 ||
          text.indexOf('문제 해결형 글은') >= 0 ||
          text.indexOf('작업 흐름형 글은') >= 0) {
        paragraph.textContent = intros[variant];
      }

      if (text.indexOf('참고 자료: 기본 문법과 세부 속성은') >= 0 ||
          text.indexOf('이 글은 특정 라이브러리 문서보다') >= 0) {
        const link = paragraph.querySelector('a');
        if (link) {
          paragraph.textContent = docNotes[(variant + 1) % docNotes.length] + ' ';
          paragraph.appendChild(link);
        } else {
          paragraph.textContent = docNotes[(variant + 1) % docNotes.length];
        }
      }

      if (text.indexOf('AG FE Guide 편집팀은 초보자가 실제 학습 중') >= 0 ||
          text.indexOf('이 글은 MDN Web Docs') >= 0 ||
          text.indexOf('이 글은 React 공식 문서') >= 0 ||
          text.indexOf('이 글은 Git 공식 문서') >= 0 ||
          text.indexOf('이 글은 사이트 운영 경험') >= 0) {
        paragraph.textContent = authorNotes[(variant + 2) % authorNotes.length];
      }

      if (text.indexOf('HTML 글은 화면에 바로 보이는 결과보다') >= 0 ||
          text.indexOf('CSS는 속성 하나만 외우면') >= 0 ||
          text.indexOf('JavaScript는 문법보다 실행 순서') >= 0 ||
          text.indexOf('React는 화면을 데이터의 결과') >= 0 ||
          text.indexOf('Git은 명령어를 많이 외우는 것보다') >= 0 ||
          text.indexOf('웹 기초 글은 특정 도구 하나보다') >= 0) {
        paragraph.textContent = title + '에서는 먼저 문제 상황을 정하고, 그 다음 코드의 어느 부분이 결과를 바꾸는지 확인하는 순서로 읽으면 좋습니다.';
      }

      if (text.indexOf('예제를 따라 쓴 뒤에는') >= 0 ||
          text.indexOf('화면이 예상과 다르게 보일 때는') >= 0 ||
          text.indexOf('예제 코드는 한 번에 크게 바꾸지 말고') >= 0 ||
          text.indexOf('처음에는 완벽한 설계보다') >= 0 ||
          text.indexOf('실수했을 때 바로 되돌리기보다') >= 0 ||
          text.indexOf('처음에는 설정 화면의 이름이 달라') >= 0) {
        paragraph.textContent = '실습할 때는 원본 예제를 한 번 실행한 뒤, 변수명이나 속성값 하나만 바꿔보세요. ' + keyword + '의 영향 범위가 어디까지인지 확인하기 쉽습니다.';
      }
    });
  }

  function runPolish() {
    injectFinalStyles();
    polishHeadings();
    rewriteRepeatedParagraphs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPolish);
  } else {
    runPolish();
  }

  window.setTimeout(runPolish, 50);
  window.setTimeout(runPolish, 250);
  window.setTimeout(runPolish, 800);
})();
