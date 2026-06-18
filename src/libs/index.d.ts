type TSettingItemType = "checkbox" | "select" | "textinput" | "textarea" | "number" | "slider" | "button" | "hint";

/**
 * Setting category ids. `about` is special — it is not backed by
 * ISettingItem rows but renders the About/Credits HTML.
 * The other ids must match the `category` field set on each ISettingItem.
 */
type TSettingCategory = "general" | "dynamic" | "static" | "devices" | "about";

interface ISettingItem {
    key: string;
    value: any;
    /** Value captured at addItem() time — used by the dialog's "Reset All". */
    defaultValue?: any;
    type: TSettingItemType;
    title: string;
    description?: string;
    placeholder?: string;
    /** Which tab of the Svelte settings dialog the item belongs to. */
    category?: TSettingCategory;
    slider?: {
        min: number;
        max: number;
        step: number;
    };
    options?: { [key: string | number]: string };
    button?: {
        label: string;
        callback: () => void;
    }
}
