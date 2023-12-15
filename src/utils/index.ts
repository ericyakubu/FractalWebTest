export const changeURL = (page: string | number) => {
  if (page === 0) {
    let currentUrl = window.location.href;

    if (currentUrl.includes("step=")) {
      const regex = /[?&]step=[^&]+/;
      currentUrl = currentUrl.replace(regex, "");
      currentUrl = currentUrl.replace(/[?&]$/, "");
      window.history.replaceState({}, "", currentUrl);
    }
  } else {
    const key = "step";
    const value = `${page}`;

    const urlString = window.location.href;
    let newUrl = "";

    if (urlString.indexOf("?") !== -1) {
      const urlParts = urlString.split("?");
      const baseUrl = urlParts[0];
      const params = urlParts[1];

      const searchParams = new URLSearchParams(params);
      searchParams.set(key, value);

      newUrl = `${baseUrl}?${searchParams.toString()}`;
    } else {
      newUrl = `${urlString}?${key}=${value}`;
    }
    window.history.replaceState({}, "", newUrl);
  }
};
