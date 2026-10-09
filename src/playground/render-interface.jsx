/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';
import {getIsLoading} from '../reducers/project-state.js';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import TWPackagerIntegrationHOC from '../lib/tw-packager-integration-hoc.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import '../lib/tw-fix-history-api';
import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import FeaturedProjects from '../components/tw-featured-projects/featured-projects.jsx';
import Description from '../components/tw-description/description.jsx';
import BrowserModal from '../components/browser-modal/browser-modal.jsx';
import CloudVariableBadge from '../containers/tw-cloud-variable-badge.jsx';
import TWWindchimeSubmitter from '../containers/tw-windchime-submitter.jsx';
import {isBrowserSupported} from '../lib/tw-environment-support-prober';
import AddonChannels from '../addons/channels';
import {loadServiceWorker} from './load-service-worker';
import runAddons from '../addons/entry';
import InvalidEmbed from '../components/tw-invalid-embed/invalid-embed.jsx';
import VoteFrame from './vote-frame.jsx';
import {Theme, GUI_LIGHT} from '../lib/themes';
import {APP_NAME} from '../lib/brand.js';

import styles from "./interface.css";

const urlParams = new URLSearchParams(location.search);
const Local = String(window.location.href).startsWith(`http://localhost:`);
const LiveTests = urlParams.has('livetest');
const Secrets = urlParams.has('allpowerscombined');

//Taken from LibreKitten.
const hardRefresh = () => {
    const search = location.search.replace(/[?&]nocache=\d+/, '');
    location.replace(`${location.pathname + search + (search ? '&' : '?')}nocache=${Math.floor(Math.random() * 100000)}`);
};

const eraseData = async () => {
    if (confirm('Please be aware that this will reset all your local data, including the Restore Points and backpack. Are you sure you want to continue?')) {
        
        localStorage.clear();
        indexedDB.deleteDatabase('TW_RestorePoints');
        indexedDB.deleteDatabase('TW_Backpack');
        indexedDB.deleteDatabase('p4-local-settings');
        indexedDB.deleteDatabase('p4-large-assets');
        indexedDB.deleteDatabase('tw:library-favorites:extensionLibrary');
        location.reload();
    }
};

const isInvalidEmbed = window.parent !== window;

const handleClickAddonSettings = (addonId) => {
    // addonId might be a string of the addon to focus on, undefined, or an event (treat like undefined)
    const path =
        process.env.ROUTING_STYLE === "wildcard" ? "addons" : "addons.html";
    const url = `${process.env.ROOT}${path}${typeof addonId === "string" ? `#${addonId}` : ""}`;
    window.open(url);
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: "PenguinMod, Supercharged",
        description: "Title of homepage",
        id: "tw.guiDefaultTitle",
    },
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC,
    TWPackagerIntegrationHOC,
)(MenuBar);

if (AddonChannels.reloadChannel) {
    AddonChannels.reloadChannel.addEventListener("message", () => {
        location.reload();
    });
}

if (AddonChannels.changeChannel) {
    AddonChannels.changeChannel.addEventListener("message", (e) => {
        SettingsStore.setStoreWithVersionCheck(e.data);
    });
}

runAddons();

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="{APP_NAME} is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                    description="Disclaimer that PenguinMod/TurboWarp is not connected to Scratch"
                    id="tw.footer.disclaimer"
                    values={{
                        APP_NAME,
                    }}
                />
            </div>

            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Scratch is a project of the Scratch Foundation. It is available for free at {scratchDotOrg}."
                    description="A disclaimer that Scratch requires when referring to Scratch. {scratchDotOrg} is a link with text 'https://scratch.org/'"
                    id="tw.footer.scratchDisclaimer"
                    values={{
                        scratchDotOrg: (
                            <a
                                href="https://scratch.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {"https://scratch.org/"}
                            </a>
                        ),
                    }}
                />
            </div>

            <div className={styles.footerColumns}>
                <div className={styles.footerSection}>
                    <a href="credits.html">
                        <FormattedMessage
                            defaultMessage="Credits"
                            description="Credits link in footer"
                            id="tw.footer.credits"
                        />
                    </a>
					<a href="https://penguinmod.com/donate">
                        <FormattedMessage
                            defaultMessage="Donate to PenguinMod Developer"
                            description="Donation link to PenguinMod in footer"
                            id="tw.footer.donatePenguinmod"
                        />
                    </a>
					  <a href="https://github.com/sponsors/GarboMuffin">
                        <FormattedMessage
                            defaultMessage="Donate to TurboWarp Developer"
                            description="Donation link in footer"
                            id="tw.footer.donate"
                        />
                    </a>
					<a href="https://www.scratchfoundation.org/donate">
                        <FormattedMessage
                            defaultMessage="Donate to Scratch Developers"
                            description="Donation link to Scratch in footer"
                            id="tw.footer.donateScratch"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    <a href="https://desktop.turbowarp.org/">
                        {/* Do not translate */}
                        {"TurboWarp Desktop"}
                    </a>
                    <a href="https://gaiamod-main.github.io/GaiaMod-Packager">
                        {/* Do not translate */}
                        {"GaiaMod Packager"}
                    </a>
					<a href="https://studio.penguinmod.com/PenguinMod-Packager">
                        {/* Do not translate */}
                        {"PenguinMod Packager"}
                    </a>
                    <a href="https://gaiawindwave90.github.io/GaiaMod-Docs/embedding">
                        <FormattedMessage
                            defaultMessage="Embedding"
                            description="Link in footer to embedding documentation for embedding link"
                            id="tw.footer.embed"
                        />
                    </a>
                    <a href="https://gaiawindwave90.github.io/GaiaMod-Docs/url-parameters">
                        <FormattedMessage
                            defaultMessage="URL Parameters"
                            description="Link in footer to URL parameters documentation"
                            id="tw.footer.parameters"
                        />
                    </a>
                    <a href="https://gaiawindwave90.github.io/GaiaMod-Docs/">
                        <FormattedMessage
                            defaultMessage="Documentation"
                            description="Link in footer to additional documentation"
                            id="tw.footer.documentation"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    <a href="https://www.facebook.com/CrystalMae1990/">
                        <FormattedMessage
                            defaultMessage="Feedback & Bugs"
                            description="Link to feedback/bugs page"
                            id="tw.feedback"
                        />
                    </a>
					<a href="https://gaiawindwave90.github.io">
                        <FormattedMessage
                            defaultMessage="Gaia Zone"
                            description="The main website."
                            id="tw.gaiasite"
                        />
                    </a>
					<a href="https://gaiamod-main.github.io/">
                        <FormattedMessage
                            defaultMessage="Legacy version"
                            description="A link to the legacy version."
                            id="tw.gaiasite2"
                        />
                    </a>
					<a href="https://potentiamod.github.io/">
                        <FormattedMessage
                            defaultMessage="PotentiaMod"
                            description="A link to PotentiaMod."
                            id="tw.potentiamodlink"
                        />
                    </a>
                    <a href="https://github.com/gaiawindwave90/GaiaMod/">
                        <FormattedMessage
                            defaultMessage="Source Code"
                            description="Link to source code"
                            id="tw.code"
                        />
                    </a>
                    <a href="privacy.html">
                        <FormattedMessage
                            defaultMessage="Privacy Policy"
                            description="Link to privacy policy"
                            id="tw.privacy"
                        />
                    </a>
                </div>
            </div>
        </div>

<hr>
		<div className={styles.legal} style={{textAlign: 'center'}}>
	   <p>
	   <a
                            href="https://potentiamod.github.io/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                            width="125px"
                            alt="PotentiaMod"
                            src="https://potentiamod.github.io/images/512.png"
                            draggable={false}
                        />
							</a>
							</p>
							<p>
							<b>
						<em>
                            <FormattedMessage
                                defaultMessage="Also, check out PotentiaMod! It's better."
                                description="Link on the main page to the PotentiaMod page"
                                id="pot.projectrender.potentiamod"
                            />
							</em>
							</b>
							</p>		
            <p className={styles.info}>
                Version: 1.0.8 | <a
                    onClick={eraseData}
                    style={{color: 'red'}}
                >Erase data</a>
            </p>
        </div>

    </footer>
);

class Interface extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateProjectTitle =
            this.handleUpdateProjectTitle.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isLoading && !this.props.isLoading) {
            loadServiceWorker();
        }
    }
    handleUpdateProjectTitle(title, isDefault) {
        if (isDefault || !title) {
            document.title = `${APP_NAME} - ${this.props.intl.formatMessage(messages.defaultTitle)}`;
        } else {
            document.title = `${title} - ${APP_NAME}`;
        }
    }
    render() {
        if (isInvalidEmbed) {
            return <InvalidEmbed />;
        }

        const {
            /* eslint-disable no-unused-vars */
            intl,
            hasCloudVariables,
            description,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            projectId,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;
        return (
            <div
                className={classNames(styles.container, {
                    [styles.playerOnly]: isHomepage,
                    [styles.editor]: isEditor,
                })}
                dir={isRtl ? "rtl" : "ltr"}
            >
                <TWWindchimeSubmitter />
                {isHomepage ? (
                    <div className={styles.menu}>
                        <WrappedMenuBar
                            canChangeLanguage
                            canManageFiles
                            canChangeTheme
                            enableSeeInside
                            onClickAddonSettings={handleClickAddonSettings}
                        />
                    </div>
                ) : null}
                <div
                    className={styles.center}
                    style={
                        isPlayerOnly
                            ? {
                                  // + 2 accounts for 1px border on each side of the stage
                                  width: `${Math.max(480, props.customStageSize.width) + 2}px`,
                              }
                            : null
                    }
                >
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                        {...props}
                    />
                    {isHomepage ? (
                        <React.Fragment>
                            {isBrowserSupported() ? null : (
                                <BrowserModal isRtl={isRtl} />
                            )}
                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}>
                                    <CloudVariableBadge />
                                </div>
                            )}
                            {description.instructions || description.credits ? (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </div>
                            ) : null}
                            {projectId !== '0' && (
                                <VoteFrame
                                    id={projectId}
                                    darkmode={this.props.theme.gui !== GUI_LIGHT}
                                />
                            )}
                            <div className={styles.section}>
                                <p>
                                    <FormattedMessage
                                        // eslint-disable-next-line max-len
                                        defaultMessage="{gaiaMod} is a mod of {penguinMod} that adds special features in extensions and anything. {penguinMod} is a mod of {turboWarp} that adds new blocks to share projects with other people. {turboWarp} is a {scratch} mod that compiles projects to JavaScript to make them run really fast. Try it out by inputting a project ID or URL above or choosing a featured project below."
                                        description="Description of GaiaMod on the homepage"
                                        id="tw.home.description"
                                        values={{
                                            APP_NAME,
											gaiaMod: (
                                                <a
												style={{
                                                color: '#2d2dd3',
                                                cursor: 'pointer'
                                            }}
                                              href="https://gaiawindwave90.github.io/GaiaMod"
                                              target="_blank"
                                              rel="noreferrer"
                                                   >
                                              {'GaiaMod'}
                                               </a>
                                               ),
										penguinMod: (
                                                <a
												style={{
                                                color: '#00c3ff',
                                                cursor: 'pointer'
                                            }}
                                                href="https://penguinmod.com/"
                                              target="_blank"
                                              rel="noreferrer"
                                                   >
                                              {'PenguinMod'}
                                               </a>
                                               ),
										turboWarp: (
                                                <a
												style={{
                                                color: '#FF4C4C',
                                                cursor: 'pointer'
                                            }}
                                                href="https://turbowarp.org/"
                                              target="_blank"
                                              rel="noreferrer"
                                                   >
                                              {'TurboWarp'}
                                               </a>
                                               ),
										scratch: (
                                                <a
												style={{
                                                color: '#FCA919',
                                                cursor: 'pointer'
                                            }}
                                                href="https://scratch.mit.edu/"
                                              target="_blank"
                                              rel="noreferrer"
                                                   >
                                              {'Scratch'}
                                               </a>
                                               ),
                                            }}
                                    />
                                </p>
                            </div>
                            <div className={styles.section}>
                                <FeaturedProjects studio="27205657" />
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
                {isHomepage && <Footer />}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    hasCloudVariables: PropTypes.bool,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string,
    }),
    isFullScreen: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    projectId: PropTypes.string,
    theme: PropTypes.instanceOf(Theme),
};

const mapStateToProps = (state) => ({
    hasCloudVariables: state.scratchGui.tw.hasCloudVariables,
    customStageSize: state.scratchGui.customStageSize,
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId,
    theme: state.scratchGui.theme.theme
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(Interface),
);

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC("TW Interface"),
    TWProjectMetaFetcherHOC,
    TWStateManagerHOC,
    TWPackagerIntegrationHOC,
)(ConnectedInterface);

export default WrappedInterface;
