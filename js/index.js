(function (document, fetch, location) {


  const parseRootPath = function () {
    const _pathname = location.pathname;
    const pathnameArr = _pathname.split('/');

    return pathnameArr.slice(0, pathnameArr.indexOf('index.html')).join('/');
  };
  
  const bindingHtml = function (element, filePath) {
    fetch(filePath)
    .then(response => {
      return response.text();
    })
    .then(htmlString => {
      element.innerHTML = htmlString;
    });
  };

  const bindingHeader = function (rootPath) {
    bindingHtml(document.getElementById('header'), rootPath.concat('/pages/header.html'));
  };

  const router = function (hash, rootPath) {
    hash = hash || '/';
    let compareUri = hash.indexOf('#') > -1 
                ? hash.split('#')[1] 
                : hash;

    const $contentsContainer = document.getElementById('contents');
    console.log(compareUri);
    switch (compareUri) {
      case '/':
        bindingHtml($contentsContainer, rootPath.concat('/pages/home.html'));
        break;
      case '/home':
        bindingHtml($contentsContainer, rootPath.concat('/pages/home.html'));
        break;
      case '/champion':
      case '/ranking':
      case '/duo':
      case '/multisearch':
      case '/community':
      case '/duo':
      case '/signin':
      case '/signup':
        bindingHtml($contentsContainer, rootPath.concat('/pages', compareUri, '.html'));
        break;
      default:
        bindingHtml($contentsContainer, rootPath.concat('/pages/404.html'));
        break;
    }
  };

  const init = function () {
    const rootPath = parseRootPath();
    router(location.hash, rootPath);
    bindingHeader(rootPath);
  };


  const registerEvent = function () {
    document.addEventListener('click', function (event) {
      const target = event.target;
      const _link = target.dataset.link;

      if (_link) {
        
        switch (target.tagName) {
          case 'A':
            location.href = location.pathname.concat('#', _link);
            location.reload();
            break;
        }
      }
    });
  };


  init();
  registerEvent();


})(document, fetch, location);