export const POS_COLORS: Record<string, string> = {
    noun: 'blue',
    verb: 'green',
    adjective: 'purple',
    adverb: 'orange',
    pronoun: 'cyan',
    preposition: 'magenta',
    conjunction: 'gold',
    interjection: 'red',
    exclamation: 'red',
    article: 'geekblue',
    numeral: 'lime',
}

export const POS_COLORS_HEX: Record<string, string> = {
    noun: '#1677ff',
    verb: '#52c41a',
    adjective: '#722ed1',
    adverb: '#fa8c16',
    pronoun: '#13c2c2',
    preposition: '#eb2f96',
    conjunction: '#faad14',
    interjection: '#f5222d',
    exclamation: '#f5222d',
    article: '#2f54eb',
    numeral: '#a0d911',
}

export const POS_RU: Record<string, string> = {
    noun: 'существительное',
    verb: 'глагол',
    adjective: 'прилагательное',
    adverb: 'наречие',
    pronoun: 'местоимение',
    preposition: 'предлог',
    conjunction: 'союз',
    interjection: 'междометие',
    exclamation: 'восклицание',
    article: 'артикль',
    numeral: 'числительное',
}

export function posLabel(pos: string): string {
    return POS_RU[pos] ?? pos
}
