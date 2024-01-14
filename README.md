
# SiYuan plugin sample with vite and svelte

[中文版](./README_zh_CN.md)

> Consistent with [siyuan/plugin-sample](https://github.com/siyuan-note/plugin-sample) [v0.3.2](https://github.com/siyuan-note/plugin-sample/tree/v0.3.2)



1. Using vite for packaging
2. Use symbolic linking instead of putting the project into the plugins directory program development
3. Built-in support for the svelte framework

     > If don't want svelte, turn to this template: [frostime/plugin-sample-vite](https://github.com/frostime/plugin-sample-vite)

4. Provides a github action template to automatically generate package.zip and upload to new release


## Get started

1. Make a copy of this repo as a template with the `Use this template` button, please note that the repo name must be the same as the plugin name, the default branch must be `main`

2. Clone your repo to a local development folder at any place
    - Notice: we **don't recommand** you to place the folder under your `{workspace}/data/plugins/` folder.

3. Install NodeJS and pnpm, then run pnpm i in the command line under your repo folder
4. **Auto create development symbolic links**
    - Make sure that SiYuan is running
    - Run `pnpm run make-link`, the script will detect all the siyuan workspace, please select the targe workspace and the script will automatically create the symbolic link under the `{workspace}/data/plugins/` folder
        ```bash
        >>> pnpm run make-link
        > plugin-sample-vite-svelte@0.0.3 make-link H:\SrcCode\开源项目\plugin-sample-vite-svelte
        > node  --no-warnings ./scripts/make_dev_link.js

        "targetDir" is empty, try to get SiYuan directory automatically....
        Got 2 SiYuan workspaces
        [0] H:\Media\SiYuan
        [1] H:\临时文件夹\SiYuanDevSpace
        Please select a workspace[0-1]: 0
        Got target directory: H:\Media\SiYuan/data/plugins
        Done! Created symlink H:\Media\SiYuan/data/plugins/plugin-sample-vite-svelte
        ```
4. **Manually create development symbolic links**
    - Open `./scripts/make_dev_link.js` file, set `targetDir` to your SiYuan plugin directory `<siyuan workspace>/data/plugins`
    - Run `pnpm run make-link`, succeed if following message is shown:
      ```bash
      >>> pnpm run make-link
      > plugin-sample-vite-svelte@0.0.1 make-link H:\SrcCode\plugin-sample-vite-svelte
      > node ./scripts/make_dev_link.js

      Done! Created symlink H:/SiYuanDevSpace/data/plugins/plugin-sample-vite-svelte
      ```
5. **Create development symbolic links by using environment variable**
    - You can set environment variable `SIYUAN_PLUGIN_DIR` as `/data/plugins`
6. Execute pnpm run dev for real-time compilation
7. Open SiYuan marketplace and enable plugin in downloaded tab

>  Notice: as the `make-link` script rely on the `fetch` function, please **ensure that at least version v18 of nodejs is installed** if you want to use make-link script.

## I18n

In terms of internationalization, our main consideration is to support multiple languages. Specifically, we need to
complete the following tasks:

* Meta information about the plugin itself, such as plugin description and readme
    * `description` and `readme` fields in plugin.json, and the corresponding README*.md file
* Text used in the plugin, such as button text and tooltips
    * src/i18n/*.json language configuration files
    * Use `this.i18.key` to get the text in the code

It is recommended that the plugin supports at least English and Simplified Chinese, so that more people can use it more
conveniently.

## plugin.json

```json
{
  "name": "plugin-sample-vite-svelte",
  "author": "frostime",
  "url": "https://github.com/siyuan-note/plugin-sample-vite-svelte",
  "version": "0.1.3",
  "minAppVersion": "2.8.8",
  "backends": ["windows", "linux", "darwin"],
  "frontends": ["desktop"],
  "displayName": {
    "en_US": "Plugin sample with vite and svelte",
    "zh_CN": "插件样例 vite + svelte 版"
  },
  "description": {
    "en_US": "SiYuan plugin sample with vite and svelte",
    "zh_CN": "使用 vite 和 svelte 开发的思源插件样例"
  },
  "readme": {
    "en_US": "README_en_US.md",
    "zh_CN": "README.md"
  },
  "funding": {
    "openCollective": "",
    "patreon": "",
    "github": "",
    "custom": [
      "https://ld246.com/sponsor"
    ]
  },
  "keywords": [
    "sample", "示例"
  ]
}
```

* `name`: Plugin name, must be the same as the repo name, and must be unique globally (no duplicate plugin names in the
  marketplace)
* `author`: Plugin author name
* `url`: Plugin repo URL
* `version`: Plugin version number, it is recommended to follow the [semver](https://semver.org/) specification
* `minAppVersion`: Minimum version number of SiYuan required to use this plugin
* `backends`: Backend environment required by the plugin, optional values are `windows`, `linux`, `darwin`, `docker`, `android`, `ios` and `all`
  * `windows`: Windows desktop
  * `linux`: Linux desktop
  * `darwin`: macOS desktop
  * `docker`: Docker
  * `android`: Android APP
  * `ios`: iOS APP
  * `all`: All environments
* `frontends`: Frontend environment required by the plugin, optional values are `desktop`, `desktop-window`, `mobile`, `browser-desktop`, `browser-mobile` and `all`
  * `desktop`: Desktop
  * `desktop-window`: Desktop window converted from tab
  * `mobile`: Mobile APP
  * `browser-desktop`: Desktop browser
  * `browser-mobile`: Mobile browser
  * `all`: All environments
* `displayName`: Template display name, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `description`: Plugin description, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `readme`: readme file name, mainly used to display in the marketplace details page, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `funding`: Plugin sponsorship information
    * `openCollective`: Open Collective name
    * `patreon`: Patreon name
    * `github`: GitHub login name
    * `custom`: Custom sponsorship link list
* `keywords`: Search keyword list, used for marketplace search function

## Package

No matter which method is used to compile and package, we finally need to generate a package.zip, which contains at
least the following files:

* i18n/*
* icon.png (160*160)
* index.css
* index.js
* plugin.json
* preview.png (1024*768)
* README*.md

## List on the marketplace

* `pnpm run build` to generate package.zip
* Create a new GitHub release using your new version number as the "Tag version". See here for an
  example: https://github.com/siyuan-note/plugin-sample/releases
* Upload the file package.zip as binary attachments
* Publish the release

If it is the first release, please create a pull request to
the [Community Bazaar](https://github.com/siyuan-note/bazaar) repository and modify the plugins.json file in it. This
file is the index of all community plugin repositories, the format is:

```json
{
  "repos": [
    "username/reponame"
  ]
}
```

After the PR is merged, the bazaar will automatically update the index and deploy through GitHub Actions. When releasing
a new version of the plugin in the future, you only need to follow the above steps to create a new release, and you
don't need to PR the community bazaar repo.

Under normal circumstances, the community bazaar repo will automatically update the index and deploy every hour,
and you can check the deployment status at https://github.com/siyuan-note/bazaar/actions.

## Use Github Action

The github action is included in this sample, you can use it to publish your new realse to marketplace automatically:

1. In your repo setting page `https://github.com/OWNER/REPO/settings/actions`, down to **Workflow Permissions** and open the configuration like this:

    ![](asset/action.png)

2. Push a tag in the format `v*` and github will automatically create a new release with new bulit package.zip

3. By default, it will only publish a pre-release, if you don't think this is necessary, change the settings in release.yml

    ```yaml
    - name: Release
        uses: ncipollo/release-action@v1
        with.
            allowUpdates: true
            artifactErrorsFailBuild: true
            artifacts: 'package.zip'
            token: ${{ secrets.GITHUB_TOKEN }}
            prerelease: true # change this to false
    ```


## How to remove svelte dependencies

> Pure vite without svelte: https://github.com/frostime/plugin-sample-vite

This plugin is packaged in vite and provides a dependency on the svelte framework. However, in practice some developers may not want to use svelte and only want to use the vite package.

In fact you can use this template without using svelte without any modifications at all. The compilation-related parts of the svelte compilation are loaded into the vite workflow as plugins, so even if you don't have svelte in your project, it won't matter much.

If you insist on removing all svelte dependencies so that they do not pollute your workspace, you can perform the following steps. 1.

1. delete the
    ```json
    {
      "@sveltejs/vite-plugin-svelte": "^2.0.3",
      "@tsconfig/svelte": "^4.0.1",
      "svelte": "^3.57.0"
    }
    ```
2. delete the `svelte.config.js` file
3. delete the following line from the `vite.config.js` file
    - Line 6: `import { svelte } from "@sveltejs/vite-plugin-svelte"`
    - Line 20: `svelte(),`
4. delete line 37 of `tsconfig.json` from `"svelte"` 5.
5. re-run `pnpm i`
