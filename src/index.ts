import {
    Plugin
} from "siyuan";
import "@/index.scss";

/*
zxkmm naming style:
_inFuncMember_
_funcArgument_
funcName
_privateClassMember
*/


import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";

export default class siyuan_doctree_compress extends Plugin {

    private settingUtils: SettingUtils;


    rmvdoctreeIcons(_elementType_) {

        const _hideIconForceSwitch_ = this.settingUtils.get("hideIconForce");

        const _styleElement_ = document.createElement('style');
        _styleElement_.textContent = _hideIconForceSwitch_ == true ? `
            .${_elementType_} {
                display: none !important;
            }
        ` : `
            .${_elementType_} {
                display: none;
            }
        `
            ;

        document.head.appendChild(_styleElement_);
    }


    overloadDoctreeFontSize() {

        const _overloadFontSizeForceSwitch_ = this.settingUtils.get("overloadFontSizeForceSwitch");
        const _overloadFontSizePx_ = this.settingUtils.get("overloadFontSizePx");

        const _styleElement_ = document.createElement('style');
        _styleElement_.textContent = _overloadFontSizeForceSwitch_ == true ? `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_overloadFontSizePx_}px;
        }
        ` : `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_overloadFontSizePx_}px !important;
        }
        `
            ;

        document.head.appendChild(_styleElement_);
    }

    async appendCurrentDeviceIntoList() {
        try {
            // await!!!!!
            var current_device_info = await this.fetchCurrentDeviceInfo();

            var enableDeviceList = this.settingUtils.get("enableDeviceList");
            var enableDeviceListArray = enableDeviceList.split("\n");
            var enableDeviceListArrayLength = enableDeviceListArray.length;
            var enableDeviceListArrayLast = enableDeviceListArray[enableDeviceListArrayLength - 1];

            // remove empty line
            if (enableDeviceListArrayLast === "") {
                enableDeviceListArray.pop();
            }

            enableDeviceListArray.push(current_device_info);

            var enableDeviceListArrayString = enableDeviceListArray.join("\n");

            this.settingUtils.assignValue("enableDeviceList", enableDeviceListArrayString);
            this.settingUtils.save();
        } catch (error) {
            console.error("Error appending current device into list:", error);
        }
    }

    async removeCurrentDeviceFromList() {

        try {

            var current_device_info = await this.fetchCurrentDeviceInfo();

            var enableDeviceList = this.settingUtils.get("enableDeviceList");
            var enableDeviceListArray = enableDeviceList.split("\n");

            // make sure visited the entire list
            for (var i = enableDeviceListArray.length - 1; i >= 0; i--) {
                var deviceInfo = enableDeviceListArray[i];

                if (deviceInfo === current_device_info) {
                    enableDeviceListArray.splice(i, 1);
                }
            }

            // reassemble list
            var enableDeviceListArrayString = enableDeviceListArray.join("\n");

            this.settingUtils.assignValue("enableDeviceList", enableDeviceListArrayString);
            this.settingUtils.save();
        } catch (error) {
            console.error("Error removing current device from list:", error);
        }

    }

    fetchCurrentDeviceInfo(): Promise<string> {
        var current_device_uuid = window.siyuan.config.system.id;
        var current_device_name = window.siyuan.config.system.name;
        var current_device_info = current_device_uuid + " " + current_device_name;

        return Promise.resolve(current_device_info.toString());
    }

    async currentDeviceInList() {
        try {
            var current_device_info = await this.fetchCurrentDeviceInfo();

            var enableDeviceList = await this.settingUtils.get("enableDeviceList");
            var enableDeviceListArray = enableDeviceList.split("\n");

            return enableDeviceListArray.includes(current_device_info);
        } catch (error) {
            console.error("Error checking if current device is enabled:", error);
        }
    }

    async onload() {

        this.data[STORAGE_NAME] = { readonlyText: "Readonly" };

        this.settingUtils = new SettingUtils(this, STORAGE_NAME);

        this.settingUtils.load();

        this.settingUtils.addItem({
            key: "mainSwitch",
            value: false,
            type: "checkbox",
            title: this.i18n.mainSwitch,
            description: "",
        });


        this.settingUtils.addItem({
            key: "highPerformanceZoneHint",
            value: "",
            type: "hint",
            title: this.i18n.experimentFeatureHintTitle,
            description: this.i18n.experimentFeatureHintDesc,
        });

        this.settingUtils.addItem({
            key: "mouseHoverZeroPadding",
            value: false,
            type: "checkbox",
            title: this.i18n.mouseHoverZeroPadding,
            description: this.i18n.mouseHoverZeroPaddingDesc,
        });

        this.settingUtils.addItem({
            key: "mouseHoverZeroPaddingForce",
            value: true,
            type: "checkbox",
            title: this.i18n.mouseHoverZeroPaddingForce,
            description: this.i18n.mouseHoverZeroPaddingForceDesc,
        });

        this.settingUtils.addItem({
            key: "mouseHoverZeroPaddingPx",
            value: 4,
            type: "slider",
            title: this.i18n.mouseHoverZeroPaddingPx,
            description: this.i18n.mouseHoverZeroPaddingPxDesc,
            slider: {
                min: 0,
                max: 10,
                step: 1,
            }
        });

        this.settingUtils.addItem({
            key: "mouseOverLineUnclamp",
            value: false,
            type: "checkbox",
            title: this.i18n.mouseOverLineUnclampTitle,
            description: this.i18n.mouseOverLineUnclampDesc,

        });

        this.settingUtils.addItem({
            key: "mouseOverLineUnclampForce",
            value: false,
            type: "checkbox",
            title: this.i18n.mouseOverLineUnclampForceTitle,
            description: this.i18n.mouseOverLineUnclampForceDesc,

        });

        this.settingUtils.addItem({
            key: "mouseOverReduceFontSize",
            value: false,
            type: "checkbox",
            title: this.i18n.mouseOverReduceFontSizeTitle,
            description: this.i18n.mouseOverReduceFontSizeDesc,

        });

        this.settingUtils.addItem({
            key: "mouseOverReduceFontSizeForce",
            value: false,
            type: "checkbox",
            title: this.i18n.mouseOverReduceFontSizeForceTitle,
            description: this.i18n.mouseOverReduceFontSizeForceDesc,

        });

        this.settingUtils.addItem({
            key: "mouseHoverReduceFontSizePx",
            value: 4,
            type: "slider",
            title: this.i18n.mouseHoverReduceFontSizePx,
            description: this.i18n.mouseHoverReduceFontSizePxDesc,
            slider: {
                min: 1,
                max: 50,
                step: 1,
            }
        });

        this.settingUtils.addItem({
            key: "hintDangerousZone",
            value: "",
            type: "hint",
            title: this.i18n.hintDangerousZoneTitle,
            description: this.i18n.hintDangerousZoneDesc,
        });

        this.settingUtils.addItem({
            key: "Slider",
            value: 50,
            type: "slider",
            title: this.i18n.compressPercent,
            description: this.i18n.compressPercentDesc,
            slider: {
                min: 0,
                max: 100,
                step: 5,
            }
        });

        this.settingUtils.addItem({
            key: "hideIcon",
            value: false,
            type: "checkbox",
            title: this.i18n.hideIcon,
            description: this.i18n.hideIconDesc,
        }),

            this.settingUtils.addItem({
                key: "hideIconForce",
                value: false,
                type: "checkbox",
                title: this.i18n.hideIconForce,
                description: this.i18n.hideIconDescForce,
            }),

            this.settingUtils.addItem({
                key: "overloadFontSizeSwitch",
                value: false,
                type: "checkbox",
                title: this.i18n.overloadFontSizeSwitch,
                description: this.i18n.overloadFontSizeSwitchDesc,
            }),


            this.settingUtils.addItem({
                key: "overloadFontSizeForceSwitch",
                value: false,
                type: "checkbox",
                title: this.i18n.overloadFontSizeForceSwitch,
                description: this.i18n.overloadFontSizeForceSwitchDesc,
            }),

            this.settingUtils.addItem({
                key: "overloadFontSizePx",
                value: 14,
                type: "slider",
                title: this.i18n.overloadFontSizePx,
                description: this.i18n.overloadFontSizePxDesc,
                slider: {
                    min: 5,
                    max: 60,
                    step: 1,
                }
            });

        this.settingUtils.addItem({
            key: "hintDeviceSpecificSettings",
            value: "",
            type: "hint",
            title: this.i18n.hintDeviceSpecificSettingsTitle,
            description: this.i18n.hintDeviceSpecificSettingsDesc,
        });

        this.settingUtils.addItem({
            key: "onlyEnableListedDevices",
            value: false,
            type: "checkbox",
            title: this.i18n.onlyEnableListedDevices,
            description: this.i18n.onlyEnableListedDevicesDesc,
        });

        this.settingUtils.addItem({
            key: "enableDeviceList",
            value: "",
            type: "textarea",
            title: this.i18n.enableDeviceList,
            description: this.i18n.enableDeviceListDesc,
        });

        this.settingUtils.addItem({
            key: "addCurrentDeviceIntoList",
            value: "",
            type: "button",
            title: this.i18n.addCurrentDeviceIntoList,
            description: this.i18n.addCurrentDeviceIntoListDesc,
            button: {
                label: this.i18n.addCurrentDeviceIntoListLabel,
                callback: () => {
                    this.appendCurrentDeviceIntoList();
                }
            }
        });

        this.settingUtils.addItem({
            key: "removeCurrentDeviceFromList",
            value: "",
            type: "button",
            title: this.i18n.removeCurrentDeviceFromList,
            description: this.i18n.removeCurrentDeviceFromListDesc,
            button: {
                label: this.i18n.removeCurrentDeviceFromListLabel,
                callback: () => {
                    this.removeCurrentDeviceFromList();
                }
            }
        });

        this.settingUtils.addItem({
            key: "hint",
            value: "",
            type: "hint",
            title: this.i18n.hintTitle,
            description: this.i18n.hintDesc,
        });


    }



    onLayoutReady() {

        this.loadData(STORAGE_NAME);
        this.settingUtils.load();





        const layoutReadyAsyncHandler = async () => {






            //async!!!!!!!
            try {

                const _mouseoverZeroPadding_ = this.settingUtils.get("mouseHoverZeroPadding");
                const _mainSwitchStat_ = this.settingUtils.get("mainSwitch");
                const _hideIcon_ = this.settingUtils.get("hideIcon");
                const _compressionPercentage_ = this.settingUtils.get("Slider");
                const _overloadFontSizeSwitch_ = this.settingUtils.get("overloadFontSizeSwitch");
                const _mouseHoverZeroPaddingForce_ = this.settingUtils.get("mouseHoverZeroPaddingForce");
                const _mouseHoverZeroPaddingPx_ = this.settingUtils.get("mouseHoverZeroPaddingPx");
                const _mouseOverLineUnclamp_ = this.settingUtils.get("mouseOverLineUnclamp");
                const _mouseOverLineUnclampForce_ = this.settingUtils.get("mouseOverLineUnclampForce");
                const _mouseOverReduceFontSize_ = this.settingUtils.get("mouseOverReduceFontSize");
                const _mouseOverReduceFontSizeForce_ = this.settingUtils.get("mouseOverLineUnclampForce");
                const _mouseHoverReduceFontSizePx_ = this.settingUtils.get("mouseHoverReduceFontSizePx");
                const _onlyEnableListedDevices_ = this.settingUtils.get("onlyEnableListedDevices");
                const _currentDeviceInList_ = await this.currentDeviceInList();

                // console.log({
                //     mouseoverZeroPadding: _mouseoverZeroPadding_,
                //     mainSwitchStat: _mainSwitchStat_,
                //     hideIcon: _hideIcon_,
                //     compressionPercentage: _compressionPercentage_,
                //     overloadFontSizeSwitch: _overloadFontSizeSwitch_,
                //     mouseHoverZeroPaddingForce: _mouseHoverZeroPaddingForce_,
                //     mouseHoverZeroPaddingPx: _mouseHoverZeroPaddingPx_,
                //     mouseOverLineUnclamp: _mouseOverLineUnclamp_,
                //     mouseOverLineUnclampForce: _mouseOverLineUnclampForce_,
                //     mouseOverReduceFontSize: _mouseOverReduceFontSize_,
                //     mouseOverReduceFontSizeForce: _mouseOverReduceFontSizeForce_,
                //     mouseHoverReduceFontSizePx: _mouseHoverReduceFontSizePx_,
                //     onlyEnableListedDevices: _onlyEnableListedDevices_,
                //     currentDeviceInList: _currentDeviceInList_
                // });


                /*条件列表：
                当前设备真， 仅允许开关开，后半段为假 ：真||假： 执行
                当前设备真， 仅允许开关关，后半段为真 ：真||真： 执行
                当前设备假， 仅允许开关开，后半段为假 ：假||假： 不执行
                当前设备假， 仅允许开关关，后半段为真 ：假||真： 执行
                */

                // if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_) {
                //     console.log("进入条件");
                // } else {
                //     console.log("不进入条件");
                // }


                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_ && _hideIcon_) {
                    this.rmvdoctreeIcons('b3-list-item__icon');
                }


                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_ && _mouseoverZeroPadding_) { //TODO: 希望能更优雅一些。。。

                    function addTempPaddingCss(css) {
                        const head = document.head || document.getElementsByTagName('head')[0];
                        const style = document.createElement('style');
                        head.appendChild(style);
                        style.appendChild(document.createTextNode(css));
                    }

                    const css = _mouseHoverZeroPaddingForce_ ? `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-left: ${_mouseHoverZeroPaddingPx_}px !important;
                }
                ` : `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-left: ${_mouseHoverZeroPaddingPx_}px;
                }`

                    addTempPaddingCss(css);
                }

                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_ && _mouseOverLineUnclamp_) {

                    function addReduceLineClampCss(css) {
                        const head = document.head || document.getElementsByTagName('head')[0];
                        const style = document.createElement('style');
                        head.appendChild(style);
                        style.appendChild(document.createTextNode(css));
                    }

                    const css = _mouseOverLineUnclampForce_ ? `
                    .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                        overflow:visible !important;
                     -webkit-line-clamp: unset;
                     }
                     ` : `
                     .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                        overflow:visible;
                     -webkit-line-clamp: unset;
                     }`

                    addReduceLineClampCss(css);
                }

                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_ && _mouseOverReduceFontSize_) { //TODO: 希望能更优雅一些。。。

                    function addTempPaddingCss(css) {
                        const head = document.head || document.getElementsByTagName('head')[0];
                        const style = document.createElement('style');
                        head.appendChild(style);
                        style.appendChild(document.createTextNode(css));
                    }

                    const css = _mouseOverReduceFontSizeForce_ ? `
                    .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                        font-size: ${_mouseHoverReduceFontSizePx_}px !important;
                     }
                     ` : `
                     .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                        font-size: ${_mouseHoverReduceFontSizePx_}px;
                     }`

                    addTempPaddingCss(css);
                }


                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_ && _overloadFontSizeSwitch_) {
                    this.overloadDoctreeFontSize();
                }



                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_) {


                    if (!_mouseoverZeroPadding_) { //主开关打开 && 鼠标悬停零缩进关闭

                        // console.log("主开关打开 && 鼠标悬停零缩进关闭");


                        const doctreeObserver = new MutationObserver(mutations => {
                            handleDomChanges();
                        });

                        const config = { attributes: true, childList: true, subtree: true };

                        // doctreeBbserver.observe(document, config);
                        //
                        document.querySelectorAll('.fn__flex-column').forEach(element => {
                            doctreeObserver.observe(element, config);
                        });
                        //

                        function handleDomChanges() {

                            const elements = document.querySelectorAll('.b3-list-item__toggle');

                            elements.forEach(element => {
                                const isCompressed = element.getAttribute('data-compressed');

                                if (!isCompressed) {
                                    const originalPadding = parseFloat(window.getComputedStyle(element).paddingLeft);

                                    const compressedPadding = originalPadding * (1 - _compressionPercentage_ / 100);

                                    element.style.paddingLeft = `${compressedPadding}px`;

                                    element.setAttribute('data-compressed', 'true'); //mark as compressed prevent nested compression
                                }
                            });
                        }

                    }
                    //

                    // if (_mouseoverZeroPadding_) { //主开关打开 && 鼠标悬停零缩进打开 //旧方案，暂时保留！！！


                    //     console.log("主开关打开 && 鼠标悬停零缩进打开");
                    //     function handleDomChanges() {
                    //         const elements = document.querySelectorAll('.b3-list-item:not(.event-added)');

                    //         elements.forEach(element => {
                    //             const toggleElement = element.querySelector('.b3-list-item__toggle');
                    //             if (toggleElement) {
                    //                 const originalPadding = window.getComputedStyle(toggleElement).paddingLeft;
                    //                 toggleElement.setAttribute('data-original-padding', originalPadding);

                    //                 element.classList.add('event-added');
                    //             }
                    //         });
                    //     }

                    //     const doctreeObserver = new MutationObserver(mutations => {
                    //         mutations.forEach(mutation => {
                    //             if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    //                 const element = mutation.target;
                    //                 const toggleElement = element.querySelector('.b3-list-item__toggle');
                    //                 if (toggleElement) {
                    //                     const originalPadding = toggleElement.getAttribute('data-original-padding');
                    //                     if (originalPadding) {
                    //                         toggleElement.style.paddingLeft = originalPadding;
                    //                     }
                    //                 }
                    //             }
                    //         });

                    //         handleDomChanges();
                    //     });

                    //     const config = { attributes: true, childList: true, subtree: true };

                    //     document.querySelectorAll('.fn__flex-1').forEach(element => {
                    //         doctreeObserver.observe(element, config);
                    //     });

                    //     handleDomChanges();

                    // }

                    // //




                }
            } catch (error) {
                console.error("siyuan_doctree_compress: failed inject interface", error);
            }
        };

        layoutReadyAsyncHandler();
    }







    async onunload() {
        await this.settingUtils.save();
        window.location.reload();
    }


















}