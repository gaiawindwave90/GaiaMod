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

];
