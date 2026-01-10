export const isPublicView = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("view") === "public";
};
