import { Plugin } from "siyuan";
import "@/index.scss";

/*
zxkmm naming style:
_inFuncMember_
_funcArgument_
funcName
privateClassMember_
_publicClassMember
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
       `;
    this.applyStyles(css);
  }

  displayIconButDIsableIconClick() {
    const css = `
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="修改图标"],
        .b3-list-item__icon.b3-tooltips.b3-tooltips__n[aria-label="Change icon"] {
        pointer-events: none;
        }
       `;
    this.applyStyles(css);
  }

  mouseOverReduceFontSize(_force_, _px_) {
    const css = _force_
      ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px !important;
         }
         `
      : `
         .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            font-size: ${_px_}px;
         }`;
    this.applyStyles(css);
  }

  mouseOverLineUnclamp(_force_) {
    const css = _force_
      ? `
        .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible !important;
         -webkit-line-clamp: unset;
         }
         `
      : `
         .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
            overflow:visible;
         -webkit-line-clamp: unset;
         }`;

    this.applyStyles(css);
  }

  mouseOverZeroPadding(_force_, _px_, _style_) {
    switch (_style_) {
      case "1":
        const css_padding_toggle = _force_
          ? `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-left: ${_px_}px !important;
                }
                `
          : `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-left: ${_px_}px;
                }`;
        this.applyStyles(css_padding_toggle);
        break;

      case "2":
        const css_padding_icon = _force_
          ? `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__icon {
                    padding-left: ${_px_}px !important;
                }
                `
          : `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__icon {
                    padding-left: ${_px_}px;
                }`;
        this.applyStyles(css_padding_icon);

        ///worker moving padding from toggle into icon
        function moving_padding_from_toggle_into_icon() {
          var toggles = document.getElementsByClassName("b3-list-item__toggle");
          for (var i = 0; i < toggles.length; i++) {
            var paddingLeft = window
              .getComputedStyle(toggles[i], null)
              .getPropertyValue("padding-left");
            var icon =
              toggles[i].parentNode.getElementsByClassName(
                "b3-list-item__icon"
              )[0];
            if (icon && paddingLeft !== _px_ + "px") {
              icon.style.paddingLeft = paddingLeft;
              toggles[i].style.paddingLeft = _px_ + "px"; // 将 padding-left 设为 0
            }
          }
        }

        moving_padding_from_toggle_into_icon();

        var observer = new MutationObserver(function (mutations) {
          moving_padding_from_toggle_into_icon();
        });

        var config = { childList: true, subtree: true };

        observer.observe(document, config);

        break;

      case "3":
        ///worker moving left padding of toggle into right

        function moving_left_padding_into_right() {
          var toggles = document.getElementsByClassName("b3-list-item__toggle");
          for (var i = 0; i < toggles.length; i++) {
            var paddingLeft = window
              .getComputedStyle(toggles[i], null)
              .getPropertyValue("padding-left");
            if (paddingLeft !== _px_ + "px") {
              toggles[i].style.paddingRight = paddingLeft;
              toggles[i].style.paddingLeft = _px_ + "px";
            }
          }
        }

        moving_left_padding_into_right();

        var observer = new MutationObserver(function (mutations) {
          moving_left_padding_into_right();
        });

        var config = { childList: true, subtree: true };

        observer.observe(document, config);

        const css_padding_icon_LR = _force_
          ? `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-right: ${_px_}px !important;
                }
                `
          : `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__toggle {
                    padding-right: ${_px_}px;
                }`;
        this.applyStyles(css_padding_icon_LR);

        break;

      case "4":
        const css_padding_text = _force_
          ? `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                    padding-left: ${_px_}px !important;
                }
                `
          : `
                .layout-tab-container .b3-list-item:hover > .b3-list-item__text {
                    padding-left: ${_px_}px;
                }`;
        this.applyStyles(css_padding_text);

        /// worker padding text

        function moving_padding_from_toggle_into_text() {
          var toggles = document.getElementsByClassName("b3-list-item__toggle");
          for (var i = 0; i < toggles.length; i++) {
            var paddingLeft = window
              .getComputedStyle(toggles[i], null)
              .getPropertyValue("padding-left");
            var text =
              toggles[i].parentNode.getElementsByClassName(
                "b3-list-item__text"
              )[0];
            if (text && paddingLeft !== _px_ + "px") {
              text.style.paddingLeft = paddingLeft;
              toggles[i].style.paddingLeft = _px_ + "px"; // 将 padding-left 设为 0
            }
          }
        }

        moving_padding_from_toggle_into_text();

        var observer = new MutationObserver(function (mutations) {
          moving_padding_from_toggle_into_text();
        });

        var config = { childList: true, subtree: true };

        observer.observe(document, config);
    }
  }

  hideContextualLabel() {
    const css = `
        .fn__flex-1.fn__flex-column.file-tree.sy__file .ariaLabel:hover {
            pointer-events: none;
          }                      
       `;

    this.applyStyles(css);
  }

  overloadLineHeight(_force_, _px_) {
    const css = _force_
      ? `
        .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px !important;
         }
         `
      : `
         .layout-tab-container .b3-list-item__text {
            line-height: ${_px_}px;
         }`;

    this.applyStyles(css);
  }

  addFrontLine(_implementation_, _line_location_, _padding_, _border_) {
    console.log(_implementation_);

    if (Number(_padding_) >= Number(_line_location_)) {
      _padding_ = _line_location_;
    }

    var css;

    switch (_implementation_) {
      case "1":
        css = `
                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    padding-left: 4px !important;
                }
        
                .layout-tab-container ul ul:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
        
                .layout-tab-container ul ul:hover:before {
                    border-left-color: var(--b3-theme-on-primary);
                }
                `;
        break;

      case "2":
        css = `
                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    position: relative; 
                    padding-left: 4px !important;
                }
                
                .layout-tab-container ul ul::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
                
                .layout-tab-container ul ul::after {
                    content: "";
                    position: absolute;
                    left: ${_line_location_}px;
                    border-bottom: var(--custom-block-list-guides-line-width) solid var(--b3-theme-on-surface) !important;
                    width: 0px; //dunno what's this currently
                    height: 0;
                }
                
                .layout-tab-container ul ul::before {
                    content: "";
                    position: absolute;
                    top: 0px; // make the line go down for x px.
                    left: ${_line_location_}px;
                    border-top: var(--custom-block-list-guides-line-width) solid var(--b3-theme-on-surface);
                }
                
                `;
        break;

      case "3":
        css = `

                .layout-tab-container .b3-list-item > .b3-list-item__toggle {
                    padding-left: 4px !important;
                }
        
                .layout-tab-container ul ul:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: ${_line_location_}px;
                    border-left: ${_border_}px solid var(--b3-theme-background-light);
                }
                
                .layout-tab-container ul ul {
                    position: relative;
                    padding-left: ${_padding_}px;
                }
                
                `;
    }

    this.applyStyles(css);
  }

  addSeperateLine(_border_) {
    const css = `
        .layout-tab-container .b3-list-item__text {
            border-top: ${_border_}px solid #eaecef;
        }
        `;
    this.applyStyles(css);
  }

  addNotebookOutline(_mode_) {
    //by https://github.com/TCOTC aka @Jeffrey Chen
    const css_tight_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.1em;
            margin: 7px 4px 7px 4px;
            outline: 1.9px solid var(--b3-theme-background-light);
            overflow: hidden;
        }
        `;
    const css_normal_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.3em;
            margin: 7px 10px 6px 10px;
            outline: 2px solid var(--b3-theme-background-light);
            overflow: hidden;
        }
        `;

    const css_high_contrast_ = `
        .sy__file ul.b3-list.b3-list--background {
            border-radius: 0.3em;
            margin: 6px 10px 6px 12px;
            outline: 1.5px double #8e9ba3;
            overflow: hidden;
        }
        `;
    if (_mode_ == 1) {
      this.applyStyles(css_normal_);
    } else if (_mode_ == 2) {
      this.applyStyles(css_tight_);
    } else if (_mode_ == 3) {
      this.applyStyles(css_high_contrast_);
    }
  }

  rmvDoctreeIcons(_force_) {
    const css = _force_
      ? `
            .b3-list-item__icon {
                display: none !important;
            }
            `
      : `
            .b3-list-item__icon {
                display: none;
            }
            `;

    this.applyStyles(css);
  }

  rmvdoctreeIcons(_force_) {
    const _elementType_ = ".b3-list-item__icon";
    const css =
      _force_ == true
        ? `
            .${_elementType_} {
                display: none !important;
            }
        `
        : `
            .${_elementType_} {
                display: none;
            }
        `;
    this.applyStyles(css);
  }

  overloadDoctreeFontSize(_force_, _px_) {
    const css =
      _force_ == true
        ? `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px !important;
        }
        `
        : `
        .layout-tab-container.fn__flex-1 {
            font-size: ${_px_}px;
        }
        `;
    this.applyStyles(css);
  }

  applyStyles(css) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
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
      var enableDeviceListArrayLast =
        enableDeviceListArray[enableDeviceListArrayLength - 1];

      // remove empty line
      if (enableDeviceListArrayLast === "") {
        enableDeviceListArray.pop();
      }

      enableDeviceListArray.push(current_device_info);

      var enableDeviceListArrayString = enableDeviceListArray.join("\n");

      this.settingUtils.assignValue(
        "enableDeviceList",
        enableDeviceListArrayString
      );
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

      this.settingUtils.assignValue(
        "enableDeviceList",
        enableDeviceListArrayString
      );
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
      //dynamic options
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
      title: "🌊 " + this.i18n.mouseHoverZeroPadding,
      description: this.i18n.mouseHoverZeroPaddingDesc,
    });

    this.settingUtils.addItem({
      key: "mouseHoverZeroPaddingForce",
      value: true,
      type: "checkbox",
      title: "🌊 " + this.i18n.mouseHoverZeroPaddingForce,
      description: this.i18n.mouseHoverZeroPaddingForceDesc,
    });

    this.settingUtils.addItem({
      key: "mouseHoverZeroPaddingStyle",
      value: 1,
      type: "select",
      title: "🌊 " + this.i18n.mouseHoverZeroPaddingStyle,
      description: this.i18n.mouseHoverZeroPaddingStyledesc,
      options: {
        1: this.i18n.mouseHoverZeroPaddingStylePaddingToggle,
        2: this.i18n.mouseHoverZeroPaddingStylePaddingIcon,
        3: this.i18n.mouseHoverZeroPaddingStylePaddingIconButMoveLR,
        4: this.i18n.mouseHoverZeroPaddingStylePaddingText,
      },
    });

    this.settingUtils.addItem({
      key: "mouseHoverZeroPaddingPx",
      value: 4,
      type: "slider",
      title: "🌊 " + this.i18n.mouseHoverZeroPaddingPx,
      description: this.i18n.mouseHoverZeroPaddingPxDesc,
      slider: {
        min: 0,
        max: 10,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "mouseOverLineUnclamp",
      value: false,
      type: "checkbox",
      title: "🟰 " + this.i18n.mouseOverLineUnclampTitle,
      description: this.i18n.mouseOverLineUnclampDesc,
    });

    this.settingUtils.addItem({
      key: "mouseOverLineUnclampForce",
      value: false,
      type: "checkbox",
      title: "🟰 " + this.i18n.mouseOverLineUnclampForceTitle,
      description: this.i18n.mouseOverLineUnclampForceDesc,
    });

    this.settingUtils.addItem({
      key: "mouseOverReduceFontSize",
      value: false,
      type: "checkbox",
      title: "🔡 " + this.i18n.mouseOverReduceFontSizeTitle,
      description: this.i18n.mouseOverReduceFontSizeDesc,
    });

    this.settingUtils.addItem({
      key: "mouseOverReduceFontSizeForce",
      value: false,
      type: "checkbox",
      title: "🔡 " + this.i18n.mouseOverReduceFontSizeForceTitle,
      description: this.i18n.mouseOverReduceFontSizeForceDesc,
    });

    this.settingUtils.addItem({
      key: "mouseHoverReduceFontSizePx",
      value: 4,
      type: "slider",
      title: "🔡 " + this.i18n.mouseHoverReduceFontSizePx,
      description: this.i18n.mouseHoverReduceFontSizePxDesc,
      slider: {
        min: 1,
        max: 50,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "disable document buttons popup",
      value: false,
      type: "checkbox",
      title: "💬 " + this.i18n.disableDocumentButtonsPopup,
      description: this.i18n.disableDocumentButtonsPopupDesc,
    });

    this.settingUtils.addItem({
      key: "hideContextualLabel",
      value: false,
      type: "checkbox",
      title: "🖃  " + this.i18n.hideContextualLabel,
      description: this.i18n.hideContextualLabelDesc,
    });

    this.settingUtils.addItem({
      //static options
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
      title: "🗜️ " + this.i18n.enableAdjustStaticDoctreePadding,
      description: this.i18n.enableAdjustStaticDoctreePaddingDesc,
    });

    this.settingUtils.addItem({
      key: "Slider",
      value: 50,
      type: "slider",
      title: "🗜️ " + this.i18n.compressPercent,
      description: this.i18n.compressPercentDesc,
      slider: {
        min: 0,
        max: 100,
        step: 5,
      },
    });

    this.settingUtils.addItem({
      key: "enableDoctreeFrontLine",
      value: false,
      type: "checkbox",
      title: "⛕ " + this.i18n.enableDoctreeFrontLine,
      description: this.i18n.enableDoctreeFrontLineDesc,
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLinePosition",
      value: 20,
      type: "slider",
      title: "⛕ " + this.i18n.doctreeFrontLinePosition,
      description: this.i18n.doctreeFrontLinePositionDesc,
      slider: {
        min: 0,
        max: 60,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLinePadding",
      value: 20,
      type: "slider",
      title: "⛕ " + this.i18n.doctreeFrontLinePadding,
      description: this.i18n.doctreeFrontLinePaddingDesc,
      slider: {
        min: 6,
        max: 60,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLineBorder",
      value: 2,
      type: "slider",
      title: "⛕ " + this.i18n.doctreeFrontLineBorder,
      description: this.i18n.doctreeFrontLineBorderDesc,
      slider: {
        min: 1,
        max: 20,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "docTreeFrontLineImplememtation",
      value: 1,
      type: "select",
      title: this.i18n.docTreeFrontLineImplememtation,
      description: this.i18n.docTreeFrontLineImplememtationDesc,
      options: {
        1: "1",
        2: "2",
        3: "3",
      },
    });

    this.settingUtils.addItem({
      key: "enableDoctreeSeperateLine",
      value: false,
      type: "checkbox",
      title: "➖ " + this.i18n.enableDoctreeSeperateLine,
      description: this.i18n.enableDoctreeSeperateLineDesc,
    });

    this.settingUtils.addItem({
      key: "doctreeSeperateLineBorder",
      value: 2,
      type: "slider",
      title: "➖ " + this.i18n.doctreeSeperateLineBorder,
      description: this.i18n.doctreeSeperateLineBorderDesc,
      slider: {
        min: 1,
        max: 20,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "hideIcon",
      value: false,
      type: "checkbox",
      title: "🧩 " + this.i18n.hideIcon,
      description: this.i18n.hideIconDesc,
    }),
      this.settingUtils.addItem({
        key: "hideIconForce",
        value: false,
        type: "checkbox",
        title: "🧩 " + this.i18n.hideIconForce,
        description: this.i18n.hideIconDescForce,
      }),
      this.settingUtils.addItem({
        key: "displayIconButDisableIconClick",
        value: false,
        type: "checkbox",
        title: "🖱️ " + this.i18n.displayIconButDisableIconClick,
        description: this.i18n.displayIconButDisableIconClickDesc,
      });

    this.settingUtils.addItem({
      key: "overloadFontSizeSwitch",
      value: false,
      type: "checkbox",
      title: "🇦 " + this.i18n.overloadFontSizeSwitch,
      description: this.i18n.overloadFontSizeSwitchDesc,
    }),
      this.settingUtils.addItem({
        key: "overloadFontSizeForceSwitch",
        value: false,
        type: "checkbox",
        title: "🇦 " + this.i18n.overloadFontSizeForceSwitch,
        description: this.i18n.overloadFontSizeForceSwitchDesc,
      }),
      this.settingUtils.addItem({
        key: "overloadFontSizePx",
        value: 14,
        type: "slider",
        title: "🇦 " + this.i18n.overloadFontSizePx,
        description: this.i18n.overloadFontSizePxDesc,
        slider: {
          min: 5,
          max: 60,
          step: 1,
        },
      });

    this.settingUtils.addItem({
      key: "overloadLineHeight",
      value: false,
      type: "checkbox",
      title: "🛅 " + this.i18n.overloadLineHeight,
      description: this.i18n.overloadLineHeightDesc,
    });

    this.settingUtils.addItem({
      key: "overloadLineHeightForce",
      value: false,
      type: "checkbox",
      title: "🛅 " + this.i18n.overloadLineHeightForce,
      description: this.i18n.overloadLineHeightForceDesc,
    });

    this.settingUtils.addItem({
      key: "overloadLineHeightPx",
      value: 28,
      type: "slider",
      title: "🛅 " + this.i18n.overloadLineHeightPx,
      description: this.i18n.overloadLineHeightPxDesc,
      slider: {
        min: 1,
        max: 100,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      //by https://github.com/TCOTC aka @Jeffrey Chen
      key: "addNotebookOutline",
      value: false,
      type: "checkbox",
      title: "🖼️ " + this.i18n.addNotebookOutline,
      description: this.i18n.addNotebookOutlineDesc,
    });

    // this.settingUtils.addItem({ //moved to notebookOutlineMode
    //     key: "notebookOutlineTightMode",
    //     value: false,
    //     type: "checkbox",
    //     title: "🖼️ " + this.i18n.notebookOutlineTightMode,
    //     description: this.i18n.notebookOutlineTightModeDesc,
    // });

    this.settingUtils.addItem({
      key: "notebookOutlineMode",
      value: 1,
      type: "select",
      title: "🖼️ " + this.i18n.notebookOutlineMode,
      description: this.i18n.notebookOutlineModeDesc,
      options: {
        1: "normal",
        2: "tight",
        3: "high contrast AKA TCOTC style",
      },
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
        },
      },
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
        },
      },
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
        const _mouseoverZeroPadding_ = this.settingUtils.get(
          "mouseHoverZeroPadding"
        );
        const _mainSwitchStat_ = this.settingUtils.get("mainSwitch");
        const _hideIcon_ = this.settingUtils.get("hideIcon");
        const _hideIconForceSwitch_ = this.settingUtils.get("hideIconForce");
        const _enableAdjustStaticDoctreePadding_ = this.settingUtils.get(
          "enableAdjustStaticDoctreePadding"
        );
        const _compressionPercentage_ = this.settingUtils.get("Slider");
        const _overloadFontSizeSwitch_ = this.settingUtils.get(
          "overloadFontSizeSwitch"
        );
        const _overloadFontSizeForceSwitch_ = this.settingUtils.get(
          "overloadFontSizeForceSwitch"
        );
        const _overloadFontSizePx_ =
          this.settingUtils.get("overloadFontSizePx");
        const _mouseHoverZeroPaddingForce_ = this.settingUtils.get(
          "mouseHoverZeroPaddingForce"
        );
        const _mouseHoverZeroPaddingStyle_ = this.settingUtils.get(
          "mouseHoverZeroPaddingStyle"
        );
        const _mouseHoverZeroPaddingPx_ = this.settingUtils.get(
          "mouseHoverZeroPaddingPx"
        );
        const _mouseOverLineUnclamp_ = this.settingUtils.get(
          "mouseOverLineUnclamp"
        );
        const _mouseOverLineUnclampForce_ = this.settingUtils.get(
          "mouseOverLineUnclampForce"
        );
        const _mouseOverReduceFontSize_ = this.settingUtils.get(
          "mouseOverReduceFontSize"
        );
        const _mouseOverReduceFontSizeForce_ = this.settingUtils.get(
          "mouseOverLineUnclampForce"
        );
        const _mouseHoverReduceFontSizePx_ = this.settingUtils.get(
          "mouseHoverReduceFontSizePx"
        );
        const _onlyEnableListedDevices_ = this.settingUtils.get(
          "onlyEnableListedDevices"
        );
        const _currentDeviceInList_ = await this.currentDeviceInList();
        const _hideContextualLabel_ = this.settingUtils.get(
          "hideContextualLabel"
        );
        const _displayIconButDIsableIconClick_ = this.settingUtils.get(
          "displayIconButDisableIconClick"
        );
        const _disableDocumentButtonsPopup_ = this.settingUtils.get(
          "disable document buttons popup"
        );
        const _overloadLineHeight_ =
          this.settingUtils.get("overloadLineHeight");
        const _overloadLineHeightForce_ = this.settingUtils.get(
          "overloadLineHeightForce"
        );
        const _overloadLineHeightPx_ = this.settingUtils.get(
          "overloadLineHeightPx"
        );
        const _enableDoctreeFrontLine_ = this.settingUtils.get(
          "enableDoctreeFrontLine"
        );
        const _doctreeFrontLinePosition_ = this.settingUtils.get(
          "doctreeFrontLinePosition"
        );
        const _doctreeFrontLinePadding_ = this.settingUtils.get(
          "doctreeFrontLinePadding"
        );
        const _doctreeFrontLineBorder_ = this.settingUtils.get(
          "doctreeFrontLineBorder"
        );
        const _doctreeFrontLineImplememtation_ = this.settingUtils.get(
          "docTreeFrontLineImplememtation"
        );
        const _enableDoctreeSeperateLine_ = this.settingUtils.get(
          "enableDoctreeSeperateLine"
        );
        const _doctreeSeperateLineBorder_ = this.settingUtils.get(
          "doctreeSeperateLineBorder"
        );
        const _addNotebookOutline_ =
          this.settingUtils.get("addNotebookOutline");
        // const _notebookOutlineTightMode_ = this.settingUtils.get("notebookOutlineTightMode"); //moved to notebookOutlineMode
        const _notebookOutlinemode_ = this.settingUtils.get(
          "notebookOutlineMode"
        );

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
        //     currentDeviceInList: _currentDeviceInList_,
        //     hideContextualLabel: _hideContextualLabel_,
        //     displayIconButDIsableIconClick: _displayIconButDIsableIconClick_,
        //     disableDocumentButtonsPopup: _disableDocumentButtonsPopup_,
        //     overloadLineHeight: _overloadLineHeight_,
        //     overloadLineHeightForce: _overloadLineHeightForce_,
        //     overloadLineHeightPx: _overloadLineHeightPx_,
        //     enableDoctreeFrontLine: _enableDoctreeFrontLine_,
        //     doctreeFrontLinePosition: _doctreeFrontLinePosition_,
        //     doctreeFrontLinePadding: _doctreeFrontLinePadding_,
        //     doctreeFrontLineBorder: _doctreeFrontLineBorder_,
        //     enableDoctreeSeperateLine: _enableDoctreeSeperateLine_,
        //     doctreeSeperateLineBorder: _doctreeSeperateLineBorder_,
        //     addNotebookOutline: _addNotebookOutline_,
        //     notebookOutlineTightMode: _notebookOutlineTightMode_,
        // });

        /*条件列表：
                当前设备真， 仅允许开关开，后半段为假 ：真||假： 执行
                当前设备真， 仅允许开关关，后半段为真 ：真||真： 执行
                当前设备假， 仅允许开关开，后半段为假 ：假||假： 不执行
                当前设备假， 仅允许开关关，后半段为真 ：假||真： 执行
                */

        if (
          (_currentDeviceInList_ || !_onlyEnableListedDevices_) &&
          _mainSwitchStat_
        ) {
          //main swtich and per deivce condition selecter

          if (_overloadLineHeight_) {
            //overload line height sel
            this.overloadLineHeight(
              _overloadLineHeightForce_,
              _overloadLineHeightPx_
            );
          }

          if (_hideIcon_) {
            //hide icon sel
            this.rmvDoctreeIcons(_hideIconForceSwitch_);
          }

          if (_hideContextualLabel_) {
            //hide contextual label sel
            this.hideContextualLabel();
          }

          if (_mouseoverZeroPadding_) {
            //TODO: 希望能更优雅一些。。。

            this.mouseOverZeroPadding(
              _mouseHoverZeroPaddingForce_,
              _mouseHoverZeroPaddingPx_,
              _mouseHoverZeroPaddingStyle_
            );
          }

          if (_mouseOverLineUnclamp_) {
            this.mouseOverLineUnclamp(_mouseOverLineUnclampForce_);
          }

          if (_mouseOverReduceFontSize_) {
            //mouse hover reduce font size sel

            this.mouseOverReduceFontSize(
              _mouseOverReduceFontSizeForce_,
              _mouseHoverReduceFontSizePx_
            );
          }

          //static options

          if (_overloadFontSizeSwitch_) {
            //overload font size sel
            this.overloadDoctreeFontSize(
              _overloadFontSizeForceSwitch_,
              _overloadFontSizePx_
            );
          }

          if (_displayIconButDIsableIconClick_) {
            // display icon but disable icon click sel
            this.displayIconButDIsableIconClick();
          }

          if (_disableDocumentButtonsPopup_) {
            this.disableDocumentButtonsPopup();
          }

          if (
            _enableDoctreeFrontLine_ &&
            !_mouseoverZeroPadding_ &&
            !_enableAdjustStaticDoctreePadding_
          ) {
            this.addFrontLine(
              _doctreeFrontLineImplememtation_,
              _doctreeFrontLinePosition_,
              _doctreeFrontLinePadding_,
              _doctreeFrontLineBorder_
            );
          }

          if (_enableDoctreeSeperateLine_) {
            this.addSeperateLine(_doctreeSeperateLineBorder_);
          }

          if (_addNotebookOutline_) {
            this.addNotebookOutline(_notebookOutlinemode_);
          }

          if (!_mouseoverZeroPadding_ && _enableAdjustStaticDoctreePadding_) {
            //主开关打开 && 鼠标悬停零缩进关闭 && 分别缩进开关启用

            const doctreeObserver = new MutationObserver((mutations) => {
              handleDomChanges();
            });

            const config = { attributes: true, childList: true, subtree: true };

            // doctreeBbserver.observe(document, config);

            document.querySelectorAll(".fn__flex-column").forEach((element) => {
              doctreeObserver.observe(element, config);
            });
            //

            function handleDomChanges() {
              const _elements_ = document.querySelectorAll(".b3-list-item");

              _elements_.forEach((element) => {
                const _toggleElement_ = element.querySelector(
                  ".b3-list-item__toggle"
                );
                if (_toggleElement_) {
                  // Check if the element exists
                  const _isCompressed_ =
                    _toggleElement_.getAttribute("data-compressed");

                  if (!_isCompressed_) {
                    const _originalPadding_ = parseFloat(
                      window.getComputedStyle(_toggleElement_).paddingLeft
                    );
                    const _compressedPadding_ =
                      _originalPadding_ * (1 - _compressionPercentage_ / 100);

                    if (
                      element.getAttribute("data-type") != "navigation-root"
                    ) {
                      //prevent compress notebook
                      _toggleElement_.style.paddingLeft = `${_compressedPadding_}px`;
                      _toggleElement_.setAttribute("data-compressed", "true"); //mark as compressed prevent nested compression
                    }
                  }
                }
              });
            }
          }
        }
      } catch (error) {
        console.error(
          "siyuan_doctree_compress: failed inject interface",
          error
        );
      }
    };

    layoutReadyAsyncHandler();
  }

  async onunload() {
    // await this.settingUtils.save();
    // window.location.reload();
  }
}
