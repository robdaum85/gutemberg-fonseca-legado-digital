export function openExternalUrl(url: string) {
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened) {
    opened.opener = null;
  }
}

export function sanitizeHtml(html: string) {
  if (typeof window === 'undefined') {
    return html
      .replace(/<(script|iframe|object|embed|style|form)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/<(link|meta)\b[^>]*\/?\s*>/gi, '')
      .replace(/\s(?:on[a-z]+|style)=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/\s(href|src)=(['"])(?:javascript:|data:text\/html)[\s\S]*?\2/gi, '');
  }

  const template = document.createElement('template');
  template.innerHTML = html;

  template.content
    .querySelectorAll('script, iframe, object, embed, link, meta, style, form')
    .forEach((node) => node.remove());

  template.content.querySelectorAll('*').forEach((element) => {
    for (const attr of Array.from(element.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      if (
        name.startsWith('on') ||
        name === 'style' ||
        value.startsWith('javascript:') ||
        value.startsWith('data:text/html')
      ) {
        element.removeAttribute(attr.name);
      }
    }
  });

  return template.innerHTML;
}
