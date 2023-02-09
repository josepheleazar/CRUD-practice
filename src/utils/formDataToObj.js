export default function formDataToObj(form) {
  const data = new FormData(form);

  const object = {};
  data.forEach((value, key) => {
    object[key] = value;
  });

  return JSON.parse(JSON.stringify(object));
}