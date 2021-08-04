export type PagedHandlerResult<T> = Promise<{
  data: T[];
  nextPage: number | null;
}>;

export interface PagedHandler<T> {
  (pageNumber: number): PagedHandlerResult<T>;
}

export async function* pageIter<T>(handler: PagedHandler<T>, initPage = 1) {
  let _nextPage = handler(initPage);
  while (true) {
    const { nextPage, data } = await _nextPage;

    if (nextPage !== null) {
      _nextPage = handler(nextPage);
    }

    for (const item of data) {
      yield item;
    }

    if (nextPage === null) break;
  }
}
