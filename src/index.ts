import { Plugin, Dialog } from "siyuan";
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
import SettingDialog from "./libs/SettingDialog.svelte";
import type { SettingItem } from "./libs/SettingDialog.svelte";

import {
  addFrontLine,
  mouseOverZeroPadding,
  overloadDoctreeFontSize,
  rmvDoctreeIcons,
  addNotebookOutline,
  addSeperateLine,
  overloadLineHeight,
  hideContextualLabel,
  mouseOverLineUnclamp,
  mouseOverReduceFontSize,
  disableDocumentButtonsPopup,
  displayIconButDisableIconClick,
} from "./style_injection";

import {
  currentDeviceInList,
  removeCurrentDeviceFromList,
  appendCurrentDeviceIntoList,
} from "./device_specific_helpers";

const STORAGE_NAME = "menu-config";

/**
 * Build the HTML for the "About / Credits" tab by combining the
 * begging + hint i18n sections that were previously rendered as
 * separate "hint"-type items in the flat panel.
 */
function buildAboutHtml(i18n: any): string {
  const parts: string[] = [];

  if (i18n.beggingDesc) {
    parts.push(`<div class="b3-callout b3-callout--warning">${i18n.beggingDesc}</div>`);
  }

  if (i18n.hintDesc) {
    parts.push(`<div class="b3-callout">${i18n.hintDesc}</div>`);
  }

  return parts.join('<hr class="b3-typography-hr" style="margin:16px 0">');
}

export default class SiyuanDoctreeCompress extends Plugin {
  private settingUtils: SettingUtils;

  async onload() {
    this.data[STORAGE_NAME] = { readonlyText: "Readonly" };

    this.settingUtils = new SettingUtils(this, STORAGE_NAME);

    this.settingUtils.load();

    // ── General ──────────────────────────────────────────────────────
    // (The begging + hint sections are now shown in the dedicated
    //  "About / Credits" tab of the Svelte dialog, not as hint-items.)

    this.settingUtils.addItem({
      key: "mainSwitch",
      value: false,
      type: "checkbox",
      title: this.i18n.mainSwitch,
      description: "",
      category: "general",
    });

    // ── Dynamic doctree layout options ───────────────────────────────

    this.settingUtils.addItem({
      key: "mouseHoverZeroPadding",
      value: false,
      type: "checkbox",
      title: this.i18n.mouseHoverZeroPadding,
      description: this.i18n.mouseHoverZeroPaddingDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseHoverZeroPaddingForce",
      value: true,
      type: "checkbox",
      title: this.i18n.mouseHoverZeroPaddingForce,
      description: this.i18n.mouseHoverZeroPaddingForceDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseHoverZeroPaddingStyle",
      value: 1,
      type: "select",
      title: this.i18n.mouseHoverZeroPaddingStyle,
      description: this.i18n.mouseHoverZeroPaddingStyledesc,
      options: {
        1: this.i18n.mouseHoverZeroPaddingStylePaddingToggle,
        2: this.i18n.mouseHoverZeroPaddingStylePaddingIcon,
        3: this.i18n.mouseHoverZeroPaddingStylePaddingIconButMoveLR,
        4: this.i18n.mouseHoverZeroPaddingStylePaddingText,
      },
      category: "dynamic",
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
      },
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseOverLineUnclamp",
      value: false,
      type: "checkbox",
      title: this.i18n.mouseOverLineUnclampTitle,
      description: this.i18n.mouseOverLineUnclampDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseOverLineUnclampForce",
      value: false,
      type: "checkbox",
      title: this.i18n.mouseOverLineUnclampForceTitle,
      description: this.i18n.mouseOverLineUnclampForceDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseOverReduceFontSize",
      value: false,
      type: "checkbox",
      title: this.i18n.mouseOverReduceFontSizeTitle,
      description: this.i18n.mouseOverReduceFontSizeDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "mouseOverReduceFontSizeForce",
      value: false,
      type: "checkbox",
      title: this.i18n.mouseOverReduceFontSizeForceTitle,
      description: this.i18n.mouseOverReduceFontSizeForceDesc,
      category: "dynamic",
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
      },
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "disable document buttons popup",
      value: false,
      type: "checkbox",
      title: this.i18n.disableDocumentButtonsPopup,
      description: this.i18n.disableDocumentButtonsPopupDesc,
      category: "dynamic",
    });

    this.settingUtils.addItem({
      key: "hideContextualLabel",
      value: false,
      type: "checkbox",
      title: this.i18n.hideContextualLabel,
      description: this.i18n.hideContextualLabelDesc,
      category: "dynamic",
    });

    // ── Static doctree layout options ────────────────────────────────
    // (Section divider is now the "Static" tab + its description.)

    this.settingUtils.addItem({
      key: "enableAdjustStaticDoctreePadding",
      value: false,
      type: "checkbox",
      title: this.i18n.enableAdjustStaticDoctreePadding,
      description: this.i18n.enableAdjustStaticDoctreePaddingDesc,
      category: "static",
    });

    this.settingUtils.addItem({
      key: "Slider",
      category: "static",
      value: 50,
      type: "slider",
      title: this.i18n.compressPercent,
      description: this.i18n.compressPercentDesc,
      slider: {
        min: 0,
        max: 100,
        step: 5,
      },
    });

    this.settingUtils.addItem({
      key: "enableDoctreeFrontLine",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.enableDoctreeFrontLine,
      description: this.i18n.enableDoctreeFrontLineDesc,
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLinePosition",
      category: "static",
      value: 20,
      type: "slider",
      title: this.i18n.doctreeFrontLinePosition,
      description: this.i18n.doctreeFrontLinePositionDesc,
      slider: {
        min: 0,
        max: 60,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLinePadding",
      category: "static",
      value: 20,
      type: "slider",
      title: this.i18n.doctreeFrontLinePadding,
      description: this.i18n.doctreeFrontLinePaddingDesc,
      slider: {
        min: 6,
        max: 60,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "doctreeFrontLineBorder",
      category: "static",
      value: 2,
      type: "slider",
      title: this.i18n.doctreeFrontLineBorder,
      description: this.i18n.doctreeFrontLineBorderDesc,
      slider: {
        min: 1,
        max: 20,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "docTreeFrontLineImplememtation",
      category: "static",
      value: 1,
      type: "select",
      title: this.i18n.docTreeFrontLineImplememtation,
      description: this.i18n.docTreeFrontLineImplememtationDesc,
      options: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    });

    this.settingUtils.addItem({
      key: "enableDoctreeSeperateLine",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.enableDoctreeSeperateLine,
      description: this.i18n.enableDoctreeSeperateLineDesc,
    });

    this.settingUtils.addItem({
      key: "doctreeSeperateLineBorder",
      category: "static",
      value: 2,
      type: "slider",
      title: this.i18n.doctreeSeperateLineBorder,
      description: this.i18n.doctreeSeperateLineBorderDesc,
      slider: {
        min: 1,
        max: 20,
        step: 1,
      },
    });

    this.settingUtils.addItem({
      key: "hideIcon",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.hideIcon,
      description: this.i18n.hideIconDesc,
    }),
      this.settingUtils.addItem({
        key: "hideIconForce",
        category: "static",
        value: false,
        type: "checkbox",
        title: this.i18n.hideIconForce,
        description: this.i18n.hideIconDescForce,
      }),
      this.settingUtils.addItem({
        key: "displayIconButDisableIconClick",
        category: "static",
        value: false,
        type: "checkbox",
        title: this.i18n.displayIconButDisableIconClick,
        description: this.i18n.displayIconButDisableIconClickDesc,
      });

    this.settingUtils.addItem({
      key: "overloadFontSizeSwitch",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.overloadFontSizeSwitch,
      description: this.i18n.overloadFontSizeSwitchDesc,
    }),
      this.settingUtils.addItem({
        key: "overloadFontSizeForceSwitch",
        category: "static",
        value: false,
        type: "checkbox",
        title: this.i18n.overloadFontSizeForceSwitch,
        description: this.i18n.overloadFontSizeForceSwitchDesc,
      }),
      this.settingUtils.addItem({
        key: "overloadFontSizePx",
        category: "static",
        value: 14,
        type: "slider",
        title: this.i18n.overloadFontSizePx,
        description: this.i18n.overloadFontSizePxDesc,
        slider: {
          min: 5,
          max: 60,
          step: 1,
        },
      });

    this.settingUtils.addItem({
      key: "overloadLineHeight",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.overloadLineHeight,
      description: this.i18n.overloadLineHeightDesc,
    });

    this.settingUtils.addItem({
      key: "overloadLineHeightForce",
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.overloadLineHeightForce,
      description: this.i18n.overloadLineHeightForceDesc,
    });

    this.settingUtils.addItem({
      key: "overloadLineHeightPx",
      category: "static",
      value: 28,
      type: "slider",
      title: this.i18n.overloadLineHeightPx,
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
      category: "static",
      value: false,
      type: "checkbox",
      title: this.i18n.addNotebookOutline,
      description: this.i18n.addNotebookOutlineDesc,
    });

    // this.settingUtils.addItem({ //moved to notebookOutlineMode
    //     key: "notebookOutlineTightMode",
    //     value: false,
    //     type: "checkbox",
    //     title: this.i18n.notebookOutlineTightMode,
    //     description: this.i18n.notebookOutlineTightModeDesc,
    // });

    this.settingUtils.addItem({
      key: "notebookOutlineMode",
      category: "static",
      value: 1,
      type: "select",
      title: this.i18n.notebookOutlineMode,
      description: this.i18n.notebookOutlineModeDesc,
      options: {
        1: "normal",
        2: "tight",
        3: "high contrast AKA TCOTC style",
      },
    });


    this.settingUtils.addItem({
      key: "onlyEnableListedDevices",
      category: "devices",
      value: false,
      type: "checkbox",
      title: this.i18n.onlyEnableListedDevices,
      description: this.i18n.onlyEnableListedDevicesDesc,
    });

    this.settingUtils.addItem({
      key: "enableDeviceList",
      category: "devices",
      value: "",
      type: "textarea",
      title: this.i18n.enableDeviceList,
      description: this.i18n.enableDeviceListDesc,
    });

    this.settingUtils.addItem({
      key: "addCurrentDeviceIntoList",
      category: "devices",
      value: "",
      type: "button",
      title: this.i18n.addCurrentDeviceIntoList,
      description: this.i18n.addCurrentDeviceIntoListDesc,
      button: {
        label: this.i18n.addCurrentDeviceIntoListLabel,
        callback: () => {
          appendCurrentDeviceIntoList(this.settingUtils);
        },
      },
    });

    this.settingUtils.addItem({
      key: "removeCurrentDeviceFromList",
      category: "devices",
      value: "",
      type: "button",
      title: this.i18n.removeCurrentDeviceFromList,
      description: this.i18n.removeCurrentDeviceFromListDesc,
      button: {
        label: this.i18n.removeCurrentDeviceFromListLabel,
        callback: () => {
          removeCurrentDeviceFromList(this.settingUtils);
        },
      },
    });

  }

  /**
   * Override the default openSetting to show the categorized, searchable
   * Svelte dialog instead of the flat native Setting panel. Mirrors the
   * approach in ../siyuan_rmv_btn.
   */
  openSetting() {
    // Build the items array from the registered settings Map. Hint items
    // are skipped (they were flat-panel section dividers; their content
    // now lives in the About tab / category descriptions).
    const items: SettingItem[] = [];
    for (const [, item] of this.settingUtils.settings) {
      if (item.type === "hint") continue;
      if (!item.category) continue;
      items.push({
        key: item.key,
        type: item.type,
        title: item.title,
        description: item.description,
        category: item.category,
        options: item.options,
        slider: item.slider,
        button: item.button,
      });
    }

    const initialValues = this.settingUtils.getAll();
    const defaults = this.settingUtils.getDefaults();
    const aboutHtml = buildAboutHtml(this.i18n);

    const dialog = new Dialog({
      title: this.i18n.settingsDialogTitle || "Settings",
      content: `<div id="doctree-compress-setting-mount" style="height:100%;"></div>`,
      width: "960px",
      height: "80vh",
      destroyCallback: () => {
        // Svelte auto-clears on target destruction
      },
    });

    // Mount after DOM insertion — use a microtask so the parent container
    // is guaranteed to be in the document.
    setTimeout(() => {
      const target = dialog.element.querySelector(
        "#doctree-compress-setting-mount"
      ) as HTMLElement;
      if (!target) return;

      new SettingDialog({
        target,
        props: {
          items,
          initialValues,
          defaults,
          i18n: this.i18n,
          aboutHtml,
          onSave: (values: { [key: string]: any }) => {
            this.settingUtils.applyValues(values);
            this.settingUtils.save().then(() => {
              window.location.reload();
            });
          },
          onCancel: () => {
            dialog.destroy();
          },
        },
      });
    }, 0);
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
        const _currentDeviceInList_ = await currentDeviceInList(
          this.settingUtils
        );
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
            overloadLineHeight(
              _overloadLineHeightForce_,
              _overloadLineHeightPx_
            );
          }

          if (_hideIcon_) {
            //hide icon sel
            rmvDoctreeIcons(_hideIconForceSwitch_);
          }

          if (_hideContextualLabel_) {
            //hide contextual label sel
            hideContextualLabel();
          }

          if (_mouseoverZeroPadding_) {
            //TODO: 希望能更优雅一些。。。

            mouseOverZeroPadding(
              _mouseHoverZeroPaddingForce_,
              _mouseHoverZeroPaddingPx_,
              _mouseHoverZeroPaddingStyle_
            );
          }

          if (_mouseOverLineUnclamp_) {
            mouseOverLineUnclamp(_mouseOverLineUnclampForce_);
          }

          if (_mouseOverReduceFontSize_) {
            //mouse hover reduce font size sel

            mouseOverReduceFontSize(
              _mouseOverReduceFontSizeForce_,
              _mouseHoverReduceFontSizePx_
            );
          }

          //static options

          if (_overloadFontSizeSwitch_) {
            //overload font size sel
            overloadDoctreeFontSize(
              _overloadFontSizeForceSwitch_,
              _overloadFontSizePx_
            );
          }

          if (_displayIconButDIsableIconClick_) {
            // display icon but disable icon click sel
            displayIconButDisableIconClick();
          }

          if (_disableDocumentButtonsPopup_) {
            disableDocumentButtonsPopup();
          }

          if (
            _enableDoctreeFrontLine_ &&
            !_mouseoverZeroPadding_ &&
            !_enableAdjustStaticDoctreePadding_
          ) {
            addFrontLine(
              _doctreeFrontLineImplememtation_,
              _doctreeFrontLinePosition_,
              _doctreeFrontLinePadding_,
              _doctreeFrontLineBorder_
            );
          }

          if (_enableDoctreeSeperateLine_) {
            addSeperateLine(_doctreeSeperateLineBorder_);
          }

          if (_addNotebookOutline_) {
            addNotebookOutline(_notebookOutlinemode_);
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
