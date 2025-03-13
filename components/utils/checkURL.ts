export default function checkURL(url: string) {
  const validate = url.split("/");
  return validate.includes("docs");
}
