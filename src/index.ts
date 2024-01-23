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

    disableDocumentButtonsPopup() {
        const css = `
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n:hover::after,
        .b3-list-item__action.b3-tooltips.b3-tooltips__nw:hover::after,
        .popover__block.b3-tooltips.b3-tooltips__nw:hover::after {
          display: none;
        }                    
       `
        this.applyStyles(css);
    }

    displayIconButDIsableIconClick() {
        const css = `
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="修改图标"],
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="Change icon"] {
        pointer-events: none;
        }
       `
        this.applyStyles(css);
    }

    mouseOverReduceFontSize(_force_, _px_) {
        const css = _force_ ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px !important;
         }
         ` : `
         .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px;
         }`
        this.applyStyles(css);

    }

    mouseOverLineUnclamp(_force_) {
        const css = _force_ ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible !important;
         -webkit-line-clamp: unset;
         }
         ` : `
         .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible;
         -webkit-line-clamp: unset;
         }`

        this.applyStyles(css);

    }

    mouseOverZeroPadding(_force_, _px_) {
        const css = _force_ ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
            padding-left: ${_px_}px !important;
        }
        ` : `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
            padding-left: ${_px_}px;
        }`

        this.applyStyles(css);
    }


    hideContextualLabel() {

        const css = `
        .fn__flex-1.fn__flex-column.file-tree.sy__file .ariaLabel:hover {
            pointer-events: none;
          }                      
       `

        this.applyStyles(css);


    }


    overloadLineHeight(_force_, _px_) {

        const css = _force_ ? `
        .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px !important;
         }
         ` : `
         .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px;
         }`

        this.applyStyles(css);



    }

    addFrontLine() {
        const css = `

        .layout-tab-container .b3-list-item > .b3-list-item__toggle {
            padding-left: 4px !important;
        }

        ul ul:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            border-left: 2px solid var(--b3-theme-background-light);
        }
        
        ul ul {
            position: relative;
            padding-left: 20px;
        }
        
        `
        this.applyStyles(css);
    }


    addSeperateLine() {
        const css = `
        .layout-tab-container .b3-list-item__text {
            border-top: 1px solid #eaecef;
        }
        `
        this.applyStyles(css);
    }

    rmvDoctreeIcons(_force_) {

        const css = _force_ ? `
            .b3-list-item__icon {
                display: none !important;
            }
            ` : `
            .b3-list-item__icon {
                display: none;
            }
            `

        this.applyStyles(css);
    }


    rmvdoctreeIcons(_force_) {
        const _elementType_ = ".b3-list-item__icon"
        const css = _force_ == true ? `
            .${_elementType_} {
                display: none !important;
            }
        ` : `
            .${_elementType_} {
                display: none;
            }
        `
        this.applyStyles(css);
    }


    overloadDoctreeFontSize(_force_, _px_) {
        const css = _force_ == true ? `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px !important;
        }
        ` : `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px;
        }
        `
        this.applyStyles(css);
    }

    applyStyles(css) {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);
        style.appendChild(document.createTextNode(css));
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


        this.settingUtils.addItem({ //dynamic options
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
            key: "disable document buttons popup",
            value: false,
            type: "checkbox",
            title: this.i18n.disableDocumentButtonsPopup,
            description: this.i18n.disableDocumentButtonsPopupDesc,
        });

        this.settingUtils.addItem({
            key: "hideContextualLabel",
            value: false,
            type: "checkbox",
            title: this.i18n.hideContextualLabel,
            description: this.i18n.hideContextualLabelDesc,
        });

        this.settingUtils.addItem({ //static options
            key: "hintDangerousZone",
            value: "",
            type: "hint",
            title: this.i18n.hintDangerousZoneTitle,
            description: this.i18n.hintDangerousZoneDesc,
        });

        this.settingUtils.addItem({
            key: "enableAdjustStaticDoctreePadding",
            value: false,
            type: "checkbox",
            title: this.i18n.enableAdjustStaticDoctreePadding,
            description: this.i18n.enableAdjustStaticDoctreePaddingDesc,
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
                key: "displayIconButDisableIconClick",
                value: false,
                type: "checkbox",
                title: this.i18n.displayIconButDisableIconClick,
                description: this.i18n.displayIconButDisableIconClickDesc,
            });

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
            key: "overloadLineHeight",
            value: false,
            type: "checkbox",
            title: this.i18n.overloadLineHeight,
            description: this.i18n.overloadLineHeightDesc,
        });

        this.settingUtils.addItem({
            key: "overloadLineHeightForce",
            value: false,
            type: "checkbox",
            title: this.i18n.overloadLineHeightForce,
            description: this.i18n.overloadLineHeightForceDesc,
        });

        this.settingUtils.addItem({
            key: "overloadLineHeightPx",
            value: 28,
            type: "slider",
            title: this.i18n.overloadLineHeightPx,
            description: this.i18n.overloadLineHeightPxDesc,
            slider: {
                min: 1,
                max: 100,
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
                const _hideIconForceSwitch_ = this.settingUtils.get("hideIconForce");
                const _enableAdjustStaticDoctreePadding_ = this.settingUtils.get("enableAdjustStaticDoctreePadding");
                const _compressionPercentage_ = this.settingUtils.get("Slider");
                const _overloadFontSizeSwitch_ = this.settingUtils.get("overloadFontSizeSwitch");
                const _overloadFontSizeForceSwitch_ = this.settingUtils.get("overloadFontSizeForceSwitch");
                const _overloadFontSizePx_ = this.settingUtils.get("overloadFontSizePx");
                const _mouseHoverZeroPaddingForce_ = this.settingUtils.get("mouseHoverZeroPaddingForce");
                const _mouseHoverZeroPaddingPx_ = this.settingUtils.get("mouseHoverZeroPaddingPx");
                const _mouseOverLineUnclamp_ = this.settingUtils.get("mouseOverLineUnclamp");
                const _mouseOverLineUnclampForce_ = this.settingUtils.get("mouseOverLineUnclampForce");
                const _mouseOverReduceFontSize_ = this.settingUtils.get("mouseOverReduceFontSize");
                const _mouseOverReduceFontSizeForce_ = this.settingUtils.get("mouseOverLineUnclampForce");
                const _mouseHoverReduceFontSizePx_ = this.settingUtils.get("mouseHoverReduceFontSizePx");
                const _onlyEnableListedDevices_ = this.settingUtils.get("onlyEnableListedDevices");
                const _currentDeviceInList_ = await this.currentDeviceInList();
                const _hideContextualLabel_ = this.settingUtils.get("hideContextualLabel");
                const _displayIconButDIsableIconClick_ = this.settingUtils.get("displayIconButDisableIconClick");
                const _disableDocumentButtonsPopup_ = this.settingUtils.get("disable document buttons popup");
                const _overloadLineHeight_ = this.settingUtils.get("overloadLineHeight");
                const _overloadLineHeightForce_ = this.settingUtils.get("overloadLineHeightForce");
                const _overloadLineHeightPx_ = this.settingUtils.get("overloadLineHeightPx");

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


                if ((_currentDeviceInList_ || !_onlyEnableListedDevices_) && _mainSwitchStat_) { //main swtich and per deivce condition selecter

                    this.addFrontLine();

                    if (_overloadLineHeight_) { //overload line height sel
                        this.overloadLineHeight(_overloadLineHeightForce_, _overloadLineHeightPx_);
                    }


                    if (_hideIcon_) { //hide icon sel
                        this.rmvDoctreeIcons(_hideIconForceSwitch_);
                    }



                    if (_hideContextualLabel_) { //hide contextual label sel
                        this.hideContextualLabel();
                    }


                    if (_mouseoverZeroPadding_) { //TODO: 希望能更优雅一些。。。

                        this.mouseOverZeroPadding(_mouseHoverZeroPaddingForce_, _mouseHoverZeroPaddingPx_);

                    }

                    if (_mouseOverLineUnclamp_) {

                        this.mouseOverLineUnclamp(_mouseOverLineUnclampForce_);
                    }

                    if (_mouseOverReduceFontSize_) { //mouse hover reduce font size sel

                        this.mouseOverReduceFontSize(_mouseOverReduceFontSizeForce_, _mouseHoverReduceFontSizePx_);
                    }

                    //static options


                    if (_overloadFontSizeSwitch_) { //overload font size sel
                        this.overloadDoctreeFontSize(_overloadFontSizeForceSwitch_, _overloadFontSizePx_);
                    }

                    if (_displayIconButDIsableIconClick_) {// display icon but disable icon click sel
                        this.displayIconButDIsableIconClick();
                    }

                    if (_disableDocumentButtonsPopup_) {
                        this.disableDocumentButtonsPopup();
                    }


                    if (!_mouseoverZeroPadding_ && _enableAdjustStaticDoctreePadding_) { //主开关打开 && 鼠标悬停零缩进关闭 && 分别缩进开关启用



                        const doctreeObserver = new MutationObserver(mutations => {
                            handleDomChanges();
                        });

                        const config = { attributes: true, childList: true, subtree: true };

                        // doctreeBbserver.observe(document, config);

                        document.querySelectorAll('.fn__flex-column').forEach(element => {
                            doctreeObserver.observe(element, config);
                        });
                        //

                        function handleDomChanges() {

                            const elements = document.querySelectorAll('.b3-list-item');

                            elements.forEach(element => {
                                const isCompressed = element.querySelector('.b3-list-item__toggle').getAttribute('data-compressed');

                                if (!isCompressed) {
                                    const originalPadding = parseFloat(window.getComputedStyle(element.querySelector('.b3-list-item__toggle')).paddingLeft);

                                    const compressedPadding = originalPadding * (1 - _compressionPercentage_ / 100);

                                    if (element.getAttribute('data-type') != 'navigation-root') { //prevent compress notebook

                                        console.dir(element.getAttribute('data-type'));

                                        element.querySelector('.b3-list-item__toggle').style.paddingLeft = `${compressedPadding}px`;

                                        element.querySelector('.b3-list-item__toggle').setAttribute('data-compressed', 'true'); //mark as compressed prevent nested compression
                                    }
                                }
                            });
                        }


                    }


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