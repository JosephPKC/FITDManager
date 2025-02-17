/* Utility to build a url strings */
export class UrlBuilder {
  private urlPaths: string[] = [];
  private queryParams: string[] = [];

  constructor(basePath: string) {
    this.urlPaths.push(basePath);
  }

  public AddSubPath(subPath: string): UrlBuilder {
    if (!subPath) {
      return this;
    }

    this.urlPaths.push(subPath);
    return this;
  }

  public AddQueryParam(queryKey: string, queryValue: Object): UrlBuilder {
    if (!queryKey || !queryValue) {
      return this;
    }

    const queryParam: string = `${queryKey}=${encodeURIComponent(queryValue.toString())}`;
    this.queryParams.push(queryParam);
    return this;
  }

  public toString(): string {
    let url: string = this.urlPaths.join('/');

    if (this.queryParams.length == 0) {
      return url;
    }

    const params: string = this.queryParams.join('&');
    url += `?${params}`;
    return url;
  }
}
