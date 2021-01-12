import { ISuggestion } from "@/components/form/ISuggestion";

export function formatAddressSuggestion(suggestion: ISuggestion): string {
    return _formatAddressSuggestion(suggestion)
}

export function formatAddressSuggestionWithMarkup(suggestion: ISuggestion, inputValue: string): string {
    let formatted = _formatAddressSuggestion(suggestion)
    const indexOf = formatted.toLowerCase().indexOf(inputValue.toLowerCase())

    formatted = formatted.length > 32
        ? formatted.substr(0, 32 - 1) + '&hellip;'
        : formatted;

    if (indexOf >= 0) {
        const length: number = inputValue.length as number
        const end: number = indexOf + length
        return [formatted.slice(0, indexOf), '<strong>', formatted.slice(indexOf, end), '</strong>', formatted.slice(end, formatted.length)].join('')
    }
    return formatted
}

function _formatAddressSuggestion(suggestion: ISuggestion): string {
    return `${suggestion.street} ${suggestion.buildingNumber}${(suggestion.postalCode) ? `, ${suggestion.postalCode}` : ''}, ${suggestion.city}`.replace(/\s\s+/g, '')
}
