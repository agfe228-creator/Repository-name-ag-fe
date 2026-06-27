(function () {
  const DETAILS = {
    'js-array-map-example': {
      image: ['assets/js-map.svg', 'Array.map이 원본 배열을 새 배열로 변환하는 흐름 도식'],
      title: 'map 예제에서 꼭 확인할 부분',
      paragraphs: [
        'map은 배열의 항목 수를 유지한 채 각 값을 다른 형태로 바꿀 때 사용합니다. 상품 이름만 뽑거나, 숫자 배열을 가격 문구로 바꾸거나, React에서 목록 UI를 만들 때 자주 쓰입니다.',
        '초보자가 가장 자주 하는 실수는 map 안에서 값을 반환하지 않는 것입니다. 중괄호를 쓰면 return을 직접 적어야 하고, 소괄호나 한 줄 표현식을 쓰면 결과가 바로 반환된다는 차이를 확인해보세요.',
        '실습할 때는 원본 배열의 길이와 결과 배열의 길이가 같은지 먼저 봅니다. 조건에 맞는 항목만 남겨야 한다면 map이 아니라 filter가 더 적절합니다.'
      ],
      link: ['https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map', 'MDN Array.prototype.map 문서']
    },
    'git-github-difference': {
      image: ['assets/git-github.svg', 'Git 기록이 GitHub 원격 저장소로 올라가는 흐름 도식'],
      title: 'Git과 GitHub를 헷갈리지 않는 기준',
      paragraphs: [
        'Git은 내 컴퓨터에서 변경 이력을 기록하는 도구입니다. 인터넷 연결이 없어도 commit을 만들 수 있고, 언제 어떤 파일이 바뀌었는지 로컬에서 확인할 수 있습니다.',
        'GitHub는 Git으로 만든 기록을 온라인 저장소에 올려 공유하는 서비스입니다. 여러 사람이 같은 프로젝트를 확인하거나, Cloudflare 같은 배포 서비스와 연결할 때 GitHub가 중간 역할을 합니다.',
        '처음 배울 때는 add, commit까지가 Git의 영역이고, push 이후 다른 사람이 보는 저장소가 GitHub의 영역이라고 나누어 생각하면 흐름이 훨씬 덜 헷갈립니다.'
      ],
      link: ['https://docs.github.com/ko/get-started/start-your-journey/about-github-and-git', 'GitHub의 Git/GitHub 안내 문서']
    },
    'html-anchor-link-mistakes': {
      image: ['assets/html-anchor.svg', 'a 태그의 href, target, 링크 텍스트 역할 도식'],
      title: 'a 태그 오류를 줄이는 확인 순서',
      paragraphs: [
        'a 태그에서 가장 먼저 확인할 것은 href 값입니다. 주소가 비어 있거나 파일 경로가 틀리면 링크 텍스트가 보여도 원하는 페이지로 이동하지 않습니다.',
        '새 창으로 열어야 하는 외부 링크에는 target="_blank"를 사용할 수 있습니다. 이때 rel="noopener"를 함께 쓰면 새 창에서 기존 페이지를 제어하지 못하게 막을 수 있어 더 안전합니다.',
        '링크 텍스트도 중요합니다. “여기 클릭”처럼 의미가 약한 문구보다 “개인정보처리방침 보기”, “React 공식 문서 보기”처럼 이동할 내용을 바로 알 수 있는 표현이 좋습니다.'
      ],
      link: ['https://developer.mozilla.org/ko/docs/Web/HTML/Element/a', 'MDN a 요소 문서']
    },
    'js-function-declaration-arrow': {
      image: ['assets/js-function.svg', '함수 선언식과 화살표 함수가 같은 결과를 반환하는 비교 도식'],
      title: '두 함수 문법을 고르는 기준',
      paragraphs: [
        '함수 선언식은 이름이 분명하고 여러 곳에서 재사용할 함수에 잘 어울립니다. 파일 안에서 먼저 읽히는 도우미 함수나 계산 함수처럼 역할을 설명하기 좋습니다.',
        '화살표 함수는 짧은 콜백이나 배열 메서드 안에서 자주 사용합니다. map, filter, addEventListener처럼 함수가 다른 함수의 인자로 들어갈 때 코드가 간결해집니다.',
        '처음에는 둘 중 하나만 무조건 쓰기보다, 긴 함수는 선언식으로 읽기 쉽게 두고 짧은 콜백은 화살표 함수로 쓰는 식으로 기준을 잡으면 자연스럽습니다.'
      ],
      link: ['https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions', 'MDN 화살표 함수 문서']
    },
    'react-map-list-rendering': {
      image: ['assets/react-map.svg', 'React에서 배열 데이터가 JSX 목록으로 렌더링되는 흐름 도식'],
      title: 'React 목록 출력에서 key가 필요한 이유',
      paragraphs: [
        'React에서 map으로 목록을 만들 때는 각 항목을 구분할 key가 필요합니다. key는 화면에 보이는 값이 아니라 React가 어떤 항목이 바뀌었는지 추적하기 위한 표시입니다.',
        '배열의 순서가 바뀌거나 항목이 추가될 수 있다면 index를 key로 쓰는 것은 피하는 편이 좋습니다. 가능하면 데이터가 가진 id처럼 변하지 않는 값을 사용하세요.',
        '목록이 제대로 나오지 않을 때는 먼저 map 안에서 JSX를 반환하는지, key가 있는지, 데이터 배열이 실제로 비어 있지 않은지 순서대로 확인하면 원인을 좁히기 쉽습니다.'
      ],
      link: ['https://ko.react.dev/learn/rendering-lists', 'React 목록 렌더링 공식 문서']
    }
  };

  function currentSlug() {
    return new URLSearchParams(location.search).get('slug') || '';
  }

  function ensureStyle() {
    if (document.querySelector('style[data-ag-extra-polish]')) return;
    const style = document.createElement('style');
    style.setAttribute('data-ag-extra-polish', 'true');
    style.textContent = '.extra-reference a{color:var(--blue);font-weight:900}.article-visual img{max-width:100%;height:auto}';
    document.head.appendChild(style);
  }

  function applyDetail() {
    const detail = DETAILS[currentSlug()];
    const article = document.querySelector('.article-detail');
    if (!detail || !article) return;
    ensureStyle();

    if (!article.querySelector('[data-extra-visual="' + currentSlug() + '"]')) {
      const figure = document.createElement('figure');
      figure.className = 'article-visual';
      figure.setAttribute('data-extra-visual', currentSlug());
      figure.innerHTML = '<img src="' + detail.image[0] + '" alt="' + detail.image[1] + '" loading="lazy"><figcaption>' + detail.image[1] + '</figcaption>';
      const lead = article.querySelector('.lead');
      if (lead && lead.nextSibling) lead.parentNode.insertBefore(figure, lead.nextSibling);
      else article.insertBefore(figure, article.firstChild);
    }

    if (!article.querySelector('[data-extra-final="' + currentSlug() + '"]')) {
      const section = document.createElement('section');
      section.setAttribute('data-extra-final', currentSlug());
      section.innerHTML = '<h2>' + detail.title + '</h2>' + detail.paragraphs.map(function (text) { return '<p>' + text + '</p>'; }).join('');
      const docLink = article.querySelector('.doc-link');
      if (docLink) article.insertBefore(section, docLink);
      else article.appendChild(section);
    }

    if (!article.querySelector('[data-extra-official="' + currentSlug() + '"]')) {
      const p = document.createElement('p');
      p.className = 'doc-link extra-reference';
      p.setAttribute('data-extra-official', currentSlug());
      p.innerHTML = '추가 공식 참고 자료: <a href="' + detail.link[0] + '" target="_blank" rel="noopener">' + detail.link[1] + '</a>에서 관련 기준을 함께 확인할 수 있습니다.';
      const authorBox = article.querySelector('.author-box');
      if (authorBox) article.insertBefore(p, authorBox);
      else article.appendChild(p);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyDetail);
  else applyDetail();
  window.setTimeout(applyDetail, 60);
  window.setTimeout(applyDetail, 300);
  window.setTimeout(applyDetail, 900);
})();
