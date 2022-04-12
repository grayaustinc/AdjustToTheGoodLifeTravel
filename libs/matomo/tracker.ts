import { TRACK_TYPES } from "./constants";
import {
  AddEcommerceItemParams,
  RemoveEcommerceItemParams,
  CustomDimension,
  SetEcommerceViewParams,
  TrackEcommerceOrderParams,
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackParams,
  TrackSiteSearchParams,
  UserOptions,
} from "./types";
import urlJoin from "proper-url-join";

class MatomoTracker {
  private options: UserOptions;

  constructor(options: UserOptions) {
    this.options = options;
    if (!options.urlBase) {
      throw new Error("Matomo urlBase is required.");
    }
    if (!options.siteId) {
      throw new Error("Matomo siteId is required.");
    }

    this.initialize(options);
  }

  private initialize({ urlBase, siteId, userId, trackerUrl, disabled, heartBeat, linkTracking = true, configurations = {} }: UserOptions) {
    if (typeof window === "undefined") {
      return;
    }

    window._paq = window._paq || [];

    if (window._paq.length !== 0) {
      return;
    }

    this.pushInstruction("setTrackerUrl", trackerUrl ?? urlJoin(urlBase, "matomo.php"));

    this.pushInstruction("setSiteId", siteId);

    if (userId) {
      this.pushInstruction("setUserId", userId);
    }

    Object.entries(configurations).forEach(([name, instructions]) => {
      if (instructions instanceof Array) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.pushInstruction(name, ...instructions);
      } else {
        this.pushInstruction(name, instructions);
      }
    });

    // accurately measure the time spent on the last pageview of a visit
    if (!heartBeat || (heartBeat && heartBeat.active)) {
      this.enableHeartBeatTimer((heartBeat && heartBeat.seconds) ?? 15);
    }

    // // measure outbound links and downloads
    // // might not work accurately on SPAs because new links (dom elements) are created dynamically without a server-side page reload.
    this.enableLinkTracking(linkTracking);
  }

  public enabled() {
    return !this.options.disabled;
  }

  public getScriptSrc(): string {
    return this.options.srcUrl || urlJoin(this.options.urlBase, "matomo.js");
  }

  public enableHeartBeatTimer(seconds: number): void {
    this.pushInstruction("enableHeartBeatTimer", seconds);
  }

  public enableLinkTracking(active: boolean): void {
    this.pushInstruction("enableLinkTracking", active);
  }

  // Tracks events
  // https://matomo.org/docs/event-tracking/#tracking-events
  trackEvent({ category, action, name, value, ...otherParams }: TrackEventParams): void {
    if (category && action) {
      this.track({
        data: [TRACK_TYPES.TRACK_EVENT, category, action, name, value],
        ...otherParams,
      });
    } else {
      throw new Error(`Error: category and action are required.`);
    }
  }

  // Tracks site search
  // https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
  trackSiteSearch({ keyword, category, count, ...otherParams }: TrackSiteSearchParams): void {
    if (keyword) {
      this.track({
        data: [TRACK_TYPES.TRACK_SEARCH, keyword, category, count],
        ...otherParams,
      });
    } else {
      throw new Error(`Error: keyword is required.`);
    }
  }

  // Tracks outgoing links to other sites and downloads
  // https://developer.matomo.org/guides/tracking-javascript-guide#enabling-download-outlink-tracking
  trackLink({ href, linkType = "link" }: TrackLinkParams): void {
    this.pushInstruction(TRACK_TYPES.TRACK_LINK, href, linkType);
  }

  // Tracks page views
  // https://developer.matomo.org/guides/spa-tracking#tracking-a-new-page-view
  trackPageView(params?: TrackPageViewParams): void {
    this.track({ data: [TRACK_TYPES.TRACK_VIEW], ...params });
  }

  // Adds a product to an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  // https://matomo.org/docs/ecommerce-analytics/#1-addecommerceitemproductsku-productname-productcategory-price-quantity
  addEcommerceItem({ sku, productName, productCategory, productPrice = 0.0, productQuantity = 1 }: AddEcommerceItemParams): void {
    this.pushInstruction("addEcommerceItem", sku, productName, productCategory, productPrice, productQuantity);
  }

  // Removes a product from an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  removeEcommerceItem({ sku }: RemoveEcommerceItemParams): void {
    this.pushInstruction("removeEcommerceItem", sku);
  }

  // Removes all products from an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  clearEcommerceCart(): void {
    this.pushInstruction("clearEcommerceCart");
  }

  // Tracks an Ecommerce order containing items added via addEcommerceItem.
  // https://matomo.org/docs/ecommerce-analytics/#2-trackecommerceorderorderid-revenue-subtotal-tax-shipping-discount
  trackEcommerceOrder({ orderId, orderRevenue, orderSubTotal, taxAmount, shippingAmount, discountOffered = false }: TrackEcommerceOrderParams): void {
    this.track({
      data: [TRACK_TYPES.TRACK_ECOMMERCE_ORDER, orderId, orderRevenue, orderSubTotal, taxAmount, shippingAmount, discountOffered],
    });
  }

  // Tracks updates to an Ecommerce Cart before an actual purchase.
  // This will replace currently tracked information of the cart. Always include all items of the updated cart!
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-an-ecommerce-cart-update-containing-two-products
  trackEcommerceCartUpdate(amount: number): void {
    this.pushInstruction(TRACK_TYPES.TRACK_ECOMMERCE_CART_UPDATE, amount);
  }

  // Marks the next page view as an Ecommerce product page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-product-page-view
  setEcommerceView({ sku, productName, productCategory, productPrice }: SetEcommerceViewParams): void {
    this.pushInstruction("setEcommerceView", sku, productName, productCategory, productPrice);
  }

  // Marks the next tracked page view as an Ecommerce category page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-category-page-view
  setEcommerceCategoryView(productCategory: string): void {
    this.setEcommerceView({ productCategory, productName: false, sku: false });
  }

  // Sends the tracked page/view/search to Matomo
  track({ data = [], documentTitle = window.document.title, href, customDimensions = false }: TrackParams): void {
    if (data.length) {
      if (customDimensions && Array.isArray(customDimensions) && customDimensions.length) {
        customDimensions.map((customDimension: CustomDimension) => this.pushInstruction("setCustomDimension", customDimension.id, customDimension.value));
      }

      this.pushInstruction("setCustomUrl", href ?? window.location.href);
      this.pushInstruction("setDocumentTitle", documentTitle);
      this.pushInstruction(...(data as [string, ...any[]]));
    }
  }

  private pushInstruction(name: string, ...args: any[]): MatomoTracker {
    if (typeof window !== "undefined") {
      window._paq.push([name, ...args]);
    }

    return this;
  }
}

export default MatomoTracker;
