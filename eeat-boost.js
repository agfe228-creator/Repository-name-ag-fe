(function () {
  const AUTHOR = {
    name: 'AG FE Guide 편집팀',
    description: '프론트엔드 입문자가 HTML, CSS, JavaScript, React, Git의 기초를 차분히 이해할 수 있도록 예제 중심으로 글을 정리합니다.',
    policyUrl: './terms.html'
  };

  const CATEGORY_NOTES = {
    html: ['HTML 글은 화면에 바로 보이는 결과보다 문서 구조가 먼저입니다. 태그의 의미를 이해하면 CSS와 JavaScript를 붙일 때도 어디를 선택해야 하는지 훨씬 분명해집니다.', '예제를 따라 쓴 뒤에는 브라우저에서 보이는 모습뿐 아니라 개발자 도구의 Elements 패널에서 태그가 의도한 구조로 들어갔는지 함께 확인하는 것이 좋습니다.'],
    css: ['CSS는 속성 하나만 외우면 비슷한 문제에서 다시 막히기 쉽습니다. 어떤 요소가 부모이고 어떤 요소가 자식인지, 공간이 안쪽인지 바깥쪽인지 먼저 나누어 보는 습관이 중요합니다.', '화면이 예상과 다르게 보일 때는 값을 더 크게 주기보다 적용 대상, 우선순위, 부모 크기, display 값을 순서대로 확인하면 원인을 빨리 좁힐 수 있습니다.'],
    javascript: ['JavaScript는 문법보다 실행 순서가 중요합니다. 값이 언제 만들어지고, 어떤 함수가 언제 실행되고, 화면 요소를 언제 찾는지 확인하면 에러를 줄일 수 있습니다.', '예제 코드는 한 번에 크게 바꾸지 말고 변수 이름, 배열 항목, 조건문처럼 작은 부분부터 바꿔보면 동작 원리를 더 잘 이해할 수 있습니다.'],
    react: ['React는 화면을 데이터의 결과로 바라보는 연습이 필요합니다. 어떤 값이 props로 들어오고 어떤 값이 state로 바뀌는지 구분하면 컴포넌트 구조가 훨씬 선명해집니다.', '처음에는 완벽한 설계보다 작은 컴포넌트를 직접 만들고, 버튼 클릭이나 입력값 변경처럼 눈에 보이는 상태 변화부터 확인하는 방식이 좋습니다.'],
    git: ['Git은 명령어를 많이 외우는 것보다 작업 흐름을 이해하는 것이 먼저입니다. 수정한 파일을 확인하고, 기록할 파일을 고르고, 의미 있는 메시지로 커밋하는 순서가 기본입니다.', '실수했을 때 바로 되돌리기보다 현재 상태를 먼저 확인하는 습관이 안전합니다. status와 log를 자주 보는 것만으로도 많은 혼란을 줄일 수 있습니다.'],
    web: ['웹 기초 글은 특정 도구 하나보다 전체 흐름을 이해하는 데 초점을 둡니다. 도메인, 배포, HTTPS처럼 서로 연결되는 개념은 실제 사이트 운영에서 함께 움직입니다.', '처음에는 설정 화면의 이름이 달라 보여도 역할을 기준으로 보면 이해가 쉽습니다. 주소를 연결하는지, 파일을 배포하는지, 보안을 처리하는지 나누어 확인하세요.']
  };

  const TYPE_NOTES = {
    '개념 설명형': '이 글은 처음 보는 개념의 큰 틀을 잡는 데 초점을 둡니다. 세부 문법을 모두 외우기보다 왜 필요한지와 언제 쓰는지를 먼저 확인하세요.',
    '차이 비교형': '비교형 글에서는 두 개념을 외워서 구분하기보다 실제 선택 기준을 잡는 것이 중요합니다. 표를 본 뒤 예제에서 어떤 차이가 생기는지 함께 확인하세요.',
    '실습 예제형': '실습형 글은 코드를 그대로 따라 쓴 뒤 한 줄씩 바꿔보는 과정이 핵심입니다. 결과가 달라지는 지점을 찾으면 개념이 더 오래 남습니다.',
    '문제 해결형': '문제 해결형 글은 증상에서 바로 결론으로 뛰기보다 원인을 하나씩 제거하는 방식으로 읽는 것이 좋습니다.',
    '실수 정리형': '실수 정리형 글은 이미 막힌 상황에서 빠르게 원인을 찾을 수 있도록 구성했습니다. 본문보다 체크리스트를 먼저 훑어봐도 좋습니다.',
    '작업 흐름형': '작업 흐름형 글은 순서를 놓치면 같은 명령어도 다르게 느껴질 수 있습니다. 각 단계가 다음 단계에 어떤 영향을 주는지 확인하세요.',
    '단계별 가이드형': '단계별 가이드형 글은 실제 화면이나 파일 상태를 확인하며 천천히 진행하는 것이 좋습니다. 중간 결과를 확인하지 않고 넘어가면 마지막에 원인을 찾기 어렵습니다.',
    '체크리스트형': '체크리스트형 글은 빠르게 점검하기 위한 글입니다. 이미 알고 있는 항목도 실제 파일이나 화면에서 한 번씩 확인하는 방식으로 활용하세요.'
  };

  const EXAMPLE_GUIDES = {
    html: { title: '브라우저에서 구조 확인하기', body: ['HTML 예제는 화면 결과만 보면 태그의 역할이 흐릿해질 수 있습니다. 개발자 도구에서 부모와 자식 태그가 의도한 순서로 들어갔는지 확인해보세요.', '링크, 이미지, 폼처럼 다른 기능과 연결되는 태그는 경로와 속성 이름을 함께 보는 것이 좋습니다. 작은 오타 하나가 전체 동작을 막을 수 있습니다.'] },
    css: { title: '스타일이 적용되는 범위 확인하기', body: ['CSS 예제는 어떤 선택자가 어떤 요소에 적용되는지 먼저 확인해야 합니다. 개발자 도구의 Styles 패널에서 실제로 적용된 속성과 덮어쓴 속성을 비교해보세요.', '여백이나 정렬 문제는 속성값만 바꾸기보다 부모 요소의 크기, display 값, box-sizing을 함께 확인하면 원인을 더 빨리 찾을 수 있습니다.'] },
    javascript: { title: '값과 실행 순서 따라가기', body: ['JavaScript 예제는 console.log로 중간 값을 확인하면서 읽으면 흐름이 선명해집니다. 변수에 어떤 값이 들어가는지, 함수가 언제 실행되는지 순서대로 따라가보세요.', 'DOM을 다루는 코드는 HTML 요소가 만들어진 뒤 실행되는지도 중요합니다. 선택 결과가 null이면 선택자와 스크립트 위치를 함께 확인하세요.'] },
    react: { title: '상태 변화가 화면에 반영되는지 보기', body: ['React 예제는 값이 props인지 state인지 구분하면서 읽는 것이 좋습니다. 화면이 바뀌는 지점은 대부분 state 변경이나 부모에서 내려온 값과 연결됩니다.', '이벤트 예제는 함수가 렌더링 중 바로 실행되는지, 클릭이나 입력 시점에 실행되는지 확인하세요. 이 차이만 잡아도 초보 오류가 크게 줄어듭니다.'] },
    git: { title: '명령 전후 상태 확인하기', body: ['Git 예제는 명령어 자체보다 명령 전후 상태가 중요합니다. status, log처럼 현재 상태를 보여주는 명령을 함께 보면 흐름을 놓치지 않습니다.', '커밋과 배포 관련 글은 실제 파일이 어디에 있고 어느 브랜치가 기준인지 확인해야 합니다. 저장소 화면과 로컬 작업 상태가 다르면 결과가 달라질 수 있습니다.'] },
    web: { title: '설정이 연결되는 흐름 확인하기', body: ['웹 기초 예제는 도메인, HTTPS, 배포처럼 여러 설정이 이어지는 경우가 많습니다. 주소가 어디를 가리키고, 어떤 서비스가 파일을 제공하는지 나누어 보세요.', '문제가 생기면 마지막 화면만 보지 말고 DNS, 배포 상태, 브라우저 주소를 차례대로 확인하는 것이 좋습니다.'] }
  };

  function sourceName(post) {
    if (!post.doc) return '사이트 운영 경험과 웹 기본 원칙';
    if (post.doc === 'react') return 'React 공식 문서';
    if (post.doc === 'git') return 'Git 공식 문서';
    if (post.doc === 'github') return 'GitHub 공식 문서';
    return 'MDN Web Docs';
  }

  function headingFor(post, fallback) {
    const category = AG_CATEGORIES[post.category] || '웹 개발';
    if (post.type && post.type.indexOf('비교') >= 0) return category + '에서 헷갈리기 쉬운 기준';
    if (post.type && post.type.indexOf('실습') >= 0) return '예제로 따라 해볼 핵심 흐름';
    if (post.type && post.type.indexOf('문제') >= 0) return '문제가 생겼을 때 확인할 순서';
    if (post.type && post.type.indexOf('실수') >= 0) return '초보자가 자주 놓치는 부분';
    if (post.type && post.type.indexOf('흐름') >= 0) return '작업 흐름을 이해하는 방법';
    return fallback;
  }

  function addJsonLd(post) {
    document.querySelectorAll('script[data-ag-jsonld]').forEach(function (node) { node.remove(); });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-ag-jsonld', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.publishAt,
      dateModified: '2026-06-27T09:00:00+09:00',
      author: { '@type': 'Organization', name: AUTHOR.name },
      publisher: { '@type': 'Organization', name: 'AG FE Guide' },
      mainEntityOfPage: location.href
    });
    document.head.appendChild(script);
  }

  function enhancedDetails(post) {
    const notes = CATEGORY_NOTES[post.category] || [];
    const typeNote = TYPE_NOTES[post.type] || '이 글은 초보자가 실제로 막히는 지점을 기준으로 구성했습니다. 예제와 체크리스트를 함께 보면서 순서대로 확인하세요.';
    return `<section class="eeat-box">
      <h2>${headingFor(post, '실제로 읽을 때 중요한 기준')}</h2>
      <p>${typeNote}</p>
      ${notes.map(function (note) { return '<p>' + note + '</p>'; }).join('')}
    </section>`;
  }

  function exampleGuide(post) {
    const guide = EXAMPLE_GUIDES[post.category] || EXAMPLE_GUIDES.web;
    return `<section><h2>${guide.title}</h2>${guide.body.map(function (text) { return '<p>' + text + '</p>'; }).join('')}</section>`;
  }

  function authorBox(post) {
    return `<section class="author-box">
      <h2>검토와 보완 기준</h2>
      <p><strong>${AUTHOR.name}</strong>은 초보자가 실제 학습 중 자주 만나는 오류와 헷갈리는 용어를 기준으로 글을 구성합니다.</p>
      <p>이 글은 ${sourceName(post)}와 브라우저에서 직접 확인 가능한 예제를 함께 참고해 작성했으며, 공개 후 문서나 도구 화면이 바뀌면 내용을 보완합니다.</p>
      <p class="meta">최초 공개: ${agFormatDate(post.publishAt)} · 최근 검토: 2026. 6. 27.</p>
    </section>`;
  }

  function betterDocLink(post) {
    if (!post.doc) {
      return `<p class="doc-link">이 글은 특정 라이브러리 문서보다 웹사이트 운영 흐름을 이해하는 데 초점을 맞춘 기초 설명입니다. 실제 설정은 사용하는 배포 서비스의 안내 화면도 함께 확인하세요.</p>`;
    }
    return `<p class="doc-link">참고 자료: 기본 문법과 세부 속성은 <a href="${AG_DOCS[post.doc]}" target="_blank" rel="noopener">${sourceName(post)}</a>에서 함께 확인할 수 있습니다. 글의 예제는 초보자 이해를 위해 핵심만 줄여서 구성했습니다.</p>`;
  }

  window.agRenderPostPage = function () {
    const root = document.querySelector('[data-post-detail]');
    if (!root) return;
    const slug = new URLSearchParams(location.search).get('slug');
    const post = agPostBySlug(slug);
    if (!post) {
      root.innerHTML = '<div class="page-copy"><h1>글을 찾을 수 없습니다</h1><p>주소가 올바른지 다시 확인해주세요.</p></div>';
      document.title = '글을 찾을 수 없습니다 | AG FE Guide';
      return;
    }
    if (!agPublished(post)) {
      root.innerHTML = '<div class="page-copy"><span class="meta">예약 글</span><h1>아직 공개 전인 글입니다</h1><p>이 글은 ' + agFormatDate(post.publishAt) + ' 이후 공개됩니다.</p></div>';
      document.title = '예약 글 | AG FE Guide';
      return;
    }

    const related = (post.related || []).map(agPostBySeq).filter(Boolean).filter(agPublished).slice(0, 2);
    const compare = post.compare ? `<section><h2>${post.title.indexOf('차이') >= 0 ? '한눈에 보는 차이' : '비교해서 확인하기'}</h2><table><tbody>${post.compare.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + agEscape(cell) + '</td>'; }).join('') + '</tr>'; }).join('')}</tbody></table></section>` : '';
    const checklist = post.checklist ? `<section><h2>마지막 점검 목록</h2><ul class="check-list">${post.checklist.map(function (item) { return '<li>' + agEscape(item) + '</li>'; }).join('')}</ul></section>` : '';
    const relatedHtml = related.length ? `<section class="related-posts"><h2>함께 보면 좋은 글</h2><ul>${related.map(function (item) { return '<li><a href="' + agPostUrl(item) + '">' + item.title + '</a></li>'; }).join('')}</ul></section>` : '';

    root.innerHTML = `<article class="article-detail">
      <span class="meta">${AG_CATEGORIES[post.category]} · ${post.type} · ${agFormatDate(post.publishAt)}</span>
      <h1>${post.title}</h1>
      <p class="lead">${post.problem}</p>
      <section><h2>${headingFor(post, '먼저 이해할 점')}</h2><p>${post.summary}</p>${post.details.map(function (text) { return '<p>' + text + '</p>'; }).join('')}</section>
      ${enhancedDetails(post)}
      ${compare}
      <section><h2>${post.codeTitle} 예제</h2><pre><code>${agEscape(post.code)}</code></pre></section>
      ${exampleGuide(post)}
      ${checklist}
      ${betterDocLink(post)}
      ${authorBox(post)}
      ${relatedHtml}
    </article>`;

    document.title = post.title + ' | AG FE Guide';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', post.summary);
    addJsonLd(post);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.agRenderPostPage);
  } else {
    window.agRenderPostPage();
  }
})();
