/**
 * For typing the address suggestions in the GeoCoder
 */
export interface PDOKAddressSuggestion {
  id: string;
  type: string;
  weergavenaam: string;
  score: string;
  highlighting: string;
}

// function _formatAddressSuggestion(suggestion: AddressSuggestion): string {
//   return `${suggestion.street} ${suggestion.buildingNumber}${
//     suggestion.postalCode ? `, ${suggestion.postalCode}` : ""
//   }, ${suggestion.city}`.replace(/\s\s+/g, "");
// }

// export function formatAddressSuggestion(suggestion: AddressSuggestion): string {
//   return _formatAddressSuggestion(suggestion);
// }

// export function formatAddressSuggestionWithMarkup(suggestion: AddressSuggestion, inputValue: string): string {
//   let formatted = _formatAddressSuggestion(suggestion);
//   const indexOf = formatted.toLowerCase().indexOf(inputValue.toLowerCase());

//   formatted = formatted.length > 32 ? formatted.substr(0, 32 - 1) + "&hellip;" : formatted;

//   if (indexOf >= 0) {
//     const length: number = inputValue.length as number;
//     const end: number = indexOf + length;
//     return [
//       formatted.slice(0, indexOf),
//       "<strong>",
//       formatted.slice(indexOf, end),
//       "</strong>",
//       formatted.slice(end, formatted.length)
//     ].join("");
//   }
//   return formatted;
// }
