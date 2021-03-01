export function replaceText (textarea, fieldData) {
  for (let key in fieldData) {
    if (fieldData.hasOwnProperty(key)) {
      const value = fieldData[key];
      textarea = textarea.replaceAll(`#${key}#`, value);
    }
  }
  return textarea;
}