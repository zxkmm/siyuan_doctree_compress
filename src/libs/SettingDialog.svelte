<!--
 SettingDialog.svelte
 Document Tree Compress plugin — categorized & searchable settings panel.
 Rendered inside a SiYuan Dialog; styling reuses SiYuan's own b3 classes
 (b3-switch / b3-slider / b3-select / b3-text-field / b3-button) so it
 matches the native look.

 Layout (mirrors ../siyuan_rmv_btn): left category nav + right content
 panel + global search box that cross-filters all categories, plus a
 dedicated About / Credits tab. Unlike rmv_btn — whose items are all
 on/off switches — this plugin's items are heterogeneous (checkbox /
 slider / select / textarea / button), so each row renders the right
 control for its type.
-->

<script lang="ts">
  export type CategoryId = "general" | "dynamic" | "static" | "devices" | "about";

  export type ItemType =
    | "checkbox"
    | "select"
    | "textinput"
    | "textarea"
    | "number"
    | "slider"
    | "button"
    | "hint";

  export interface SettingItem {
    key: string;
    type: ItemType;
    title: string;
    description?: string;
    category: Exclude<CategoryId, "about">;
    options?: { [key: string]: string };
    slider?: { min: number; max: number; step: number };
    button?: { label: string; callback: () => void };
  }

  export let items: SettingItem[] = [];
  export let initialValues: { [key: string]: any } = {};
  export let defaults: { [key: string]: any } = {};
  export let i18n: any = {};
  export let aboutHtml: string = "";
  export let onSave: ((values: { [key: string]: any }) => void) | null = null;
  export let onCancel: (() => void) | null = null;

  // live working copy (heterogeneous values, not just booleans)
  let values: { [key: string]: any } = { ...initialValues };

  let activeCategory: CategoryId = "general";
  let searchTerm = "";

  // category id -> i18n label key, nav icon, and description key
  const CATEGORY_META: {
    id: Exclude<CategoryId, "about">;
    labelKey: string;
    descKey: string;
    icon: string;
  }[] = [
    { id: "general", labelKey: "catGeneral", descKey: "catGeneralDesc", icon: "iconSettings" },
    { id: "dynamic", labelKey: "catDynamic", descKey: "catDynamicDesc", icon: "iconSparkles" },
    { id: "static", labelKey: "catStatic", descKey: "catStaticDesc", icon: "iconList" },
    { id: "devices", labelKey: "catDevices", descKey: "catDevicesDesc", icon: "iconMonitor" },
  ];

  $: itemsByCategory = (() => {
    const m: { [c: string]: SettingItem[] } = {};
    for (const it of items) {
      (m[it.category] ||= []).push(it);
    }
    return m;
  })();

  function totalCount(cat: Exclude<CategoryId, "about">): number {
    return (itemsByCategory[cat] || []).length;
  }

  $: searching = searchTerm.trim().length > 0;

  $: searchResults = searching
    ? items.filter((it) => {
        const q = searchTerm.trim().toLowerCase();
        const desc = it.description || "";
        return (
          it.title.toLowerCase().includes(q) ||
          it.key.toLowerCase().includes(q) ||
          desc.toLowerCase().includes(q)
        );
      })
    : [];

  // visible list on the right pane
  $: visibleItems = searching
    ? searchResults
    : activeCategory === "about"
    ? []
    : itemsByCategory[activeCategory] || [];

  function onSearchInput() {
    // while searching the right pane auto shows cross-category hits
  }

  function clearSearch() {
    searchTerm = "";
  }

  function resetAll() {
    if (window.confirm(i18n?.resetAllConfirm || "Reset all to defaults?")) {
      values = { ...defaults };
    }
  }

  function cancel() {
    if (onCancel) onCancel();
  }

  function save() {
    if (onSave) onSave({ ...values });
  }

  function itemCountText(n: number): string {
    return (i18n?.itemCount || "{n} items").replace("{n}", String(n));
  }
</script>

<div class="dtc-setting">
  <!-- search bar (always visible) -->
  <div class="dtc-setting__search">
    <svg class="dtc-setting__search-icon">
      <use xlink:href="#iconSearch"></use>
    </svg>
    <input
      class="b3-text-field fn__flex-1"
      type="text"
      placeholder={i18n?.settingSearchPlaceholder || "Search..."}
      bind:value={searchTerm}
      on:input={onSearchInput}
    />
    {#if searching}
      <span
        class="dtc-setting__search-clear b3-tooltips b3-tooltips__w"
        aria-label={i18n?.clear || "Clear"}
        on:click={clearSearch}
        on:keydown={(e) => e.key === "Enter" && clearSearch()}
        role="button"
        tabindex="0"
      >
        <svg><use xlink:href="#iconClose"></use></svg>
      </span>
    {/if}
  </div>

  <div class="dtc-setting__body">
    <!-- left nav -->
    <ul class="dtc-setting__nav">
      {#each CATEGORY_META as meta (meta.id)}
        {#if totalCount(meta.id) > 0}
          <li>
            <button
              class="dtc-setting__nav-item"
              class:is-active={!searching && activeCategory === meta.id}
              on:click={() => {
                activeCategory = meta.id;
                searchTerm = "";
              }}
            >
              <svg class="dtc-setting__nav-icon">
                <use xlink:href="#{meta.icon}"></use>
              </svg>
              <span class="dtc-setting__nav-label">{i18n?.[meta.labelKey] || meta.id}</span>
              <span class="dtc-setting__nav-count">{totalCount(meta.id)}</span>
            </button>
          </li>
        {/if}
      {/each}
      <li class="dtc-setting__nav-spacer"></li>
      <li>
        <button
          class="dtc-setting__nav-item"
          class:is-active={!searching && activeCategory === "about"}
          on:click={() => {
            activeCategory = "about";
            searchTerm = "";
          }}
        >
          <svg class="dtc-setting__nav-icon"><use xlink:href="#iconHelp"></use></svg>
          <span class="dtc-setting__nav-label">{i18n?.catAbout || "About"}</span>
        </button>
      </li>
    </ul>

    <!-- right content -->
    <div class="dtc-setting__content">
      {#if searching}
        <div class="dtc-setting__contenthead">
          <span class="ft__on-surface">
            {searchResults.length} / {items.length}
          </span>
        </div>
      {:else if activeCategory !== "about"}
        <div class="dtc-setting__contenthead">
          <span class="ft__on-surface">
            {i18n?.[categoryDescKey(activeCategory)] || ""}
          </span>
        </div>
      {/if}

      {#if activeCategory === "about" && !searching}
        <div class="dtc-setting__about b3-typography">
          {@html aboutHtml}
        </div>
      {:else if visibleItems.length === 0}
        <div class="dtc-setting__empty ft__on-surface">
          {i18n?.noResults || "No results"}
        </div>
      {:else}
        <div class="dtc-setting__items">
          {#each visibleItems as item (item.key)}
            <div class="dtc-setting__item">
              <!-- left: title + description (two-line) -->
              <div class="dtc-setting__item-label">
                <span class="dtc-setting__item-title">{@html item.title}</span>
                {#if item.description}
                  <span class="dtc-setting__item-desc">{@html item.description}</span>
                {/if}
              </div>

              <!-- right: control, picked by type -->
              <div class="dtc-setting__item-control">
                {#if item.type === "checkbox"}
                  <input
                    class="b3-switch fn__flex-center"
                    type="checkbox"
                    bind:checked={values[item.key]}
                  />
                {:else if item.type === "slider"}
                  <input
                    class="b3-slider"
                    type="range"
                    min={item.slider?.min ?? 0}
                    max={item.slider?.max ?? 100}
                    step={item.slider?.step ?? 1}
                    bind:value={values[item.key]}
                  />
                  <span class="dtc-setting__slider-val">{values[item.key]}</span>
                {:else if item.type === "select"}
                  <select class="b3-select" bind:value={values[item.key]}>
                    {#each Object.keys(item.options || {}) as optVal}
                      <option value={coerceOption(optVal)}>{item.options?.[optVal]}</option>
                    {/each}
                  </select>
                {:else if item.type === "textarea"}
                  <textarea
                    class="b3-text-field dtc-setting__textarea"
                    bind:value={values[item.key]}
                  ></textarea>
                {:else if item.type === "number"}
                  <input
                    class="b3-text-field dtc-setting__num"
                    type="number"
                    bind:value={values[item.key]}
                  />
                {:else if item.type === "textinput"}
                  <input
                    class="b3-text-field dtc-setting__text"
                    type="text"
                    bind:value={values[item.key]}
                  />
                {:else if item.type === "button"}
                  <button
                    class="b3-button b3-button--outline"
                    on:click={() => item.button?.callback?.()}
                  >
                    {item.button?.label || "Button"}
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- footer -->
  <div class="dtc-setting__footer">
    <button class="b3-button b3-button--text" on:click={resetAll}>
      {i18n?.resetAll || "Reset All"}
    </button>
    <span class="fn__flex-1"></span>
    <button class="b3-button b3-button--cancel" on:click={cancel}>
      {i18n?.cancel || "Cancel"}
    </button>
    <span class="fn__space"></span>
    <button class="b3-button b3-button--text" on:click={save}>
      {i18n?.saveAndReload || "Save & Reload"}
    </button>
  </div>
</div>

<script context="module" lang="ts">
  // select <option> values arrive as strings from the options map; coerce
  // numeric keys back to numbers so bind:value stays type-consistent.
  export function coerceOption(raw: string): any {
    if (raw !== "" && !isNaN(Number(raw))) return Number(raw);
    return raw;
  }

  export function categoryDescKey(cat: string): string {
    switch (cat) {
      case "general": return "catGeneralDesc";
      case "dynamic": return "catDynamicDesc";
      case "static": return "catStaticDesc";
      case "devices": return "catDevicesDesc";
      default: return "";
    }
  }
</script>

<style>
  .dtc-setting {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  /* search bar */
  .dtc-setting__search {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--b3-border-color);
    background: var(--b3-theme-background);
  }
  .dtc-setting__search-icon,
  .dtc-setting__search-clear svg {
    width: 14px;
    height: 14px;
    color: var(--b3-theme-on-surface);
    flex-shrink: 0;
  }
  .dtc-setting__search-icon {
    width: 16px;
    height: 16px;
  }
  .dtc-setting__search-clear {
    cursor: pointer;
    display: inline-flex;
    opacity: 0.6;
  }
  .dtc-setting__search-clear:hover {
    opacity: 1;
  }

  /* body: nav + content */
  .dtc-setting__body {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .dtc-setting__nav {
    list-style: none;
    margin: 0;
    padding: 8px 0;
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid var(--b3-border-color);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .dtc-setting__nav-spacer {
    flex: 1;
  }
  .dtc-setting__nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    padding: 8px 16px;
    border: 0;
    background: transparent;
    color: var(--b3-theme-on-background);
    cursor: pointer;
    text-align: left;
    font-size: 14px;
  }
  .dtc-setting__nav-item:hover {
    background: var(--b3-list-icon-hover);
  }
  .dtc-setting__nav-item.is-active {
    background: var(--b3-theme-background-light);
    color: var(--b3-theme-primary);
  }
  .dtc-setting__nav-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    opacity: 0.7;
  }
  .dtc-setting__nav-item.is-active .dtc-setting__nav-icon {
    opacity: 1;
  }
  .dtc-setting__nav-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dtc-setting__nav-count {
    font-size: 12px;
    color: var(--b3-theme-on-surface);
    flex-shrink: 0;
    background: var(--b3-theme-surface);
    border-radius: 8px;
    padding: 1px 6px;
  }

  /* content */
  .dtc-setting__content {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .dtc-setting__contenthead {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--b3-border-color);
    position: sticky;
    top: 0;
    background: var(--b3-theme-background);
    z-index: 1;
    font-size: 12px;
  }

  /* items — two-line rows: title+control on top, description below */
  .dtc-setting__items {
    padding: 2px 0;
  }
  .dtc-setting__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--b3-border-color);
  }
  .dtc-setting__item:last-child {
    border-bottom: none;
  }
  .dtc-setting__item:hover {
    background: var(--b3-list-icon-hover);
  }
  .dtc-setting__item-label {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .dtc-setting__item-title {
    font-size: 14px;
    color: var(--b3-theme-on-background);
    line-height: 1.4;
  }
  .dtc-setting__item-desc {
    font-size: 12px;
    color: var(--b3-theme-on-surface);
    line-height: 1.4;
  }
  .dtc-setting__item-control {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 45%;
  }
  .dtc-setting__slider-val {
    font-size: 12px;
    color: var(--b3-theme-on-surface);
    min-width: 1.5em;
    text-align: right;
  }
  .dtc-setting__textarea {
    width: 100%;
    min-width: 220px;
    min-height: 60px;
  }
  .dtc-setting__num,
  .dtc-setting__text {
    width: 100%;
    min-width: 160px;
  }
  .dtc-setting__item-control .b3-slider {
    width: 140px;
  }
  .dtc-setting__item-control .b3-select {
    min-width: 160px;
  }
  .dtc-setting__empty {
    padding: 48px 16px;
    text-align: center;
  }

  /* about section */
  .dtc-setting__about {
    padding: 16px 24px;
  }

  /* footer */
  .dtc-setting__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-top: 1px solid var(--b3-border-color);
    background: var(--b3-theme-background);
  }

  /* mobile / narrow: collapse nav into a horizontal scroll strip */
  :global(.b3-dialog__container.is-mobile) .dtc-setting__body {
    flex-direction: column;
  }
  :global(.b3-dialog__container.is-mobile) .dtc-setting__nav {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    border-right: 0;
    border-bottom: 1px solid var(--b3-border-color);
    padding: 4px 8px;
  }
  :global(.b3-dialog__container.is-mobile) .dtc-setting__nav-spacer {
    display: none;
  }
  :global(.b3-dialog__container.is-mobile) .dtc-setting__nav-item {
    white-space: nowrap;
    padding: 6px 10px;
  }
  :global(.b3-dialog__container.is-mobile) .dtc-setting__item-control {
    max-width: 60%;
  }

  @media (max-width: 640px) {
    .dtc-setting__body {
      flex-direction: column;
    }
    .dtc-setting__nav {
      width: 100%;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      border-right: 0;
      border-bottom: 1px solid var(--b3-border-color);
      padding: 4px 8px;
    }
    .dtc-setting__nav-spacer {
      display: none;
    }
    .dtc-setting__nav-item {
      white-space: nowrap;
      padding: 6px 10px;
    }
    .dtc-setting__item-control {
      max-width: 60%;
    }
  }
</style>
