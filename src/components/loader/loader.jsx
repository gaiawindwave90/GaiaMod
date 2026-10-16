import React from 'react';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './loader.css';
import stars from './stars2.svg';
import shipguy from './ShipGuy.svg';
import logo from './title.png';
import {getIsLoadingWithId} from '../../reducers/project-state';
import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';
import TWRenderRecoloredImage from '../../lib/tw-recolor/render.jsx';

// Returns true when PotentiaMod is running inside an iframe.
const isInIframe = () => {
    try {
        return window.self !== window.top;
    } catch (e) {
        // If window.top cannot be accessed, assume we are inside an iframe.
        return true;
    }
};

const mainMessages = {
    'gui.loader.headline': (
        <FormattedMessage
            defaultMessage="Loading Project"
            description="Main loading message"
            id="gui.loader.headline"
        />
    ),
    'gui.loader.creating': (
        <FormattedMessage
            defaultMessage="Creating Project"
            description="Main creating message"
            id="gui.loader.creating"
        />
    )
};

const messages = defineMessages({
    projectData: {
        defaultMessage: 'Loading project …',
        description: 'Appears when loading project data, but not assets yet',
        id: 'tw.loader.projectData'
    },
    downloadingAssets: {
        defaultMessage: 'Downloading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets from a project on a remote website',
        id: 'tw.loader.downloadingAssets'
    },
    loadingAssets: {
        defaultMessage: 'Loading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets from a project file on the user\'s computer',
        id: 'tw.loader.loadingAssets'
    }
});

const randomMessages = [
    "GaiaMod.",
    'Crazy? I was crazy once. They locked me in a room, a dirty room. A dirty room with roaches and gnats. And roaches and gnats always make me crazy.',
    "I LOVE PENGUINMOD!!!",
    "The default character sprite is a spaceship named Ship Guy.",
    "penguinmod:menguinpod, gaiamod:maiagod",
	"You give garbage cans nicknames?",
	"Fallout Bomberman?",
	"Fun fact: This is not a fun fact.",
    "Fun fact: You are waiting for something to load.",
    "Fun fact: GaiaMod developers can't spell correctly :trollface:",
    "Fun fact: The penguin's name is Pang.",
    "Fun fact: Penguins can beat olympic swimmers at swimming!",
    "Fun fact: Penguins have feathers instead of fur to stay even warmer!",
    "Fun fact: The front-facing penguin costume was added thanks to a project asking for it!",
	"Fun fact: Penguins love to funk with the tunes!",
	"this page is sleeby, pls wait... :3",
    "Did you know? The",
    "GaiaMod is in beta, so there may be bugs and breaking changes.",
    "Truth: Cats rule, dogs drool",
    "Want to contribute to GaiaMod? Check out the GitHub repository!",
    "You can get a special badge for reporting GaiaMod vulnerabilities.",
    "You can get a badge for getting lots of votes, likes, followers, or having a project featured.",
    "Fixing all of the grammar errors, lol",
	"Fun fact: Cats look chill, but they're actually not, they're planning WORLD DOMINATION.",
	"lmao nightmare-inducing closing logos",
	"STOP! LOADING TIME!",
	"GaiaMod noticed itsjustjenkins :)",
	"Evil Kumquats beware! The project you are loading uses Kumquat Anti-Cheat.",
	"Look behind you >:3",
    "Did you know: GaiaMod has LORE!!?",
    "Lore: Ship Guy has a brother named Shippo.",
    "Lore: Ship Guy and Shippo are basically robots, rather than spaceships.",
    "Lore: Shippo has a bad case of misophonia, while Ship Guy is very much the opposite.",
	"You should try Versolot, Super ChaosMod, and PotentiaMod.",
	"This site does not have cancer, you nitwit!",
	"I owned MistWarp, Astra Editor and 02Engine lol",
	"What on Earth is ArkIDE!?",
    "Gaia the mortallized cat.",
    "Dave the magical cheese wizard.",
    "SHARKPOOL THE GOAT.",
    "thepython555 the jerk",
    "Every website recieves your IP address.",
    "Every copy of GaiaMod is personalized.",
    "AHOY! SPINACH!!",
    "OH MY FLIPPERS!",
    "GIANT LAVA FARM!",
    "Ampmod, OmniBlocks and LibreKitten are sure to get along.",
    "Domaiaggaiamod is a palindrome.",
    "Fact: Your code is the cat's meow, keep going!",
    "I'm no monster. I'm just a nice fella.",
    "Fun fact: LGBT Pride Month is celebrated every June.",
    "GaiaMod, ElectraMod, Snail IDE, and DinosaurMod are the quartet of PenguinMod forks.",
    "GaiaMod and PotentiaMod are the duo of Scratch mods.",
    "MistWarp is a nerd.",
    "DinosaurMod and Snail IDE are also nerds.",
    "Aw man, I'm a meme...",
    "Programer shoes are part of the official GaiaMod uniform.",
    "Fun Fact: Gaia is named after the working codename for Pokémon Winds and Pokémon Waves.",
    "WHOOPS! There Goes Our EDITOR!",
    "No, Walmart don't have Scratch! OK?",
    "Ampmod, OmniBlocks and LibreKitten are all nerds lol",
    "You can create your own GaiaMod extensions to add new powerful blocks using JavaScript!",
    "Simply the Best",
    "GAIAMAX LOL",
    "XD",
    "GaiaMod is considered the world's biggest Scratch mod (and it broke one's PC)",
    "Ask Pang. He's an expert on Scratch.",
    "Fun fact: Cats eat penguins.",
    "Just do succotash and spinach teeth from now on.",
    "Shades of Gaia trying to put her random access humor on this loader.",
    "You are too slow. Try again.",
    "ArkIDE is new here!",
    "PenguinMod does not have an article on Wikipedia.",
    "Maybe in another universe, GaiaMod is based on ElectraMod",
    "Gaia will hate you if you say that GaiaMod is a rip-off of Snail IDE and ElectraMod.",
    "Like you calling people \"trolls\"? Listen here.",
    "GaiaMod is based off the source code of PenguinMod, which is based off TurboWarp, which is based off Scratch. M O D C E P T I O N.",
    "Will Milhouse and I will be living like high school dropouts living off Uncle Sucker?",
	"I still think of this when I see UNCLE SUCKER!! lol!",
    "old macdonald had a freaking farm lol",
    "There's not a chance I am interested in this Scratch mod!",
	"Fun fact: Ship Guy have hands as seen on the server errors and in the welcome modal.",
    "LIBERATING LOBSTERS! YOU DID IT!",
    "I LOVE SNAIL IDE!",
    "Stupid storks and sausages!",
    "Face blemishes like pimples and moles and warts would always faint at spinach, right?",
    "Fun fact: Gaia also uploaded closing logos, bumpers, commercials, and other retro content.",
    "*Sees content farms* I don't mind content farms, but still.",
    "Are the PenguinMod staff spying on us now!?",
    "PENGUINMOD on GOOGLE CHROME 1.0??",
    "MORE FREAKING FARM",
    "Click here for free Gaia Points ----> virus <----",
    "Supercalifragilisticexpialidocious!",
    "I HATE SUCCOTASH AND SPINACH! HERE!",
    "HIIIIIIIIIIII! (poyo!)",
    "67 won't be funny by the time it's April Fools.",
    "Fun fact: PenguinMod has 96 new blocks compared to Scratch!",
    "Haters, trolls, spammers, and those who are up against Gaia are NOT welcomed here!",
    "It looks like Team Rocket is blasting off again!",
    "Ready for the Final Round?",
    "IT'S SNOWING!!! HOLY COWPOO, FREAKING SNOW ON THE FREAKING LAVA FARM! SNOOOOOOWWWWW!!!!",
    "Why not trying CodeTorch then trying GaiaMod?",
    "I am a professional GaiaMod user.",
    "In addition to Ship Guy, we have a bunch of other mascots. Most of them have not been discovered.",
    "HEY, ANYBODY HOME?",
    "GOTTA SWEEP SWEEP SWEEP!",
	"hazel was here",
	"FreshPenguin112 and derpygamer2142 were not here",
    "Fun fact: Only a few people rarely used GaiaMod by the time it was created.",
    "Suprising fact: GaiaMod used to have some coloring. :O",
    "Get fries instead of freaking popcorn shrimp.",
    "Your fate is already sealed.",
    "YO, MOVE IT!",
	"I LOVE DINOSAURMOD!!!",
    "Bear of the Interest? At this time of year? In this part of the country? Localized entirely within your school!?",
    "Woah there٫ language Nano! We’re only trying to help you!",
    "PenguinMod, no! What is that violent scene doing on a kid's project?",
    "Knock knock. Who's there?",
    "What the actual frog is this Scratch mod?",
    "Some random shades of bubblegum and chocolate Pop Rocks that I want to eat.",
    "Wenda's preparing for your arrival. Run.",
    "Battle For Dream Island must be better.",
    "Succotash is just food! It's not worth being obeyed!",
    "I won't obey a bunch of corn and beans!",
    "Wenda is reading this message ",
    "Sprunkis are reading this message!!!!",
    "Big Kitty Cats!",
    "Geometry Dash isn't cool.",
    "Scratch Cat joins the battle! Just kidding.",
    "GET ROCKED!",
    "Despite your popularity, you are... BANNED!",
    "Oh haha! Burger King foot lettuce!",
    "Caution: A virus has been detected.",
    "That is making my brain cells consider dying as their next action...",
    "Not long before Gaia passed away.",
    "MistWarp gone wrong! GaiaMod is better.",
    "67 brainrot",
    "The Pokémon Connect mod for Pokémon Essentials and GaiaMod are made by the same person, Gaia.",
    "With GaiaMod, we got a new Scratch experience.",
    "In 2015, SMG4 featured one of Gaia's drawings in one of his videos...",
    "Cats are not clever animals.",
    "Even people gone bananas at this point.",
    "Yes, you can post your projects outside of the Gaia community.",
    "Join the GaiaMod revolution and code like never before!",
    "The evil pine needles scare people away",
    "You've met with a terrible fate, haven't you?",
    "Guess again, nerd!",
    "AAAAY 6-7!",
    "No! Bob's Boogers are not garbage!",
    "EVERYONE THERE'S A SPINACH HURRICANE COMING TOWARDS US!",
    "GaiaMod is inspired by Snail IDE, ElectraMod and MistWarp",
    "GaiaMod is not a mod of Snail IDE, ElectraMod or MistWarp"
];

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAssetProgress',
            'handleProjectLoaded',
            'barInnerRef',
            'messageRef',
            'randomMessageRef',
            'updateRandomMessage'
        ]);
        this.barInnerEl = null;
        this.messageEl = null;
        this.randomMessageEl = null;
        this.ignoreProgress = false;
        this.randomMessageInterval = null;
        this.lastRandomMessageIndex = -1;
    }
    componentDidMount () {
        this.handleAssetProgress(
            this.props.vm.runtime.finishedAssetRequests,
            this.props.vm.runtime.totalAssetRequests
        );
        this.props.vm.on('ASSET_PROGRESS', this.handleAssetProgress);
        this.props.vm.runtime.on('PROJECT_LOADED', this.handleProjectLoaded);
        this.updateRandomMessage();
        this.randomMessageInterval = setInterval(this.updateRandomMessage, 3000);
    }
    componentWillUnmount () {
        this.props.vm.off('ASSET_PROGRESS', this.handleAssetProgress);
        this.props.vm.runtime.off('PROJECT_LOADED', this.handleProjectLoaded);
        clearInterval(this.randomMessageInterval);
    }
    updateRandomMessage () {
        if (this.randomMessageEl) {
            this.randomMessageEl.classList.remove(styles.randomMessageSlideIn);
            void this.randomMessageEl.offsetWidth; // Trigger reflow
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * randomMessages.length);
            } while (randomIndex === this.lastRandomMessageIndex);
            this.lastRandomMessageIndex = randomIndex;
            const randomFact = randomMessages[randomIndex];
            this.randomMessageEl.textContent = randomFact;
            this.randomMessageEl.classList.add(styles.randomMessageSlideIn);
            this.randomMessageEl.classList.add(styles.randomMessageRoulette);
        }
    }
    handleAssetProgress (finished, total) {
        if (this.ignoreProgress || !this.barInnerEl || !this.messageEl) {
            return;
        }

        if (total === 0) {
            // Started loading a new project.
            this.barInnerEl.style.width = '0';
            this.messageEl.textContent = this.props.intl.formatMessage(messages.projectData);
        } else {
            this.barInnerEl.style.width = `${finished / total * 100}%`;
            const message = this.props.isRemote ? messages.downloadingAssets : messages.loadingAssets;
            this.messageEl.textContent = this.props.intl.formatMessage(message, {
                complete: finished,
                total
            });
        }
    }
    handleProjectLoaded () {
        if (this.ignoreProgress || !this.barInnerEl || !this.messageEl) {
            return;
        }

        this.ignoreProgress = true;
        this.props.vm.runtime.resetProgress();
    }
    barInnerRef (barInner) {
        this.barInnerEl = barInner;
    }
    messageRef (message) {
        this.messageEl = message;
    }
    randomMessageRef (randomMessage) {
        this.randomMessageEl = randomMessage;
    }
    render () {
        return (
            <div
            className={classNames(styles.background, {
                [styles.fullscreen]: this.props.isFullScreen
            })}
            >
            
            <div className={styles.container}>
                    <div className={styles.logoFloat}>
                        <img
                            width="250px"
                            src={logo}
                            draggable={false}
                        />
                    </div>
                
                <div className={styles.title}>
                {mainMessages[this.props.messageId]}
                </div>
               <div
                className={styles.tips}
                ref={this.randomMessageRef}
                />
                <div
                className={styles.message}
                ref={this.messageRef}
                />

                <div className={styles.barOuter}>
                <div
                    className={styles.barInner}
                    ref={this.barInnerRef}
                />
                </div>
				
				<a
                            className={styles.githubCta}
                            href="https://www.facebook.com/profile.php?id=61588689063011"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                            width="24px"
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                            draggable={false}
                        />
                            <FormattedMessage
                                defaultMessage="Follow GaiaMod on FaceBook!"
                                description="Link on the loading screen to the GaiaMod FaceBook page"
                                id="gm.loader.facebook"
                            />
                        </a>
            </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    isRemote: PropTypes.bool,
    messageId: PropTypes.string,
    vm: PropTypes.shape({
        on: PropTypes.func,
        off: PropTypes.func,
        runtime: PropTypes.shape({
            totalAssetRequests: PropTypes.number,
            finishedAssetRequests: PropTypes.number,
            resetProgress: PropTypes.func,
            on: PropTypes.func,
            off: PropTypes.func
        })
    })
};
LoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.loader.headline'
};

const mapStateToProps = state => ({
    isRemote: getIsLoadingWithId(state.scratchGui.projectState.loadingState),
    vm: state.scratchGui.vm
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(LoaderComponent));
