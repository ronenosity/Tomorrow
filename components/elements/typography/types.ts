export interface I18nShape {
  key: string;
  message: string;
  values?: Record<string, string | number>;
  meta?: Record<string, any>;
}
