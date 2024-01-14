import {
    Plugin,
    lockScreen
} from "siyuan";
import "@/index.scss";



import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";

export default class siyuan_doctree_compress extends Plugin {

    private settingUtils: SettingUtils;

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
                const compressionPercentage = (await this.settingUtils.get("Slider"));
                if ((await this.settingUtils.get("mainSwitch"))) {
                    const doctreeBbserver = new MutationObserver(mutations => {
                        handleDomChanges();
                    });

                    const config = { attributes: true, childList: true, subtree: true };

                    doctreeBbserver.observe(document, config);

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
                console.error("siyuan_doctree_compress: failed loading device ifEnable condition", error);
            }
        };

        layoutReadyAsyncHandler();
    }







    async onunload() {
        await this.settingUtils.save();
        window.location.reload();
    }


















}