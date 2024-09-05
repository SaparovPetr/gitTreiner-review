/**
 * функция копирования текста в буфер обмена
 * @param textToCopy текст, подлежащий копированию в буфер
 */
export async function copyTextToClipboard(textToCopy: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    }
  } catch (err) {
    console.error(err);
  }
}
