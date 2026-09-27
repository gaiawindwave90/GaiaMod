import messages from './tag-messages.js';
export default [
    {type: 'custom', intlLabel: messages.customextension, func: (library) => {
        library.select('custom_extension');
    } },	
	
    {type: 'divider'},
	
    {tag: 'scratch', intlLabel: 'Scratch'},
    {tag: 'gm', intlLabel: 'GaiaMod'},
    {tag: 'pm', intlLabel: 'PenguinMod'},
    {tag: 'tw', intlLabel: 'TurboWarp'},

    {type: 'divider'},

    {tag: 'graphics', intlLabel: messages.graphics},
    {tag: 'sound', intlLabel: messages.sound},
    {tag: 'math', intlLabel: messages.math},
    {tag: 'data', intlLabel: messages.data},
    {tag: 'hardware', intlLabel: messages.hardware},
    {tag: 'internet', intlLabel: messages.internet},

    {type: 'divider'},

    {tag: 'expansion', intlLabel: messages.expansion},
    {tag: 'type', intlLabel: messages.type},
    {tag: 'language', intlLabel: messages.language},

    {type: 'divider'},

    {tag: 'library', intlLabel: messages.library},

    {type: 'divider'},

];
