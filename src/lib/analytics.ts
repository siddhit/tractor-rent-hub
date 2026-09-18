import { GA_ID } from "@/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// GA_ID starts as a placeholder (see src/config.ts) — analytics stay off until it's replaced.
const isConfigured = Boolean(GA_ID) && !GA_ID.includes('XXXX');

let initialized = false;

export function initAnalytics() {
  if (!isConfigured || initialized) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // GA4's default tag fires page_view once on load and never again on
  // client-side navigation, so we send it ourselves per route change instead.
  window.gtag?.('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!isConfigured) return;
  window.gtag?.('event', 'page_view', { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!isConfigured) return;
  window.gtag?.('event', name, params);
}
