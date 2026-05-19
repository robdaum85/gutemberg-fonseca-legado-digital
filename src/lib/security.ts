export function openExternalUrl(url: string) {
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened) {
    opened.opener = null;
  }
}

export function sanitizeHtml(html: string) {
  if (typeof window === 'undefined') return '';

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
