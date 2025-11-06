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

  // 2. 将 ::: 块转换为 Material 的提示块（admonition）
  function transformColonBlocks(root) {
    var paras = Array.from(root.querySelectorAll('p'));

    paras.forEach(function (start) {
      var startText = (start.textContent || '').trim();
      var lowerStart = startText.toLowerCase();
      // 兼容两行写法：第一行仅为 ":::", 第二行是类型
      var node = start.nextSibling;
      if (!rawType) {
        var nextIsTypeP = node && node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'p';
        var nextText = nextIsTypeP ? (node.textContent || '').trim().toLowerCase() : '';
        if (nextText) {
          rawType = nextText;
          node = node.nextSibling; // 跳过类型行，内容从其后开始
          // 删除类型占位行
          if (nextIsTypeP) node && node.previousSibling && node.previousSibling.remove();
        }
      }

      if (!type) return; // 未识别为有效块，直接跳过

      // 允许更多类型映射
      var map = {
        tips: { cls: 'tip', title: 'Tips' },
        tip: { cls: 'tip', title: 'Tip' },
        info: { cls: 'info', title: 'Info' },
        warning: { cls: 'warning', title: 'Warning' },
        danger: { cls: 'danger', title: 'Danger' },
        error: { cls: 'danger', title: 'Danger' },
        success: { cls: 'success', title: 'Success' },
        note: { cls: 'note', title: 'Note' }
      };
      var meta = map[type] || { cls: 'note', title: type.charAt(0).toUpperCase() + type.slice(1) };

      // 收集内容节点，直到遇到结束行（至少三个冒号）
      var contentNodes = [];
      var closing = null;
      var node = cursor;
      while (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          var isP = node.tagName && node.tagName.toLowerCase() === 'p';
          var text = isP ? (node.textContent || '').trim().toLowerCase() : '';
          if (isP && /^:{3,}$/.test(text)) {
            closing = node;
            break;
          }
        }
        contentNodes.push(node);
        node = node.nextSibling;
      }

      // 安全措施：若未找到结束标记，不执行转换，避免包裹到后续标题
      if (!closing) return;

      // 构造提示块容器
      var wrap = document.createElement('div');
      wrap.className = 'admonition ' + meta.cls;
      var title = document.createElement('p');
      title.className = 'admonition-title';
      title.textContent = meta.title; // 标题仅使用类型名
      wrap.appendChild(title);

      // 将收集的内容节点迁移到容器中
      contentNodes.forEach(function (n) { wrap.appendChild(n); });

      // 两行写法时移除类型行
      if (typeLineToRemove && typeLineToRemove.parentNode) {
        typeLineToRemove.remove();
      }

      // 用容器替换起始行，并删除结束标记
      start.parentNode.replaceChild(wrap, start);
      if (closing && closing.parentNode) closing.remove();
    });
  }

  // 3. 图片增强：居中显示 + 点击放大查看
  function enhanceImages(root) {
    var scope = root || document;
    // 选择正文中的图片；避免重复绑定
    var imgs = Array.from(scope.querySelectorAll('.md-content img:not([data-zoom-bound])'));
    imgs.forEach(function (img) {
      img.setAttribute('data-zoom-bound', '1');
      // 设置光标提示可放大
      try { img.style.cursor = 'zoom-in'; } catch (e) {}

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
          } catch (e) {}
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
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { runAll(document); setupObserver(); });
  } else {
    runAll(document);
    setupObserver();
  }
})();