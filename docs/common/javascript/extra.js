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
  // 2. 高亮块转换
  function transformColonBlocks(root) {
    var paras = Array.from(root.querySelectorAll('p'));
    var starts = paras.filter(function (p) {
      var t = (p.textContent || '').trim().toLowerCase();
      return t.startsWith(':::');
    });

    starts.forEach(function (start) {
      var marker = (start.textContent || '').trim().toLowerCase();
      var rawType = marker.slice(3).trim(); // ":::type" 或 "::: type"

      // 兼容两行写法：第一行仅为 ":::"，第二行是类型
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
      if (!rawType) return;

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
      var meta = map[rawType] || { cls: 'note', title: rawType.charAt(0).toUpperCase() + rawType.slice(1) };

      var contentNodes = [];
      var closing = null;
      while (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          var isP = node.tagName && node.tagName.toLowerCase() === 'p';
          var text = isP ? (node.textContent || '').trim().toLowerCase() : '';
          if (isP && text === ':::') {
            closing = node;
            break;
          }
        }
        contentNodes.push(node);
        node = node.nextSibling;
      }

      var wrap = document.createElement('div');
      wrap.className = 'admonition ' + meta.cls;
      var title = document.createElement('p');
      title.className = 'admonition-title';
      title.textContent = meta.title;
      wrap.appendChild(title);
      contentNodes.forEach(function (n) { wrap.appendChild(n); });

      start.parentNode.replaceChild(wrap, start);
      if (closing) closing.remove();
    });
  }

  function runAll(root) { transformColonBlocks(root); stripDetailsAttrs(root); }

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