type FetchStatusSuccess = {
    status: "success";
};

type FetchStatusLoading = {
    status: "loading";
};

type FetchStatusError = {
    status: "error";
    errorMessage: string;
};

export type FetchStatus =
    | FetchStatusSuccess
    | FetchStatusLoading
    | FetchStatusError;
