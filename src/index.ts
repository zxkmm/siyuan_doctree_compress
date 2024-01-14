import {
    Plugin
} from "siyuan";
import "@/index.scss";



import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";

export default class siyuan_doctree_compress extends Plugin {

    private settingUtils: SettingUtils;

    rmvdoctreeIcons(elementType) {

        const _hideIconForceSwitch_ = this.settingUtils.get("hideIconForce");

        const styleElement = document.createElement('style');
        styleElement.textContent = _hideIconForceSwitch_ == true ? `
            .${elementType} {
                display: none !important;
            }
        ` : `
            .${elementType} {
                display: none;
            }
        `
            ;

        document.head.appendChild(styleElement);
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

            const _mainSwitchStat_ = await this.settingUtils.get("mainSwitch");
            const _hideIcon_ = await this.settingUtils.get("mainSwitch");
            console.log(_mainSwitchStat_);
            console.log(_hideIcon_);

            if (_mainSwitchStat_ && _hideIcon_) {
                this.rmvdoctreeIcons('b3-list-item__icon');
            }


            //async!!!!!!!
            try {
                const compressionPercentage = (await this.settingUtils.get("Slider"));
                if (_mainSwitchStat_) {
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
                        // console.log("dom changed");//DBG

                        const elements = document.querySelectorAll('.b3-list-item__toggle');

                        elements.forEach(element => {
                            const isCompressed = element.getAttribute('data-compressed');

                            if (!isCompressed) {
                                const originalPadding = parseFloat(window.getComputedStyle(element).paddingLeft);

                                const compressedPadding = originalPadding * (1 - compressionPercentage / 100);

                                element.style.paddingLeft = `${compressedPadding}px`;

                                element.setAttribute('data-compressed', 'true'); //mark as compressed prevent nested compression
                                // console.log("compressed" + element);//DBG
                            }
                        });
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