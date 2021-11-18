export function detectBrowser() {
  const isChrome =
    typeof navigator !== 'undefined' && navigator.userAgent.includes('Chrome');
  const isExplorer =
    typeof navigator !== 'undefined' && navigator.userAgent.includes('MSIE');
  const isFirefox =
    typeof navigator !== 'undefined' && navigator.userAgent.includes('Firefox');
  const isSafari =
    typeof navigator !== 'undefined' &&
    !isChrome &&
    navigator.userAgent.includes('Safari');

  return { isChrome, isExplorer, isFirefox, isSafari };
}
