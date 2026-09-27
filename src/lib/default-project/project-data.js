import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {
                    '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                        translator(messages.variable),
                        null
                    ]
                },
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                        name: translator(messages.backdrop, {index: 1}),
                        md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 240,
                        rotationCenterY: 180
                    }
                ],
                sounds: [],
                volume: 100
            },
            {
                isStage: false,
                name: 'Ship Guy',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: '87eac32b5f78f74ae51af6409f6bffca',
                        name: 'Ship-Guy-a',
                        bitmapResolution: 1,
                        md5ext: '87eac32b5f78f74ae51af6409f6bffca.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: '8d79b57ea0a5b484f55485ea2cc7dd68',
                        name: 'Ship-Guy-b',
                        bitmapResolution: 1,
                        md5ext: '8d79b57ea0a5b484f55485ea2cc7dd68.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: '0523473814a7299ebf5ae5a3cb663a38',
                        name: 'Ship-Guy-c',
                        bitmapResolution: 1,
                        md5ext: '0523473814a7299ebf5ae5a3cb663a38.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: '03c994acc733d11413bfe88d01477073',
                        name: 'Ship-Guy-d',
                        bitmapResolution: 1,
                        md5ext: '03c994acc733d11413bfe88d01477073.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: 'a97c381cd0dcd01f71b86521216a9fd1',
                        name: 'Ship-Guy-e',
                        bitmapResolution: 1,
                        md5ext: 'a97c381cd0dcd01f71b86521216a9fd1.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: '63e818ec89a880e91f462d4250fa7c55',
                        name: 'Ship-Guy-f',
                        bitmapResolution: 1,
                        md5ext: '63e818ec89a880e91f462d4250fa7c55.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 89.1961653270834
                    },
					{
                        assetId: '4db79518dc86129f25b299c581e429ea',
                        name: 'Ship-Guy-g',
                        bitmapResolution: 1,
                        md5ext: '4db79518dc86129f25b299c581e429ea.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 91.7885614701593,
                        rotationCenterY: 75.8676916797749
                    },
					{
                        assetId: '3ee01e92026c1d65fd45a3072a10c93b',
                        name: 'Ship-Guy-h',
                        bitmapResolution: 1,
                        md5ext: '3ee01e92026c1d65fd45a3072a10c93b.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 102.863602519359,
                        rotationCenterY: 73.5466526422157
                    }
                ],
                sounds: [
                      {
                       name: 'Beep',
                       assetId: '6a4fbadb2188e6c01a135b6113d37f0a',
                       dataFormat: 'mp3',
                       rate: 44100,
                       sampleCount: 16512,
                       md5ext: '6a4fbadb2188e6c01a135b6113d37f0a.mp3'
                      }
                    ],
                volume: 100,
                visible: true,
                x: 0,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            }
        ],
        meta: {
            semver: '3.0.0',
            vm: '0.1.0',
            agent: ''
        }
    });
};


export default projectData;
