(function () {
  // 1. 删除折叠块 details 标签下的所有class和id属性字段
  function stripDetailsAttrs(root) {
    var detailsList = (root && root.querySelectorAll) ? root.querySelectorAll('details') : [];
    detailsList.forEach(function (details) {
      var nodes = details.querySelectorAll('*');
      nodes.forEach(function (el) {
        if (el.hasAttribute('class')) el.removeAttribute('class');
        if (el.hasAttribute('id')) el.removeAttribute('id');
        if (el.hasAttribute('data-lake-index-type')) el.removeAttribute('data-lake-index-type');
      });
    });
  }

  // 2. 图片增强：居中显示 + 点击放大查看
  function enhanceImages(root) {
    var scope = root || document;
    // 选择正文中的图片；避免重复绑定
    var imgs = Array.from(scope.querySelectorAll('.md-content img:not([data-zoom-bound])'));
    imgs.forEach(function (img) {
      img.setAttribute('data-zoom-bound', '1');
      // 设置光标提示可放大
      try { img.style.cursor = 'zoom-in'; } catch (e) { }

      var anchor = img.closest('a');
      var target = anchor || img;
      // 若图片在链接内，覆盖默认跳转为放大预览
      target.addEventListener('click', function (ev) {
        if (ev) { ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); }
        // 创建遮罩
        var overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        var wrapper = document.createElement('div');
        wrapper.className = 'image-zoom-wrapper';
        var big = document.createElement('img');
        big.className = 'image-zoom-img';
        big.src = img.src;
        big.alt = img.alt || '';
        wrapper.appendChild(big);
        overlay.appendChild(wrapper);
        document.body.appendChild(overlay);

        function close() {
          try {
            overlay.classList.remove('show');
            // 动画结束后移除（此处简单处理，直接移除）
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', onKey);
          } catch (e) { }
        }
        function onKey(e) { if (e && e.key === 'Escape') close(); }
        overlay.addEventListener('click', function (e) {
          // 点击遮罩或图片都关闭
          if (e.target === overlay || e.target === big || e.target === wrapper) close();
        });
        document.addEventListener('keydown', onKey);
        // 展示
        requestAnimationFrame(function () { overlay.classList.add('show'); });
      }, { passive: false });
    });
  }

  function runAll(root) { transformColonBlocks(root); stripDetailsAttrs(root); enhanceImages(root); }

  function setupObserver() {
    var debounced = (function () { var t; return function () { clearTimeout(t); t = setTimeout(function () { runAll(document); }, 100); }; })();
    try {
      var observer = new MutationObserver(function () { debounced(); });
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) { }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { runAll(document); setupObserver(); });
  } else {
    runAll(document);
    setupObserver();
  }
})();