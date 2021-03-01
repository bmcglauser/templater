export function replaceText (textarea, fieldData) {
  for (let key in fieldData) {
    if (fieldData.hasOwnProperty(key)) {
      const value = fieldData[key];
      textarea = textarea.replace(`#${key}#`, value);
    }
  }
  return textarea;
}