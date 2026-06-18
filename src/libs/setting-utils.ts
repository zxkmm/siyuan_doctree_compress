/*
 * Copyright (c) 2023 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2023-09-16 18:05:00
 * @FilePath     : /src/libs/setting-utils.ts
 * @LastEditTime : 2023-12-28 18:10:12
 * @Description  : A utility for siyuan plugin settings
 *
 * NOTE: The settings UI is now rendered by the Svelte SettingDialog
 * (see ./SettingDialog.svelte). This class keeps the persistence layer
 * (load/save/dump/get/assignValue) and the in-memory settings Map that
 * both the dialog and the runtime (onLayoutReady) read from. It no
 * longer populates the native SiYuan Setting panel.
 */

import { Plugin, Setting } from 'siyuan';

export class SettingUtils {
    plugin: Plugin;
    name: string;
    file: string;

    settings: Map<string, ISettingItem> = new Map();
    elements: Map<string, HTMLElement> = new Map();

    constructor(plugin: Plugin, name?: string, callback?: (data: any) => void, width?: string, height?: string) {
        this.name = name ?? 'settings';
        this.plugin = plugin;
        this.file = this.name.endsWith('.json') ? this.name : `${this.name}.json`;
        // Keep a (mostly empty) native Setting instance for API compatibility —
        // the real UI is the Svelte dialog mounted by openSetting() in index.ts.
        this.plugin.setting = new Setting({
            width: width,
            height: height,
            confirmCallback: () => {
                // The UI is rendered by SettingDialog, which calls
                // applyValues() + save() directly. This native confirm path
                // is only a fallback if openSetting() is not overridden.
                if (callback !== undefined) {
                    callback(this.dump());
                } else {
                    this.save();
                }
            }
        });
    }

    /**
     * Snapshot of all current values as a plain object.
     * Used by the Svelte settings dialog to seed its working copy.
     */
    getAll(): { [key: string]: any } {
        const out: any = {};
        for (const [key, item] of this.settings) {
            if (item.type === 'button') continue;
            out[key] = item.value;
        }
        return out;
    }

    /**
     * Apply a values map back onto the settings items in memory.
     * Does NOT persist; caller should call save() afterwards.
     */
    applyValues(values: { [key: string]: any }) {
        for (const key of Object.keys(values)) {
            const item = this.settings.get(key);
            if (item) {
                item.value = values[key];
            }
        }
    }

    /**
     * Snapshot of every item's defaultValue (captured at addItem time).
     * Used by the dialog's "Reset All".
     */
    getDefaults(): { [key: string]: any } {
        const out: any = {};
        for (const [key, item] of this.settings) {
            if (item.type === 'button') continue;
            out[key] = item.defaultValue ?? item.value;
        }
        return out;
    }

    async load() {
        let data = await this.plugin.loadData(this.file);
        console.debug('Load config:', data);
        if (data) {
            for (let [key, item] of this.settings) {
                item.value = data?.[key] ?? item.value;
            }
        }
        this.plugin.data[this.name] = this.dump();
        return data;
    }

    async save() {
        let data = this.dump();
        await this.plugin.saveData(this.file, this.dump());
        return data;
    }

    /**
     * Get setting item value
     * @param key key name
     * @returns setting item value
     */
    get(key: string) {
        return this.settings.get(key)?.value;
    }

    async assignValue(_key_: string, _value_: any) {
        let item = this.settings.get(_key_);
        item.value = _value_;
        this.plugin.data[this.name] = item.value;
        await this.save();
        window.location.reload();
    }

    /**
     * 将设置项目导出为 JSON 对象
     * @returns object
     */
    dump(): Object {
        let data: any = {};
        for (let [key, item] of this.settings) {
            if (item.type === 'button') continue;
            data[key] = item.value;
        }
        return data;
    }

    /**
     * Register a setting item. Captures the initial value as the
     * "default" for Reset-All in the dialog. The native panel is NOT
     * populated — the Svelte SettingDialog renders every item.
     */
    addItem(item: ISettingItem) {
        if (item.defaultValue === undefined) {
            item.defaultValue = item.value;
        }
        this.settings.set(item.key, item);

        // Build the control element and keep it in the elements map. The
        // Svelte dialog does not use these DOM nodes directly, but legacy
        // getElement/updateValue paths (and any external consumers) still
        // rely on the map being populated.
        let itemElement: HTMLElement;
        switch (item.type) {
            case 'checkbox':
                let element: HTMLInputElement = document.createElement('input');
                element.type = 'checkbox';
                element.checked = item.value;
                element.className = "b3-switch fn__flex-center";
                itemElement = element;
                break;
            case 'select':
                let selectElement: HTMLSelectElement = document.createElement('select');
                selectElement.className = "b3-select fn__flex-center fn__size200";
                let options = item?.options ?? {};
                for (let val in options) {
                    let optionElement = document.createElement('option');
                    let text = options[val];
                    optionElement.value = val;
                    optionElement.text = text;
                    selectElement.appendChild(optionElement);
                }
                selectElement.value = item.value;
                itemElement = selectElement;
                break;
            case 'slider':
                let sliderElement: HTMLInputElement = document.createElement('input');
                sliderElement.type = 'range';
                sliderElement.className = 'b3-slider fn__size200 b3-tooltips b3-tooltips__n';
                sliderElement.ariaLabel = item.value;
                sliderElement.min = item.slider?.min.toString() ?? '0';
                sliderElement.max = item.slider?.max.toString() ?? '100';
                sliderElement.step = item.slider?.step.toString() ?? '1';
                sliderElement.value = item.value;
                sliderElement.onchange = () => {
                    sliderElement.ariaLabel = sliderElement.value;
                }
                itemElement = sliderElement;
                break;
            case 'textinput':
                let textInputElement: HTMLInputElement = document.createElement('input');
                textInputElement.className = 'b3-text-field fn__flex-center fn__size200';
                textInputElement.value = item.value;
                itemElement = textInputElement;
                break;
            case 'textarea':
                let textareaElement: HTMLTextAreaElement = document.createElement('textarea');
                textareaElement.className = "b3-text-field fn__block";
                textareaElement.value = item.value;
                itemElement = textareaElement;
                break;
            case 'number':
                let numberElement: HTMLInputElement = document.createElement('input');
                numberElement.type = 'number';
                numberElement.className = 'b3-text-field fn__flex-center fn__size200';
                numberElement.value = item.value;
                itemElement = numberElement;
                break;
            case 'button':
                let buttonElement: HTMLButtonElement = document.createElement('button');
                buttonElement.className = "b3-button b3-button--outline fn__flex-center fn__size200";
                buttonElement.innerText = item.button?.label ?? 'Button';
                buttonElement.onclick = item.button?.callback ?? (() => {});
                itemElement = buttonElement;
                break;
            case 'hint':
                let hintElement: HTMLElement = document.createElement('div');
                hintElement.className = 'b3-label fn__flex-center';
                itemElement = hintElement;
                break;
        }
        this.elements.set(item.key, itemElement);
    }

    private getElement(key: string) {
        let item = this.settings.get(key);
        let element = this.elements.get(key) as any;
        switch (item.type) {
            case 'checkbox':
                element.checked = item.value;
                break;
            case 'select':
                element.value = item.value;
                break;
            case 'slider':
                element.value = item.value;
                element.ariaLabel = item.value;
                break;
            case 'textinput':
                element.value = item.value;
                break;
            case 'textarea':
                element.value = item.value;
                break;
        }
        return element;
    }

    private updateValue(key: string) {
        let item = this.settings.get(key);
        let element = this.elements.get(key) as any;
        // console.debug(element, element?.value);
        switch (item.type) {
            case 'checkbox':
                item.value = element.checked;
                break;
            case 'select':
                item.value = element.value;
                break;
            case 'slider':
                item.value = element.value;
                break;
            case 'textinput':
                item.value = element.value;
                break;
            case 'textarea':
                item.value = element.value;
                break;
        }
    }

}
