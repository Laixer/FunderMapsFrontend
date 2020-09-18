import { ISuggestion } from "@/components/form/ISuggestion";

export function formatAddressSuggestion(suggestion: ISuggestion): string {
    return _formatAddressSuggestion(suggestion)
}

export function formatAddressSuggestionWithMarkup(suggestion: ISuggestion, inputValue: string): string {
    const formatted = _formatAddressSuggestion(suggestion)
    const matches = [...formatted.toLowerCase().matchAll(new RegExp(inputValue.toLowerCase(), "g"))]

    if (matches.length > 0) {
        const index = matches[0].index
        const length = matches[0][0].length

        return [formatted.slice(0, index), '<strong>', formatted.slice(index, length), '</strong>', formatted.slice(length, formatted.length)].join('')
    }
    return formatted
}

function _formatAddressSuggestion(suggestion: ISuggestion): string {
    return `${suggestion.street} ${suggestion.buildingNumber}${(suggestion.postalCode) ? `, ${suggestion.postalCode}` : ''}`.replace(/\s\s+/g, '')
}