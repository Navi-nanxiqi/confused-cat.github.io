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

      // 先处理单行内联写法：:::info XXX :::
      var inlineMatch = lowerStart.match(/^:{3,}\s*([a-z-]+)\s+(.+?)\s*:{3,}$/);
      if (inlineMatch) {
        var inlineType = inlineMatch[1];
        var inlineContent = startText.replace(/^:{3,}\s*[a-z-]+\s+/i, '').replace(/\s*:{3,}\s*$/i, '');
        var mapInline = {
          tips: { cls: 'tip', title: 'Tips' },
          tip: { cls: 'tip', title: 'Tip' },
          info: { cls: 'info', title: 'Info' },
          warning: { cls: 'warning', title: 'Warning' },
          danger: { cls: 'danger', title: 'Danger' },
          error: { cls: 'danger', title: 'Danger' },
          success: { cls: 'success', title: 'Success' },
          note: { cls: 'note', title: 'Note' }
        };
        var metaInline = mapInline[inlineType] || { cls: 'note', title: inlineType.charAt(0).toUpperCase() + inlineType.slice(1) };

        var wrapInline = document.createElement('div');
        wrapInline.className = 'admonition ' + metaInline.cls;
        var titleInline = document.createElement('p');
        titleInline.className = 'admonition-title';
        titleInline.textContent = metaInline.title;
        wrapInline.appendChild(titleInline);
        var bodyInline = document.createElement('p');
        bodyInline.textContent = inlineContent;
        wrapInline.appendChild(bodyInline);
        start.parentNode.replaceChild(wrapInline, start);
        return; // 已处理内联写法
      }

      // 识别起始行：支持 ":::type"、"::: type"，以及两行写法（第一行仅为 ":::"，下一行是类型）
      var type = null;
      var cursor = start.nextSibling; // 从起始行之后的节点开始收集内容
      var typeLineToRemove = null;    // 两行写法时需要删除的类型行

      // 单行写法（至少三个冒号）
      var m1 = lowerStart.match(/^:{3,}\s*([a-z-]+)$/);
      if (m1) {
        type = m1[1];
      } else if (/^:{3,}$/.test(lowerStart)) {
        // 两行写法：第一行仅为 ":::"，下一行是类型
        // 跳过文本节点直到找到段落
        while (cursor && !(cursor.nodeType === Node.ELEMENT_NODE && cursor.tagName.toLowerCase() === 'p')) {
          cursor = cursor.nextSibling;
        }
        var nextText = cursor ? (cursor.textContent || '').trim().toLowerCase() : '';
        if (nextText && /^[a-z-]+$/.test(nextText)) {
          type = nextText;
          typeLineToRemove = cursor; // 记录类型行，稍后移除
          cursor = cursor.nextSibling; // 内容从类型行之后开始
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

  // 3. 图片点击放大查看
  var zoomOverlay = null;
  function ensureZoomOverlay() {
    if (zoomOverlay) return zoomOverlay;
    zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'img-zoom-overlay';
    var img = document.createElement('img');
    img.className = 'img-zoom-image';
    zoomOverlay.appendChild(img);
    zoomOverlay.addEventListener('click', function () { hideZoom(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideZoom();
    });
    document.body.appendChild(zoomOverlay);
    return zoomOverlay;
  }
  function showZoom(src) {
    var ov = ensureZoomOverlay();
    var inner = ov.querySelector('img');
    inner.src = src;
    ov.classList.add('open');
    document.documentElement.classList.add('img-zoom-open');
    document.body.classList.add('img-zoom-open');
  }
  function hideZoom() {
    if (!zoomOverlay) return;
    zoomOverlay.classList.remove('open');
    document.documentElement.classList.remove('img-zoom-open');
    document.body.classList.remove('img-zoom-open');
  }
  function setupImageZoom(root) {
    var imgs = Array.from(root.querySelectorAll('.md-content img:not([data-no-zoom])'));
    imgs.forEach(function (img) {
      if (img.dataset.zoomBound) return;
      img.dataset.zoomBound = '1';
      img.addEventListener('click', function (e) {
        // 如果图片在链接中，阻止默认跳转行为
        var a = img.closest('a');
        if (a) e.preventDefault();
        showZoom(img.currentSrc || img.src);
      });
    });
  }

  function runAll(root) { transformColonBlocks(root); stripDetailsAttrs(root); setupImageZoom(root); }

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