declare module "klaro" {
  export interface KlaroService {
    name: string;
    title: string;
    purposes: string[];
    cookies?: (string | RegExp)[];
    default?: boolean;
    required?: boolean;
    optOut?: boolean;
    onlyOnce?: boolean;
    description?: string;
  }

  export interface KlaroConfig {
    version?: number;
    elementID?: string;
    cookieName?: string;
    cookieExpiresAfterDays?: number;
    privacyPolicy?: string;
    default?: boolean;
    mustConsent?: boolean;
    acceptAll?: boolean;
    hideDeclineAll?: boolean;
    hideLearnMore?: boolean;
    noticeAsModal?: boolean;
    htmlTexts?: boolean;
    services?: KlaroService[];
    translations?: Record<string, unknown>;
    styling?: { theme?: string[] };
    testing?: boolean;
    [key: string]: unknown;
  }

  export interface KlaroManager {
    watch(handler: { update: (manager: KlaroManager, eventType: string, payload: unknown) => void }): void;
    getConsent(serviceName: string): boolean;
    show(): void;
    save(): void;
  }

  export function setup(config: KlaroConfig): void;
  export function getManager(config?: KlaroConfig): KlaroManager;
  export function show(): void;
}

declare module "klaro/dist/klaro.css";
