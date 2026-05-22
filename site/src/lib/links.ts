export function withBase(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.replace(/^\//, "");
  return cleanPath ? `${cleanBase}/${cleanPath}` : `${cleanBase}/`;
}
