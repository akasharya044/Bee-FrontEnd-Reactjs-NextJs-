import { AnyCnameRecord } from 'dns';

export const getHeaders = (isPatch = false) => {
   return isPatch
   ? new Headers({
       accept: 'application/json',
       'Content-Type': 'application/json-patch+json',
       'Tenant':'HC_1'
     })
   : new Headers({ 
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Tenant':'HC_1'
    });
};

const isContentTypeJSON = (headers: Headers) =>
  headers.get('content-type')?.includes('application/json') ?? false;

const isContentTypePdf = (headers: Headers) =>
  headers.get('content-type')?.includes('application/pdf') ?? false;

export interface IFailureDetail {
  affectedResource: string;
  reason: string;
}
export interface ITransactionError {
  area: string;
  reason: string;
  details: IFailureDetail[];
}
export interface ITransactionResult<TData> {
  ok: boolean;
  status: number;
  data?: TData;
  error?: ITransactionError[];
  headers?: Headers;
}

export class HttpException extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

const createTransactionResultFrom = <T>(
  response: Response
): ITransactionResult<T> => ({
  ok: response.ok,
  status: response.status,
  headers: response.headers,
});

type GenericGetParams = {
  url: string;
};

export const genericGet = async <TResponse>({
  url,
}: GenericGetParams): Promise<ITransactionResult<TResponse>> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(false)
  });

  const transactionResult = createTransactionResultFrom<TResponse>(response);

  const isJson = isContentTypeJSON(response.headers);

  if (response.status >= 200 && response.status <= 299) {
    transactionResult.data = isJson ? await response.json() : undefined;
  }

  if (response.status >= 400 && response.status <= 499) {
    const responseError: ITransactionResult<null> = isJson
      ? await response.json()
      : undefined;
    throw new Error(
      responseError ? responseError.error?.[0].reason : 'general error'
    );
  }

  return transactionResult;
};

type GenericPostParams<TRequestBody> = {
  url: string;
  body?: TRequestBody;
};

export const genericPost = async <TRequestBody, TResponse>({
  url,
  body = undefined,
}: GenericPostParams<TRequestBody>): Promise<ITransactionResult<TResponse>> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: getHeaders(false),
    });

    const transactionResult = createTransactionResultFrom<TResponse>(response);

    const isJson = isContentTypeJSON(response.headers);

    if (response.status >= 200 && response.status <= 299) {
      transactionResult.data = isJson ? await response.json() : undefined;
    }

    if (response.status >= 400 && response.status <= 499) {
      transactionResult.error = isJson ? await response.json() : undefined;
    }
    return transactionResult;
  } catch (reason) {
    throw new Error(reason as unknown as string);
  }
};

//is patch for patch data alwways true
export const genericPatch = async <TRequestBody, TResponse>(
  url: string,
  body?: TRequestBody,
): Promise<ITransactionResult<TResponse>> => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : null,
      headers: getHeaders(true),
    });

    const transactionResult = createTransactionResultFrom<TResponse>(response);

    const isJson = isContentTypeJSON(response.headers);

    if (response.status >= 200 && response.status <= 299) {
      transactionResult.data = isJson ? await response.json() : null;
    }

    if (response.status >= 400 && response.status <= 499) {
      transactionResult.error = isJson ? await response.json() : null;
      if (response.status === 404) {
        // needs a rethink

        throw new Error('Not found');
      }
    }
    return transactionResult;
  } catch (reason) {
    throw new Error('General error');
  }
};

export const genericCommanPatch = async <TRequestBody, TResponse>({
  url,
  body = undefined,
}: {
  url?: any;
  body?: any;
}): Promise<ITransactionResult<TResponse>> => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : null,
      headers: getHeaders(true),
    });

    const transactionResult = createTransactionResultFrom<TResponse>(response);

    const isJson = isContentTypeJSON(response.headers);

    if (response.status >= 200 && response.status <= 299) {
      transactionResult.data = isJson ? await response.json() : null;
    }

    if (response.status >= 400 && response.status <= 499) {
      transactionResult.error = isJson ? await response.json() : null;
      if (response.status === 404) {
        // needs a rethink

        throw new Error('Not found');
      }
    }
    return transactionResult;
  } catch (reason) {
    throw new Error('General error');
  }
};

export const genericPut = async <TRequestBody, TResponse>({
  url,
  body = undefined,
}: {
  url?: any;
  body?: any;
}): Promise<ITransactionResult<TResponse>> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
      headers: getHeaders(false),
    });

    const transactionResult = createTransactionResultFrom<TResponse>(response);

    const isJson = isContentTypeJSON(response.headers);

    if (response.status >= 200 && response.status <= 299) {
      transactionResult.data = isJson ? await response.json() : null;
    }

    if (response.status >= 400 && response.status <= 499) {
      transactionResult.error = isJson ? await response.json() : null;
      if (response.status === 404) {
        // needs a rethink

        throw new Error('Not found');
      }
    }
    return transactionResult;
  } catch (reason) {
    throw new Error('General error');
  }
};

export const genericDelete = async <TRequestBody>(
  url: string,
  body?: TRequestBody
): Promise<ITransactionResult<boolean>> => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: getHeaders(false),
    });

    const transactionResult = createTransactionResultFrom<boolean>(response);

    const isJson = isContentTypeJSON(response.headers);

    if (response.status >= 200 && response.status <= 299) {
      transactionResult.data = isJson ? await response.json() : null;
    }

    if (response.status >= 400 && response.status <= 499) {
      transactionResult.error = isJson ? await response.json() : null;
      if (response.status === 404) {
        // needs a rethink
        throw new HttpException(404, 'Not Found');
      }
    }
    return transactionResult;
  } catch (reason) {
    throw new HttpException(-1, reason as string);
  }
};

export const genericDownloadPdf = async ({
  url,
  fileName,
}: {
  url: string;
  fileName: string;
}) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/pdf',
    }),
  });

  // TODO: 'unknown' type may have to be updated when we implement using the server
  const transactionResult = createTransactionResultFrom<unknown>(response);

  const isPDF = isContentTypePdf(response.headers);

  if (response.status >= 200 && response.status <= 299) {
    try {
      if (isPDF) {
        const blobResponse = await response.blob();
        const objectURL = URL.createObjectURL(blobResponse);
        const anchorEl = document.createElement('a');
        anchorEl.href = objectURL;
        anchorEl.download = `${fileName}.pdf`;
        anchorEl.click();
        URL.revokeObjectURL(objectURL);
      } else {
        throw new Error();
      }
    } catch {
      // Set the ok property to false as we encountered an error
      transactionResult.ok = false;
    }
  }

  // TODO: See how we want to handle errors when it comes to implementing with a backend
  // I don't think we need an error object for the  response here as we can just use response.ok and present an error message that is decided on the FE
  // if (response.status >= 400 && response.status <= 499) {}

  return transactionResult;
};


export const genericDownloadFile = async ({
  url,
  fileName,
  contentType,
  body,
}: {
  url: string;
  fileName: string;
  contentType: string;
  body?: object | undefined;
}) => {
  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: new Headers({
      'Content-Type': contentType,
    }),
    body: body ? JSON.stringify(body) : undefined,
  });

  // TODO: 'unknown' type may have to be updated when we implement using the server
  const transactionResult = createTransactionResultFrom<unknown>(response);

  const isOfContentType =
    response.headers.get('content-type')?.includes(contentType) ?? false;

  if (response.status >= 200 && response.status <= 299) {
    try {
      if (isOfContentType) {
        const blobResponse = await response.blob();
        const objectURL = URL.createObjectURL(blobResponse);
        const anchorEl = document.createElement('a');
        anchorEl.href = objectURL;
        anchorEl.download = fileName;
        anchorEl.click();
        URL.revokeObjectURL(objectURL);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error();
      }
    } catch {
      // Set the ok property to false as we encountered an error
      transactionResult.ok = false;
    }
  }

  // TODO: See how we want to handle errors when it comes to implementing with a backend
  // I don't think we need an error object for the  response here as we can just use response.ok and present an error message that is decided on the FE
  // if (response.status >= 400 && response.status <= 499) {}

  return transactionResult;
};

