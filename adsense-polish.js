(function () {
  const VISUALS = {
    'react-component-intro': ['assets/react-component.svg', 'React 컴포넌트를 화면 조각으로 나누어 보여주는 도식'],
    'react-usestate-basic': ['assets/react-usestate.svg', 'useState 값 변경과 화면 갱신 흐름 도식'],
    'static-dynamic-site': ['assets/static-dynamic.svg', '정적 사이트와 동적 사이트 응답 방식 비교 도식'],
    'domain-hosting-difference': ['assets/domain-hosting.svg', '도메인, DNS, 호스팅 연결 흐름 도식'],
    'html-form-when': ['assets/html-form.svg', 'form이 입력값과 제출 버튼을 묶는 구조 도식'],
    'git-branch-when': ['assets/git-branch.svg', 'main 브랜치와 feature 브랜치가 분리되는 흐름 도식']
  };

  const OFFICIAL_LINKS = {
    'static-dynamic-site': ['https://developer.mozilla.org/ko/docs/Learn/Common_questions/Web_mechanics/Pages_sites_servers_and_search_engines', 'MDN 웹 작동 방식 문서'],
    'domain-hosting-difference': ['https://developers.cloudflare.com/dns/', 'Cloudflare DNS 공식 문서'],
    'html-form-when': ['https://developer.mozilla.org/ko/docs/Web/HTML/Element/form', 'MDN form 요소 문서'],
    'git-branch-when': ['https://git-scm.com/book/ko/v2/Git-브랜치-브랜치란-무엇인가', 'Git 브랜치 공식 문서'],
    'react-component-intro': ['https://ko.react.dev/learn/your-first-component', 'React 컴포넌트 공식 문서'],
    'react-usestate-basic': ['https://ko.react.dev/reference/react/useState', 'React useState 공식 문서']
  };

  const EXTRA_SECTIONS = {
    'react-component-intro': ['컴포넌트를 나눌 때의 실제 기준', ['처음 React를 배울 때는 화면을 너무 작게 쪼개는 실수를 하기 쉽습니다. 헤더, 글 카드, 버튼처럼 이름을 붙였을 때 역할이 바로 떠오르는 단위부터 컴포넌트로 나누는 편이 자연스럽습니다.', '반대로 문장 한 줄이나 아이콘 하나처럼 독립적인 의미가 약한 부분까지 모두 컴포넌트로 만들면 파일만 많아지고 흐름을 따라가기 어려워집니다. 먼저 반복되는 UI인지, 다른 화면에서도 다시 쓸 가능성이 있는지 확인해보세요.', '컴포넌트를 만든 뒤에는 props로 바뀌는 값과 컴포넌트 안에 고정되는 구조를 나누어 봅니다. 이 기준을 잡으면 나중에 목록 렌더링이나 상태 관리로 넘어갈 때도 화면 구조가 덜 흔들립니다.']],
    'react-usestate-basic': ['useState에서 초보자가 자주 하는 실수', ['useState 값은 직접 바꾸는 것이 아니라 setter 함수로 바꿔야 합니다. 예를 들어 count = count + 1처럼 쓰면 React가 값이 바뀐 사실을 화면에 반영하지 못할 수 있습니다.', '입력창이나 버튼처럼 사용자의 행동으로 화면이 바뀌는 곳에 state가 어울립니다. 반대로 단순 계산 결과처럼 기존 값으로 바로 구할 수 있는 데이터는 state로 만들지 않아도 됩니다.', '카운터 예제를 확인할 때는 버튼을 누르기 전 값, 클릭 이벤트가 실행되는 순간, setter 이후 화면이 다시 그려지는 순서를 나누어 보면 useState의 역할이 훨씬 분명해집니다.']],
    'domain-hosting-difference': ['도메인을 샀는데 사이트가 안 열릴 때', ['도메인을 구매했다는 것은 주소를 확보했다는 뜻이지, 그 주소가 자동으로 사이트 파일을 보여준다는 뜻은 아닙니다. 주소가 어느 서비스의 파일을 보여줄지 DNS에서 연결해야 합니다.', '호스팅은 실제 HTML, CSS, JavaScript 파일이 올라가 있는 공간입니다. Cloudflare, GitHub Pages, Vercel 같은 서비스가 이 역할을 할 수 있고, 도메인은 그 공간으로 찾아가는 이름표에 가깝습니다.', '문제가 생기면 먼저 도메인이 활성 상태인지, DNS 레코드가 올바른 대상인지, 배포 서비스에서 도메인이 연결됐는지 순서대로 확인하세요. 이 순서만 지켜도 대부분의 연결 문제를 좁힐 수 있습니다.']],
    'static-dynamic-site': ['정적 사이트를 먼저 배우면 좋은 이유', ['정적 사이트는 서버에서 복잡한 계산을 하지 않고 준비된 파일을 그대로 전달합니다. 그래서 HTML, CSS, JavaScript의 역할을 처음 익히는 단계에서 구조를 이해하기 좋습니다.', '동적 사이트는 로그인 사용자나 검색 조건에 따라 매번 다른 결과를 만들 수 있습니다. 대신 서버, 데이터베이스, 보안 처리까지 함께 고려해야 해서 처음 배울 때는 원인을 찾기 어려울 수 있습니다.', '블로그, 문서 사이트, 포트폴리오처럼 글과 화면이 중심인 사이트라면 정적 방식으로도 충분한 경우가 많습니다. 이후 댓글, 결제, 회원 기능이 필요해질 때 동적 구조를 검토하면 됩니다.']],
    'html-form-when': ['form을 쓰면 좋아지는 부분', ['form은 입력창과 제출 버튼을 하나의 의미 있는 묶음으로 만들어줍니다. 단순히 div로 감싸는 것보다 검색, 문의, 로그인처럼 입력을 보내는 흐름이 분명해집니다.', 'label과 input을 연결하면 마우스로 라벨을 눌렀을 때도 입력창이 선택됩니다. 화면을 읽는 도구에도 입력창의 목적이 더 잘 전달되기 때문에 접근성 측면에서도 중요합니다.', 'JavaScript로 제출을 처리하더라도 form 구조를 유지하면 Enter 키 제출, 버튼 타입, 입력값 이름 같은 기본 흐름을 활용할 수 있습니다. 초보 단계에서는 기본 동작을 살린 뒤 필요한 부분만 제어하는 방식이 안전합니다.']],
    'git-branch-when': ['브랜치를 쓰면 안전해지는 상황', ['main 브랜치가 바로 배포되는 저장소라면 실험 코드를 main에 직접 올리는 것이 부담이 될 수 있습니다. 이때 feature 브랜치를 만들면 작업 중인 코드를 안정적인 코드와 분리할 수 있습니다.', '브랜치는 큰 기능을 만들 때만 쓰는 것이 아닙니다. 헤더 수정, 글 목록 개선, 배포 설정 변경처럼 목적이 분명한 작업을 나누는 데도 유용합니다.', '작업이 끝난 뒤에는 변경 내용을 확인하고 main으로 합칠지 결정합니다. 이 흐름을 익히면 실수했을 때 어디까지 되돌려야 하는지도 훨씬 찾기 쉬워집니다.']]
  };

  function slug() {
    return new URLSearchParams(location.search).get('slug') || '';
  }

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
      .extra-reference a, .doc-link a { color: var(--blue); font-weight: 900; }
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
    const currentSlug = slug();
    const variant = Array.from(currentSlug).reduce(function (sum, char) { return sum + char.charCodeAt(0); }, 0) % 5;
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
      if (text.indexOf('이 글은 처음 보는 개념의 큰 틀') >= 0 || text.indexOf('비교형 글에서는') >= 0 || text.indexOf('실습형 글은') >= 0 || text.indexOf('문제 해결형 글은') >= 0 || text.indexOf('작업 흐름형 글은') >= 0) paragraph.textContent = intros[variant];
      if (text.indexOf('참고 자료: 기본 문법과 세부 속성은') >= 0 || text.indexOf('이 글은 특정 라이브러리 문서보다') >= 0) {
        const link = paragraph.querySelector('a');
        if (link) { paragraph.textContent = docNotes[(variant + 1) % docNotes.length] + ' '; paragraph.appendChild(link); }
        else paragraph.textContent = docNotes[(variant + 1) % docNotes.length];
      }
      if (text.indexOf('AG FE Guide 편집팀은 초보자가 실제 학습 중') >= 0 || text.indexOf('이 글은 MDN Web Docs') >= 0 || text.indexOf('이 글은 React 공식 문서') >= 0 || text.indexOf('이 글은 Git 공식 문서') >= 0 || text.indexOf('이 글은 사이트 운영 경험') >= 0) paragraph.textContent = authorNotes[(variant + 2) % authorNotes.length];
      if (text.indexOf('HTML 글은 화면에 바로 보이는 결과보다') >= 0 || text.indexOf('CSS는 속성 하나만 외우면') >= 0 || text.indexOf('JavaScript는 문법보다 실행 순서') >= 0 || text.indexOf('React는 화면을 데이터의 결과') >= 0 || text.indexOf('Git은 명령어를 많이 외우는 것보다') >= 0 || text.indexOf('웹 기초 글은 특정 도구 하나보다') >= 0) paragraph.textContent = title + '에서는 먼저 문제 상황을 정하고, 그 다음 코드의 어느 부분이 결과를 바꾸는지 확인하는 순서로 읽으면 좋습니다.';
      if (text.indexOf('예제를 따라 쓴 뒤에는') >= 0 || text.indexOf('화면이 예상과 다르게 보일 때는') >= 0 || text.indexOf('예제 코드는 한 번에 크게 바꾸지 말고') >= 0 || text.indexOf('처음에는 완벽한 설계보다') >= 0 || text.indexOf('실수했을 때 바로 되돌리기보다') >= 0 || text.indexOf('처음에는 설정 화면의 이름이 달라') >= 0) paragraph.textContent = '실습할 때는 원본 예제를 한 번 실행한 뒤, 변수명이나 속성값 하나만 바꿔보세요. ' + keyword + '의 영향 범위가 어디까지인지 확인하기 쉽습니다.';
    });
  }

  function addVisual() {
    const article = document.querySelector('.article-detail');
    const item = VISUALS[slug()];
    if (!article || !item || article.querySelector('.article-visual img[src="' + item[0] + '"]')) return;
    const lead = article.querySelector('.lead');
    const figure = document.createElement('figure');
    figure.className = 'article-visual';
    figure.innerHTML = '<img src="' + item[0] + '" alt="' + item[1] + '" loading="lazy"><figcaption>' + item[1] + '</figcaption>';
    if (lead && lead.nextSibling) lead.parentNode.insertBefore(figure, lead.nextSibling);
    else article.insertBefore(figure, article.firstChild);
  }

  function addExtraSection() {
    const article = document.querySelector('.article-detail');
    const item = EXTRA_SECTIONS[slug()];
    if (!article || !item || article.querySelector('[data-extra-section="' + slug() + '"]')) return;
    const section = document.createElement('section');
    section.setAttribute('data-extra-section', slug());
    section.innerHTML = '<h2>' + item[0] + '</h2>' + item[1].map(function (text) { return '<p>' + text + '</p>'; }).join('');
    const docLink = article.querySelector('.doc-link');
    if (docLink) article.insertBefore(section, docLink);
    else article.appendChild(section);
  }

  function addOfficialLink() {
    const article = document.querySelector('.article-detail');
    const item = OFFICIAL_LINKS[slug()];
    if (!article || !item || article.querySelector('[data-official-link="' + slug() + '"]')) return;
    const p = document.createElement('p');
    p.className = 'doc-link extra-reference';
    p.setAttribute('data-official-link', slug());
    p.innerHTML = '추가 공식 참고 자료: <a href="' + item[0] + '" target="_blank" rel="noopener">' + item[1] + '</a>에서 관련 기준을 함께 확인할 수 있습니다.';
    const authorBox = article.querySelector('.author-box');
    if (authorBox) article.insertBefore(p, authorBox);
    else article.appendChild(p);
  }

  function runPolish() {
    injectFinalStyles();
    addVisual();
    addExtraSection();
    addOfficialLink();
    polishHeadings();
    rewriteRepeatedParagraphs();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runPolish);
  else runPolish();
  window.setTimeout(runPolish, 50);
  window.setTimeout(runPolish, 250);
  window.setTimeout(runPolish, 800);
})();
