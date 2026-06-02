/**
 * Utility to track product interactions (views/clicks and cart additions)
 * and report them to the Google Apps Script backend.
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export const tracker = {
  /**
   * Tracks a product interaction.
   * @param {number|string} productId - The ID of the product.
   * @param {'click'|'cart'} action - The type of interaction.
   */
  async trackProduct(productId, action) {
    if (!APPS_SCRIPT_URL) {
      // If the tracking URL is not configured, exit silently.
      return;
    }

    const parsedId = parseInt(productId);
    if (isNaN(parsedId)) {
      return;
    }

    try {
      // Use mode: 'no-cors' to avoid browser preflight checks and CORS redirect issues
      // associated with Google Apps Script Web Apps.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: parsedId,
          action: action, // 'click' or 'cart'
        }),
      });
    } catch (error) {
      // Fail silently to prevent tracking errors from affecting user experience.
      console.warn('[Tracker] Error tracking product interaction:', error);
    }
  }
};
