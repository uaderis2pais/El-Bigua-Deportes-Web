/**
 * Utilities for Google Analytics 4 (GA4) integration.
 * Triggers events only if VITE_GA_ID is defined in environment variables.
 */

export const initGA = () => {
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) {
    console.log('Analytics disabled: VITE_GA_ID not found in environment.');
    return;
  }

  // Prevent double injection
  if (document.getElementById('google-tag-manager')) return;

  const script = document.createElement('script');
  script.id = 'google-tag-manager';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    page_path: window.location.pathname,
  });
};

export const trackEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};
