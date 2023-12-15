export const changeURL = (page: string | number) => {
  const key = "step";
  const value = `${page}`;

  const urlString = window.location.href;
  let newUrl = "";

  if (urlString.indexOf("?") !== -1) {
    // URL already has parameters
    const urlParts = urlString.split("?");
    const baseUrl = urlParts[0];
    const params = urlParts[1];

    const searchParams = new URLSearchParams(params);
    searchParams.set(key, value);

    newUrl = `${baseUrl}?${searchParams.toString()}`;
  } else {
    // URL doesn't have parameters
    newUrl = `${urlString}?${key}=${value}`;
  }

  // Update the URL with the new parameter
  window.history.replaceState({}, "", newUrl);
};
