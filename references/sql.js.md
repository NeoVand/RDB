This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.devcontainer/
  devcontainer.json
  Dockerfile
.github/
  actions/
    build-sqljs/
      action.yml
      entrypoint.sh
  workflows/
    CI.yml
    release.yml
examples/
  GUI/
    demo.css
    gui.js
    index.html
  persistent.html
  README.md
  repl.html
  requireJS.html
  simple.html
  start_local_server.py
GUI/
  index.html
src/
  api.js
  exported_functions.json
  exported_runtime_methods.json
  shell-post.js
  shell-pre.js
  worker.js
test/
  all.js
  disabled_test_memory_leak_on_error.js
  load_sql_lib.js
  run.sh
  sql-requireJS.html
  test_aggregate_functions.js
  test_aggregate_redefinition.js
  test_big_int.js
  test_blob.js
  test_database.js
  test_errors.js
  test_extension_functions.js
  test_functions_recreate.js
  test_functions.js
  test_issue128.js
  test_issue325.js
  test_issue55.js
  test_issue73.js
  test_issue76.js
  test_json1.js
  test_long_sql_statement.js
  test_modularization.js
  test_node_file.js
  test_statement_iterator.js
  test_statement.js
  test_transactions.js
  test_update_hook.js
  test_worker.js
  test_workers.html
.eslintrc.js
.gitignore
.jsdoc.config.json
.npmignore
AUTHORS
CONTRIBUTING.md
documentation_index.md
index.html
LICENSE
logo.svg
Makefile
package.json
README.md
```

# Files

## File: .devcontainer/devcontainer.json
````json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.155.1/containers/typescript-node
{
	"name": "Node.js & TypeScript",
	"build": {
		"dockerfile": "Dockerfile",
		// Update 'VARIANT' to pick a Node version
		"args": {
			"VARIANT": "22-bullseye"
		}
	},
	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],
	// Use 'postCreateCommand' to run commands after the container is created.
	// We use `npm ci` instead of `npm install` because we want to respect the lockfile and ONLY the lockfile.
	// That way, our devcontainer is more reproducible. --Taytay
	"postCreateCommand": "npm ci",
	// Comment out connect as root instead. More info: https://aka.ms/vscode-remote/containers/non-root.
	"remoteUser": "node"
}
````

## File: .devcontainer/Dockerfile
````
# We build our DevContainer on MS' Typescript-Node Devcontainer
# This gives us lots of standard stuff, and lets us layer a few custom things on top, like the Emscripten compiler

# --------------------------------------------------------------------
# BEGIN Standard MS Devcontainer for Typescript-Node 

# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.155.1/containers/typescript-node/.devcontainer/base.Dockerfile
# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="22-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:1-${VARIANT}

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

# END Standard MS Devcontainer for Typescript-Node 
# --------------------------------------------------------------------

# --------------------------------------------------------------------
# BEGIN EMSDK 
# Install EMSDK to /emsdk just like the EMSDK Dockerfile: https://github.com/emscripten-core/emsdk/blob/master/docker/Dockerfile
ENV EMSDK /emsdk
# We pin the EMSDK version rather than 'latest' so that everyone is using the same compiler version
ENV EMSCRIPTEN_VERSION 4.0.5

RUN git clone https://github.com/emscripten-core/emsdk.git $EMSDK

RUN echo "## Install Emscripten" \
    && cd ${EMSDK} \
    && ./emsdk install ${EMSCRIPTEN_VERSION} \
    && echo "## Done"

# Copied directly from https://github.com/emscripten-core/emsdk/blob/master/docker/Dockerfile
RUN cd ${EMSDK} \
    && echo "## Generate standard configuration" \
    && ./emsdk activate ${EMSCRIPTEN_VERSION} \
    && chmod 777 ${EMSDK}/upstream/emscripten \
    && chmod -R 777 ${EMSDK}/upstream/emscripten/cache \
    && echo "int main() { return 0; }" > hello.c \
    && ${EMSDK}/upstream/emscripten/emcc -c hello.c \
    && cat ${EMSDK}/upstream/emscripten/cache/sanity.txt \
    && echo "## Done"

ENV PATH $EMSDK:$EMSDK/upstream/emscripten/:$PATH

# Cleanup Emscripten installation and strip some symbols
# Copied directly from https://github.com/emscripten-core/emsdk/blob/master/docker/Dockerfile
RUN echo "## Aggressive optimization: Remove debug symbols" \
    && cd ${EMSDK} && . ./emsdk_env.sh \
    # Remove debugging symbols from embedded node (extra 7MB)
    && strip -s `which node` \
    # Tests consume ~80MB disc space
    && rm -fr ${EMSDK}/upstream/emscripten/tests \
    # Fastcomp is not supported
    && rm -fr ${EMSDK}/upstream/fastcomp \
    # strip out symbols from clang (~extra 50MB disc space)
    && find ${EMSDK}/upstream/bin -type f -exec strip -s {} + || true \
    && echo "## Done"

RUN echo ". /emsdk/emsdk_env.sh" >> /etc/bash.bashrc
# We must set the EM_NODE_JS environment variable for a somewhat silly reason
# We run our build scripts with `npm run`, which sets the NODE environment variable as it runs.
# The EMSDK picks up on that environment variable and gives a deprecation warning: warning: honoring legacy environment variable `NODE`.  Please switch to using `EM_NODE_JS` instead`
# So, we are going to put this environment variable here explicitly to avoid the deprecation warning.
RUN echo 'export EM_NODE_JS="$EMSDK_NODE"' >> /etc/bash.bashrc

# END EMSDK
# --------------------------------------------------------------------

# Install wget, gnupg, and sha3sum
RUN apt-get update \
    && apt-get install -y wget gnupg libdigest-sha3-perl \
    && rm -rf /var/lib/apt/lists/*
````

## File: .github/actions/build-sqljs/action.yml
````yaml
# action.yml
name: 'Build SQL.js'
description: 'Builds sql.js using the .devcontainer/Dockerfile as its environment'
runs:
  using: 'docker'
  image: '../../../.devcontainer/Dockerfile'
  entrypoint: "/github/workspace/.github/actions/build-sqljs/entrypoint.sh"
````

## File: .github/actions/build-sqljs/entrypoint.sh
````bash
#!/bin/bash

set -e

cd /github/workspace/
npm run rebuild
````

## File: .github/workflows/CI.yml
````yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: make
      uses: ./.github/actions/build-sqljs
    - uses: actions/upload-artifact@v4
      with: {name: dist, path: dist}
    - name: test
      run: npm ci && npm test
    - name: generate documentation
      run: npm run doc
    - name: Update github pages
      if: github.event_name == 'push' && github.ref == 'refs/heads/master'
      uses: JamesIves/github-pages-deploy-action@3.6.2
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        BRANCH: gh-pages # The branch the action should deploy to.
        FOLDER: "." # The folder the action should deploy.
        CLEAN: false # Automatically remove deleted files from the deploy branch
````

## File: .github/workflows/release.yml
````yaml
on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
    - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

name: Create a release

jobs:
  build:
    name: Create a release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: make
        uses: ./.github/actions/build-sqljs
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1.1.4
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
      - run: cd dist && zip sqljs-wasm.zip sql-wasm.{js,wasm}
      - name: Upload Release Asset (wasm)
        uses: lovasoa/upload-release-asset@851d9cc59fe8113912edffbd8fddaa09470a5ac0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: dist/sqljs-wasm.zip
          asset_name: sqljs-wasm.zip
          asset_label: wasm version, best runtime performance, smaller assets, requires configuration
          asset_content_type: application/zip
      - name: Upload Release Asset (asm)
        uses: lovasoa/upload-release-asset@851d9cc59fe8113912edffbd8fddaa09470a5ac0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: dist/sql-asm.js
          asset_name: sql.js
          asset_label: asm.js version, slower, easy to integrate and compatible with old browsers 
          asset_content_type: text/javascript
      - run: cd dist && zip sqljs-worker-wasm.zip worker.sql-wasm.js sql-wasm.wasm
      - name: Upload Release Asset (worker wasm)
        uses: lovasoa/upload-release-asset@851d9cc59fe8113912edffbd8fddaa09470a5ac0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: dist/sqljs-worker-wasm.zip
          asset_name: sqljs-worker-wasm.zip
          asset_label: webworker wasm version, to be loaded as a web worker
          asset_content_type: application/zip
      - name: Upload Release Asset (worker asm)
        uses: lovasoa/upload-release-asset@851d9cc59fe8113912edffbd8fddaa09470a5ac0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: dist/worker.sql-asm.js
          asset_name: worker.sql-asm.js
          asset_label: webworker asm version, to be loaded as a web worker
          asset_content_type: text/javascript
      - run: cd dist && zip sqljs-all.zip *.{js,wasm}
      - name: Upload Release Asset (all)
        uses: lovasoa/upload-release-asset@851d9cc59fe8113912edffbd8fddaa09470a5ac0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: dist/sqljs-all.zip
          asset_name: sqljs-all.zip
          asset_label: all versions, including non-minified javascript 
          asset_content_type: application/zip
      - name: publish the package to NPM
        run: |
          npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
          npm publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
````

## File: examples/GUI/demo.css
````css
:root {
	--bg-dark: #0f1923;
	--bg-panel: #1a2634;
	--bg-panel-lighter: #1e2c3a;
	--text-primary: #e9ecef;
	--text-secondary: rgba(255, 255, 255, 0.7);
	--text-muted: rgba(255, 255, 255, 0.4);
	--accent-blue: #4fbeff;
	--accent-green: #2b6a4a;
	--border-subtle: rgba(255, 255, 255, 0.1);
	--shadow-inset: 0 2px 10px rgba(0, 0, 0, 0.2) inset, 0 1px 0 rgba(255, 255, 255, 0.05);
	--shadow-subtle: 0 4px 15px rgba(0, 0, 0, 0.1);
	--shadow-strong: 0 10px 30px rgba(0, 0, 0, 0.5);
	--radius-sm: 6px;
	--radius-md: 8px;
	--radius-lg: 12px;
	--transition-normal: all 0.2s ease;
}

html {
	background: var(--bg-dark);
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
	color: var(--text-primary);
}

body {
	background: linear-gradient(145deg, var(--bg-panel) 0%, #131e2b 100%);
	border: none;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

header {
	padding: 15px 20px;
	border-bottom: 1px solid var(--border-subtle);
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(15, 25, 35, 0.4);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	z-index: 10;
	position: relative;
}

h1 {
	font-size: 1.5rem;
	margin: 0;
	font-weight: 600;
	letter-spacing: -0.5px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app-container {
	display: flex;
	flex: 1;
	overflow: hidden;
	position: relative;
}

.toolbar {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-right: 60px;
}

.button {
	color: var(--text-primary);
	background: linear-gradient(145deg, var(--bg-panel-lighter) 0%, #162330 100%);
	border: 1px solid var(--border-subtle);
	border-radius: var(--radius-sm);
	padding: 8px 14px;
	transition: var(--transition-normal);
	font-family: inherit;
	font-size: 0.9em;
	font-weight: 500;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
	display: flex;
	align-items: center;
	gap: 6px;
}

.button:active {
	background: linear-gradient(145deg, #162330 0%, var(--bg-panel-lighter) 100%);
	transform: translateY(1px);
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset;
}

.button:hover, .button:focus {
	box-shadow: 0 0 0 2px rgba(79, 190, 255, 0.3), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
	outline: none;
}

.button svg {
	width: 16px;
	height: 16px;
}

.button-primary {
	background: linear-gradient(145deg, #2b5d8b 0%, #1e4266 100%);
}

.button-primary:hover {
	background: linear-gradient(145deg, #306ca3 0%, #1e4266 100%);
}

.button-success {
	background: linear-gradient(145deg, #2b6a4a 0%, #1e4a33 100%);
}

.button-success:hover {
	background: linear-gradient(145deg, #307a55 0%, #1e4a33 100%);
}

label.button {
	display: inline-flex;
}

input[type="file"] {
	display: none;
}

.panel {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;
}

.panel-resizable {
	flex: 1;
	min-width: 300px;
	max-width: calc(100% - 300px);
	position: relative;
}

.editor-panel {
	border-right: 1px solid var(--border-subtle);
}

.results-panel {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.panel-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	background: rgba(15, 25, 35, 0.4);
	border-bottom: 1px solid var(--border-subtle);
	font-weight: 500;
	color: var(--text-secondary);
}

.panel-content {
	flex: 1;
	overflow: auto;
	position: relative;
}

.CodeMirror {
	border: none;
	height: 100% !important;
	background: rgba(15, 25, 35, 0.6);
	box-shadow: var(--shadow-inset);
	font-family: 'JetBrains Mono', 'Fira Code', monospace;
	font-size: 14px;
}

.CodeMirror-gutters {
	background: rgba(15, 25, 35, 0.8);
	border-right: 1px solid var(--border-subtle);
}

.CodeMirror-linenumber {
	color: var(--text-muted);
}

.error {
	color: #ff6b6b;
	transition: .3s;
	overflow: hidden;
	padding: 10px 15px;
	border-radius: var(--radius-sm);
	background: rgba(255, 0, 0, 0.1);
	border-left: 3px solid #ff6b6b;
	margin: 10px;
	opacity: 0;
	height: 0;
}

.results-tabs {
	display: flex;
	background: rgba(15, 25, 35, 0.4);
	border-bottom: 1px solid var(--border-subtle);
	overflow-x: auto;
	scrollbar-width: thin;
}

.tab {
	padding: 8px 16px;
	background: transparent;
	border: none;
	border-right: 1px solid var(--border-subtle);
	color: var(--text-secondary);
	cursor: pointer;
	white-space: nowrap;
	transition: var(--transition-normal);
	font-family: inherit;
	font-size: 0.9em;
}

.tab.active {
	background: rgba(79, 190, 255, 0.1);
	color: var(--accent-blue);
	font-weight: 500;
}

.tab:hover:not(.active) {
	background: rgba(255, 255, 255, 0.05);
}

.tab-close {
	margin-left: 8px;
	opacity: 0.6;
	transition: var(--transition-normal);
}

.tab:hover .tab-close {
	opacity: 1;
}

.results-content {
	flex: 1;
	overflow: auto;
	padding: 15px;
	background: rgba(15, 25, 35, 0.4);
	box-shadow: var(--shadow-inset);
}

.tab-panel {
	display: none;
	height: 100%;
	overflow: auto;
}

.tab-panel.active {
	display: block;
}

.resizer {
	width: 6px;
	cursor: col-resize;
	background: transparent;
	position: absolute;
	top: 0;
	right: -3px;
	bottom: 0;
	z-index: 10;
	transition: background 0.2s;
}

.resizer:hover, .resizer.active {
	background: rgba(79, 190, 255, 0.3);
}

table {
	width: 100%;
	margin: 0 0 20px 0;
	border: 1px solid var(--border-subtle);
	border-collapse: collapse;
	border-radius: var(--radius-sm);
	overflow: hidden;
	box-shadow: var(--shadow-subtle);
	background: rgba(30, 40, 50, 0.4);
}

thead {
	background: rgba(40, 60, 80, 0.6);
	position: sticky;
	top: 0;
	z-index: 1;
}

th {
	text-align: left;
	padding: 12px 15px;
	font-weight: 600;
	color: var(--accent-blue);
	border-bottom: 1px solid var(--border-subtle);
}

td {
	padding: 10px 15px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Roboto Mono', 'IBM Plex Mono', 'Ubuntu Mono', 'Inconsolata', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace;
	white-space: break-spaces;
	font-size: 1rem;
}

tr:last-child td {
	border-bottom: none;
}

tr:nth-child(even) {
	background: rgba(255, 255, 255, 0.03);
}

.table-wrapper {
	margin-bottom: 20px;
}

.table-caption {
	color: var(--text-secondary);
	font-size: 0.85em;
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	color: var(--text-secondary);
}

.spinner {
	width: 30px;
	height: 30px;
	border: 3px solid rgba(79, 190, 255, 0.3);
	border-radius: 50%;
	border-top-color: var(--accent-blue);
	animation: spin 1s ease-in-out infinite;
	margin-bottom: 15px;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

.no-results {
	color: var(--text-muted);
	text-align: center;
	padding: 30px;
}

.notification {
	position: fixed;
	bottom: -60px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(40, 60, 80, 0.9);
	color: #fff;
	padding: 12px 20px;
	border-radius: var(--radius-md);
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	transition: bottom 0.3s ease;
	z-index: 1000;
	border-left: 3px solid var(--accent-blue);
}

.notification.show {
	bottom: 20px;
}

.button.active {
	transform: translateY(1px);
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset;
}

.status-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 6px 15px;
	background: rgba(15, 25, 35, 0.8);
	border-top: 1px solid var(--border-subtle);
	font-size: 0.8em;
	color: var(--text-secondary);
}

.status-item {
	display: flex;
	align-items: center;
	gap: 6px;
}

.status-success {
	color: #4ade80;
}

.status-error {
	color: #ff6b6b;
}

.status-info {
	color: var(--accent-blue);
}

.shortcuts {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-left: auto;
}

.shortcuts span {
	display: flex;
	align-items: center;
	margin-left: 8px;
	color: var(--text-muted);
}

.shortcut-key {
	background: rgba(255, 255, 255, 0.1);
	padding: 2px 6px;
	border-radius: 3px;
	font-family: 'JetBrains Mono', monospace;
	font-size: 0.85em;
	margin-left: 4px;
	color: var(--text-secondary);
}

footer {
	font-size: 0.8em;
	color: var(--text-muted);
	text-align: center;
	padding: 10px;
	background: rgba(15, 25, 35, 0.8);
	border-top: 1px solid var(--border-subtle);
}

footer a {
	color: var(--accent-blue);
	text-decoration: none;
}

footer a:hover {
	text-decoration: underline;
}

.query-history {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(30, 40, 50, 0.95);
	border: 1px solid var(--border-subtle);
	max-height: 0;
	height: 0;
	opacity: 0;
	visibility: hidden;
	overflow: hidden;
	transition: all 0.3s ease;
	z-index: 100;
	box-shadow: none;
	border-radius: var(--radius-md);
	margin: 10px;
}

.query-history.show {
	max-height: 400px;
	height: auto;
	opacity: 1;
	visibility: visible;
	overflow-y: auto;
	box-shadow: 0 0 20px rgba(79, 190, 255, 0.2), var(--shadow-strong);
}

.query-history-empty {
	padding: 20px;
	text-align: center;
	color: var(--text-muted);
	font-style: italic;
}

.history-item {
	padding: 8px 15px;
	border-bottom: 1px solid var(--border-subtle);
	cursor: pointer;
	transition: var(--transition-normal);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.history-item:hover {
	background: rgba(255, 255, 255, 0.05);
}

.history-item.snippet {
	background: rgba(43, 106, 74, 0.1);
	border-left: 3px solid var(--accent-green);
}

.history-item.snippet:hover {
	background: rgba(43, 106, 74, 0.2);
}

.history-query {
	font-family: 'JetBrains Mono', monospace;
	font-size: 0.85em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 80%;
}

.history-time {
	color: var(--text-muted);
	font-size: 0.8em;
}

::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
	.app-container {
		flex-direction: column;
	}
	
	.panel-resizable {
		max-width: 100%;
		width: 100% !important;
		height: 50%;
		min-height: 200px;
		max-height: calc(100% - 200px);
	}
	
	.editor-panel {
		border-right: none;
		border-bottom: 1px solid var(--border-subtle);
	}
	
	.resizer {
		width: 100%;
		height: 6px;
		cursor: row-resize;
		right: 0;
		bottom: -3px;
		top: auto;
	}
	
	.shortcuts {
		display: none;
	}
	
	.toolbar {
		margin-right: 50px;
	}
	
	.button {
		padding: 6px 10px;
		font-size: 0.8em;
	}
	
	h1 {
		font-size: 1.2rem;
	}
}

body.resizing {
	cursor: col-resize;
	user-select: none;
}

@media (max-width: 768px) {
	body.resizing {
		cursor: row-resize;
	}
}

.error-result {
	color: #ff6b6b;
	border-left: 3px solid #ff6b6b;
	background: rgba(255, 0, 0, 0.05);
}

.github-corner:hover .octo-arm {
	animation: octocat-wave 560ms ease-in-out;
}

.github-corner {
	z-index: 20;
	position: absolute;
	top: 0;
	right: 0;
}

.github-corner svg {
	opacity: 0.7;
	transition: opacity 0.3s ease;
}

.github-corner:hover svg {
	opacity: 1;
}

@keyframes octocat-wave {
	0%, 100% { transform: rotate(0); }
	20%, 60% { transform: rotate(-25deg); }
	40%, 80% { transform: rotate(10deg); }
}

@media (max-width: 500px) {
	.github-corner:hover .octo-arm {
		animation: none;
	}
	.github-corner .octo-arm {
		animation: octocat-wave 560ms ease-in-out;
	}
	.github-corner svg {
		width: 50px;
		height: 50px;
	}
}

.actions {
	display: flex;
	flex-wrap: wrap;
	margin: 15px 0;
}

.results-header, .editor-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
	color: rgba(255, 255, 255, 0.7);
	font-weight: 500;
}

/* SQL Snippets Menu */
.snippets-menu {
	position: absolute;
	background: rgba(30, 40, 50, 0.95);
	border: 1px solid var(--border-subtle);
	max-height: 0;
	width: 220px;
	opacity: 0;
	visibility: hidden;
	overflow: hidden;
	transition: all 0.3s ease;
	z-index: 100;
	box-shadow: none;
	border-radius: var(--radius-md);
	right: 15px;
	top: 45px;
}

.snippets-menu.show {
	max-height: 400px;
	opacity: 1;
	visibility: visible;
	overflow-y: auto;
	box-shadow: var(--shadow-strong);
}

.snippet-item {
	padding: 10px 14px;
	border-bottom: 1px solid var(--border-subtle);
	cursor: pointer;
	transition: var(--transition-normal);
	font-size: 0.9em;
}

.snippet-item:hover {
	background: rgba(79, 190, 255, 0.1);
	color: var(--accent-blue);
}

.snippet-item:last-child {
	border-bottom: none;
}

.button-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	padding: 0;
	border-radius: 4px;
}

.button-icon svg {
	width: 16px;
	height: 16px;
}

.button-icon.active {
	background: rgba(79, 190, 255, 0.2);
}
````

## File: examples/GUI/gui.js
````javascript
// DOM Elements
const elements = {
	execBtn: document.getElementById("execute"),
	outputElm: document.getElementById('output'),
	errorElm: document.getElementById('error'),
	commandsElm: document.getElementById('commands'),
	dbFileElm: document.getElementById('dbfile'),
	savedbElm: document.getElementById('savedb'),
	editorStatusElm: document.getElementById('editorStatus'),
	resultsStatusElm: document.getElementById('resultsStatus'),
	queryTimeElm: document.getElementById('queryTime'),
	panelResizerElm: document.getElementById('panelResizer'),
	queryHistoryElm: document.getElementById('queryHistory'),
	toggleHistoryBtn: document.getElementById('toggleHistory'),
	resultsTabs: document.getElementById('resultsTabs'),
	newTabBtn: document.getElementById('newTabBtn')
};

// State
const state = {
	currentTabId: 'tab1',
	tabCounter: 1,
	queryHistory: [],
	isResizing: false,
	lastExecutionTime: 0
};

// SQL Snippets
const sqlSnippets = {
	'basic-demo': {
		name: 'Basic Demo',
		sql: "-- Basic SQL Demo\n-- Create a simple employees table\nDROP TABLE IF EXISTS employees;\nCREATE TABLE employees (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  department TEXT,\n  salary NUMERIC,\n  hire_date DATE\n);\n\n-- Insert sample data\nINSERT INTO employees (name, department, salary, hire_date) VALUES\n  ('Alice Smith', 'Engineering', 85000, '2020-01-15'),\n  ('Bob Johnson', 'Marketing', 72000, '2019-03-20'),\n  ('Carol Williams', 'Engineering', 92000, '2018-11-07'),\n  ('Dave Brown', 'Finance', 115000, '2017-05-12'),\n  ('Eve Davis', 'Engineering', 110000, '2021-08-30');\n\n-- Query the data\nSELECT \n  department, \n  COUNT(*) as employee_count,\n  ROUND(AVG(salary), 2) as avg_salary\nFROM employees\nGROUP BY department\nORDER BY avg_salary DESC;"
	},
	'schema': {
		name: 'Show Schema',
		sql: "-- Show all tables in the database\nSELECT name, sql\nFROM sqlite_master\nWHERE type='table';"
	},
	'blog-app': {
		name: 'Blog App Schema',
		sql: "-- Complete Blog Application Schema\n\n-- Users table\nDROP TABLE IF EXISTS users;\nCREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  username TEXT NOT NULL UNIQUE,\n  email TEXT UNIQUE,\n  password_hash TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Insert sample users\nINSERT INTO users (username, email, password_hash, created_at) VALUES\n  ('alice', 'alice@example.com', 'hash1', '2022-01-10'),\n  ('bob', 'bob@example.com', 'hash2', '2022-01-15'),\n  ('carol', 'carol@example.com', 'hash3', '2022-02-20');\n\n-- Posts table\nDROP TABLE IF EXISTS posts;\nCREATE TABLE posts (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER NOT NULL,\n  title TEXT NOT NULL,\n  content TEXT NOT NULL,\n  published BOOLEAN DEFAULT 0,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n\n-- Insert sample posts\nINSERT INTO posts (user_id, title, content, published, created_at) VALUES\n  (1, 'First Post', 'This is my first post content', 1, '2022-01-12'),\n  (1, 'Second Post', 'This is another post by Alice', 1, '2022-01-18'),\n  (2, 'Hello World', 'Bob''s first post content', 1, '2022-01-20'),\n  (3, 'Introduction', 'Hello from Carol', 1, '2022-02-25'),\n  (2, 'Draft Post', 'This is a draft', 0, '2022-02-28');\n\n-- Comments table\nDROP TABLE IF EXISTS comments;\nCREATE TABLE comments (\n  id INTEGER PRIMARY KEY,\n  post_id INTEGER NOT NULL,\n  user_id INTEGER NOT NULL,\n  content TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n\n-- Insert sample comments\nINSERT INTO comments (post_id, user_id, content, created_at) VALUES\n  (1, 2, 'Great post!', '2022-01-13'),\n  (1, 3, 'I agree with Bob', '2022-01-14'),\n  (3, 1, 'Welcome Bob!', '2022-01-21'),\n  (4, 2, 'Nice to meet you Carol', '2022-02-26');\n\n-- Query: Show posts with comment counts\nSELECT \n  p.id, \n  p.title, \n  u.username as author,\n  COUNT(c.id) as comment_count\nFROM posts p\nJOIN users u ON p.user_id = u.id\nLEFT JOIN comments c ON c.post_id = p.id\nWHERE p.published = 1\nGROUP BY p.id\nORDER BY p.created_at DESC;"
	},
	'recursive-query': {
		name: 'Recursive Query',
		sql: "-- Employee Hierarchy with Recursive CTE\n\n-- Create employees table with manager relationship\nDROP TABLE IF EXISTS employees;\nCREATE TABLE employees (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  title TEXT NOT NULL,\n  manager_id INTEGER,\n  salary NUMERIC,\n  FOREIGN KEY (manager_id) REFERENCES employees(id)\n);\n\n-- Insert sample hierarchical data\nINSERT INTO employees (id, name, title, manager_id, salary) VALUES\n  (1, 'Mark Johnson', 'CEO', NULL, 250000),\n  (2, 'Sarah Williams', 'CTO', 1, 180000),\n  (3, 'Michael Brown', 'CFO', 1, 175000),\n  (4, 'Patricia Davis', 'Engineering Director', 2, 150000),\n  (5, 'Robert Wilson', 'Finance Director', 3, 145000),\n  (6, 'Linda Miller', 'Senior Developer', 4, 120000),\n  (7, 'James Taylor', 'Senior Developer', 4, 120000),\n  (8, 'Elizabeth Anderson', 'Accountant', 5, 95000),\n  (9, 'David Thomas', 'Junior Developer', 6, 85000),\n  (10, 'Jennifer Jackson', 'Junior Developer', 7, 85000);\n\n-- Recursive query to show employee hierarchy\nWITH RECURSIVE employee_hierarchy AS (\n  -- Base case: top-level employees (no manager)\n  SELECT \n    id, \n    name, \n    title, \n    manager_id, \n    salary,\n    0 AS level,\n    name AS path\n  FROM employees\n  WHERE manager_id IS NULL\n  \n  UNION ALL\n  \n  -- Recursive case: employees with managers\n  SELECT \n    e.id, \n    e.name, \n    e.title, \n    e.manager_id, \n    e.salary,\n    eh.level + 1 AS level,\n    eh.path || ' > ' || e.name AS path\n  FROM employees e\n  JOIN employee_hierarchy eh ON e.manager_id = eh.id\n)\n\n-- Query the hierarchy\nSELECT \n  id,\n  printf('%.' || (level * 4) || 's%s', '', name) AS employee,\n  title,\n  level,\n  salary,\n  path\nFROM employee_hierarchy\nORDER BY path;"
	},
	'window-functions': {
		name: 'Window Functions',
		sql: "-- Window Functions Example\n\n-- Create sales table\nDROP TABLE IF EXISTS sales;\nCREATE TABLE sales (\n  id INTEGER PRIMARY KEY,\n  salesperson TEXT NOT NULL,\n  region TEXT NOT NULL,\n  amount NUMERIC NOT NULL,\n  sale_date DATE NOT NULL\n);\n\n-- Insert sample data\nINSERT INTO sales (salesperson, region, amount, sale_date) VALUES\n  ('Alice', 'North', 12500, '2023-01-05'),\n  ('Bob', 'South', 8700, '2023-01-10'),\n  ('Carol', 'East', 15200, '2023-01-12'),\n  ('Dave', 'West', 7300, '2023-01-15'),\n  ('Alice', 'North', 9800, '2023-02-03'),\n  ('Bob', 'South', 11600, '2023-02-08'),\n  ('Carol', 'East', 14100, '2023-02-15'),\n  ('Dave', 'West', 9200, '2023-02-20'),\n  ('Alice', 'North', 16700, '2023-03-05'),\n  ('Bob', 'South', 10300, '2023-03-12'),\n  ('Carol', 'East', 12800, '2023-03-18'),\n  ('Dave', 'West', 8500, '2023-03-25');\n\n-- Window function queries\n\n-- 1. Running total of sales by salesperson\nSELECT\n  salesperson,\n  region,\n  sale_date,\n  amount,\n  SUM(amount) OVER (\n    PARTITION BY salesperson \n    ORDER BY sale_date\n  ) AS running_total\nFROM sales\nORDER BY salesperson, sale_date;"
	}
};

// Start the worker in which sql.js will run
const worker = new Worker("../../dist/worker.sql-wasm.js");
worker.onerror = handleError;

// Open a database
worker.postMessage({ action: 'open' });

// Initialize UI components
initResizer();
initTabs();
initKeyboardShortcuts();
initQueryHistory();

// Error handling
function handleError(e) {
	console.log(e);
	elements.errorElm.style.height = 'auto';
	elements.errorElm.textContent = e.message;
	elements.errorElm.style.opacity = 1;
	
	updateStatus('error', `Error: ${e.message}`);
	
	showErrorInCurrentTab(e.message);
	
	setTimeout(() => {
		elements.errorElm.style.opacity = 0;
		setTimeout(() => {
			elements.errorElm.style.height = '0';
		}, 300);
	}, 5000);
}

function showErrorInCurrentTab(errorMessage) {
	const tabOutputElm = document.querySelector(`#${state.currentTabId} .results-content`);
	if (!tabOutputElm) return;
	
	tabOutputElm.innerHTML = '';
	
	const errorTemplate = document.getElementById('error-template');
	const errorClone = errorTemplate.content.cloneNode(true);
	const errorDiv = errorClone.querySelector('.error-result');
	
	const errorMessageSpan = document.createElement('span');
	errorMessageSpan.slot = 'error-message';
	errorMessageSpan.textContent = `Query failed: ${errorMessage}`;
	errorDiv.appendChild(errorMessageSpan);
	
	tabOutputElm.appendChild(errorDiv);
}

function clearError() {
	elements.errorElm.style.height = '0';
	elements.errorElm.style.opacity = 0;
}

// Status updates
function updateStatus(type, message) {
	const createStatusSpan = (className, text) => {
		const span = document.createElement('span');
		span.className = className;
		span.textContent = text;
		return span;
	};

	const statusMap = {
		'executing': {
			editorStatus: createStatusSpan('status-info', 'Executing query...'),
			resultsStatus: createStatusSpan('status-info', 'Executing query...')
		},
		'success': {
			editorStatus: createStatusSpan('status-success', 'Query executed successfully'),
			resultsStatus: createStatusSpan('status-success', message)
		},
		'error': {
			editorStatus: createStatusSpan('status-error', 'Query failed'),
			resultsStatus: createStatusSpan('status-error', message)
		},
		'info': {
			editorStatus: createStatusSpan('status-info', message),
			resultsStatus: createStatusSpan('status-info', message)
		}
	};

	if (statusMap[type]) {
		elements.editorStatusElm.innerHTML = '';
		elements.editorStatusElm.appendChild(statusMap[type].editorStatus);
		
		elements.resultsStatusElm.innerHTML = '';
		elements.resultsStatusElm.appendChild(statusMap[type].resultsStatus);
	} else {
		elements.editorStatusElm.textContent = message;
	}
}

function updateQueryTime(time) {
	elements.queryTimeElm.textContent = `Execution time: ${time.toFixed(2)}ms`;
	state.lastExecutionTime = time;
}

// Run a command in the database
function execute(commands, tabId = state.currentTabId) {
	tic();
	updateStatus('executing');
	
	const tabToUse = determineTabForResults(tabId);
	const tabOutputElm = document.querySelector(`#${tabToUse} .results-content`);
	if (!tabOutputElm) return;
	
	showLoadingIndicator(tabOutputElm);
	addToHistory(commands);
	
	worker.onmessage = function (event) {
		handleQueryResults(event, tabOutputElm);
	};
	
	worker.postMessage({ action: 'exec', sql: commands });
	worker.onerror = handleError;
}

function determineTabForResults(tabId) {
	const currentTabPanel = document.getElementById(state.currentTabId);
	const isInitialUnusedTab = state.currentTabId === 'tab1' && 
		currentTabPanel && 
		currentTabPanel.querySelector('.results-content').innerHTML.includes('Results will be displayed here');
	
	return isInitialUnusedTab ? state.currentTabId : createNewTab();
}

function showLoadingIndicator(outputElement) {
	outputElement.innerHTML = '';
	const loadingTemplate = document.getElementById('loading-template');
	const loadingClone = loadingTemplate.content.cloneNode(true);
	outputElement.appendChild(loadingClone);
}

function handleQueryResults(event, outputElement) {
	const results = event.data.results;
	const executionTime = toc("Executing SQL");
	
	if (!results) {
		handleError({message: event.data.error || "Unknown error occurred"});
		return;
	}

	tic();
	outputElement.innerHTML = "";
	
	if (results.length === 0) {
		displayNoResults(outputElement);
		return;
	}
	
	displayResultSets(results, outputElement);
	
	const displayTime = toc("Displaying results");
	updateQueryTime(executionTime + displayTime);
	updateStatus('success', `Returned ${results.length} result set${results.length !== 1 ? 's' : ''}`);
}

function displayNoResults(outputElement) {
	const noResultsDiv = document.createElement('div');
	noResultsDiv.className = 'no-results';
	noResultsDiv.textContent = 'Query executed successfully. No results to display.';
	outputElement.appendChild(noResultsDiv);
	updateStatus('success', 'Query executed with no results');
}

function displayResultSets(results, outputElement) {
	results.forEach(result => {
		outputElement.appendChild(createResultTable(result.columns, result.values));
	});
}

// Create an HTML table for results
function createResultTable(columns, values) {
	const tableTemplate = document.getElementById('table-template');
	const tableClone = tableTemplate.content.cloneNode(true);
	const wrapper = tableClone.querySelector('.table-wrapper');
	const table = tableClone.querySelector('table');
	
	updateTableMetadata(wrapper, columns.length, values.length);
	createTableHeader(table, columns);
	createTableBody(table, columns, values);
	
	return wrapper;
}

function updateTableMetadata(wrapper, columnCount, rowCount) {
	wrapper.querySelector('.row-count').textContent = `${rowCount} row${rowCount !== 1 ? 's' : ''}`;
	wrapper.querySelector('.column-count').textContent = `${columnCount} column${columnCount !== 1 ? 's' : ''}`;
}

function createTableHeader(table, columns) {
	const thead = table.querySelector('thead tr');
	thead.innerHTML = '';
	
	columns.forEach(column => {
		const th = document.createElement('th');
		th.textContent = column;
		thead.appendChild(th);
	});
}

function createTableBody(table, columns, values) {
	const tbody = table.querySelector('tbody');
	tbody.innerHTML = '';
	
	if (values.length === 0) {
		createEmptyResultRow(tbody, columns.length);
	} else {
		values.forEach(rowData => {
			createTableRow(tbody, rowData);
		});
	}
}

function createEmptyResultRow(tbody, columnCount) {
	const emptyRow = document.createElement('tr');
	const emptyCell = document.createElement('td');
	emptyCell.className = 'no-results';
	emptyCell.textContent = 'No results';
	emptyCell.colSpan = columnCount;
	emptyRow.appendChild(emptyCell);
	tbody.appendChild(emptyRow);
}

function createTableRow(tbody, rowData) {
	const row = document.createElement('tr');
	rowData.forEach(cellData => {
		const cell = document.createElement('td');
		cell.textContent = cellData;
		row.appendChild(cell);
	});
	tbody.appendChild(row);
}

// Execute the commands when the button is clicked
function execEditorContents() {
	clearError();
	
	try {
		execute(editor.getValue() + ';');
	} catch (e) {
		handleError(e);
	}
	
	addButtonClickFeedback(elements.execBtn);
}
elements.execBtn.addEventListener('click', execEditorContents);

function addButtonClickFeedback(button) {
	button.classList.add('active');
	setTimeout(() => {
		button.classList.remove('active');
	}, 200);
}

// Performance measurement functions
var tictime;
if (!window.performance || !performance.now) { window.performance = { now: Date.now } }
function tic() { tictime = performance.now() }
function toc(msg) {
	var dt = performance.now() - tictime;
	console.log((msg || 'toc') + ": " + dt + "ms");
	return dt;
}

// Add syntax highlighting to the textarea
var editor = CodeMirror.fromTextArea(elements.commandsElm, {
	mode: 'text/x-mysql',
	viewportMargin: Infinity,
	indentWithTabs: true,
	smartIndent: true,
	lineNumbers: true,
	matchBrackets: true,
	autofocus: true,
	theme: 'nord',
	extraKeys: {
		"Ctrl-Enter": execEditorContents,
		"Cmd-Enter": execEditorContents,
		"Ctrl-S": savedb,
		"Cmd-S": savedb,
		"Ctrl-Space": toggleQueryHistory,
	}
});

// Set default SQL query
editor.setValue(sqlSnippets['basic-demo'].sql);

// Load a db from a file
elements.dbFileElm.onchange = function () {
	loadDatabaseFromFile();
};

function loadDatabaseFromFile() {
	var f = elements.dbFileElm.files[0];
	var r = new FileReader();
	r.onload = function () {
		worker.onmessage = function () {
			toc("Loading database from file");
			editor.setValue("SELECT `name`, `sql`\n  FROM `sqlite_master`\n  WHERE type='table';");
			execEditorContents();
			showNotification('Database loaded successfully');
			updateStatus('success', 'Database loaded successfully');
		};
		tic();
		try {
			worker.postMessage({ action: 'open', buffer: r.result }, [r.result]);
		}
		catch (exception) {
			worker.postMessage({ action: 'open', buffer: r.result });
		}
	}
	r.readAsArrayBuffer(f);
}

// Save the db to a file
function savedb() {
	updateStatus('info', 'Saving database...');
	
	worker.onmessage = function (event) {
		toc("Exporting the database");
		downloadDatabaseFile(event.data.buffer);
		showNotification('Database saved successfully');
		updateStatus('success', 'Database saved successfully');
		addButtonClickFeedback(elements.savedbElm);
	};
	tic();
	worker.postMessage({ action: 'export' });
}

function downloadDatabaseFile(arraybuff) {
	var blob = new Blob([arraybuff]);
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.href = window.URL.createObjectURL(blob);
	a.download = "sql.db";
	a.onclick = function () {
		setTimeout(function () {
			window.URL.revokeObjectURL(a.href);
		}, 1500);
	};
	a.click();
}

elements.savedbElm.addEventListener("click", savedb);

// Create a notification system
function showNotification(message) {
	let notification = document.querySelector('.notification');
	if (!notification) {
		notification = document.createElement('div');
		notification.className = 'notification';
		document.body.appendChild(notification);
	}
	
	notification.textContent = message;
	notification.classList.add('show');
	
	setTimeout(() => {
		notification.classList.remove('show');
	}, 3000);
}

// Initialize resizable panels
function initResizer() {
	const editorPanel = document.querySelector('.editor-panel');
	const isMobileView = window.matchMedia('(max-width: 768px)').matches;
	
	elements.panelResizerElm.addEventListener('mousedown', function(e) {
		state.isResizing = true;
		document.body.classList.add('resizing');
		elements.panelResizerElm.classList.add('active');
	});
	
	document.addEventListener('mousemove', function(e) {
		if (!state.isResizing) return;
		
		const isMobileView = window.matchMedia('(max-width: 768px)').matches;
		
		if (isMobileView) {
			resizePanelHeight(e, editorPanel);
		} else {
			resizePanelWidth(e, editorPanel);
		}
		
		e.preventDefault();
	});
	
	document.addEventListener('mouseup', function() {
		if (state.isResizing) {
			state.isResizing = false;
			document.body.classList.remove('resizing');
			elements.panelResizerElm.classList.remove('active');
		}
	});
	
	setInitialPanelSize(editorPanel, isMobileView);
}

function resizePanelHeight(e, panel) {
	const containerHeight = document.querySelector('.app-container').offsetHeight;
	const newHeight = e.clientY - panel.getBoundingClientRect().top;
	const minHeight = 100;
	const maxHeight = containerHeight - 100;
	
	panel.style.height = `${Math.min(Math.max(newHeight, minHeight), maxHeight)}px`;
}

function resizePanelWidth(e, panel) {
	const containerWidth = document.querySelector('.app-container').offsetWidth;
	const newWidth = e.clientX - panel.getBoundingClientRect().left;
	const minWidth = 200;
	const maxWidth = containerWidth - 200;
	
	panel.style.width = `${Math.min(Math.max(newWidth, minWidth), maxWidth)}px`;
}

function setInitialPanelSize(panel, isMobileView) {
	if (isMobileView) {
		panel.style.height = '50%';
		panel.style.width = '';
	} else {
		panel.style.width = '50%';
		panel.style.height = '';
	}
}

// Initialize tabs
function initTabs() {
	elements.newTabBtn.addEventListener('click', createNewTab);
	
	elements.resultsTabs.addEventListener('click', function(e) {
		const target = e.target;
		
		if (target.classList.contains('tab-close')) {
			const tabId = target.parentElement.dataset.tab;
			closeTab(tabId);
			e.stopPropagation();
			return;
		}
		
		if (target.classList.contains('tab') && !target.id) {
			const tabId = target.dataset.tab;
			if (tabId) {
				setActiveTab(tabId);
			}
		}
	});
	
	initializeFirstTab();
}

function initializeFirstTab() {
	const firstTab = document.querySelector('.tab[data-tab="tab1"]');
	if (firstTab) {
		firstTab.innerHTML = '';
		firstTab.textContent = `Result ${state.tabCounter}`;
		
		const closeBtn = document.createElement('span');
		closeBtn.className = 'tab-close';
		closeBtn.textContent = '×';
		firstTab.appendChild(closeBtn);
		
		setActiveTab('tab1');
	}
}

// Create a new results tab
function createNewTab() {
	state.tabCounter++;
	const tabId = `tab${state.tabCounter}`;
	
	createTabButton(tabId);
	createTabPanel(tabId);
	
	setActiveTab(tabId);
	
	return tabId;
}

function createTabButton(tabId) {
	const tabTemplate = document.getElementById('tab-template');
	const tabClone = tabTemplate.content.cloneNode(true);
	const tab = tabClone.querySelector('.tab');
	tab.dataset.tab = tabId;
	
	tab.innerHTML = '';
	tab.textContent = `Result ${state.tabCounter}`;
	
	const closeBtn = document.createElement('span');
	closeBtn.className = 'tab-close';
	closeBtn.textContent = '×';
	tab.appendChild(closeBtn);
	
	elements.resultsTabs.insertBefore(tab, elements.newTabBtn);
}

function createTabPanel(tabId) {
	const panelTemplate = document.getElementById('tab-panel-template');
	const panelClone = panelTemplate.content.cloneNode(true);
	const tabPanel = panelClone.querySelector('.tab-panel');
	tabPanel.id = tabId;
	
	document.querySelector('.results-panel .panel-content').appendChild(tabPanel);
}

// Set active tab
function setActiveTab(tabId) {
	state.currentTabId = tabId;
	
	document.querySelectorAll('.results-tabs .tab').forEach(tab => {
		tab.classList.toggle('active', tab.dataset.tab === tabId);
	});
	
	document.querySelectorAll('.tab-panel').forEach(panel => {
		panel.classList.toggle('active', panel.id === tabId);
	});
}

// Close a tab
function closeTab(tabId) {
	const contentTabs = document.querySelectorAll('.results-tabs .tab:not(#newTabBtn)');
	if (contentTabs.length <= 1) {
		return;
	}
	
	const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
	if (tab) {
		tab.remove();
	}
	
	const panel = document.getElementById(tabId);
	if (panel) {
		panel.remove();
	}
	
	if (state.currentTabId === tabId) {
		const firstTab = document.querySelector('.results-tabs .tab:not(#newTabBtn)');
		if (firstTab) {
			setActiveTab(firstTab.dataset.tab);
		}
	}
}

// Query history functions
function addToHistory(query) {
	if (state.queryHistory.length >= 20) {
		state.queryHistory.pop();
	}
	
	state.queryHistory.unshift({
		query: query,
		timestamp: new Date(),
		executionTime: state.lastExecutionTime
	});
	
	updateHistoryUI();
}

function updateHistoryUI() {
	elements.queryHistoryElm.innerHTML = '';
	
	if (state.queryHistory.length === 0) {
		const emptyMessage = document.createElement('div');
		emptyMessage.className = 'query-history-empty';
		emptyMessage.textContent = 'No query history yet';
		elements.queryHistoryElm.appendChild(emptyMessage);
		return;
	}
	
	state.queryHistory.forEach((item) => {
		const historyItem = createHistoryItem(item);
		elements.queryHistoryElm.appendChild(historyItem);
	});
}

function createHistoryItem(item) {
	const historyTemplate = document.getElementById('history-item-template');
	const historyClone = historyTemplate.content.cloneNode(true);
	const historyItem = historyClone.querySelector('.history-item');
	
	// Add snippet class if it's a snippet
	if (item.isSnippet) {
		historyItem.classList.add('snippet');
	}
	
	const timeString = item.isSnippet ? `Example: ${item.snippetName}` : item.timestamp.toLocaleTimeString();
	const queryPreview = truncateString(item.query, 60);
	
	const queryPreviewEl = document.createElement('span');
	queryPreviewEl.slot = 'query-preview';
	queryPreviewEl.textContent = queryPreview;
	historyItem.querySelector('.history-query').appendChild(queryPreviewEl);
	historyItem.querySelector('.history-query').title = item.query;
	
	const queryTimeEl = document.createElement('span');
	queryTimeEl.slot = 'query-time';
	queryTimeEl.textContent = timeString;
	historyItem.querySelector('.history-time').appendChild(queryTimeEl);
	
	historyItem.addEventListener('click', () => {
		editor.setValue(item.query);
		toggleQueryHistory();
	});
	
	return historyItem;
}

function truncateString(str, maxLength) {
	return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

function toggleQueryHistory() {
	const historyElement = elements.queryHistoryElm;
	const isVisible = historyElement.classList.contains('show');
	
	if (!isVisible) {
		// Position the history panel over the editor
		const editorRect = editor.getWrapperElement().getBoundingClientRect();
		historyElement.style.width = `${editorRect.width - 20}px`;
		historyElement.style.top = '10px';
		historyElement.style.height = 'auto';
		historyElement.style.maxHeight = `${editorRect.height - 20}px`;
	}
	
	historyElement.classList.toggle('show');
}

function closeQueryHistory() {
	elements.queryHistoryElm.classList.remove('show');
}

// Initialize query history with snippets
function initQueryHistory() {
	// Add snippets to history in reverse order so the most basic ones appear at the top
	const snippetEntries = Object.entries(sqlSnippets);
	for (let i = snippetEntries.length - 1; i >= 0; i--) {
		const [id, snippet] = snippetEntries[i];
		state.queryHistory.push({
			query: snippet.sql,
			timestamp: new Date(Date.now() - i * 60000), // Stagger timestamps
			executionTime: 0,
			isSnippet: true,
			snippetName: snippet.name
		});
	}
	
	updateHistoryUI();
}

// Toggle history button
elements.toggleHistoryBtn.addEventListener('click', toggleQueryHistory);

// Close history when clicking outside
document.addEventListener('click', function(e) {
	if (elements.queryHistoryElm.classList.contains('show') && 
			!elements.queryHistoryElm.contains(e.target) && 
			e.target !== elements.toggleHistoryBtn) {
		closeQueryHistory();
	}
});

// Close history when pressing Escape
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape' && elements.queryHistoryElm.classList.contains('show')) {
		closeQueryHistory();
	}
});

// Close history when editing code
editor.on('change', function() {
	if (elements.queryHistoryElm.classList.contains('show')) {
		closeQueryHistory();
	}
});

// Initial status
updateStatus('info', 'Ready');

// Handle window resize
window.addEventListener('resize', function() {
	const isMobileView = window.innerWidth <= 768;
	const editorPanel = document.querySelector('.editor-panel');
	
	if (isMobileView) {
		editorPanel.style.width = '';
	} else {
		editorPanel.style.height = '';
	}
});

// Add keyboard shortcuts info
function initKeyboardShortcuts() {
	document.addEventListener('DOMContentLoaded', function() {
		const editorHeader = document.querySelector('.editor-header');
		if (editorHeader) {
			const shortcuts = document.createElement('div');
			shortcuts.className = 'shortcuts';
			
			addShortcutInfo(shortcuts, 'Execute: Ctrl/Cmd+Enter', 'Ctrl+Enter');
			addShortcutInfo(shortcuts, 'Save DB: Ctrl/Cmd+S', 'Ctrl+S');
			addShortcutInfo(shortcuts, 'Toggle History: Ctrl+Space', 'Ctrl+Space');
			
			editorHeader.appendChild(shortcuts);
		}
	});
}

function addShortcutInfo(container, title, keyText) {
	const shortcutTemplate = document.getElementById('shortcut-template');
	const shortcutClone = shortcutTemplate.content.cloneNode(true);
	const shortcut = shortcutClone.querySelector('span');
	shortcut.title = title;
	
	const keySlot = document.createElement('span');
	keySlot.slot = 'key';
	keySlot.textContent = keyText;
	shortcut.appendChild(keySlot);
	
	container.appendChild(shortcut);
}
````

## File: examples/GUI/index.html
````html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SQL.js - Modern SQL Interpreter</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/theme/nord.min.css">
  <link rel="stylesheet" href="demo.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.js"></script>
</head>

<body>
  <!-- GitHub corner -->
  <a href="https://github.com/sql-js/sql.js" class="github-corner" aria-label="View on GitHub">
    <svg width="60" height="60" viewBox="0 0 250 250" style="fill:rgba(79, 190, 255, 0.3); color:#0f1923; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
    </svg>
  </a>
  
  <header>
    <h1>SQL.js Interpreter</h1>
    <div class="toolbar">
      <button id="execute" class="button button-primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Execute
      </button>
      <button id="savedb" class="button button-success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Save DB
      </button>
      <label class="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        Load DB
        <input type="file" id="dbfile">
      </label>
      <button id="toggleHistory" class="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Examples
      </button>
    </div>
  </header>

  <div class="app-container">
    <!-- Editor Panel -->
    <div class="panel panel-resizable editor-panel">
      <div class="panel-header editor-header">
        <span>SQL Editor</span>
      </div>
      <div class="panel-content">
        <textarea id="commands">-- Basic SQL Demo
-- Create a simple employees table
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  salary NUMERIC,
  hire_date DATE
);

-- Insert sample data
INSERT INTO employees (name, department, salary, hire_date) VALUES
  ('Alice Smith', 'Engineering', 85000, '2020-01-15'),
  ('Bob Johnson', 'Marketing', 72000, '2019-03-20'),
  ('Carol Williams', 'Engineering', 92000, '2018-11-07'),
  ('Dave Brown', 'Finance', 115000, '2017-05-12'),
  ('Eve Davis', 'Engineering', 110000, '2021-08-30');

-- Query the data
SELECT 
  department, 
  COUNT(*) as employee_count,
  ROUND(AVG(salary), 2) as avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;</textarea>
        <div class="query-history" id="queryHistory">
          <!-- History items will be added here dynamically -->
        </div>
      </div>
      <div class="status-bar">
        <div class="status-item" id="editorStatus">
          Ready
        </div>
      </div>
      <div class="resizer" id="panelResizer"></div>
    </div>

    <!-- Results Panel -->
    <div class="panel results-panel">
      <div class="results-tabs" id="resultsTabs">
        <button class="tab active" data-tab="tab1">Result 1</button>
        <button id="newTabBtn" class="tab">+</button>
      </div>
      <div class="panel-content">
        <div id="error" class="error"></div>
        <div class="tab-panel active" id="tab1">
          <div class="results-content">Results will be displayed here</div>
        </div>
      </div>
      <div class="status-bar">
        <div class="status-item" id="resultsStatus">
          No query executed yet
        </div>
        <div class="status-item" id="queryTime">
          <!-- Query execution time will be shown here -->
        </div>
      </div>
    </div>
  </div>

  <footer>
    <p>
      Original work by <a href='https://github.com/kripken'>kripken</a> (<a href='https://github.com/sql-js/sql.js'>sql.js</a>) |
      Project maintained by <a href='https://github.com/lovasoa'>lovasoa</a>
    </p>
  </footer>

  <!-- Templates -->
  <template id="tab-template">
    <button class="tab">
      <slot name="tab-title">Result</slot>
      <span class="tab-close">×</span>
    </button>
  </template>

  <template id="tab-panel-template">
    <div class="tab-panel">
      <div class="results-content">
        <slot name="panel-content">Execute a query to see results</slot>
      </div>
    </div>
  </template>

  <template id="loading-template">
    <div class="loading">
      <div class="spinner"></div>
      <span>Executing query...</span>
    </div>
  </template>

  <template id="table-template">
    <div class="table-wrapper">
      <div class="table-caption">
        <span class="row-count"></span>
        <span class="column-count"></span>
      </div>
      <table>
        <thead>
          <tr>
            <slot name="table-headers"></slot>
          </tr>
        </thead>
        <tbody>
          <slot name="table-rows"></slot>
        </tbody>
      </table>
    </div>
  </template>

  <template id="error-template">
    <div class="no-results error-result">
      <slot name="error-message">Query failed</slot>
    </div>
  </template>

  <template id="history-item-template">
    <div class="history-item">
      <div class="history-query">
        <slot name="query-preview"></slot>
      </div>
      <div class="history-time">
        <slot name="query-time"></slot>
      </div>
    </div>
  </template>

  <template id="shortcut-template">
    <span>
      <span class="shortcut-key">
        <slot name="key"></slot>
      </span>
    </span>
  </template>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/sql/sql.min.js"></script>
  <script type="text/javascript" src="gui.js"></script>
</body>

</html>
````

## File: examples/persistent.html
````html
<!doctype html>
<html>

<head>
	<meta charset="utf8">
	<title>Persistent sqlite</title>
	<script src="../dist/sql-wasm.js"></script>
</head>

<body>
	<p>You have seen this page <span id="views">0</span> times.</p>
	<div>
		You have been here on the following dates: <ol id="dates"></ol>
	</div>
	<script>
		var baseUrl = '../dist/';

		function toBinArray(str) {
			var l = str.length,
				arr = new Uint8Array(l);
			for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
			return arr;
		}

		function toBinString(arr) {
			var uarr = new Uint8Array(arr);
			var strings = [], chunksize = 0xffff;
			// There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
			for (var i = 0; i * chunksize < uarr.length; i++) {
				strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
			}
			return strings.join('');
		}

		// Normally Sql.js tries to load sql-wasm.wasm relative to the page, not relative to the javascript
		// doing the loading. So, we help it find the .wasm file with this function.
		var config = {
			locateFile: filename => `${baseUrl}/${filename}`
		}
		initSqlJs(config).then(function (SQL) {
			var dbstr = window.localStorage.getItem("viewcount.sqlite");
			if (dbstr) {
				var db = new SQL.Database(toBinArray(dbstr));
			} else {
				var db = new SQL.Database();
				db.run("CREATE TABLE views (date INTEGER PRIMARY KEY)");
			}
			db.run("INSERT INTO views(date) VALUES (?)", [Date.now()]);

			document.getElementById('views').textContent = db.exec("SELECT COUNT(*) FROM views")[0].values[0][0];

			var count = 0,
				dates = document.getElementById("dates");

			db.each("SELECT date FROM views ORDER BY date ASC",
				function callback(row) {
					var li = document.createElement("li");
					li.textContent = new Date(row.date);
					dates.appendChild(li);
				}, function done() {
					var dbstr = toBinString(db.export());
					window.localStorage.setItem("viewcount.sqlite", dbstr);
				}
			);
		});

	</script>
</body>

</html>
````

## File: examples/README.md
````markdown
To show these examples locally, first run:
    ./start_local_server.py

Then, open http://localhost:8081/index.html in a local browser.
````

## File: examples/repl.html
````html
<!doctype html>
<html>
<!--Simple Read eval print loop for SQL-->

<head>
	<meta charset="utf8">
	<title>SQL REPL</title>
	<script src="../dist/sql-wasm.js"></script>
</head>

<body>
	<input type='text' id='input' placeholder="ENTER SOME SQL" size='50'
		value="CREATE TABLE test(val);INSERT INTO test VALUES (666); SELECT * FROM test">
	<button id='submit'>Execute</button>
	<pre id='result'></pre>
	<pre id='error'></pre>
	<script>

		//Open a blank database
		var db;
		initSqlJs({ locateFile: filename => `../dist/${filename}` }).then(function (SQL) {
			db = new SQL.Database();
		});

		document.getElementById('submit').onclick = function () {
			var sql = document.getElementById('input').value;
			var result = '', error = '';
			try { result = db.exec(sql); }
			catch (e) { error = e; }
			document.getElementById('result').innerHTML = JSON.stringify(result, null, '  ');
			document.getElementById('error').innerHTML = error;
		};
	</script>
</body>
````

## File: examples/requireJS.html
````html
<meta charset="utf8" />
<html>
<script src='https://requirejs.org/docs/release/2.3.6/minified/require.js'></script>

<script>
  var baseUrl = '../dist'
  require.config({
    baseUrl: baseUrl
  });

  // Options: 'sql-wasm', 'sql-asm', 'sql-asm-memory-growth.js', 'sql-wasm-debug', 'sql-asm-debug'
  require(['sql-wasm'],
    function success(initSqlJs) {
      console.log(typeof initSqlJs);
      if (typeof initSqlJs !== 'function') {
        document.body.style.backgroundColor = 'red';
        console.log('initSqlJs returned: ', initSqlJs);
        alert("Failed to require sql.js through AMD");
        return;
      }
      // The `initSqlJs` function is globally provided by all of the main dist files if loaded in the browser.
      // We must specify this locateFile function if we are loading a wasm file from anywhere other than the current html page's folder.

      var config = {
        locateFile: filename => `${baseUrl}/${filename}`
      }
      initSqlJs(config).then(function (SQL) {
        //Create the database
        var db = new SQL.Database();
        // Run a query without reading the results
        db.run("CREATE TABLE test (col1, col2);");
        // Insert two rows: (1,111) and (2,222)
        db.run("INSERT INTO test VALUES (?,?), (?,?)", [1, 111, 2, 222]);

        // Prepare a statement
        var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
        stmt.getAsObject({ $start: 1, $end: 1 }); // {col1:1, col2:111}

        // Bind new values
        stmt.bind({ $start: 1, $end: 2 });
        while (stmt.step()) { //
          var row = stmt.getAsObject();
          // [...] do something with the row of result
          console.log('Here is a row: ', row);
        }
      });
    },
    function error(err) {
      document.body.style.backgroundColor = 'red';
      console.log(err);
      alert("Module load failed: " + err);
    }
  );
</script>

<body>
  Output is in Javscript console
</body>

</html>
````

## File: examples/simple.html
````html
<meta charset="utf8" />
<html>
<script src='../dist/sql-wasm-debug.js'></script>
<script>
  config = {
    locateFile: (filename, prefix) => {
      console.log(`prefix is : ${prefix}`);
      return `../dist/${filename}`;
    }
  }
  // The `initSqlJs` function is globally provided by all of the main dist files if loaded in the browser.
  // We must specify this locateFile function if we are loading a wasm file from anywhere other than the current html page's folder.
  initSqlJs(config).then(function (SQL) {
    //Create the database
    var db = new SQL.Database();
    // Run a query without reading the results
    db.run("CREATE TABLE test (col1, col2);");
    // Insert two rows: (1,111) and (2,222)
    db.run("INSERT INTO test VALUES (?,?), (?,?)", [1, 111, 2, 222]);

    // Prepare a statement
    var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
    stmt.getAsObject({ $start: 1, $end: 1 }); // {col1:1, col2:111}

    // Bind new values
    stmt.bind({ $start: 1, $end: 2 });
    while (stmt.step()) { //
      var row = stmt.getAsObject();
      console.log('Here is a row: ' + JSON.stringify(row));
    }
  });
</script>

<body>
  Output is in Javscript console
</body>

</html>
````

## File: examples/start_local_server.py
````python
#!/usr/bin/env python3

import http.server
import os

# We need to host from the root because we are going to be requesting files inside of dist
os.chdir("../")
port = 8081
print("Running on port %d" % port)

http.server.SimpleHTTPRequestHandler.extensions_map[".wasm"] = "application/wasm"

httpd = http.server.HTTPServer(
    ("localhost", port), http.server.SimpleHTTPRequestHandler
)

print(
    'Mapping ".wasm" to "%s"'
    % http.server.SimpleHTTPRequestHandler.extensions_map[".wasm"]
)
httpd.serve_forever()
````

## File: GUI/index.html
````html
<html>
    <body>
        <!-- Add a link to the new page because there are likely links pointing here from elsewhere -->
        This page has moved to: <a href="../examples/GUI/index.html">../examples/GUI/index.html</a>
    </body>
</html>
````

## File: src/api.js
````javascript
/* global
    FS
    HEAP8
    Module
    _malloc
    _free
    getValue
    setValue
    stackAlloc
    stackRestore
    stackSave
    UTF8ToString
    stringToNewUTF8
    removeFunction
    addFunction
    writeArrayToMemory
*/

"use strict";

/**
 * @typedef {{Database:Database, Statement:Statement}} SqlJs
 * @property {Database} Database A class that represents an SQLite database
 * @property {Statement} Statement The prepared statement class
 */

/**
 * @typedef {{locateFile:function(string):string}} SqlJsConfig
 * @property {function(string):string} locateFile
 * a function that returns the full path to a resource given its file name
 * @see https://emscripten.org/docs/api_reference/module.html
 */

/**
 * Asynchronously initializes sql.js
 * @function initSqlJs
 * @param {SqlJsConfig} config module inititialization parameters
 * @returns {SqlJs}
 * @example
 * initSqlJs({
 *  locateFile: name => '/path/to/assets/' + name
 * }).then(SQL => {
 *  const db = new SQL.Database();
 *  const result = db.exec("select 'hello world'");
 *  console.log(result);
 * })
 */

/**
 * @module SqlJs
 */
// Wait for preRun to run, and then finish our initialization
Module["onRuntimeInitialized"] = function onRuntimeInitialized() {
    // Declare toplevel variables
    // register, used for temporary stack values
    var apiTemp = stackAlloc(4);
    var cwrap = Module["cwrap"];
    // Null pointer
    var NULL = 0;
    // SQLite enum
    var SQLITE_OK = 0;
    var SQLITE_ROW = 100;
    var SQLITE_DONE = 101;
    var SQLITE_INTEGER = 1;
    var SQLITE_FLOAT = 2;
    var SQLITE_TEXT = 3;
    var SQLITE_BLOB = 4;
    // var - Encodings, used for registering functions.
    var SQLITE_UTF8 = 1;
    // var - Authorizer Action Codes used to identify change types in updateHook
    var SQLITE_INSERT = 18;
    var SQLITE_UPDATE = 23;
    var SQLITE_DELETE = 9;
    // var - cwrap function
    var sqlite3_open = cwrap("sqlite3_open", "number", ["string", "number"]);
    var sqlite3_close_v2 = cwrap("sqlite3_close_v2", "number", ["number"]);
    var sqlite3_exec = cwrap(
        "sqlite3_exec",
        "number",
        ["number", "string", "number", "number", "number"]
    );
    var sqlite3_changes = cwrap("sqlite3_changes", "number", ["number"]);
    var sqlite3_prepare_v2 = cwrap(
        "sqlite3_prepare_v2",
        "number",
        ["number", "string", "number", "number", "number"]
    );
    var sqlite3_sql = cwrap("sqlite3_sql", "string", ["number"]);
    var sqlite3_normalized_sql = cwrap(
        "sqlite3_normalized_sql",
        "string",
        ["number"]
    );
    var sqlite3_prepare_v2_sqlptr = cwrap(
        "sqlite3_prepare_v2",
        "number",
        ["number", "number", "number", "number", "number"]
    );
    var sqlite3_bind_text = cwrap(
        "sqlite3_bind_text",
        "number",
        ["number", "number", "number", "number", "number"]
    );
    var sqlite3_bind_blob = cwrap(
        "sqlite3_bind_blob",
        "number",
        ["number", "number", "number", "number", "number"]
    );
    var sqlite3_bind_double = cwrap(
        "sqlite3_bind_double",
        "number",
        ["number", "number", "number"]
    );
    var sqlite3_bind_int = cwrap(
        "sqlite3_bind_int",
        "number",
        ["number", "number", "number"]
    );

    var sqlite3_bind_parameter_index = cwrap(
        "sqlite3_bind_parameter_index",
        "number",
        ["number", "string"]
    );
    var sqlite3_step = cwrap("sqlite3_step", "number", ["number"]);
    var sqlite3_errmsg = cwrap("sqlite3_errmsg", "string", ["number"]);
    var sqlite3_column_count = cwrap(
        "sqlite3_column_count",
        "number",
        ["number"]
    );
    var sqlite3_data_count = cwrap("sqlite3_data_count", "number", ["number"]);
    var sqlite3_column_double = cwrap(
        "sqlite3_column_double",
        "number",
        ["number", "number"]
    );
    var sqlite3_column_text = cwrap(
        "sqlite3_column_text",
        "string",
        ["number", "number"]
    );
    var sqlite3_column_blob = cwrap(
        "sqlite3_column_blob",
        "number",
        ["number", "number"]
    );
    var sqlite3_column_bytes = cwrap(
        "sqlite3_column_bytes",
        "number",
        ["number", "number"]
    );
    var sqlite3_column_type = cwrap(
        "sqlite3_column_type",
        "number",
        ["number", "number"]
    );
    var sqlite3_column_name = cwrap(
        "sqlite3_column_name",
        "string",
        ["number", "number"]
    );
    var sqlite3_reset = cwrap("sqlite3_reset", "number", ["number"]);
    var sqlite3_clear_bindings = cwrap(
        "sqlite3_clear_bindings",
        "number",
        ["number"]
    );
    var sqlite3_finalize = cwrap("sqlite3_finalize", "number", ["number"]);
    var sqlite3_create_function_v2 = cwrap(
        "sqlite3_create_function_v2",
        "number",
        [
            "number",
            "string",
            "number",
            "number",
            "number",
            "number",
            "number",
            "number",
            "number"
        ]
    );
    var sqlite3_value_type = cwrap("sqlite3_value_type", "number", ["number"]);
    var sqlite3_value_bytes = cwrap(
        "sqlite3_value_bytes",
        "number",
        ["number"]
    );
    var sqlite3_value_text = cwrap("sqlite3_value_text", "string", ["number"]);
    var sqlite3_value_blob = cwrap("sqlite3_value_blob", "number", ["number"]);
    var sqlite3_value_double = cwrap(
        "sqlite3_value_double",
        "number",
        ["number"]
    );
    var sqlite3_result_double = cwrap(
        "sqlite3_result_double",
        "",
        ["number", "number"]
    );
    var sqlite3_result_null = cwrap(
        "sqlite3_result_null",
        "",
        ["number"]
    );
    var sqlite3_result_text = cwrap(
        "sqlite3_result_text",
        "",
        ["number", "string", "number", "number"]
    );
    var sqlite3_result_blob = cwrap(
        "sqlite3_result_blob",
        "",
        ["number", "number", "number", "number"]
    );
    var sqlite3_result_int = cwrap(
        "sqlite3_result_int",
        "",
        ["number", "number"]
    );
    var sqlite3_result_error = cwrap(
        "sqlite3_result_error",
        "",
        ["number", "string", "number"]
    );

    // https://www.sqlite.org/c3ref/aggregate_context.html
    // void *sqlite3_aggregate_context(sqlite3_context*, int nBytes)
    var sqlite3_aggregate_context = cwrap(
        "sqlite3_aggregate_context",
        "number",
        ["number", "number"]
    );
    var registerExtensionFunctions = cwrap(
        "RegisterExtensionFunctions",
        "number",
        ["number"]
    );

    var sqlite3_update_hook = cwrap(
        "sqlite3_update_hook",
        "number",
        ["number", "number", "number"]
    );

    /**
    * @classdesc
    * Represents a prepared statement.
    * Prepared statements allow you to have a template sql string,
    * that you can execute multiple times with different parameters.
    *
    * You can't instantiate this class directly, you have to use a
    * {@link Database} object in order to create a statement.
    *
    * **Warnings**
    * 1. When you close a database (using db.close()), all
    * its statements are closed too and become unusable.
    * 1. After calling db.prepare() you must manually free the assigned memory
    * by calling Statement.free(). Failure to do this will cause subsequent
    * 'DROP TABLE ...' statements to fail with 'Uncaught Error: database table
    * is locked'.
    *
    * Statements can't be created by the API user directly, only by
    * Database::prepare
    *
    * @see Database.html#prepare-dynamic
    * @see https://en.wikipedia.org/wiki/Prepared_statement
    *
    * @constructs Statement
    * @memberof module:SqlJs
    * @param {number} stmt1 The SQLite statement reference
    * @param {Database} db The database from which this statement was created
     */
    function Statement(stmt1, db) {
        this.stmt = stmt1;
        this.db = db;
        // Index of the leftmost parameter is 1
        this.pos = 1;
        // Pointers to allocated memory, that need to be freed
        // when the statemend is destroyed
        this.allocatedmem = [];
    }

    /** @typedef {string|number|null|Uint8Array} Database.SqlValue */
    /** @typedef {
        Array<Database.SqlValue>|Object<string, Database.SqlValue>|null
    } Statement.BindParams
     */

    /** Bind values to the parameters, after having reseted the statement.
    * If values is null, do nothing and return true.
    *
    * SQL statements can have parameters,
    * named *'?', '?NNN', ':VVV', '@VVV', '$VVV'*,
    * where NNN is a number and VVV a string.
    * This function binds these parameters to the given values.
    *
    * *Warning*: ':', '@', and '$' are included in the parameters names
    *
    * ## Value types
    * Javascript type  | SQLite type
    * -----------------| -----------
    * number           | REAL, INTEGER
    * boolean          | INTEGER
    * string           | TEXT
    * Array, Uint8Array| BLOB
    * null             | NULL
    *
    * @example <caption>Bind values to named parameters</caption>
    *     var stmt = db.prepare(
    *         "UPDATE test SET a=@newval WHERE id BETWEEN $mini AND $maxi"
    *     );
    *     stmt.bind({$mini:10, $maxi:20, '@newval':5});
    *
    * @example <caption>Bind values to anonymous parameters</caption>
    * // Create a statement that contains parameters like '?', '?NNN'
    * var stmt = db.prepare("UPDATE test SET a=? WHERE id BETWEEN ? AND ?");
    * // Call Statement.bind with an array as parameter
    * stmt.bind([5, 10, 20]);
    *
    * @see http://www.sqlite.org/datatype3.html
    * @see http://www.sqlite.org/lang_expr.html#varparam

    * @param {Statement.BindParams} values The values to bind
    * @return {boolean} true if it worked
    * @throws {String} SQLite Error
    */
    Statement.prototype["bind"] = function bind(values) {
        if (!this.stmt) {
            throw "Statement closed";
        }
        this["reset"]();
        if (Array.isArray(values)) return this.bindFromArray(values);
        if (values != null && typeof values === "object") {
            return this.bindFromObject(values);
        }
        return true;
    };

    /** Execute the statement, fetching the the next line of result,
    that can be retrieved with {@link Statement.get}.

    @return {boolean} true if a row of result available
    @throws {String} SQLite Error
     */
    Statement.prototype["step"] = function step() {
        if (!this.stmt) {
            throw "Statement closed";
        }
        this.pos = 1;
        var ret = sqlite3_step(this.stmt);
        switch (ret) {
            case SQLITE_ROW:
                return true;
            case SQLITE_DONE:
                return false;
            default:
                throw this.db.handleError(ret);
        }
    };

    /*
    Internal methods to retrieve data from the results of a statement
    that has been executed
     */
    Statement.prototype.getNumber = function getNumber(pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        return sqlite3_column_double(this.stmt, pos);
    };

    Statement.prototype.getBigInt = function getBigInt(pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        var text = sqlite3_column_text(this.stmt, pos);
        if (typeof BigInt !== "function") {
            throw new Error("BigInt is not supported");
        }
        /* global BigInt */
        return BigInt(text);
    };

    Statement.prototype.getString = function getString(pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        return sqlite3_column_text(this.stmt, pos);
    };

    Statement.prototype.getBlob = function getBlob(pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        var size = sqlite3_column_bytes(this.stmt, pos);
        var ptr = sqlite3_column_blob(this.stmt, pos);
        var result = new Uint8Array(size);
        for (var i = 0; i < size; i += 1) {
            result[i] = HEAP8[ptr + i];
        }
        return result;
    };

    /** Get one row of results of a statement.
    If the first parameter is not provided, step must have been called before.
    @param {Statement.BindParams} [params] If set, the values will be bound
    to the statement before it is executed
    @return {Array<Database.SqlValue>} One row of result

    @example
    <caption>Print all the rows of the table test to the console</caption>
    var stmt = db.prepare("SELECT * FROM test");
    while (stmt.step()) console.log(stmt.get());

    <caption>Enable BigInt support</caption>
    var stmt = db.prepare("SELECT * FROM test");
    while (stmt.step()) console.log(stmt.get(null, {useBigInt: true}));
     */
    Statement.prototype["get"] = function get(params, config) {
        config = config || {};
        if (params != null && this["bind"](params)) {
            this["step"]();
        }
        var results1 = [];
        var ref = sqlite3_data_count(this.stmt);
        for (var field = 0; field < ref; field += 1) {
            switch (sqlite3_column_type(this.stmt, field)) {
                case SQLITE_INTEGER:
                    var getfunc = config["useBigInt"]
                        ? this.getBigInt(field)
                        : this.getNumber(field);
                    results1.push(getfunc);
                    break;
                case SQLITE_FLOAT:
                    results1.push(this.getNumber(field));
                    break;
                case SQLITE_TEXT:
                    results1.push(this.getString(field));
                    break;
                case SQLITE_BLOB:
                    results1.push(this.getBlob(field));
                    break;
                default:
                    results1.push(null);
            }
        }
        return results1;
    };

    /** Get the list of column names of a row of result of a statement.
    @return {Array<string>} The names of the columns
    @example
    var stmt = db.prepare(
        "SELECT 5 AS nbr, x'616200' AS data, NULL AS null_value;"
    );
    stmt.step(); // Execute the statement
    console.log(stmt.getColumnNames());
    // Will print ['nbr','data','null_value']
     */
    Statement.prototype["getColumnNames"] = function getColumnNames() {
        var results1 = [];
        var ref = sqlite3_column_count(this.stmt);
        for (var i = 0; i < ref; i += 1) {
            results1.push(sqlite3_column_name(this.stmt, i));
        }
        return results1;
    };

    /** Get one row of result as a javascript object, associating column names
    with their value in the current row.
    @param {Statement.BindParams} [params] If set, the values will be bound
    to the statement, and it will be executed
    @return {Object<string, Database.SqlValue>} The row of result
    @see {@link Statement.get}

    @example

        var stmt = db.prepare(
            "SELECT 5 AS nbr, x'010203' AS data, NULL AS null_value;"
        );
        stmt.step(); // Execute the statement
        console.log(stmt.getAsObject());
        // Will print {nbr:5, data: Uint8Array([1,2,3]), null_value:null}
     */
    Statement.prototype["getAsObject"] = function getAsObject(params, config) {
        var values = this["get"](params, config);
        var names = this["getColumnNames"]();
        var rowObject = {};
        for (var i = 0; i < names.length; i += 1) {
            var name = names[i];
            rowObject[name] = values[i];
        }
        return rowObject;
    };

    /** Get the SQL string used in preparing this statement.
     @return {string} The SQL string
     */
    Statement.prototype["getSQL"] = function getSQL() {
        return sqlite3_sql(this.stmt);
    };

    /** Get the SQLite's normalized version of the SQL string used in
    preparing this statement.  The meaning of "normalized" is not
    well-defined: see {@link https://sqlite.org/c3ref/expanded_sql.html
    the SQLite documentation}.

     @example
     db.run("create table test (x integer);");
     stmt = db.prepare("select * from test where x = 42");
     // returns "SELECT*FROM test WHERE x=?;"

     @return {string} The normalized SQL string
     */
    Statement.prototype["getNormalizedSQL"] = function getNormalizedSQL() {
        return sqlite3_normalized_sql(this.stmt);
    };

    /** Shorthand for bind + step + reset
    Bind the values, execute the statement, ignoring the rows it returns,
    and resets it
    @param {Statement.BindParams} [values] Value to bind to the statement
     */
    Statement.prototype["run"] = function run(values) {
        if (values != null) {
            this["bind"](values);
        }
        this["step"]();
        return this["reset"]();
    };

    Statement.prototype.bindString = function bindString(string, pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        var strptr = stringToNewUTF8(string);
        this.allocatedmem.push(strptr);
        this.db.handleError(sqlite3_bind_text(
            this.stmt,
            pos,
            strptr,
            -1,
            0
        ));
        return true;
    };

    Statement.prototype.bindBlob = function bindBlob(array, pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        var blobptr = _malloc(array.length);
        writeArrayToMemory(array, blobptr);
        this.allocatedmem.push(blobptr);
        this.db.handleError(sqlite3_bind_blob(
            this.stmt,
            pos,
            blobptr,
            array.length,
            0
        ));
        return true;
    };

    Statement.prototype.bindNumber = function bindNumber(num, pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        var bindfunc = (
            num === (num | 0)
                ? sqlite3_bind_int
                : sqlite3_bind_double
        );
        this.db.handleError(bindfunc(this.stmt, pos, num));
        return true;
    };

    Statement.prototype.bindNull = function bindNull(pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }
        return sqlite3_bind_blob(this.stmt, pos, 0, 0, 0) === SQLITE_OK;
    };

    Statement.prototype.bindValue = function bindValue(val, pos) {
        if (pos == null) {
            pos = this.pos;
            this.pos += 1;
        }

        switch (typeof val) {
            case "string":
                return this.bindString(val, pos);
            case "number":
                return this.bindNumber(val + 0, pos);
            case "bigint":
                // BigInt is not fully supported yet at WASM level.
                return this.bindString(val.toString(), pos);
            case "boolean":
                return this.bindNumber(val + 0, pos);
            case "object":
                if (val === null) {
                    return this.bindNull(pos);
                }
                if (val.length != null) {
                    return this.bindBlob(val, pos);
                }
                break;
            default:
                break;
        }
        throw (
            "Wrong API use : tried to bind a value of an unknown type ("
            + val + ")."
        );
    };

    /** Bind names and values of an object to the named parameters of the
    statement
    @param {Object<string, Database.SqlValue>} valuesObj
    @private
    @nodoc
     */
    Statement.prototype.bindFromObject = function bindFromObject(valuesObj) {
        var that = this;
        Object.keys(valuesObj).forEach(function each(name) {
            var num = sqlite3_bind_parameter_index(that.stmt, name);
            if (num !== 0) {
                that.bindValue(valuesObj[name], num);
            }
        });
        return true;
    };

    /** Bind values to numbered parameters
    @param {Array<Database.SqlValue>} values
    @private
    @nodoc
     */
    Statement.prototype.bindFromArray = function bindFromArray(values) {
        for (var num = 0; num < values.length; num += 1) {
            this.bindValue(values[num], num + 1);
        }
        return true;
    };

    /** Reset a statement, so that its parameters can be bound to new values
    It also clears all previous bindings, freeing the memory used
    by bound parameters.
     */
    Statement.prototype["reset"] = function reset() {
        this["freemem"]();
        return (
            sqlite3_clear_bindings(this.stmt) === SQLITE_OK
            && sqlite3_reset(this.stmt) === SQLITE_OK
        );
    };

    /** Free the memory allocated during parameter binding */
    Statement.prototype["freemem"] = function freemem() {
        var mem;
        while ((mem = this.allocatedmem.pop()) !== undefined) {
            _free(mem);
        }
    };

    /** Free the memory used by the statement
    @return {boolean} true in case of success
     */
    Statement.prototype["free"] = function free() {
        var res;
        this["freemem"]();
        res = sqlite3_finalize(this.stmt) === SQLITE_OK;
        delete this.db.statements[this.stmt];
        this.stmt = NULL;
        return res;
    };

    /**
     * @classdesc
     * An iterator over multiple SQL statements in a string,
     * preparing and returning a Statement object for the next SQL
     * statement on each iteration.
     *
     * You can't instantiate this class directly, you have to use a
     * {@link Database} object in order to create a statement iterator
     *
     * {@see Database#iterateStatements}
     *
     * @example
     * // loop over and execute statements in string sql
     * for (let statement of db.iterateStatements(sql) {
     *     statement.step();
     *     // get results, etc.
     *     // do not call statement.free() manually, each statement is freed
     *     // before the next one is parsed
     * }
     *
     * // capture any bad query exceptions with feedback
     * // on the bad sql
     * let it = db.iterateStatements(sql);
     * try {
     *     for (let statement of it) {
     *         statement.step();
     *     }
     * } catch(e) {
     *     console.log(
     *         `The SQL string "${it.getRemainingSQL()}" ` +
     *         `contains the following error: ${e}`
     *     );
     * }
     *
     * @implements {Iterator<Statement>}
     * @implements {Iterable<Statement>}
     * @constructs StatementIterator
     * @memberof module:SqlJs
     * @param {string} sql A string containing multiple SQL statements
     * @param {Database} db The database from which this iterator was created
     */
    function StatementIterator(sql, db) {
        this.db = db;
        this.sqlPtr = stringToNewUTF8(sql);
        if (this.sqlPtr === null) {
            throw new Error("Unable to allocate memory for the SQL string");
        }
        this.nextSqlPtr = this.sqlPtr;
        this.nextSqlString = null;
        this.activeStatement = null;
    }

    /**
     * @typedef {{ done:true, value:undefined } |
     *           { done:false, value:Statement}}
     *           StatementIterator.StatementIteratorResult
     * @property {Statement} value the next available Statement
     * (as returned by {@link Database.prepare})
     * @property {boolean} done true if there are no more available statements
     */

    /** Prepare the next available SQL statement
     @return {StatementIterator.StatementIteratorResult}
     @throws {String} SQLite error or invalid iterator error
     */
    StatementIterator.prototype["next"] = function next() {
        if (this.sqlPtr === null) {
            return { done: true };
        }
        if (this.activeStatement !== null) {
            this.activeStatement["free"]();
            this.activeStatement = null;
        }
        if (!this.db.db) {
            this.finalize();
            throw new Error("Database closed");
        }
        var stack = stackSave();
        var pzTail = stackAlloc(4);
        setValue(apiTemp, 0, "i32");
        setValue(pzTail, 0, "i32");
        try {
            this.db.handleError(sqlite3_prepare_v2_sqlptr(
                this.db.db,
                this.nextSqlPtr,
                -1,
                apiTemp,
                pzTail
            ));
            this.nextSqlPtr = getValue(pzTail, "i32");
            var pStmt = getValue(apiTemp, "i32");
            if (pStmt === NULL) {
                this.finalize();
                return { done: true };
            }
            this.activeStatement = new Statement(pStmt, this.db);
            this.db.statements[pStmt] = this.activeStatement;
            return { value: this.activeStatement, done: false };
        } catch (e) {
            this.nextSqlString = UTF8ToString(this.nextSqlPtr);
            this.finalize();
            throw e;
        } finally {
            stackRestore(stack);
        }
    };

    StatementIterator.prototype.finalize = function finalize() {
        _free(this.sqlPtr);
        this.sqlPtr = null;
    };

    /** Get any un-executed portions remaining of the original SQL string
     @return {String}
     */
    StatementIterator.prototype["getRemainingSQL"] = function getRemainder() {
        // iff an exception occurred, we set the nextSqlString
        if (this.nextSqlString !== null) return this.nextSqlString;
        // otherwise, convert from nextSqlPtr
        return UTF8ToString(this.nextSqlPtr);
    };

    /* implement Iterable interface */

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        StatementIterator.prototype[Symbol.iterator] = function iterator() {
            return this;
        };
    }

    /** @classdesc
    * Represents an SQLite database
    * @constructs Database
    * @memberof module:SqlJs
    * Open a new database either by creating a new one or opening an existing
    * one stored in the byte array passed in first argument
    * @param {Array<number>} data An array of bytes representing
    * an SQLite database file
    */
    function Database(data) {
        this.filename = "dbfile_" + (0xffffffff * Math.random() >>> 0);
        if (data != null) {
            FS.createDataFile("/", this.filename, data, true, true);
        }
        this.handleError(sqlite3_open(this.filename, apiTemp));
        this.db = getValue(apiTemp, "i32");
        registerExtensionFunctions(this.db);
        // A list of all prepared statements of the database
        this.statements = {};
        // A list of all user function of the database
        // (created by create_function call)
        this.functions = {};
    }

    /** Execute an SQL query, ignoring the rows it returns.
    @param {string} sql a string containing some SQL text to execute
    @param {Statement.BindParams} [params] When the SQL statement contains
    placeholders, you can pass them in here. They will be bound to the statement
    before it is executed. If you use the params argument, you **cannot**
    provide an sql string that contains several statements (separated by `;`)

    @example
    // Insert values in a table
    db.run(
        "INSERT INTO test VALUES (:age, :name)",
        { ':age' : 18, ':name' : 'John' }
    );

    @return {Database} The database object (useful for method chaining)
     */
    Database.prototype["run"] = function run(sql, params) {
        if (!this.db) {
            throw "Database closed";
        }
        if (params) {
            var stmt = this["prepare"](sql, params);
            try {
                stmt["step"]();
            } finally {
                stmt["free"]();
            }
        } else {
            this.handleError(sqlite3_exec(this.db, sql, 0, 0, apiTemp));
        }
        return this;
    };

    /**
     * @typedef {{
        columns:Array<string>,
        values:Array<Array<Database.SqlValue>>
    }} Database.QueryExecResult
     * @property {Array<string>} columns the name of the columns of the result
     * (as returned by {@link Statement.getColumnNames})
     * @property {
     *  Array<Array<Database.SqlValue>>
     * } values one array per row, containing
     * the column values
     */

    /** Execute an SQL query, and returns the result.
    *
    * This is a wrapper against
    * {@link Database.prepare},
    * {@link Statement.bind},
    * {@link Statement.step},
    * {@link Statement.get},
    * and {@link Statement.free}.
    *
    * The result is an array of result elements. There are as many result
    * elements as the number of statements in your sql string (statements are
    * separated by a semicolon)
    *
    * ## Example use
    * We will create the following table, named *test* and query it with a
    * multi-line statement using params:
    *
    * | id | age |  name  |
    * |:--:|:---:|:------:|
    * | 1  |  1  | Ling   |
    * | 2  |  18 | Paul   |
    *
    * We query it like that:
    * ```javascript
    * var db = new SQL.Database();
    * var res = db.exec(
    *     "DROP TABLE IF EXISTS test;\n"
    *     + "CREATE TABLE test (id INTEGER, age INTEGER, name TEXT);"
    *     + "INSERT INTO test VALUES ($id1, :age1, @name1);"
    *     + "INSERT INTO test VALUES ($id2, :age2, @name2);"
    *     + "SELECT id FROM test;"
    *     + "SELECT age,name FROM test WHERE id=$id1",
    *     {
    *         "$id1": 1, ":age1": 1, "@name1": "Ling",
    *         "$id2": 2, ":age2": 18, "@name2": "Paul"
    *     }
    * );
    * ```
    *
    * `res` is now :
    * ```javascript
    *     [
    *         {"columns":["id"],"values":[[1],[2]]},
    *         {"columns":["age","name"],"values":[[1,"Ling"]]}
    *     ]
    * ```
    *
    @param {string} sql a string containing some SQL text to execute
    @param {Statement.BindParams} [params] When the SQL statement contains
    placeholders, you can pass them in here. They will be bound to the statement
    before it is executed. If you use the params argument as an array,
    you **cannot** provide an sql string that contains several statements
    (separated by `;`). This limitation does not apply to params as an object.
    * @return {Array<Database.QueryExecResult>} The results of each statement
    */
    Database.prototype["exec"] = function exec(sql, params, config) {
        if (!this.db) {
            throw "Database closed";
        }
        var stmt = null;
        var originalSqlPtr = null;
        var currentSqlPtr = null;
        try {
            originalSqlPtr = stringToNewUTF8(sql);
            currentSqlPtr = originalSqlPtr;
            var pzTail = stackAlloc(4);
            var results = [];
            while (getValue(currentSqlPtr, "i8") !== NULL) {
                setValue(apiTemp, 0, "i32");
                setValue(pzTail, 0, "i32");
                this.handleError(sqlite3_prepare_v2_sqlptr(
                    this.db,
                    currentSqlPtr,
                    -1,
                    apiTemp,
                    pzTail
                ));
                // pointer to a statement, or null
                var pStmt = getValue(apiTemp, "i32");
                currentSqlPtr = getValue(pzTail, "i32");
                // Empty statement
                if (pStmt !== NULL) {
                    var curresult = null;
                    stmt = new Statement(pStmt, this);
                    if (params != null) {
                        stmt.bind(params);
                    }
                    while (stmt["step"]()) {
                        if (curresult === null) {
                            curresult = {
                                columns: stmt["getColumnNames"](),
                                values: [],
                            };
                            results.push(curresult);
                        }
                        curresult["values"].push(stmt["get"](null, config));
                    }
                    stmt["free"]();
                }
            }
            return results;
        } catch (errCaught) {
            if (stmt) stmt["free"]();
            throw errCaught;
        } finally {
            if (originalSqlPtr) _free(originalSqlPtr);
        }
    };

    /** Execute an sql statement, and call a callback for each row of result.

    Currently this method is synchronous, it will not return until the callback
    has been called on every row of the result. But this might change.

    @param {string} sql A string of SQL text. Can contain placeholders
    that will be bound to the parameters given as the second argument
    @param {Statement.BindParams=} [params=] Parameters to bind to the query
    @param {function(Object<string, Database.SqlValue>):void} callback
    Function to call on each row of result
    @param {function():void} done A function that will be called when
    all rows have been retrieved

    @return {Database} The database object. Useful for method chaining

    @example <caption>Read values from a table</caption>
    db.each("SELECT name,age FROM users WHERE age >= $majority", {$majority:18},
            function (row){console.log(row.name + " is a grown-up.")}
    );
     */
    // eslint-disable-next-line max-len
    Database.prototype["each"] = function each(sql, params, callback, done, config) {
        var stmt;
        if (typeof params === "function") {
            done = callback;
            callback = params;
            params = undefined;
        }
        stmt = this["prepare"](sql, params);
        try {
            while (stmt["step"]()) {
                callback(stmt["getAsObject"](null, config));
            }
        } finally {
            stmt["free"]();
        }
        if (typeof done === "function") {
            return done();
        }
        return undefined;
    };

    /** Prepare an SQL statement
    @param {string} sql a string of SQL, that can contain placeholders
    (`?`, `:VVV`, `:AAA`, `@AAA`)
    @param {Statement.BindParams} [params] values to bind to placeholders
    @return {Statement} the resulting statement
    @throws {String} SQLite error
     */
    Database.prototype["prepare"] = function prepare(sql, params) {
        setValue(apiTemp, 0, "i32");
        this.handleError(sqlite3_prepare_v2(this.db, sql, -1, apiTemp, NULL));
        // pointer to a statement, or null
        var pStmt = getValue(apiTemp, "i32");
        if (pStmt === NULL) {
            throw "Nothing to prepare";
        }
        var stmt = new Statement(pStmt, this);
        if (params != null) {
            stmt.bind(params);
        }
        this.statements[pStmt] = stmt;
        return stmt;
    };

    /** Iterate over multiple SQL statements in a SQL string.
     * This function returns an iterator over {@link Statement} objects.
     * You can use a for..of loop to execute the returned statements one by one.
     * @param {string} sql a string of SQL that can contain multiple statements
     * @return {StatementIterator} the resulting statement iterator
     * @example <caption>Get the results of multiple SQL queries</caption>
     * const sql_queries = "SELECT 1 AS x; SELECT '2' as y";
     * for (const statement of db.iterateStatements(sql_queries)) {
     *     const sql = statement.getSQL(); // Get the SQL source
     *     const result = statement.getAsObject({}); // Get the row of data
     *     console.log(sql, result);
     * }
     * // This will print:
     * // 'SELECT 1 AS x;' { x: 1 }
     * // " SELECT '2' as y" { y: '2' }
     */
    Database.prototype["iterateStatements"] = function iterateStatements(sql) {
        return new StatementIterator(sql, this);
    };

    /** Exports the contents of the database to a binary array. This
     * operation will close and re-open the database which will cause
     * any pragmas to be set back to their default values.
    @return {Uint8Array} An array of bytes of the SQLite3 database file
     */
    Database.prototype["export"] = function exportDatabase() {
        Object.values(this.statements).forEach(function each(stmt) {
            stmt["free"]();
        });
        Object.values(this.functions).forEach(removeFunction);
        this.functions = {};
        this.handleError(sqlite3_close_v2(this.db));
        var binaryDb = FS.readFile(this.filename, { encoding: "binary" });
        this.handleError(sqlite3_open(this.filename, apiTemp));
        this.db = getValue(apiTemp, "i32");
        registerExtensionFunctions(this.db);
        return binaryDb;
    };

    /** Close the database, and all associated prepared statements.
    * The memory associated to the database and all associated statements
    * will be freed.
    *
    * **Warning**: A statement belonging to a database that has been closed
    * cannot be used anymore.
    *
    * Databases **must** be closed when you're finished with them, or the
    * memory consumption will grow forever
     */
    Database.prototype["close"] = function close() {
        // do nothing if db is null or already closed
        if (this.db === null) {
            return;
        }
        Object.values(this.statements).forEach(function each(stmt) {
            stmt["free"]();
        });
        Object.values(this.functions).forEach(removeFunction);
        this.functions = {};

        if (this.updateHookFunctionPtr) {
            removeFunction(this.updateHookFunctionPtr);
            this.updateHookFunctionPtr = undefined;
        }

        this.handleError(sqlite3_close_v2(this.db));
        FS.unlink("/" + this.filename);
        this.db = null;
    };

    /** Analyze a result code, return null if no error occured, and throw
    an error with a descriptive message otherwise
    @nodoc
     */
    Database.prototype["handleError"] = function handleError(returnCode) {
        var errmsg;
        if (returnCode === SQLITE_OK) {
            return null;
        }
        errmsg = sqlite3_errmsg(this.db);
        throw new Error(errmsg);
    };

    /** Returns the number of changed rows (modified, inserted or deleted)
    by the latest completed INSERT, UPDATE or DELETE statement on the
    database. Executing any other type of SQL statement does not modify
    the value returned by this function.

    @return {number} the number of rows modified
    */
    Database.prototype["getRowsModified"] = function getRowsModified() {
        return sqlite3_changes(this.db);
    };

    var extract_blob = function extract_blob(ptr) {
        var size = sqlite3_value_bytes(ptr);
        var blob_ptr = sqlite3_value_blob(ptr);
        var blob_arg = new Uint8Array(size);
        for (var j = 0; j < size; j += 1) {
            blob_arg[j] = HEAP8[blob_ptr + j];
        }
        return blob_arg;
    };

    var parseFunctionArguments = function parseFunctionArguments(argc, argv) {
        var args = [];
        for (var i = 0; i < argc; i += 1) {
            var value_ptr = getValue(argv + (4 * i), "i32");
            var value_type = sqlite3_value_type(value_ptr);
            var arg;
            if (
                value_type === SQLITE_INTEGER
                || value_type === SQLITE_FLOAT
            ) {
                arg = sqlite3_value_double(value_ptr);
            } else if (value_type === SQLITE_TEXT) {
                arg = sqlite3_value_text(value_ptr);
            } else if (value_type === SQLITE_BLOB) {
                arg = extract_blob(value_ptr);
            } else arg = null;
            args.push(arg);
        }
        return args;
    };
    var setFunctionResult = function setFunctionResult(cx, result) {
        switch (typeof result) {
            case "boolean":
                sqlite3_result_int(cx, result ? 1 : 0);
                break;
            case "number":
                sqlite3_result_double(cx, result);
                break;
            case "string":
                sqlite3_result_text(cx, result, -1, -1);
                break;
            case "object":
                if (result === null) {
                    sqlite3_result_null(cx);
                } else if (result.length != null) {
                    var blobptr = _malloc(result.length);
                    writeArrayToMemory(result, blobptr);
                    sqlite3_result_blob(cx, blobptr, result.length, -1);
                    _free(blobptr);
                } else {
                    sqlite3_result_error(
                        cx, (
                            "Wrong API use : tried to return a value "
                        + "of an unknown type (" + result + ")."
                        ), -1
                    );
                }
                break;
            default:
                sqlite3_result_null(cx);
        }
    };

    /** Register a custom function with SQLite
      @example <caption>Register a simple function</caption>
          db.create_function("addOne", function (x) {return x+1;})
          db.exec("SELECT addOne(1)") // = 2

      @param {string} name the name of the function as referenced in
      SQL statements.
      @param {function(any)} func the actual function to be executed.
      @return {Database} The database object. Useful for method chaining
       */
    Database.prototype["create_function"] = function create_function(
        name,
        func
    ) {
        function wrapped_func(cx, argc, argv) {
            var args = parseFunctionArguments(argc, argv);
            var result;
            try {
                result = func.apply(null, args);
            } catch (error) {
                sqlite3_result_error(cx, error, -1);
                return;
            }
            setFunctionResult(cx, result);
        }
        if (Object.prototype.hasOwnProperty.call(this.functions, name)) {
            removeFunction(this.functions[name]);
            delete this.functions[name];
        }
        // The signature of the wrapped function is :
        // void wrapped(sqlite3_context *db, int argc, sqlite3_value **argv)
        var func_ptr = addFunction(wrapped_func, "viii");
        this.functions[name] = func_ptr;
        this.handleError(sqlite3_create_function_v2(
            this.db,
            name,
            func.length,
            SQLITE_UTF8,
            0,
            func_ptr,
            0,
            0,
            0
        ));
        return this;
    };

    /** Register a custom aggregate with SQLite
      @example <caption>Register a custom sum function</caption>
        db.create_aggregate("js_sum", {
            init: () => 0,
            step: (state, value) => state + value,
            finalize: state => state
        });
        db.exec("SELECT js_sum(column1) FROM (VALUES (1), (2))"); // = 3

      @param {string} name the name of the aggregate as referenced in
      SQL statements.
      @param {object} aggregateFunctions
                      object containing at least a step function.
      @param {function(): T} [aggregateFunctions.init=]
            a function receiving no arguments and returning an initial
            value for the aggregate function. The initial value will be
            null if this key is omitted.
      @param {function(T, any) : T} aggregateFunctions.step
            a function receiving the current state and a value to aggregate
            and returning a new state.
            Will receive the value from init for the first step.
      @param {function(T): any} [aggregateFunctions.finalize=]
            a function returning the result of the aggregate function
            given its final state.
            If omitted, the value returned by the last step
            will be used as the final value.
      @return {Database} The database object. Useful for method chaining
      @template T
       */
    Database.prototype["create_aggregate"] = function create_aggregate(
        name,
        aggregateFunctions
    ) {
        // Default initializer and finalizer
        var init = aggregateFunctions["init"]
            || function init() { return null; };
        var finalize = aggregateFunctions["finalize"]
            || function finalize(state) { return state; };
        var step = aggregateFunctions["step"];

        if (!step) {
            throw "An aggregate function must have a step function in " + name;
        }

        // state is a state object; we'll use the pointer p to serve as the
        // key for where we hold our state so that multiple invocations of
        // this function never step on each other
        var state = {};

        function wrapped_step(cx, argc, argv) {
            // > The first time the sqlite3_aggregate_context(C,N) routine is
            // > called for a particular aggregate function, SQLite allocates N
            // > bytes of memory, zeroes out that memory, and returns a pointer
            // > to the new memory.
            //
            // We're going to use that pointer as a key to our state array,
            // since using sqlite3_aggregate_context as it's meant to be used
            // through webassembly seems to be very difficult. Just allocate
            // one byte.
            var p = sqlite3_aggregate_context(cx, 1);

            // If this is the first invocation of wrapped_step, call `init`
            //
            // Make sure that every path through the step and finalize
            // functions deletes the value state[p] when it's done so we don't
            // leak memory and possibly stomp the init value of future calls
            if (!Object.hasOwnProperty.call(state, p)) state[p] = init();

            var args = parseFunctionArguments(argc, argv);
            var mergedArgs = [state[p]].concat(args);
            try {
                state[p] = step.apply(null, mergedArgs);
            } catch (error) {
                delete state[p];
                sqlite3_result_error(cx, error, -1);
            }
        }

        function wrapped_finalize(cx) {
            var result;
            var p = sqlite3_aggregate_context(cx, 1);
            try {
                result = finalize(state[p]);
            } catch (error) {
                delete state[p];
                sqlite3_result_error(cx, error, -1);
                return;
            }
            setFunctionResult(cx, result);
            delete state[p];
        }

        if (Object.hasOwnProperty.call(this.functions, name)) {
            removeFunction(this.functions[name]);
            delete this.functions[name];
        }
        var finalize_name = name + "__finalize";
        if (Object.hasOwnProperty.call(this.functions, finalize_name)) {
            removeFunction(this.functions[finalize_name]);
            delete this.functions[finalize_name];
        }
        // The signature of the wrapped function is :
        // void wrapped(sqlite3_context *db, int argc, sqlite3_value **argv)
        var step_ptr = addFunction(wrapped_step, "viii");

        // The signature of the wrapped function is :
        // void wrapped(sqlite3_context *db)
        var finalize_ptr = addFunction(wrapped_finalize, "vi");
        this.functions[name] = step_ptr;
        this.functions[finalize_name] = finalize_ptr;

        // passing null to the sixth parameter defines this as an aggregate
        // function
        //
        // > An aggregate SQL function requires an implementation of xStep and
        // > xFinal and NULL pointer must be passed for xFunc.
        // - http://www.sqlite.org/c3ref/create_function.html
        this.handleError(sqlite3_create_function_v2(
            this.db,
            name,
            step.length - 1,
            SQLITE_UTF8,
            0,
            0,
            step_ptr,
            finalize_ptr,
            0
        ));
        return this;
    };

    /** Registers an update hook with SQLite.
     *
     * Every time a row is changed by whatever means, the callback is called
     * once with the change (`'insert'`, `'update'` or `'delete'`), the database
     * name and table name where the change happened and the
     * [rowid](https://www.sqlite.org/rowidtable.html)
     * of the row that has been changed.
     *
     * The rowid is cast to a plain number. If it exceeds
     * `Number.MAX_SAFE_INTEGER` (2^53 - 1), an error will be thrown.
     *
     * **Important notes:**
     * - The callback **MUST NOT** modify the database in any way
     * - Only a single callback can be registered at a time
     * - Unregister the callback by passing `null`
     * - Not called for some updates like `ON REPLACE CONFLICT` and `TRUNCATE`
     *   (a `DELETE FROM` without a `WHERE` clause)
     *
     * See SQLite documentation on
     * [sqlite3_update_hook](https://www.sqlite.org/c3ref/update_hook.html)
     * for more details
     *
     * @example
     * // Create a database and table
     * var db = new SQL.Database();
     * db.exec(`
     * CREATE TABLE users (
     *   id INTEGER PRIMARY KEY, -- this is the rowid column
     *   name TEXT,
     *   active INTEGER
     * )
     * `);
     *
     * // Register an update hook
     * var changes = [];
     * db.updateHook(function(operation, database, table, rowId) {
     *   changes.push({operation, database, table, rowId});
     *   console.log(`${operation} on ${database}.${table} row ${rowId}`);
     * });
     *
     * // Insert a row - triggers the update hook with 'insert'
     * db.run("INSERT INTO users VALUES (1, 'Alice', 1)");
     * // Logs: "insert on main.users row 1"
     *
     * // Update a row - triggers the update hook with 'update'
     * db.run("UPDATE users SET active = 0 WHERE id = 1");
     * // Logs: "update on main.users row 1"
     *
     * // Delete a row - triggers the update hook with 'delete'
     * db.run("DELETE FROM users WHERE id = 1");
     * // Logs: "delete on main.users row 1"
     *
     * // Unregister the update hook
     * db.updateHook(null);
     *
     * // This won't trigger any callback
     * db.run("INSERT INTO users VALUES (2, 'Bob', 1)");
     *
     * @param {Database~UpdateHookCallback|null} callback
     * - Callback to be executed when a row changes. Takes the type of change,
     *   the name of the database, the name of the table, and the row id of the
     *   changed row.
     * - Set to `null` to unregister.
     * @returns {Database} The database object. Useful for method chaining
     */
    Database.prototype["updateHook"] = function updateHook(callback) {
        if (this.updateHookFunctionPtr) {
            // unregister and cleanup a previously registered update hook
            sqlite3_update_hook(this.db, 0, 0);
            removeFunction(this.updateHookFunctionPtr);
            this.updateHookFunctionPtr = undefined;
        }

        if (!callback) {
            // no new callback to register
            return this;
        }

        // void(*)(void *,int ,char const *,char const *,sqlite3_int64)
        function wrappedCallback(
            ignored,
            operationCode,
            databaseNamePtr,
            tableNamePtr,
            rowIdBigInt
        ) {
            var operation;

            switch (operationCode) {
                case SQLITE_INSERT:
                    operation = "insert";
                    break;
                case SQLITE_UPDATE:
                    operation = "update";
                    break;
                case SQLITE_DELETE:
                    operation = "delete";
                    break;
                default:
                    throw "unknown operationCode in updateHook callback: "
                        + operationCode;
            }

            var databaseName = UTF8ToString(databaseNamePtr);
            var tableName = UTF8ToString(tableNamePtr);

            if (rowIdBigInt > Number.MAX_SAFE_INTEGER) {
                throw "rowId too big to fit inside a Number";
            }

            var rowId = Number(rowIdBigInt);

            callback(operation, databaseName, tableName, rowId);
        }

        this.updateHookFunctionPtr = addFunction(wrappedCallback, "viiiij");

        sqlite3_update_hook(
            this.db,
            this.updateHookFunctionPtr,
            0 // passed as the first arg to wrappedCallback
        );
        return this;
    };

    /**
     * @callback Database~UpdateHookCallback
     * @param {'insert'|'update'|'delete'} operation
     * - The type of change that occurred
     * @param {string} database
     * - The name of the database where the change occurred
     * @param {string} table
     * - The name of the database's table where the change occurred
     * @param {number} rowId
     * - The [rowid](https://www.sqlite.org/rowidtable.html) of the changed row
     */

    // export Database to Module
    Module.Database = Database;
};
````

## File: src/exported_functions.json
````json
[
"_malloc",
"_free",
"_sqlite3_open",
"_sqlite3_exec",
"_sqlite3_free",
"_sqlite3_errmsg",
"_sqlite3_changes",
"_sqlite3_prepare_v2",
"_sqlite3_sql",
"_sqlite3_normalized_sql",
"_sqlite3_bind_text",
"_sqlite3_bind_blob",
"_sqlite3_bind_double",
"_sqlite3_bind_int",
"_sqlite3_bind_parameter_index",
"_sqlite3_step",
"_sqlite3_column_count",
"_sqlite3_data_count",
"_sqlite3_column_double",
"_sqlite3_column_text",
"_sqlite3_column_blob",
"_sqlite3_column_bytes",
"_sqlite3_column_type",
"_sqlite3_column_name",
"_sqlite3_reset",
"_sqlite3_clear_bindings",
"_sqlite3_finalize",
"_sqlite3_close_v2",
"_sqlite3_create_function_v2",
"_sqlite3_value_bytes",
"_sqlite3_value_type",
"_sqlite3_value_text",
"_sqlite3_value_int",
"_sqlite3_value_blob",
"_sqlite3_value_double",
"_sqlite3_result_double",
"_sqlite3_result_null",
"_sqlite3_result_text",
"_sqlite3_result_blob",
"_sqlite3_result_int",
"_sqlite3_result_int64",
"_sqlite3_result_error",
"_sqlite3_aggregate_context",
"_RegisterExtensionFunctions",
"_sqlite3_update_hook"
]
````

## File: src/exported_runtime_methods.json
````json
[
"cwrap",
"stackAlloc",
"stackSave",
"stackRestore",
"UTF8ToString",
"stringToNewUTF8",
"writeArrayToMemory",
"removeFunction",
"addFunction"
]
````

## File: src/shell-post.js
````javascript
// The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initSqlJsPromise;
} // The end of our initSqlJs function

// This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// However, we don't want to use the emcc modularization. See shell-pre.js
if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = initSqlJs;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initSqlJs;
}
else if (typeof define === 'function' && define['amd']) {
    define([], function() { return initSqlJs; });
}
else if (typeof exports === 'object'){
    exports["Module"] = initSqlJs;
}
````

## File: src/shell-pre.js
````javascript
// We are modularizing this manually because the current modularize setting in Emscripten has some issues:
// https://github.com/kripken/emscripten/issues/5820
// In addition, When you use emcc's modularization, it still expects to export a global object called `Module`,
// which is able to be used/called before the WASM is loaded.
// The modularization below exports a promise that loads and resolves to the actual sql.js module.
// That way, this module can't be used before the WASM is finished loading.

// We are going to define a function that a user will call to start loading initializing our Sql.js library
// However, that function might be called multiple times, and on subsequent calls, we don't actually want it to instantiate a new instance of the Module
// Instead, we want to return the previously loaded module

// TODO: Make this not declare a global if used in the browser
var initSqlJsPromise = undefined;

var initSqlJs = function (moduleConfig) {

    if (initSqlJsPromise){
      return initSqlJsPromise;
    }
    // If we're here, we've never called this function before
    initSqlJsPromise = new Promise(function (resolveModule, reject) {

        // We are modularizing this manually because the current modularize setting in Emscripten has some issues:
        // https://github.com/kripken/emscripten/issues/5820

        // The way to affect the loading of emcc compiled modules is to create a variable called `Module` and add
        // properties to it, like `preRun`, `postRun`, etc
        // We are using that to get notified when the WASM has finished loading.
        // Only then will we return our promise

        // If they passed in a moduleConfig object, use that
        // Otherwise, initialize Module to the empty object
        var Module = typeof moduleConfig !== 'undefined' ? moduleConfig : {};

        // EMCC only allows for a single onAbort function (not an array of functions)
        // So if the user defined their own onAbort function, we remember it and call it
        var originalOnAbortFunction = Module['onAbort'];
        Module['onAbort'] = function (errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction){
              originalOnAbortFunction(errorThatCausedAbort);
            }
        };

        Module['postRun'] = Module['postRun'] || [];
        Module['postRun'].push(function () {
            // When Emscripted calls postRun, this promise resolves with the built Module
            resolveModule(Module);
        });

        // There is a section of code in the emcc-generated code below that looks like this:
        // (Note that this is lowercase `module`)
        // if (typeof module !== 'undefined') {
        //     module['exports'] = Module;
        // }
        // When that runs, it's going to overwrite our own modularization export efforts in shell-post.js!
        // The only way to tell emcc not to emit it is to pass the MODULARIZE=1 or MODULARIZE_INSTANCE=1 flags,
        // but that carries with it additional unnecessary baggage/bugs we don't want either.
        // So, we have three options:
        // 1) We undefine `module`
        // 2) We remember what `module['exports']` was at the beginning of this function and we restore it later
        // 3) We write a script to remove those lines of code as part of the Make process.
        //
        // Since those are the only lines of code that care about module, we will undefine it. It's the most straightforward
        // of the options, and has the side effect of reducing emcc's efforts to modify the module if its output were to change in the future.
        // That's a nice side effect since we're handling the modularization efforts ourselves
        module = undefined;

        // The emcc-generated code and shell-post.js code goes below,
        // meaning that all of it runs inside of this promise. If anything throws an exception, our promise will abort
````

## File: src/worker.js
````javascript
/* global initSqlJs */
/* eslint-env worker */
/* eslint no-restricted-globals: ["error"] */

"use strict";

var db;

function onModuleReady(SQL) {
    function createDb(data) {
        if (db != null) db.close();
        db = new SQL.Database(data);
        return db;
    }

    var buff; var data; var result;
    data = this["data"];
    var config = data["config"] ? data["config"] : {};
    switch (data && data["action"]) {
        case "open":
            buff = data["buffer"];
            createDb(buff && new Uint8Array(buff));
            return postMessage({
                id: data["id"],
                ready: true
            });
        case "exec":
            if (db === null) {
                createDb();
            }
            if (!data["sql"]) {
                throw "exec: Missing query string";
            }
            return postMessage({
                id: data["id"],
                results: db.exec(data["sql"], data["params"], config)
            });
        case "getRowsModified":
            return postMessage({
                id: data["id"],
                rowsModified: db.getRowsModified()
            });
        case "each":
            if (db === null) {
                createDb();
            }
            var callback = function callback(row) {
                return postMessage({
                    id: data["id"],
                    row: row,
                    finished: false
                });
            };
            var done = function done() {
                return postMessage({
                    id: data["id"],
                    finished: true
                });
            };
            return db.each(data["sql"], data["params"], callback, done, config);
        case "export":
            buff = db["export"]();
            result = {
                id: data["id"],
                buffer: buff
            };
            try {
                return postMessage(result, [result]);
            } catch (error) {
                return postMessage(result);
            }
        case "close":
            if (db) {
                db.close();
            }
            return postMessage({
                id: data["id"]
            });
        default:
            throw new Error("Invalid action : " + (data && data["action"]));
    }
}

function onError(err) {
    return postMessage({
        id: this["data"]["id"],
        error: err["message"]
    });
}

db = null;
var sqlModuleReady = initSqlJs();

function global_sqljs_message_handler(event) {
    return sqlModuleReady
        .then(onModuleReady.bind(event))
        .catch(onError.bind(event));
}

if (typeof importScripts === "function") {
    self.onmessage = global_sqljs_message_handler;
}

if (typeof require === "function") {
    // eslint-disable-next-line global-require
    var worker_threads = require("worker_threads");
    var parentPort = worker_threads.parentPort;
    // eslint-disable-next-line no-undef
    globalThis.postMessage = parentPort.postMessage.bind(parentPort);
    parentPort.on("message", function onmessage(data) {
        var event = { data: data };
        global_sqljs_message_handler(event);
    });

    if (typeof process !== "undefined") {
        process.on("uncaughtException", function uncaughtException(err) {
            postMessage({ error: err.message });
        });
        process.on("unhandledRejection", function unhandledRejection(err) {
            postMessage({ error: err.message });
        });
    }
}
````

## File: test/all.js
````javascript
var fs = require("fs");
Error.stackTraceLimit = 200;
var sqlLibType = process.argv[2];
const sqlLibLoader = require('./load_sql_lib');

sqlLibLoader(sqlLibType).then((sql)=>{
  var files = fs.readdirSync(__dirname);
  for (var i=0; i<files.length; i++) {
    var file = files[i];
    var m = /^test_(.+)\.js$/.exec(file);
    if (m !== null) {
      var name = m[1];
      var testModule = require("./" + file);
      if (testModule.test) {
        exports['test ' + name] = testModule.test.bind(null, sql);
      }

    }
  }
  
  if (module == require.main) require('test').run(exports);
})
.catch((e)=>{
  console.error(e);
});
````

## File: test/disabled_test_memory_leak_on_error.js
````javascript
// See: https://github.com/sql-js/sql.js/issues/306
exports.test = function(sql, assert) {
  var errors = 0, runs=10000;
  for (var i=0; i<runs; i++) {
    var db = new sql.Database()
    try {
      db.exec("CREATE TABLE cats (name TEXT NOT NULL, age INTEGER NULL)")
      db.exec("INSERT INTO cats (name, age) VALUES (NULL, 3)")
    } catch (e) {
      errors += e.toString() === "Error: NOT NULL constraint failed: cats.name";
    }
    db.close()
  }
  assert.equal(errors, runs, "Multiple constraint violation errors do not trigger an OOM error");
};

if (module == require.main) {
  const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test memory leak on error': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/load_sql_lib.js
````javascript
module.exports = function(sqlLibraryType){
    // Use sql-wasm.js by default
    var sqlJsLib = sqlLibraryType ? "../dist/sql-"+sqlLibraryType+".js" : "../dist/sql-wasm.js";
    begin = new Date();
    var initSqlJs = require(sqlJsLib);
    return initSqlJs().then((sql)=>{
        end = new Date();
        console.log(`Loaded and inited ${sqlJsLib} in ${end -begin}ms`);
        return sql;
    });
}
````

## File: test/run.sh
````bash
#!/usr/bin/env bash

passed=0
total=0
for f in $(dirname $0)/test_*.js
do
	total=$((total+1))
	echo -ne "Testing $f...\t"
	node "$f" > /tmp/sqljstest
	if [ $? = 0 ]
	then
		echo "Passed."
		passed=$((passed+1))
	else
		echo -e "\033[31mFail!\e[0m"
		cat /tmp/sqljstest
	fi
done

if [ $passed = $total ]
then
	echo -e "\033[32mAll $total tests passed\e[0m"
	exit 0
else
	echo -e "\033[31mWarning\e[0m : $passed tests passed out of $total"
	exit 1
fi
````

## File: test/sql-requireJS.html
````html
<meta charset="utf8" />
<script src='http://requirejs.org/docs/release/2.1.14/minified/require.js'></script>

<script>
require.config({
    baseUrl: '../js'
});

require(['sql'], function success (SQL){
    if (typeof SQL !== 'object') {
      document.body.style.backgroundColor = 'red';
      alert("Failed to require sql.js through AMD");
    } else {
        document.body.style.backgroundColor = 'green';
        alert("sql.js successfully loaded with AMD");
      }
  }, function error(err) {
    console.log(err);
    alert("Module load failed");
  });
</script>
````

## File: test/test_aggregate_functions.js
````javascript
exports.test = function (SQL, assert) {
    function assertFloat(got, expected, message="", sigma=0.001) {
        assert.ok(got > expected - sigma && got < expected + sigma, message);
    }

    var db = new SQL.Database();

    db.create_aggregate("sum", {
        step: function (state, value) { return (state || 0) + value; },
    });

    db.exec("CREATE TABLE test (col);");
    db.exec("INSERT INTO test VALUES (1), (2), (3), (null);");
    var result = db.exec("SELECT sum(col) FROM test;");
    assert.equal(result[0].values[0][0], 6, "Simple aggregate function.");

    db.create_aggregate("percentile", {
        init: function() { return { vals: [], pctile: null }},
        step: function (state, value, pctile) {
            var typ = typeof value;
            if (typ == "number" || typ == "bigint") { // ignore nulls
                state.pctile = pctile;
                state.vals.push(value);
            }
            return state;
        },
        finalize: function (state) {
            return percentile(state.vals, state.pctile);
        }
    });
    result = db.exec("SELECT percentile(col, 80) FROM test;");
    assertFloat(result[0].values[0][0], 2.6, "Aggregate function with two args");

    db.create_aggregate("json_agg", {
        init: () => [],
        step: (state, val) => [...state, val],
        finalize: (state) => JSON.stringify(state),
    });

    db.exec("CREATE TABLE test2 (col, col2);");
    db.exec("INSERT INTO test2 values ('four score', 12), ('and seven', 7), ('years ago', 1);");
    result = db.exec("SELECT json_agg(col) FROM test2;");
    assert.deepEqual(
        JSON.parse(result[0].values[0]),
        ["four score", "and seven", "years ago"],
        "Aggregate function that returns JSON"
    );

    result = db.exec("SELECT json_agg(col), json_agg(col2) FROM test2;");
    assert.deepEqual(
        result[0].values[0].map(JSON.parse),
        [["four score", "and seven", "years ago"], [12, 7, 1]],
        "Multiple aggregations at once"
    );

    db.create_aggregate("is_even", {
       init: () => true,
       step: state => !state
    });
    result = db.exec("SELECT is_even() FROM (VALUES (1),(2),(0));");
    assert.deepEqual(
        result[0].values[0][0],
        0, // this gets convert from "false" to an int by sqlite
        "Aggregate functions respect falsy values"
    );

    db.create_aggregate("sum_non_zero", {
        init: () => 0,
        step: (state, value) => { 
            if (!value) throw "bananas";
            return state + value  
        }
    });
    assert.throws(
        () => db.exec("SELECT sum_non_zero(column1) FROM (VALUES (1),(2),(0));"),
        "Error: bananas",
        "Handles exception in a step function"
    );
    assert.deepEqual(
        db.exec("SELECT sum_non_zero(column1) FROM (VALUES (1),(2));")[0].values[0][0],
        3,
        "Aggregate functions work after an exception has been thrown in step"
    );

    db.create_aggregate("throws_finalize", {
        step: (state, value) => (state || 0) + value,
        finalize: (state) => {
            if (!state) throw "shoes"
            return state;
        }
    });
    assert.throws(
        () => db.exec("SELECT throws_finalize(column1) FROM (VALUES (0));"),
        "Error: shoes",
        "Handles exception in a finalize function"
    );
    assert.deepEqual(
        db.exec("SELECT throws_finalize(column1) FROM (VALUES (1),(2));")[0].values[0][0],
        3,
        "Aggregate functions work after an exception has been thrown in finalize"
    );
}

// helper function to calculate a percentile from an array. Will modify the
// array in-place.
function percentile(arr, p) {
    arr.sort();
    const pos = (arr.length - 1) * (p / 100);
    const base = Math.floor(pos);
    const rest = pos - base;
    if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base]);
    } else {
        return arr[base];
    }
};

if (module == require.main) {
    const target_file = process.argv[2];
    const sql_loader = require('./load_sql_lib');
    sql_loader(target_file).then((sql)=>{
        require('test').run({
            'test functions': function(assert, done){
                exports.test(sql, assert, done);
            }
        });
    })
    .catch((e)=>{
        console.error(e);
        assert.fail(e);
    });
}
````

## File: test/test_aggregate_redefinition.js
````javascript
exports.test = function(sql, assert) {
  // Test 1: Create a database, Register single function, close database, repeat 1000 times
  for (var i = 1; i <= 1000; i++) 
  {
    let lastStep = i == 1000;
    let db = new sql.Database();
    try {
      db.create_aggregate("TestFunction"+i, {step: (state, value) => i})
    } catch(e) {
      assert.ok(
        false,
        "Test 1: Recreate database "+i+"th times and register aggregate"
        +" function failed with exception:"+e
      );
      db.close();
      break;
    }
    var result = db.exec("SELECT TestFunction"+i+"(1)");
    var result_str = result[0]["values"][0][0];
    if(result_str != i || lastStep)
    {
      assert.equal(
        result_str,
        i,
        "Test 1: Recreate database "+i+"th times and register aggregate function"
      );
      db.close();
      break;
    }
    db.close();
  }

  // Test 2: Create a database, Register same function  1000 times, close database
  {
    let db = new sql.Database();
    for (var i = 1; i <= 1000; i++) 
    {
      let lastStep = i == 1000;
      try {
        db.create_aggregate("TestFunction", {step: (state, value) => i})
      } catch(e) {
        assert.ok(
          false,
          "Test 2: Reregister aggregate function "+i+"th times failed with"
          +" exception:"+e
        );
        break;
      }
      var result = db.exec("SELECT TestFunction(1)");
      var result_str = result[0]["values"][0][0];
      if(result_str != i || lastStep)
      {
        assert.equal(
          result_str,
          i,
          "Test 2: Reregister function "+i+"th times"
        );
        break;
      }
    }
    db.close();
  }
};


if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test creating multiple functions': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_big_int.js
````javascript
exports.test = function(sql, assert){
  // Create a database
  var db = new sql.Database();

  // Create table, insert data
  sqlstr = "CREATE TABLE IF NOT EXISTS Test_BigInt (someNumber BIGINT NOT NULL);" +
  "INSERT INTO Test_BigInt (someNumber) VALUES (1628675501000);";
  db.exec(sqlstr);

  var config = {useBigInt: true};

  var stmt = db.prepare("SELECT * FROM Test_BigInt;");
  stmt.step();

  assert.strictEqual(typeof stmt.get()[0], 'number', "Reading number value");
  assert.strictEqual(typeof stmt.get(null, config)[0], 'bigint', "Reading bigint value");

  db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test big int': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_blob.js
````javascript
exports.test = function(SQL, assert){
	var db = new SQL.Database();
	db.exec("CREATE TABLE test (data); INSERT INTO test VALUES (x'6162ff'),(x'00')"); // Insert binary data. This is invalid UTF8 on purpose

	var stmt = db.prepare("INSERT INTO test VALUES (?)");
	var bigArray = new Uint8Array(1e6);
	bigArray[500] = 0x42
	stmt.run([ bigArray ]);

	var stmt = db.prepare("SELECT * FROM test ORDER BY length(data) DESC");

	stmt.step();
	var array = stmt.get()[0];
	assert.equal(array.length, bigArray.length, "BLOB read from the database should be the same size as the one that was inserted");
	for (var i=0; i<array.length; i++) {
		// Avoid doing 1e6 assert, to not pollute the console
		if (array[i]!==bigArray[i])
			assert.fail(array[i], bigArray[i] , "The blob stored in the database should be exactly the same as the one that was inserted");
	}

	stmt.step();
	var res = stmt.get();
	assert.deepEqual(res, [new Uint8Array([0x61, 0x62, 0xff])], "Reading BLOB");

	stmt.step();
	var res = stmt.get();
	assert.deepEqual(res, [new Uint8Array([0x00])], "Reading BLOB with a null byte");

	assert.strictEqual(stmt.step(), false, "stmt.step() should return false after all values were read");
	db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
	const sql_loader = require('./load_sql_lib');
	sql_loader(target_file).then((sql)=>{
		require('test').run({
			'test blob': function(assert){
				exports.test(sql, assert);
			}
		});
	})
	.catch((e)=>{
		console.error(e);
	});
}
````

## File: test/test_database.js
````javascript
exports.test = function(SQL, assert, done) {
  assert.notEqual(SQL.Database, undefined, "Should export a Database object");

  // Create a database
  var db = new SQL.Database();
  assert.equal(Object.getPrototypeOf(db), SQL.Database.prototype, "Creating a database object");

  // Execute some sql
  sqlstr = "CREATE TABLE test (a, b, c, d, e);";
  var res = db.exec(sqlstr);
  assert.deepEqual(res, [], "Creating a table should not return anything");

  db.run("INSERT INTO test VALUES (NULL, 42, 4.2, 'fourty two', x'42');");

  //Retrieving values
  sqlstr = "SELECT * FROM test;";
  var res = db.exec(sqlstr);
  var expectedResult =  [{
    columns : ['a','b','c','d','e'],
    values : [
      [null,42,4.2,'fourty two', new Uint8Array([0x42])]
    ]
  }];
  assert.deepEqual(res, expectedResult, "db.exec() return value");


  // Export the database to an Uint8Array containing the SQLite database file
  var binaryArray = db.export();
  assert.strictEqual(String.fromCharCode.apply(null,binaryArray.subarray(0,6)), 'SQLite',
                     "The first 6 bytes of an SQLite database should form the word 'SQLite'");
  db.close();

  var db2 = new SQL.Database(binaryArray);
  result = db2.exec("SELECT * FROM test");
  assert.deepEqual(result, expectedResult,
                   "Exporting and re-importing the database should lead to the same database");
  db2.close();

  db = new SQL.Database();
  assert.deepEqual(db.exec("SELECT * FROM sqlite_master"),
                   [],
                   "Newly created databases should be empty");
  // Testing db.each
  db.run("CREATE TABLE test (a,b); INSERT INTO test VALUES (1,'a'),(2,'b')");
  var count = 0, finished = false;
  db.each("SELECT * FROM test ORDER BY a", function callback (row){
    count++;
    if (count === 1) assert.deepEqual(row, {a:1,b:'a'}, 'db.each returns the correct 1st row');
    if (count === 2) assert.deepEqual(row, {a:2,b:'b'}, 'db.each returns the correct 2nd row');
  }, function last () {
    finished = true;
    assert.strictEqual(count, 2, "db.each returns the right number of rows");
    // No need to wait for this timeout anymore
    // In fact, if we do keep waiting for this, we'll get an error when it fires because we've already called done
    clearTimeout(testTimeoutId);
    done();
  });
  var testTimeoutId = setTimeout(function timeout(){
    if (!finished) {
      assert.fail("db.each should call its last callback after having returned the rows");
      done();
    }
  }, 3000);
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test database': function(assert, done){
        exports.test(sql, assert, done);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_errors.js
````javascript
exports.test = function(sql, assert) {

  assert.throws(function(){
    var db = new sql.Database([1,2,3]);
    db.exec("SELECT * FROM sqlite_master");
  },
                /not a database/,
                "Querying an invalid database should throw an error");

  // Create a database
  var db = new sql.Database();

  // Execute some sql
  var res = db.exec("CREATE TABLE test (a INTEGER PRIMARY KEY, b, c, d, e);");

  assert.throws(function(){
    db.exec("I ain't be no valid sql ...");
  },
                /syntax error/,
                "Executing invalid SQL should throw an error");

  assert.throws(function(){
    db.run("INSERT INTO test (a) VALUES (1)");
    db.run("INSERT INTO test (a) VALUES (1)");
  },
                /UNIQUE constraint failed/,
                "Inserting two rows with the same primary key should fail");

  var stmt = db.prepare("INSERT INTO test (a) VALUES (?)");


  assert.throws(function(){
    stmt.bind([1,2,3]);
  },
                /out of range/,
                "Binding too many parameters should throw an exception");

  assert.throws(function(){
    db.run("CREATE TABLE test (this,wont,work)");
  },
                /table .+ already exists/,
                "Trying to create a table with a name that is already used should throw an error");

  stmt.run([2]);
  assert.deepEqual(db.exec("SELECT a,b FROM test WHERE a=2"),
                   [{columns:['a', 'b'],values:[[2, null]]}],
                   "Previous errors should not have spoiled the statement");

  db.close();

  assert.throws(function(){
    stmt.run([3]);
  }, "Statements shouldn't be able to execute after the database is closed");
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test errors': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
  });
}
````

## File: test/test_extension_functions.js
````javascript
exports.test = function(sql, assert) {
  var db = new sql.Database();
  var res = db.exec("CREATE TABLE test (str_data, data);");

  db.run("INSERT INTO test VALUES ('Hello World!', 1);");
  db.run("INSERT INTO test VALUES ('', 2);");
  db.run("INSERT INTO test VALUES ('', 2);");
  db.run("INSERT INTO test VALUES ('', 4);");
  db.run("INSERT INTO test VALUES ('', 5);");
  db.run("INSERT INTO test VALUES ('', 6);");
  db.run("INSERT INTO test VALUES ('', 7);");
  db.run("INSERT INTO test VALUES ('', 8);");
  db.run("INSERT INTO test VALUES ('', 9);");

  var res = db.exec("SELECT mode(data) FROM test;");
  var expectedResult =  [{
    columns : ['mode(data)'],
    values : [
      [2]
    ]
  }];
  assert.deepEqual(res, expectedResult, "mode() function works");

  var res = db.exec("SELECT lower_quartile(data) FROM test;");
  var expectedResult =  [{
    columns : ['lower_quartile(data)'],
    values : [
      [2]
    ]
  }];
  assert.deepEqual(res, expectedResult, "upper_quartile() function works");

  var res = db.exec("SELECT upper_quartile(data) FROM test;");
  var expectedResult =  [{
    columns : ['upper_quartile(data)'],
    values : [
      [7]
    ]
  }];
  assert.deepEqual(res, expectedResult, "upper_quartile() function works");

  var res = db.exec("SELECT variance(data) FROM test;");
  assert.equal(res[0]['values'][0][0].toFixed(2), 8.11, "variance() function works");

  var res = db.exec("SELECT stdev(data) FROM test;");
  assert.equal(res[0]['values'][0][0].toFixed(2), 2.85, "stdev() function works");

  var res = db.exec("SELECT acos(data) FROM test;");
  assert.equal(res[0]['values'][0][0].toFixed(2), 0, "acos() function works");

  var res = db.exec("SELECT asin(data) FROM test;");
  assert.equal(res[0]['values'][0][0].toFixed(2), 1.57, "asin() function works");

  var res = db.exec("SELECT atan2(data, 1) FROM test;");
  assert.equal(res[0]['values'][0][0].toFixed(2), 0.79, "atan2() function works");

  var res = db.exec("SELECT difference(str_data, 'ello World!') FROM test;");
  assert.equal(res[0]['values'][0][0], 3, "difference() function works");

  var res = db.exec("SELECT ceil(4.1)");
  assert.equal(res[0]['values'][0][0], 5, "ceil() function works");

  var res = db.exec("SELECT floor(4.1)");
  assert.equal(res[0]['values'][0][0], 4, "floor() function works");

  var res = db.exec("SELECT pi()");
  assert.equal(res[0]['values'][0][0].toFixed(5), 3.14159, "pi() function works");

  var res = db.exec("SELECT reverse(str_data) FROM test;");
  assert.equal(res[0]['values'][0][0], "!dlroW olleH", "reverse() function works");

  db.export()
  var res = db.exec("SELECT floor(4.1)");
  assert.equal(res[0]['values'][0][0], 4, "extension function works after export()");
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test extension functions': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_functions_recreate.js
````javascript
exports.test = function(sql, assert) {
  // Test 1: Create a database, Register single function, close database, repeat 1000 times
  
  for (var i = 1; i <= 1000; i++) 
  {
    let lastStep=(i==1000);
    let db = new sql.Database();
    function add() {return i;}
    try
    {
      db.create_function("TestFunction"+i, add)
    }catch(e)
    {
      assert.ok(false,"Test 1: Recreate database "+i+"th times and register function failed with exception:"+e);
      db.close();
      break;
    }
    var result = db.exec("SELECT TestFunction"+i+"()");
    var result_str = result[0]["values"][0][0];
    if((result_str!=i)||lastStep)
    {
      assert.equal(result_str, i, "Test 1: Recreate database "+i+"th times and register function");
      db.close();
      break;
    }
    db.close();
  }
  
  // Test 2: Create a database, Register same function  1000 times, close database
  {
    let db = new sql.Database();
    for (var i = 1; i <= 1000; i++) 
    {
      let lastStep=(i==1000);
      function add() {return i;}
      try
      {
        db.create_function("TestFunction", add);
      }catch(e)
      {
        assert.ok(false,"Test 2: Reregister function "+i+"th times failed with exception:"+e);
        break;
      }
      var result = db.exec("SELECT TestFunction()");
      var result_str = result[0]["values"][0][0];
      if((result_str!=i)||lastStep)
      {
        assert.equal(result_str, i, "Test 2: Reregister function "+i+"th times");
        break;
      }
    }
    db.close();
  }
};


if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test creating multiple functions': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_functions.js
````javascript
exports.test = function(SQL, assert){
  var db = new SQL.Database();
  db.exec("CREATE TABLE test (data); INSERT INTO test VALUES ('Hello World');");

  // Simple function, appends extra text on a string.
  function test_function(string_arg) {
    return "Function called with: " + string_arg;
  };

  // Register with SQLite.
  db.create_function("TestFunction", test_function);

  // Use in a query, check expected result.
  var result = db.exec("SELECT TestFunction(data) FROM test;");
  var result_str = result[0]["values"][0][0];
  assert.equal(result_str, "Function called with: Hello World", "Named functions can be registered");

  // 2 arg function, adds two ints together.
  db.exec("CREATE TABLE test2 (int1, int2); INSERT INTO test2 VALUES (456, 789);");

  function test_add(int1, int2) {
    return int1 + int2;
  };

  db.create_function("TestAdd", test_add);
  result = db.exec("SELECT TestAdd(int1, int2) FROM test2;");
  result_int = result[0]["values"][0][0];
  assert.equal(result_int, 1245, "Multiple argument functions can be registered");

  // Binary data function, tests which byte in a column is set to 0
  db.exec("CREATE TABLE test3 (data); INSERT INTO test3 VALUES (x'6100ff'), (x'ffffff00ffff');");

  function test_zero_byte_index(data) {
    // Data is a Uint8Array
    for (var i=0; i<data.length; i++) {
      if (data[i] === 0) {
        return i;
      }
    }
    return -1;
  };

  db.create_function("TestZeroByteIndex", test_zero_byte_index);
  result = db.exec("SELECT TestZeroByteIndex(data) FROM test3;");
  result_int0 = result[0]["values"][0][0];
  result_int1 = result[0]["values"][1][0];
  assert.equal(result_int0, 1, "Binary data works inside functions");
  assert.equal(result_int1, 3, "Binary data works inside functions");

  db.create_function("addOne", function (x) { return x + 1;} );
  result = db.exec("SELECT addOne(1);");
  assert.equal(result[0]["values"][0][0], 2, "Accepts anonymous functions");
 
  // Test api support of different sqlite types and special values
  db.create_function("identityFunction", function (x) { return x;} );
  var verbose=false;
  function canHandle(testData)
  {
    let result={};
    let ok=true;
    let sql_value=("sql_value" in testData)?testData.sql_value:(""+testData.value);
    function simpleEqual(a, b) {return a===b;}
    let value_equal=("equal" in testData)?testData.equal:simpleEqual;
    db.create_function("CheckTestValue", function (x) {return value_equal(testData.value,x)?12345:5678;});
    db.create_function("GetTestValue", function () {return testData.value; });  
    // Check sqlite to js value conversion
    result = db.exec("SELECT CheckTestValue("+sql_value+")==12345"); 
    if(result[0]["values"][0][0]!=1)
    {
      if(verbose)
        assert.ok(false, "Can accept "+testData.info);
      ok=false;
    }
    // Check js to sqlite value conversion
    result = db.exec("SELECT GetTestValue()");
    if(!value_equal(result[0]["values"][0][0],testData.value))
    {
      if(verbose)
        assert.ok(false, "Can return "+testData.info);
      ok=false;
    } 
    // Check sqlite to sqlite value conversion (identityFunction(x)==x)
    if(sql_value!=="null")
    {
      result = db.exec("SELECT identityFunction("+sql_value+")="+sql_value); 
    }else
    {
      result = db.exec("SELECT identityFunction("+sql_value+") is null"); 
    }
    if(result[0]["values"][0][0]!=1)
    {
      if(verbose)
        assert.ok(false, "Can pass "+testData.info);
      ok=false;
    } 
    return ok;
  }
  
  function numberEqual(a, b) {
      return (+a)===(+b);
  }
  
  function blobEqual(a, b) {
      if(((typeof a)!="object")||(!a)||((typeof b)!="object")||(!b)) return false;
      if (a.byteLength !== b.byteLength) return false;
      return a.every((val, i) => val === b[i]);
  }
  
  [
    {info:"null",value:null}, // sqlite special value null
    {info:"false",value:false,sql_value:"0",equal:numberEqual}, // sqlite special value (==false)
    {info:"true", value:true,sql_value:"1",equal:numberEqual}, // sqlite special value (==true)
    {info:"integer 0",value:0}, // sqlite special value (==false)
    {info:"integer 1",value:1}, // sqlite special value (==true)
    {info:"integer -1",value:-1},
    {info:"long integer 5e+9",value:5000000000}, // int64
    {info:"long integer -5e+9",value:-5000000000}, // negative int64
    {info:"double",value:0.5},
    {info:"string",value:"Test",sql_value:"'Test'"},
    {info:"empty string",value:"",sql_value:"''"},
    {info:"unicode string",value:"\uC7B8",sql_value:"CAST(x'EC9EB8' AS TEXT)"}, // unicode-hex: C7B8 utf8-hex: EC9EB8
    {info:"blob",value:new Uint8Array([0xC7,0xB8]),sql_value:"x'C7B8'",equal:blobEqual},
    {info:"empty blob",value:new Uint8Array([]),sql_value:"x''",equal:blobEqual}
  ].forEach(function(testData)
  {
    assert.ok(canHandle(testData),"Can handle "+testData.info);
  });
   
  db.create_function("throwFunction", function () { throw "internal exception"; return 5;} );    
  assert.throws(function(){db.exec("SELECT throwFunction()");},/internal exception/, "Can handle internal exceptions");
  
  db.create_function("customeObjectFunction", function () { return {test:123};} );    
  assert.throws(function(){db.exec("SELECT customeObjectFunction()");},/Wrong API use/, "Reports wrong API use");

  db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test functions': function(assert, done){
        exports.test(sql, assert, done);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_issue128.js
````javascript
exports.test = function(sql, assert) {
  // Create a database
  var db = new sql.Database();

  db.run("CREATE TABLE test (data TEXT);");

  db.exec("SELECT * FROM test;");
  assert.deepEqual(db.getRowsModified(), 0, "getRowsModified returns 0 at first");
  
  db.exec("INSERT INTO test VALUES ('Hello1');");
  db.exec("INSERT INTO test VALUES ('Hello');");
  db.exec("INSERT INTO test VALUES ('Hello');");
  db.exec("INSERT INTO test VALUES ('World4');");
  assert.deepEqual(db.getRowsModified(), 1, "getRowsModified works for inserts");

  db.exec("UPDATE test SET data = 'World4' where data = 'Hello';");
  assert.deepEqual(db.getRowsModified(), 2, "getRowsModified works for updates");

  db.exec("DELETE FROM test;");
  assert.deepEqual(db.getRowsModified(), 4, "getRowsModified works for deletes");

  db.exec("SELECT * FROM test;");
  assert.deepEqual(db.getRowsModified(), 4, "getRowsModified unmodified by queries");

};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test issue 128': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_issue325.js
````javascript
exports.test = function(sql, assert){
    "use strict";
    // Create a database
    var db = new sql.Database();

    // binding a large number 
    assert.strictEqual(
        db.exec("SELECT ?", [1.7976931348623157e+308])[0].values[0][0],
        1.7976931348623157e+308,
        "binding 1.7976931348623159e+308 as a parameter"
    );

    // inline result value test
    assert.strictEqual(
        db.exec("SELECT 1.7976931348623157e+308")[0].values[0][0],
        1.7976931348623157e+308,
        "SELECT 1.7976931348623157e+308 is 1.7976931348623157e+308"
    );

    // Close the database and all associated statements
    db.close();
};

if (module == require.main) {
  const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test issue325': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_issue55.js
````javascript
exports.test = function(SQL, assert) {
  var fs = require('fs');
  var path = require('path');

  var filebuffer = fs.readFileSync(path.join(__dirname, 'issue55.db'));

  //Works
  var db = new SQL.Database(filebuffer);

  var origCount = db.prepare("SELECT COUNT(*) AS count FROM networklocation").getAsObject({}).count;

  db.run("INSERT INTO networklocation (x, y, network_id, floor_id) VALUES (?, ?, ?, ?)", [123, 123, 1, 1]);

  var count = db.prepare("SELECT COUNT(*) AS count FROM networklocation").getAsObject({}).count;

  assert.equal(count, origCount + 1, "The row has been inserted");
  var dbCopy = new SQL.Database(db.export());
  var newCount = dbCopy.prepare("SELECT COUNT(*) AS count FROM networklocation").getAsObject({}).count;
  assert.equal(newCount, count, "export and reimport copies all the data");
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test issue 55': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_issue73.js
````javascript
exports.test = function(sql, assert) {
    // Create a database
    var db = new sql.Database();

    // Execute some sql
    sqlstr = "CREATE TABLE COMPANY("+
"                     ID INT PRIMARY KEY     NOT NULL,"+
"                     NAME           TEXT    NOT NULL,"+
"                     AGE            INT     NOT NULL,"+
"                     ADDRESS        CHAR(50),"+
"                     SALARY         REAL"+
"                    );"+
"                  CREATE TABLE AUDIT("+
"                      EMP_ID INT NOT NULL,"+
"                      ENTRY_DATE TEXT NOT NULL"+
"                  );"+
"                  CREATE TRIGGER audit_log AFTER INSERT"+
"                  ON COMPANY"+
"                  BEGIN"+
"                     INSERT INTO AUDIT"+
"                        (EMP_ID, ENTRY_DATE)"+
"                      VALUES"+
"                        (new.ID, '2014-11-10');"+
"                  END;"+
"                  INSERT INTO COMPANY VALUES (73,'A',8,'',1200);"+
"                  SELECT * FROM AUDIT;"+
"                  INSERT INTO COMPANY VALUES (42,'B',8,'',1600);"+
"                  SELECT EMP_ID FROM AUDIT ORDER BY EMP_ID";
    var res = db.exec(sqlstr);
    var expectedResult =  [
    {
        columns : ['EMP_ID','ENTRY_DATE'],
        values : [
            [73, '2014-11-10']
         ]
    },
    {
        columns : ['EMP_ID'],
        values : [
            [42],[73]
         ]
    }
    ];
    assert.deepEqual(res, expectedResult,
            "db.exec with a statement that contains a ';'");
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test issue 73': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_issue76.js
````javascript
exports.test = function(sql, assert) {
	// Create a database
	var db = new sql.Database();
	// Ultra-simple query
	var stmt = db.prepare("VALUES (?)");
	// Bind null to the parameter and get the result
	assert.deepEqual(stmt.get([null]), [null],
			"binding a null value to a statement parameter");
	db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test issue 76': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_json1.js
````javascript
exports.test = function(sql, assert) {
  var db = new sql.Database();
  // tests taken from https://www.sqlite.org/json1.html#jmini
  [
    // The json() function
    `json(' { "this" : "is", "a": [ "test" ] } ') = '{"this":"is","a":["test"]}'`,

    // The json_array_length() function
    `json_array(1,2,'3',4) = '[1,2,"3",4]'`,
    `json_array('[1,2]') = '["[1,2]"]'`,
    `json_array(json_array(1,2)) = '[[1,2]]'`,
    `json_array(1,null,'3','[4,5]','{"six":7.7}') = '[1,null,"3","[4,5]","{\\"six\\":7.7}"]'`,
    `json_array(1,null,'3',json('[4,5]'),json('{"six":7.7}')) = '[1,null,"3",[4,5],{"six":7.7}]'`,
    `json_array_length('[1,2,3,4]') = 4`,
    `json_array_length('[1,2,3,4]', '$') = 4`,
    `json_array_length('[1,2,3,4]', '$[2]') = 0`,
    `json_array_length('{"one":[1,2,3]}') = 0`,
    `json_array_length('{"one":[1,2,3]}', '$.one') = 3`,
    `json_array_length('{"one":[1,2,3]}', '$.two') = null`,

    // The json_extract() function
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$') = '{"a":2,"c":[4,5,{"f":7}]}'`,
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.c') = '[4,5,{"f":7}]'`,
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.c[2]') = '{"f":7}'`,
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.c[2].f') = 7`,
    `json_extract('{"a":2,"c":[4,5],"f":7}','$.c','$.a') = '[[4,5],2]'`,
    `json_extract('{"a":2,"c":[4,5],"f":7}','$.c[#-1]') = 5`,
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.x') = null`,
    `json_extract('{"a":2,"c":[4,5,{"f":7}]}', '$.x', '$.a') = '[null,2]'`,

    // The json_insert(), json_replace, and json_set() functions
    `json_insert('[1,2,3,4]','$[#]',99) = '[1,2,3,4,99]'`,
    `json_insert('[1,[2,3],4]','$[1][#]',99) = '[1,[2,3,99],4]'`,
    `json_insert('{"a":2,"c":4}', '$.a', 99) = '{"a":2,"c":4}'`,
    `json_insert('{"a":2,"c":4}', '$.e', 99) = '{"a":2,"c":4,"e":99}'`,
    `json_replace('{"a":2,"c":4}', '$.a', 99) = '{"a":99,"c":4}'`,
    `json_replace('{"a":2,"c":4}', '$.e', 99) = '{"a":2,"c":4}'`,
    `json_set('{"a":2,"c":4}', '$.a', 99) = '{"a":99,"c":4}'`,
    `json_set('{"a":2,"c":4}', '$.e', 99) = '{"a":2,"c":4,"e":99}'`,
    `json_set('{"a":2,"c":4}', '$.c', '[97,96]') = '{"a":2,"c":"[97,96]"}'`,
    `json_set('{"a":2,"c":4}', '$.c', json('[97,96]')) = '{"a":2,"c":[97,96]}'`,
    `json_set('{"a":2,"c":4}', '$.c', json_array(97,96)) = '{"a":2,"c":[97,96]}'`,

    // The json_object() function
    `json_object('a',2,'c',4) = '{"a":2,"c":4}'`,
    `json_object('a',2,'c','{e:5}') = '{"a":2,"c":"{e:5}"}'`,
    `json_object('a',2,'c',json_object('e',5)) = '{"a":2,"c":{"e":5}}'`,

    // The json_patch() function
    `json_patch('{"a":1,"b":2}','{"c":3,"d":4}') = '{"a":1,"b":2,"c":3,"d":4}'`,
    `json_patch('{"a":[1,2],"b":2}','{"a":9}') = '{"a":9,"b":2}'`,
    `json_patch('{"a":[1,2],"b":2}','{"a":null}') = '{"b":2}'`,
    `json_patch('{"a":1,"b":2}','{"a":9,"b":null,"c":8}') = '{"a":9,"c":8}'`,
    `json_patch('{"a":{"x":1,"y":2},"b":3}','{"a":{"y":9},"c":8}') = '{"a":{"x":1,"y":9},"b":3,"c":8}'`,

    // The json_remove() function
    `json_remove('[0,1,2,3,4]','$[2]') = '[0,1,3,4]'`,
    `json_remove('[0,1,2,3,4]','$[2]','$[0]') = '[1,3,4]'`,
    `json_remove('[0,1,2,3,4]','$[0]','$[2]') = '[1,2,4]'`,
    `json_remove('[0,1,2,3,4]','$[#-1]','$[0]') = '[1,2,3]'`,
    `json_remove('{"x":25,"y":42}') = '{"x":25,"y":42}'`,
    `json_remove('{"x":25,"y":42}','$.z') = '{"x":25,"y":42}'`,
    `json_remove('{"x":25,"y":42}','$.y') = '{"x":25}'`,
    `json_remove('{"x":25,"y":42}','$') = null`,

    // The json_type() function
    `json_type('{"a":[2,3.5,true,false,null,"x"]}') = 'object'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$') = 'object'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a') = 'array'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[0]') = 'integer'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[1]') = 'real'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[2]') = 'true'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[3]') = 'false'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[4]') = 'null'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[5]') = 'text'`,
    `json_type('{"a":[2,3.5,true,false,null,"x"]}','$.a[6]') = null`,

    // The json_valid() function
    `json_valid('{"x":35}') = 1`,
    `json_valid('{"x":35') = 0`,

    // The json_quote() function
    `json_quote(3.14159) = 3.14159`,
    `json_quote('verdant') = "verdant"`
  ].forEach(function (sql) {
    assert.equal(
        String(db.exec(
            "SELECT " + sql.split(" = ")[0] + " AS val;"
        )[0].values[0][0]),
        String(sql.split(" = ")[1].replace(/'/g, "")),
        sql
    );
  });
};

if (module == require.main) {
  const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test extension functions': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_long_sql_statement.js
````javascript
// test for https://github.com/sql-js/sql.js/issues/561
exports.test = function (sql, assert) {
    // Create a database
    var db = new sql.Database();
    var len = 1000000;
    var many_a = "";
    for (var a = 'a'; many_a.length < len; a += a)
        if ((len / a.length) & 1)
            many_a += a;

    var res = db.exec("select length('" + many_a + "') as len");
    var expectedResult = [
        {
            columns: ['len'],
            values: [
                [len]
            ]
        }
    ];
    assert.deepEqual(res, expectedResult, "length of long string");
};

if (module == require.main) {
    const target_file = process.argv[2];
    const sql_loader = require('./load_sql_lib');
    sql_loader(target_file).then((sql) => {
        require('test').run({
            'test long sql string (issue 561)': function (assert) {
                exports.test(sql, assert);
            }
        });
    }).catch((e) => {
        console.error(e);
        assert.fail(e);
    });
}
````

## File: test/test_modularization.js
````javascript
exports.test = function (SQL, assert, done, sqlLibFilename) {
    if (!sqlLibFilename){
        // Whew - this is ugly and fragile and makes way too many assumptions about how these tests are run from all.js
        // However, this is the quickest way to make sure that we are testing the lib that is requested
        const targetFile = process.argv[2];
        sqlLibFilename = targetFile ? "../dist/sql-"+targetFile+".js" : "../dist/sql-wasm.js";
    }

    var initSqlJsLib1 = require(sqlLibFilename);
    initSqlJsLib1().then((sqlModule1) => {
        var initSqlJsLib2 = require(sqlLibFilename);
        initSqlJsLib2().then((sqlModule2) => {
            assert.equal(SQL, sqlModule1, "Initializing the module multiple times only creates it once");
            assert.equal(sqlModule1, sqlModule2, "Initializing the module multiple times only creates it once");
            var db1 = new sqlModule1.Database();
            assert.equal(Object.getPrototypeOf(db1), SQL.Database.prototype, "sqlModule1 has a Database object that has the same prototype as the originally loaded SQL module");
            assert.equal(Object.getPrototypeOf(db1), sqlModule2.Database.prototype, "sqlModule1 has a Database object that has the same prototype as the sqlModule2");
            
            
            var db2 = new sqlModule2.Database();
            assert.equal(Object.getPrototypeOf(db2), sqlModule1.Database.prototype, "sqlModule2 has a Database object that has the same prototype as the sqlModule1");

            done();
        });
    });
};

if (module == require.main) {
    const targetFile = process.argv[2];
    const loadSqlLib = require('./load_sql_lib');
    loadSqlLib(targetFile).then((sql) => {
        require('test').run({
            'test modularization': function (assert, done) {
                // TODO: Dry this up so that this code isn't duped between here and load_sql_lib.js
                var sqlJsLibFilename = targetFile ? "../dist/sql-"+targetFile+".js" : "../dist/sql-wasm.js";
                exports.test(sql, assert, done, sqlJsLibFilename);
            }
        })
    })
    .catch((e) => {
        console.error(e);
    });
}
````

## File: test/test_node_file.js
````javascript
exports.test = function(SQL, assert) {
	//Node filesystem module - You know that.
	var fs = require('fs');

	//Ditto, path module
	var path = require('path');

	var filebuffer = fs.readFileSync(path.join(__dirname, 'test.sqlite'));

	//Works
	var db = new SQL.Database(filebuffer);

	//[{"columns":["id","content"],"values":[["0","hello"],["1","world"]]}]
	var res = db.exec("SELECT * FROM test WHERE id = 0");
	assert.deepEqual(res,
									[{"columns":["id","content"],"values":[[0,"hello"]]}],
									"One should be able to read the contents of an SQLite database file read from disk");
	db.close();
}

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test node file': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_statement_iterator.js
````javascript
exports.test = function (SQL, assert) {
  // Create a database
  var db = new SQL.Database();

  // Multiline SQL
  var sqlstr = "CREATE TABLE test (x text, y integer);\n"
    + "INSERT INTO test\n"
    + "VALUES ('hello', 42), ('goodbye', 17);\n"
    + "SELECT * FROM test;\n"
    + " -- nothing here";
  var sqlstart = "CREATE TABLE test (x text, y integer);"

  // Manual iteration
  // Get an iterator
  var it = db.iterateStatements(sqlstr);

  // Get first item
  var x = it.next();
  assert.equal(x.done, false, "Valid iterator object produced");
  assert.equal(x.value.getSQL(), sqlstart, "Statement is for first query only");
  assert.equal(it.getRemainingSQL(), sqlstr.slice(sqlstart.length), "Remaining sql retrievable");

  // execute the first query
  x.value.step();

  // get and execute the second query
  x = it.next();
  assert.equal(x.done, false, "Second query found");
  x.value.step();

  // get and execute the third query
  x = it.next();
  assert.equal(x.done, false, "Third query found");
  x.value.step();
  assert.deepEqual(x.value.getColumnNames(), ['x', 'y'], "Third query is SELECT");

  // check for additional queries
  x = it.next();
  assert.deepEqual(x, { done: true }, "Done reported after last query");

  // additional iteration does nothing
  x = it.next();
  assert.deepEqual(x, { done: true }, "Done reported when iterating past completion");

  db.run("DROP TABLE test;");

  // for...of
  var count = 0;
  for (let statement of db.iterateStatements(sqlstr)) {
    statement.step();
    count = count + 1;
  }
  assert.equal(count, 3, "For loop iterates correctly");

  var badsql = "SELECT 1 as x;garbage in, garbage out";

  // bad sql will stop iteration
  it = db.iterateStatements(badsql);
  x = it.next();
  x.value.step();
  assert.deepEqual(x.value.getAsObject(), { x: 1 }, "SQL before bad statement executes successfully");
  assert.throws(function () { it.next() }, /syntax error/, "Bad SQL stops iteration with exception");
  assert.deepEqual(it.next(), { done: true }, "Done reported when iterating after exception");

  // valid SQL executes, remaining SQL accessible after exception
  it = db.iterateStatements(badsql);
  var remains = '';
  try {
    for (let statement of it) {
      statement.step();
    }
  } catch {
    remains = it.getRemainingSQL();
  }
  assert.equal(remains, "garbage in, garbage out", "Remaining SQL accessible after exception");

  // From the doc example on the iterateStatements method
  const results = [];
  const sql_queries = "SELECT 1 AS x; SELECT '2' as y";
  for (const statement of db.iterateStatements(sql_queries)) {
    const sql = statement.getSQL();
    const result = statement.getAsObject({});
    results.push({ sql, result });
  }
  assert.deepEqual(results, [
    { sql: 'SELECT 1 AS x;', result: { x: 1 } },
    { sql: " SELECT '2' as y", result: { y: '2' } }
  ], "The code example from the documentation works");
};

if (module == require.main) {
  const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql) => {
    require('test').run({
      'test statement iterator': function (assert) {
        exports.test(sql, assert);
      }
    });
  })
    .catch((e) => {
      console.error(e);
      assert.fail(e);
    });
}
````

## File: test/test_statement.js
````javascript
exports.test = function(sql, assert){
    // Create a database
    var db = new sql.Database();

    // Execute some sql
    sqlstr = "CREATE TABLE alphabet (letter, code);";
    db.exec(sqlstr);

    var result = db.exec("SELECT name FROM sqlite_master WHERE type='table'");
    assert.deepEqual(result, [{columns:['name'], values:[['alphabet']]}],
                                    "Table properly created");

    // Prepare a statement to insert values in tha database
    var stmt = db.prepare("INSERT INTO alphabet (letter,code) VALUES (?,?)");
    // Execute the statement several times
    stmt.run(['a',1]);
    stmt.run(['b',2.2]);
    stmt.run(['c']); // The second parameter will be bound to NULL

    // Free the statement
    stmt.free();

    result = db.exec("SELECT * FROM alphabet");
    assert.deepEqual(result,
                     [{columns:['letter', 'code'], values:[['a',1],['b',2.2],['c',null]]}],
                            "Statement.run() should have added data to the database");

    db.run("CREATE TABLE data (nbr, str, no_value); INSERT INTO data VALUES (5, '粵語😄', NULL);");
    stmt = db.prepare("SELECT * FROM data");
    stmt.step(); // Run the statement
    assert.deepEqual(stmt.getColumnNames(), ['nbr','str','no_value'], 'Statement.GetColumnNames()');
    var res = stmt.getAsObject();
    assert.strictEqual(res.nbr, 5, 'Read number');
    assert.strictEqual(res.str, '粵語😄', "Read string");
    assert.strictEqual(res.no_value, null, "Read null");
    assert.deepEqual(res, {nbr:5, str:'粵語😄', no_value:null}, "Statement.getAsObject()");
    stmt.free();

    // getColumnNames() should work even if query returns no data 
    stmt = db.prepare("SELECT * FROM data WHERE nbr = -1");
    assert.deepEqual(stmt.getColumnNames(), ['nbr','str','no_value'], 'Statement.GetColumnNames()');
    stmt.free();

    stmt = db.prepare("SELECT str FROM data WHERE str=?");
    assert.deepEqual(stmt.getAsObject(['粵語😄']), {'str':'粵語😄'}, "UTF8 support in prepared statements");

    // Prepare an sql statement
    stmt = db.prepare("SELECT * FROM alphabet WHERE code BETWEEN :start AND :end ORDER BY code");
    // Bind values to the parameters
    stmt.bind([0, 256]);
    // Execute the statement
    stmt.step();
    // Get one row of result
    result = stmt.get();
    assert.deepEqual(result, ['a',1], "Binding named parameters by their position");

    // Fetch the next row of result
    result = stmt.step();
    assert.equal(result, true);
    result = stmt.get();
    assert.deepEqual(result, ['b',2.2], "Fetching the next row of result");

    // Reset and reuse at once
    result = stmt.get([0, 1]);
    assert.deepEqual(result, ['a',1], "Reset and reuse at once");

    // Pass objects to get() and bind() to use named parameters
    result = stmt.get({':start':1, ':end':1});
    assert.deepEqual(result, ['a',1], "Binding named parameters");

    // Prepare statement, pass null to bind() and check that it works
    stmt = db.prepare("SELECT 'bind-with-null'");
    result = stmt.bind(null);
    assert.equal(result, true);
    stmt.step();
    result = stmt.get();
    assert.equal(result,"bind-with-null")

    // Close the database and all associated statements
    db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test statement': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_transactions.js
````javascript
exports.test = function(SQL, assert){
  var db = new SQL.Database();
  db.exec("CREATE TABLE test (data); INSERT INTO test VALUES (1);");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (4);")

  // Rollback
  db.exec("ROLLBACK;");

  var res = db.exec("SELECT data FROM test WHERE data = 4;");
  var expectedResult =  [];
  assert.deepEqual(res, expectedResult, "transaction rollbacks work");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (4);")

  // Commit
  db.exec("COMMIT;");

  var res = db.exec("SELECT data FROM test WHERE data = 4;");
  var expectedResult =  [{
    columns : ['data'],
    values : [
      [4]
    ]
  }];
  assert.deepEqual(res, expectedResult, "transaction commits work");

  // Open a transaction
  db.exec("BEGIN TRANSACTION;");

  // Insert a row
  db.exec("INSERT INTO test VALUES (5);")

  // Rollback
  db.exec("ROLLBACK;");

  var res = db.exec("SELECT data FROM test WHERE data IN (4,5);");
  var expectedResult =  [{
    columns : ['data'],
    values : [
      [4]
    ]
  }];
  assert.deepEqual(res, expectedResult, "transaction rollbacks after commits work");

  db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test transactions': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}
````

## File: test/test_update_hook.js
````javascript
exports.test = function(SQL, assert){
  var db = new SQL.Database();

  db.exec(
    "CREATE TABLE consoles (id INTEGER PRIMARY KEY, company TEXT, name TEXT);" +
    "INSERT INTO consoles VALUES (1, 'Sony', 'Playstation');" +
    "INSERT INTO consoles VALUES (2, 'Microsoft', 'Xbox');"
  );

  // {operation: undefined, databaseName: undefined, tableName: undefined, rowId: undefined};
  var updateHookCalls = []

  db.updateHook(function(operation, databaseName, tableName, rowId) {
    updateHookCalls.push({operation, databaseName, tableName, rowId});
  });

  // INSERT
  db.exec("INSERT INTO consoles VALUES (3, 'Sega', 'Saturn');");

  assert.deepEqual(updateHookCalls, [
    {operation: "insert", databaseName: "main", tableName: "consoles", rowId: 3}
  ], "insert a single row");

  // UPDATE
  updateHookCalls = []
  db.exec("UPDATE consoles SET name = 'Playstation 5' WHERE id = 1");

  assert.deepEqual(updateHookCalls, [
    {operation: "update", databaseName: "main", tableName: "consoles", rowId: 1}
  ], "update a single row");

  // UPDATE (multiple rows)
  updateHookCalls = []
  db.exec("UPDATE consoles SET name = name + ' [legacy]' WHERE id IN (2,3)");

  assert.deepEqual(updateHookCalls, [
    {operation: "update", databaseName: "main", tableName: "consoles", rowId: 2},
    {operation: "update", databaseName: "main", tableName: "consoles", rowId: 3},
  ], "update two rows");

  // DELETE
  updateHookCalls = []
  db.exec("DELETE FROM consoles WHERE company = 'Sega'");

  assert.deepEqual(updateHookCalls, [
    {operation: "delete", databaseName: "main", tableName: "consoles", rowId: 3}
  ], "delete a single row");

  // UNREGISTER
  updateHookCalls = []

  db.updateHook(null);

  db.exec("DELETE FROM consoles WHERE company = 'Microsoft'");

  assert.deepEqual(updateHookCalls, [], "unregister the update hook");

  // REGISTER AGAIN
  updateHookCalls = []

  db.updateHook(function(operation, databaseName, tableName, rowId) {
    updateHookCalls.push({operation, databaseName, tableName, rowId});
  });

  // need a where clause, just running "DELETE FROM consoles" would result in
  // a TRUNCATE and not yield any update hook callbacks
  db.exec("DELETE FROM consoles WHERE id > 0");

  assert.deepEqual(updateHookCalls, [
    {operation: 'delete', databaseName: 'main', tableName: 'consoles', rowId: 1}
  ], "register the update hook again");
}
````

## File: test/test_worker.js
````javascript
const { Worker } = require("worker_threads");
const path = require("path");

class SQLWorker {
  constructor(worker) {
    this.worker = worker;
    this.callbacks = new Map();
    this.nextId = 1;

    this.worker.stderr.on('data', (data) => {
      console.log(data);
    });

    this.worker.stdout.on('data', (data) => {
      console.log(data);
    });

    this.worker.on('message', (data) => {
      if (data.error) {
        console.log("Worker error: ", data.error);
        for (const callback of this.callbacks.values()) {
          callback.reject(data.error);
        }
        return;
      }
      const callback = this.callbacks.get(data.id);
      if (callback) {
        this.callbacks.delete(data.id);
        callback.resolve(data);
      } else {
        console.log("Received message from worker but no callback found for id", data);
      }
    });

    this.worker.on('error', (err) => {
      console.log("Worker error", err);
      for (const callback of this.callbacks.values()) {
        callback.reject(err);
      }
      this.callbacks.clear();
    });
  }

  static async fromFile(file) {
    // Create a worker directly from the file
    const worker = new Worker(file);
    return new SQLWorker(worker);
  }

  async postMessage(msg) {
    return new Promise((resolve, reject) => {
      const id = msg.id || this.nextId++;
      const messageWithId = { ...msg, id };
      
      this.callbacks.set(id, { resolve, reject });
      
      // Set a timeout to reject the promise if no response is received
      setTimeout(() => {
        if (this.callbacks.has(id)) {
          this.callbacks.delete(id);
          reject(new Error("Worker response timeout"));
        }
      }, 20000);
      
      // Send the message to the worker
      this.worker.postMessage(messageWithId);
    });
  }
}

exports.test = async function test(SQL, assert) {
  var target = process.argv[2];
  var file = target ? "sql-" + target : "sql-wasm";
  if (file.indexOf('memory-growth') > -1) {
    console.error("Skipping worker test for " + file + ". Not implemented yet");
    return;
  };
  const filename = "../dist/worker." + file + ".js";
  var worker = await SQLWorker.fromFile(path.join(__dirname, filename));
  var data = await worker.postMessage({ id: 1, action: 'open' });
  assert.strictEqual(data.id, 1, "Return the given id in the correct format");
  assert.deepEqual(data, { id: 1, ready: true }, 'Correct data answered to the "open" query');

  data = await worker.postMessage({
    id: 2,
    action: 'exec',
    params: {
        ":num2": 2,
        "@str2": 'b',
        // test_worker.js has issue message-passing Uint8Array
        // but it works fine in real-world browser-usage
        // "$hex2": new Uint8Array([0x00, 0x42]),
        ":num3": 3,
        "@str3": 'c'
        // "$hex3": new Uint8Array([0x00, 0x44])
    },
    sql: "CREATE TABLE test (num, str, hex);" +
      "INSERT INTO test VALUES (1, 'a', x'0042');" +
      "INSERT INTO test VALUES (:num2, @str2, x'0043');" +
      // test passing params split across multi-statement "exec"
      "INSERT INTO test VALUES (:num3, @str3, x'0044');" +
      "SELECT * FROM test;"
  });
  assert.strictEqual(data.id, 2, "Correct id");
  // debug error
  assert.strictEqual(data.error, undefined, data.error);
  var results = data.results;
  assert.ok(Array.isArray(results), 'Correct result type');
  assert.strictEqual(results.length, 1, 'Expected exactly 1 table');
  var table = results[0];
  assert.strictEqual(typeof table, 'object', 'Type of the returned table');
  assert.deepEqual(table.columns, ['num', 'str', 'hex'], 'Reading column names');
  assert.strictEqual(table.values[0][0], 1, 'Reading number');
  assert.strictEqual(table.values[0][1], 'a', 'Reading string');
  assert.deepEqual(obj2array(table.values[0][2]), [0x00, 0x42], 'Reading BLOB byte');
  assert.strictEqual(table.values[1][0], 2, 'Reading number');
  assert.strictEqual(table.values[1][1], 'b', 'Reading string');
  assert.deepEqual(obj2array(table.values[1][2]), [0x00, 0x43], 'Reading BLOB byte');
  assert.strictEqual(table.values[2][0], 3, 'Reading number');
  assert.strictEqual(table.values[2][1], 'c', 'Reading string');
  assert.deepEqual(obj2array(table.values[2][2]), [0x00, 0x44], 'Reading BLOB byte');

  data = await worker.postMessage({ action: 'getRowsModified' });
  assert.equal(data.rowsModified, 1, 'Number of changed rows')

  data = await worker.postMessage({ action: 'export' });
  var header = "SQLite format 3\0";
  var actual = "";
  for (let i = 0; i < header.length; i++) actual += String.fromCharCode(data.buffer[i]);
  assert.equal(actual, header, 'Data returned is an SQLite database file');

  // test worker properly opens db after closing
  await worker.postMessage({ action: "close" });
  await worker.postMessage({ action: "open" });
  data = await worker.postMessage({ action: "exec", sql: "SELECT 1" });
  assert.deepEqual(data.results, [{"columns":["1"],"values":[[1]]}]);
}

function obj2array(obj) {
  var buffer = []
  for (var p in obj) { buffer[p] = obj[p] }
  return buffer;
}

if (module == require.main) {
  process.on('unhandledRejection', r => console.log(r));

  require('test').run({
    'test worker': function (assert, done) {
      exports.test(null, assert).then(done);
    }
  });
}
````

## File: test/test_workers.html
````html
<pre id="output"></pre>
<p id="instructions">
    Run <code>python -m http.server 2255</code>,
    then open <a href="http://localhost:2255/test/test_workers.html">this file</a>.
</p>
<script>
    for (const dbg of ["-debug", ""]) {
        for (const asm of ["-asm", "-wasm"]) {
            const url = `../dist/worker.sql${asm}${dbg}.js`;
            const start_time = performance.now();
            const worker = new Worker(url);
            worker.onmessage = (e) => {
                output.textContent += `[${url}] [${(performance.now() - start_time).toFixed(2)}ms] ${JSON.stringify(e.data)}\n\n`;
                instructions.style.display = "none";
            }
            worker.onerror = (e) => {
                output.textContent += `[error] [${url}] [${(performance.now() - start_time).toFixed(2)}ms] ${JSON.stringify(e)}\n\n`;
            }
            worker.postMessage({"action": "open", "id": 0});
            worker.postMessage({"action": "close", "id": 0});
        }
    }
</script>
````

## File: .eslintrc.js
````javascript
"use strict";

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "airbnb-base"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    ignorePatterns: [
        "/dist/",
        "/examples/",
        "/documentation/",
        "/node_modules/",
        "/out/",
        "/src/shell-post.js",
        "/src/shell-pre.js",
        "/test/",
        "!/.eslintrc.js"
    ],
    parserOptions: {
        ecmaVersion: 5,
        sourceType: "script"
    },
    rules: {
        // reason - sqlite exposes functions with underscore-naming-convention
        camelcase: "off",
        // reason - They make it easier to add new elements to arrays
        // and parameters to functions, and make commit diffs clearer
        "comma-dangle": "off",
        // reason - string-notation needed to prevent closure-minifier
        // from mangling property-name
        "dot-notation": "off",
        // reason - enforce 4-space indent
        indent: ["error", 4, { SwitchCase: 1 }],
        // reason - enforce 80-column-width limit
        "max-len": ["error", { code: 80 }],
        // reason - src/api.js uses bitwise-operators
        "no-bitwise": "off",
        "no-cond-assign": ["error", "except-parens"],
        "no-param-reassign": "off",
        "no-throw-literal": "off",
        // reason - parserOptions is set to es5 language-syntax
        "no-var": "off",
        // reason - parserOptions is set to es5 language-syntax
        "object-shorthand": "off",
        // reason - parserOptions is set to es5 language-syntax
        "prefer-arrow-callback": "off",
        // reason - parserOptions is set to es5 language-syntax
        "prefer-destructuring": "off",
        // reason - parserOptions is set to es5 language-syntax
        "prefer-spread": "off",
        // reason - parserOptions is set to es5 language-syntax
        "prefer-template": "off",
        // reason - sql.js frequently use sql-query-strings containing
        // single-quotes
        quotes: ["error", "double"],
        // reason - allow top-level "use-strict" in commonjs-modules
        strict: ["error", "safe"],
        "vars-on-top": "off"
    }
};
````

## File: .gitignore
````
node_modules/
*~

# Intermediary files:
cache/
out/
.emsdk-cache/
sqlite-src/
tmp/
c/
emsdk/
sqljs.zip
````

## File: .jsdoc.config.json
````json
{
    "plugins": [
        "plugins/markdown"
    ],
    "source": {
        "include": [
            "src/api.js"
        ]
    },
    "opts": {
        "encoding": "utf8",
        "destination": "./documentation/",
        "readme": "documentation_index.md",
        "template": "./node_modules/clean-jsdoc-theme",
        "theme_opts": {
            "title": "sql.js",
            "meta": [
                "<title>sql.js API documentation</title>",
                "<meta name=\"author\" content=\"Ophir Lojkine\">",
                "<meta name=\"description\" content=\"Documentation for sql.js: an in-memory SQL database for the browser based on SQLite.\">"
            ],
            "menu": [
                {
                    "title": "Website",
                    "link": "https://sql.js.org/"
                },
                {
                    "title": "Github",
                    "link": "https://github.com/sql-js/sql.js"
                },
                {
                    "title": "Demo",
                    "link": "https://sql.js.org/examples/GUI/"
                }
            ]
        }
    }
}
````

## File: .npmignore
````
test/
c/
gh-pages/
node_modules/
node-debug.log
src/
cache/
out/
examples/
sqlite-src/
.git/
index.html
.github
Makefile
emsdk_set_env.sh
sqljs.zip
````

## File: AUTHORS
````
Ophir LOJKINE <pere.jobs@gmail.com> (https://github.com/lovasoa)
@kripken
@hankinsoft
@firien
@dinedal
@taytay
@kaizhu256
@brodybits
````

## File: CONTRIBUTING.md
````markdown
# Compiling and Contributing

General consumers of this library don't need to read any further. (The compiled files are available via the [release page](https://github.com/sql-js/sql.js/releases).)

If you want to compile your own version of SQLite for WebAssembly, or want to contribute to this project, read on.

## Setting up your Development Environment

### Containerized Development Environment (Recommended) 

This project defines a standardized development environment using Docker (and the .devcontainer spec in particular). This allows for anyone on any platform to get up and running quickly. (VSCode is not technically required to make use of this standardized environment, but it makes containerized development so seamless that the non-VSCode path is not currently documented here.)

Standardizing our development environment has numerous benefits:
- Allows anyone on ANY platform (Linux, Mac, and Windows) to contribute or compile their own build.
- It's quicker and easier for any contributor to dive in and fix issues.
- (Practically) eliminates configuration bugs that are difficult for maintainers to reproduce. Also known as "works on my machine" issues.
- Allows us to write our scripts assuming that they're _always_ running in a single known environment of a single, known platform. 
- Ensure that all contributors use a known, standardized installation of EMSDK.
- Allows for a more clearly documented process for updating the EMSDK to a new version.
- End-Users that simply want to compile and install their own version of SQLite don't have to bother with EMSDK installation in their particular environment.

To get started:

1. Follow the [Installation Steps for Containerized Development in VSCode](https://code.visualstudio.com/docs/remote/containers#_installation). This includes installing Docker, VSCode, and the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) for VSCode)
2. Clone this repository
3. Open the repository folder in VSCode. It will detect the presence of a .devcontainer and prompt you: "Folder contains a Dev Container configuration file. Reopen folder to develop in a container." Click "Reopen in container"

You're now ready to test the dev environment:

4. Click on Terminal->New Terminal to be dropped into a terminal inside the dev environment.
5. Run `$ npm install` to install the required modules
6. Run `$ npm test` to ensure all tests pass
7. Run `$ npm run rebuild` to re-compile the project from scratch (using the version of EMSDK installed in the container).
8. Run `$ npm test` to ensure all tests pass after said rebuild

You're now ready for development!

### Host-based configuration (Not recommended)

If you're on a Mac or Linux-based host machine, you can install and use the EMSDK directly to perform a build.
Note that if you run into bugs with this configuration, we highly encourage you to use the containerized development environment instead, as detailed above.

Instructions:

1. [Install the EMSDK](https://emscripten.org/docs/getting_started/downloads.html)
2. Clone this repository
3. Run `$ npm install` to install the required modules
4. Run `$ npm test` to ensure all tests pass
5. Run `$ npm run rebuild` to re-compile the project from scratch (using the version of EMSDK installed in the container).
6. Run `$ npm test` to ensure all tests pass after said rebuild

## Compiling SQLite with different options

In order to enable extensions like FTS5, change the CFLAGS in the [Makefile](Makefile) and run `npm run rebuild`:

``` diff
CFLAGS = \
        -O2 \
        -DSQLITE_OMIT_LOAD_EXTENSION \
        -DSQLITE_DISABLE_LFS \
        -DSQLITE_ENABLE_FTS3 \
        -DSQLITE_ENABLE_FTS3_PARENTHESIS \
+       -DSQLITE_ENABLE_FTS5 \
        -DSQLITE_THREADSAFE=0
```
````

## File: documentation_index.md
````markdown
# sql.js API documentation

## Introduction

If you need a quick intoduction with code samples that you can copy-and-paste,
head over to [sql.js.org](https://sql.js.org/)

## API

### The initSqlJs function

The root object in the API is the [`initSqlJs`](./global.html#initSqlJs) function,
that takes an [`SqlJsConfig`](./global.html#SqlJsConfig) parameter,
and returns an [SqlJs](./global.html#SqlJs) object

### The SqlJs object

`initSqlJs` returns the main sql.js object, the [**`SqlJs`**](./module-SqlJs.html) module, which contains :

#### Database

[**Database**](./Database.html) is the main class, that represents an SQLite database.

#### Statement

The [**Statement**](./Statement.html) class is used for prepared statements.
````

## File: index.html
````html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>sql.js</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description"
    content="sql.js is an SQL library for javascript containing a version of SQLite compiled for the web.">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
</head>

<body>
  <div id="app"></div>
  <script>window.$docsify = { name: 'SQL.js', repo: 'https://github.com/sql-js/sql.js/' }</script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  <script>
    let url = new URL(window.location);
    url.pathname = url.pathname.replace(/\/index.html$/, '/');
    if (window.location.toString() !== url.toString()) window.location = url;
  </script>
</body>

</html>
````

## File: LICENSE
````
MIT license
===========

Copyright (c) 2017 sql.js authors (see AUTHORS)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



# Some portions of the Makefile taken from:
Copyright 2017 Ryusei Yamaguchi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
````

## File: logo.svg
````
<svg xmlns="http://www.w3.org/2000/svg" height="400" width="400">
  <defs/>
  <defs>
    <path id="a" d="M6 10h139v93H6z"/>
  </defs>
  <rect ry="0" y="0" x="0" height="400" width="400" fill="#ffe70b" stroke="#000"/>
  <text y="170" x="29" style="line-height:1.25;-inkscape-font-specification:'Source Sans Pro Semi-Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal" font-weight="600" font-size="200" font-family="Source Sans Pro">
    <tspan y="170" x="29">SQL</tspan>
  </text>
  <text style="line-height:1.25;-inkscape-font-specification:'Source Sans Pro Semi-Bold';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal" x="109" y="359" font-weight="600" font-size="200" font-family="Source Sans Pro">
    <tspan x="109" y="359">.JS</tspan>
  </text>
</svg>
````

## File: Makefile
````
# Note: Last built with version 2.0.15 of Emscripten

# TODO: Emit a file showing which version of emcc and SQLite was used to compile the emitted output.
# TODO: Create a release on Github with these compiled assets rather than checking them in
# TODO: Consider creating different files based on browser vs module usage: https://github.com/vuejs/vue/tree/dev/dist

# I got this handy makefile syntax from : https://github.com/mandel59/sqlite-wasm (MIT License) Credited in LICENSE
# To use another version of Sqlite, visit https://www.sqlite.org/download.html and copy the appropriate values here:
SQLITE_AMALGAMATION = sqlite-amalgamation-3490100
SQLITE_AMALGAMATION_ZIP_URL = https://sqlite.org/2025/sqlite-amalgamation-3490100.zip
SQLITE_AMALGAMATION_ZIP_SHA3 = e7eb4cfb2d95626e782cfa748f534c74482f2c3c93f13ee828b9187ce05b2da7

# Note that extension-functions.c hasn't been updated since 2010-02-06, so likely doesn't need to be updated
EXTENSION_FUNCTIONS = extension-functions.c
EXTENSION_FUNCTIONS_URL = https://www.sqlite.org/contrib/download/extension-functions.c?get=25
EXTENSION_FUNCTIONS_SHA1 = c68fa706d6d9ff98608044c00212473f9c14892f

EMCC=emcc

SQLITE_COMPILATION_FLAGS = \
	-Oz \
	-DSQLITE_OMIT_LOAD_EXTENSION \
	-DSQLITE_DISABLE_LFS \
	-DSQLITE_ENABLE_FTS3 \
	-DSQLITE_ENABLE_FTS3_PARENTHESIS \
	-DSQLITE_THREADSAFE=0 \
	-DSQLITE_ENABLE_NORMALIZE

# When compiling to WASM, enabling memory-growth is not expected to make much of an impact, so we enable it for all builds
# Since tihs is a library and not a standalone executable, we don't want to catch unhandled Node process exceptions
# So, we do : `NODEJS_CATCH_EXIT=0`, which fixes issue: https://github.com/sql-js/sql.js/issues/173 and https://github.com/sql-js/sql.js/issues/262
EMFLAGS = \
	-s RESERVED_FUNCTION_POINTERS=64 \
	-s ALLOW_TABLE_GROWTH=1 \
	-s EXPORTED_FUNCTIONS=@src/exported_functions.json \
	-s EXPORTED_RUNTIME_METHODS=@src/exported_runtime_methods.json \
	-s SINGLE_FILE=0 \
	-s NODEJS_CATCH_EXIT=0 \
	-s NODEJS_CATCH_REJECTION=0 \
	-s STACK_SIZE=5MB

EMFLAGS_ASM = \
	-s WASM=0

EMFLAGS_ASM_MEMORY_GROWTH = \
	-s WASM=0 \
	-s ALLOW_MEMORY_GROWTH=1

EMFLAGS_WASM = \
	-s WASM=1 \
	-s ALLOW_MEMORY_GROWTH=1

EMFLAGS_OPTIMIZED= \
	-Oz \
	-flto \
	--closure 1

EMFLAGS_DEBUG = \
	-s ASSERTIONS=2 \
	-O1

BITCODE_FILES = out/sqlite3.o out/extension-functions.o

OUTPUT_WRAPPER_FILES = src/shell-pre.js src/shell-post.js

SOURCE_API_FILES = src/api.js

EMFLAGS_PRE_JS_FILES = \
	--pre-js src/api.js

EXPORTED_METHODS_JSON_FILES = src/exported_functions.json src/exported_runtime_methods.json

all: optimized debug worker

.PHONY: debug
debug: dist/sql-asm-debug.js dist/sql-wasm-debug.js

dist/sql-asm-debug.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) $(SOURCE_API_FILES) $(EXPORTED_METHODS_JSON_FILES)
	$(EMCC) $(EMFLAGS) $(EMFLAGS_DEBUG) $(EMFLAGS_ASM) $(BITCODE_FILES) $(EMFLAGS_PRE_JS_FILES) -o $@
	mv $@ out/tmp-raw.js
	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js > $@
	rm out/tmp-raw.js

dist/sql-wasm-debug.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) $(SOURCE_API_FILES) $(EXPORTED_METHODS_JSON_FILES)
	$(EMCC) $(EMFLAGS) $(EMFLAGS_DEBUG) $(EMFLAGS_WASM) $(BITCODE_FILES) $(EMFLAGS_PRE_JS_FILES) -o $@
	mv $@ out/tmp-raw.js
	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js > $@
	rm out/tmp-raw.js

.PHONY: optimized
optimized: dist/sql-asm.js dist/sql-wasm.js dist/sql-asm-memory-growth.js

dist/sql-asm.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) $(SOURCE_API_FILES) $(EXPORTED_METHODS_JSON_FILES)
	$(EMCC) $(EMFLAGS) $(EMFLAGS_OPTIMIZED) $(EMFLAGS_ASM) $(BITCODE_FILES) $(EMFLAGS_PRE_JS_FILES) -o $@
	mv $@ out/tmp-raw.js
	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js > $@
	rm out/tmp-raw.js

dist/sql-wasm.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) $(SOURCE_API_FILES) $(EXPORTED_METHODS_JSON_FILES)
	$(EMCC) $(EMFLAGS) $(EMFLAGS_OPTIMIZED) $(EMFLAGS_WASM) $(BITCODE_FILES) $(EMFLAGS_PRE_JS_FILES) -o $@
	mv $@ out/tmp-raw.js
	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js > $@
	rm out/tmp-raw.js

dist/sql-asm-memory-growth.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) $(SOURCE_API_FILES) $(EXPORTED_METHODS_JSON_FILES)
	$(EMCC) $(EMFLAGS) $(EMFLAGS_OPTIMIZED) $(EMFLAGS_ASM_MEMORY_GROWTH) $(BITCODE_FILES) $(EMFLAGS_PRE_JS_FILES) -o $@
	mv $@ out/tmp-raw.js
	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js > $@
	rm out/tmp-raw.js

# Web worker API
.PHONY: worker
worker: dist/worker.sql-asm.js dist/worker.sql-asm-debug.js dist/worker.sql-wasm.js dist/worker.sql-wasm-debug.js

dist/worker.sql-asm.js: dist/sql-asm.js src/worker.js
	cat $^ > $@

dist/worker.sql-asm-debug.js: dist/sql-asm-debug.js src/worker.js
	cat $^ > $@

dist/worker.sql-wasm.js: dist/sql-wasm.js src/worker.js
	cat $^ > $@

dist/worker.sql-wasm-debug.js: dist/sql-wasm-debug.js src/worker.js
	cat $^ > $@

# Building it this way gets us a wrapper that _knows_ it's in worker mode, which is nice.
# However, since we can't tell emcc that we don't need the wasm generated, and just want the wrapper, we have to pay to have the .wasm generated
# even though we would have already generated it with our sql-wasm.js target above.
# This would be made easier if this is implemented: https://github.com/emscripten-core/emscripten/issues/8506
# dist/worker.sql-wasm.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) src/api.js src/worker.js $(EXPORTED_METHODS_JSON_FILES) dist/sql-wasm-debug.wasm
# 	$(EMCC) $(EMFLAGS) $(EMFLAGS_OPTIMIZED) -s ENVIRONMENT=worker -s $(EMFLAGS_WASM) $(BITCODE_FILES) --pre-js src/api.js -o out/sql-wasm.js
# 	mv out/sql-wasm.js out/tmp-raw.js
# 	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js src/worker.js > $@
# 	#mv out/sql-wasm.wasm dist/sql-wasm.wasm
# 	rm out/tmp-raw.js

# dist/worker.sql-wasm-debug.js: $(BITCODE_FILES) $(OUTPUT_WRAPPER_FILES) src/api.js src/worker.js $(EXPORTED_METHODS_JSON_FILES) dist/sql-wasm-debug.wasm
# 	$(EMCC) -s ENVIRONMENT=worker $(EMFLAGS) $(EMFLAGS_DEBUG) -s ENVIRONMENT=worker -s WASM_BINARY_FILE=sql-wasm-foo.debug $(EMFLAGS_WASM) $(BITCODE_FILES) --pre-js src/api.js -o out/sql-wasm-debug.js
# 	mv out/sql-wasm-debug.js out/tmp-raw.js
# 	cat src/shell-pre.js out/tmp-raw.js src/shell-post.js src/worker.js > $@
# 	#mv out/sql-wasm-debug.wasm dist/sql-wasm-debug.wasm
# 	rm out/tmp-raw.js

out/sqlite3.o: sqlite-src/$(SQLITE_AMALGAMATION)
	mkdir -p out
	# Generate llvm bitcode
	$(EMCC) $(SQLITE_COMPILATION_FLAGS) -c sqlite-src/$(SQLITE_AMALGAMATION)/sqlite3.c -o $@

# Since the extension-functions.c includes other headers in the sqlite_amalgamation, we declare that this depends on more than just extension-functions.c
out/extension-functions.o: sqlite-src/$(SQLITE_AMALGAMATION)
	mkdir -p out
	# Generate llvm bitcode
	$(EMCC) $(SQLITE_COMPILATION_FLAGS) -c sqlite-src/$(SQLITE_AMALGAMATION)/extension-functions.c -o $@

# TODO: This target appears to be unused. If we re-instatate it, we'll need to add more files inside of the JS folder
# module.tar.gz: test package.json AUTHORS README.md dist/sql-asm.js
# 	tar --create --gzip $^ > $@

## cache
cache/$(SQLITE_AMALGAMATION).zip:
	mkdir -p cache
	curl -LsSf '$(SQLITE_AMALGAMATION_ZIP_URL)' -o $@

cache/$(EXTENSION_FUNCTIONS):
	mkdir -p cache
	curl -LsSf '$(EXTENSION_FUNCTIONS_URL)' -o $@

## sqlite-src
.PHONY: sqlite-src
sqlite-src: sqlite-src/$(SQLITE_AMALGAMATION) sqlite-src/$(SQLITE_AMALGAMATION)/$(EXTENSION_FUNCTIONS)

sqlite-src/$(SQLITE_AMALGAMATION): cache/$(SQLITE_AMALGAMATION).zip sqlite-src/$(SQLITE_AMALGAMATION)/$(EXTENSION_FUNCTIONS)
	mkdir -p sqlite-src/$(SQLITE_AMALGAMATION)
	echo '$(SQLITE_AMALGAMATION_ZIP_SHA3)  ./cache/$(SQLITE_AMALGAMATION).zip' > cache/check.txt
	sha3sum -a 256 -c cache/check.txt
	# We don't delete the sqlite_amalgamation folder. That's a job for clean
	# Also, the extension functions get copied here, and if we get the order of these steps wrong,
	# this step could remove the extension functions, and that's not what we want
	unzip -u 'cache/$(SQLITE_AMALGAMATION).zip' -d sqlite-src/
	touch $@

sqlite-src/$(SQLITE_AMALGAMATION)/$(EXTENSION_FUNCTIONS): cache/$(EXTENSION_FUNCTIONS)
	mkdir -p sqlite-src/$(SQLITE_AMALGAMATION)
	echo '$(EXTENSION_FUNCTIONS_SHA1)  ./cache/$(EXTENSION_FUNCTIONS)' > cache/check.txt
	sha1sum -c cache/check.txt
	cp 'cache/$(EXTENSION_FUNCTIONS)' $@


.PHONY: clean
clean:
	rm -f out/* dist/* cache/*
	rm -rf sqlite-src/
````

## File: package.json
````json
{
	"name": "sql.js",
	"version": "1.13.0",
	"description": "SQLite library with support for opening and writing databases, prepared statements, and more. This SQLite library is in pure javascript (compiled with emscripten).",
	"keywords": [
		"sql",
		"sqlite",
		"stand-alone",
		"relational",
		"database",
		"RDBMS",
		"data",
		"query",
		"statement",
		"emscripten",
		"asm",
		"asm.js"
	],
	"license": "MIT",
	"main": "./dist/sql-wasm.js",
	"scripts": {
		"build": "make",
		"rebuild": "npm run clean && npm run build",
		"clean": "make clean",
		"test": "npm run lint && npm run test-asm && npm run test-asm-debug && npm run test-wasm && npm run test-wasm-debug && npm run test-asm-memory-growth",
		"lint": "eslint .",
		"prettify": "eslint . --fix",
		"test-asm": "node --unhandled-rejections=strict test/all.js asm",
		"test-asm-debug": "node --unhandled-rejections=strict test/all.js asm-debug",
		"test-asm-memory-growth": "node --unhandled-rejections=strict test/all.js asm-memory-growth",
		"test-wasm": "node --unhandled-rejections=strict test/all.js wasm",
		"test-wasm-debug": "node --unhandled-rejections=strict test/all.js wasm-debug",
		"doc": "jsdoc -c .jsdoc.config.json"
	},
	"homepage": "http://github.com/sql-js/sql.js",
	"repository": {
		"type": "git",
		"url": "http://github.com/sql-js/sql.js.git"
	},
	"bugs": {
		"url": "https://github.com/sql-js/sql.js/issues"
	},
	"devDependencies": {
		"clean-jsdoc-theme": "^4.2.0",
		"eslint": "^8.54.0",
		"eslint-config-airbnb-base": "^15.0.0",
		"eslint-plugin-import": "^2.26.0",
		"jsdoc": "^4.0.2",
		"test": "=0.6.0"
	}
}
````

## File: README.md
````markdown
<img src="https://user-images.githubusercontent.com/552629/76405509-87025300-6388-11ea-86c9-af882abb00bd.png" width="40" height="40" />

# SQLite compiled to JavaScript

[![CI status](https://github.com/sql-js/sql.js/workflows/CI/badge.svg)](https://github.com/sql-js/sql.js/actions)
[![npm](https://img.shields.io/npm/v/sql.js)](https://www.npmjs.com/package/sql.js)
[![CDNJS version](https://img.shields.io/cdnjs/v/sql.js.svg)](https://cdnjs.com/libraries/sql.js)

*sql.js* is a javascript SQL database. It allows you to create a relational database and query it entirely in the browser. You can try it in [this online demo](https://sql.js.org/examples/GUI/). It uses a [virtual database file stored in memory](https://emscripten.org/docs/porting/files/file_systems_overview.html), and thus **doesn't persist the changes** made to the database. However, it allows you to **import** any existing sqlite file, and to **export** the created database as a [JavaScript typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).

*sql.js* uses [emscripten](https://emscripten.org/docs/introducing_emscripten/about_emscripten.html) to compile [SQLite](http://sqlite.org/about.html) to webassembly (or to javascript code for compatibility with older browsers). It includes [contributed math and string extension functions](https://www.sqlite.org/contrib?orderby=date).

sql.js can be used like any traditional JavaScript library. If you are building a native application in JavaScript (using Electron for instance), or are working in node.js, you will likely prefer to use [a native binding of SQLite to JavaScript](https://www.npmjs.com/package/sqlite3). A native binding will not only be faster because it will run native code, but it will also be able to work on database files directly instead of having to load the entire database in memory, avoiding out of memory errors and further improving performances.

SQLite is public domain, sql.js is MIT licensed.

## API documentation
A [full API documentation](https://sql.js.org/documentation/) for all the available classes and methods is available.
It is generated from comments inside the source code, and is thus always up to date.

## Usage

By default, *sql.js* uses [wasm](https://developer.mozilla.org/en-US/docs/WebAssembly), and thus needs to load a `.wasm` file in addition to the javascript library. You can find this file in `./node_modules/sql.js/dist/sql-wasm.wasm` after installing sql.js from npm, and instruct your bundler to add it to your static assets or load it from [a CDN](https://cdnjs.com/libraries/sql.js). Then use the [`locateFile`](https://emscripten.org/docs/api_reference/module.html#Module.locateFile) property of the configuration object passed to `initSqlJs` to indicate where the file is. If you use an asset builder such as webpack, you can automate this. See [this demo of how to integrate sql.js with webpack (and react)](https://github.com/sql-js/react-sqljs-demo).

```javascript
const initSqlJs = require('sql.js');
// or if you are in a browser:
// const initSqlJs = window.initSqlJs;

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: file => `https://sql.js.org/dist/${file}`
});

// Create a database
const db = new SQL.Database();
// NOTE: You can also use new SQL.Database(data) where
// data is an Uint8Array representing an SQLite database file


// Execute a single SQL string that contains multiple statements
let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
db.run(sqlstr); // Run the query without returning anything

// Prepare an sql statement
const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

// Bind values to the parameters and fetch the results of the query
const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
console.log(result); // Will print {a:1, b:'world'}

// Bind other values
stmt.bind([0, 'hello']);
while (stmt.step()) console.log(stmt.get()); // Will print [0, 'hello']
// free the memory used by the statement
stmt.free();
// You can not use your statement anymore once it has been freed.
// But not freeing your statements causes memory leaks. You don't want that.

const res = db.exec("SELECT * FROM hello");
/*
[
  {columns:['a','b'], values:[[0,'hello'],[1,'world']]}
]
*/

// You can also use JavaScript functions inside your SQL code
// Create the js function you need
function add(a, b) {return a+b;}
// Specifies the SQL function's name, the number of it's arguments, and the js function to use
db.create_function("add_js", add);
// Run a query in which the function is used
db.run("INSERT INTO hello VALUES (add_js(7, 3), add_js('Hello ', 'world'));"); // Inserts 10 and 'Hello world'

// You can create custom aggregation functions, by passing a name
// and a set of functions to `db.create_aggregate`:
//
// - an `init` function. This function receives no argument and returns
//   the initial value for the state of the aggregate function.
// - a `step` function. This function takes two arguments
//    - the current state of the aggregation
//    - a new value to aggregate to the state
//  It should return a new value for the state.
// - a `finalize` function. This function receives a state object, and
//   returns the final value of the aggregate. It can be omitted, in which case
//   the final value of the state will be returned directly by the aggregate function.
//
// Here is an example aggregation function, `json_agg`, which will collect all
// input values and return them as a JSON array:
db.create_aggregate(
  "json_agg",
  {
    init: () => [],
    step: (state, val) => [...state, val],
    finalize: (state) => JSON.stringify(state),
  }
);

db.exec("SELECT json_agg(column1) FROM (VALUES ('hello'), ('world'))");
// -> The result of the query is the string '["hello","world"]'

// Export the database to an Uint8Array containing the SQLite database file
const binaryArray = db.export();
```

## Demo
There are a few examples [available here](https://sql-js.github.io/sql.js/index.html). The most full-featured is the [Sqlite Interpreter](https://sql-js.github.io/sql.js/examples/GUI/index.html).

## Examples
The test files provide up to date example of the use of the api.
### Inside the browser
#### Example **HTML** file:
```html
<meta charset="utf8" />
<html>
  <script src='/dist/sql-wasm.js'></script>
  <script>
    config = {
      locateFile: filename => `/dist/${filename}`
    }
    // The `initSqlJs` function is globally provided by all of the main dist files if loaded in the browser.
    // We must specify this locateFile function if we are loading a wasm file from anywhere other than the current html page's folder.
    initSqlJs(config).then(function(SQL){
      //Create the database
      const db = new SQL.Database();
      // Run a query without reading the results
      db.run("CREATE TABLE test (col1, col2);");
      // Insert two rows: (1,111) and (2,222)
      db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

      // Prepare a statement
      const stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
      stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

      // Bind new values
      stmt.bind({$start:1, $end:2});
      while(stmt.step()) { //
        const row = stmt.getAsObject();
        console.log('Here is a row: ' + JSON.stringify(row));
      }
    });
  </script>
  <body>
    Output is in Javascript console
  </body>
</html>
```

#### Creating a database from a file chosen by the user
`SQL.Database` constructor takes an array of integer representing a database file as an optional parameter.
The following code uses an HTML input as the source for loading a database:
```javascript
dbFileElm.onchange = () => {
  const f = dbFileElm.files[0];
  const r = new FileReader();
  r.onload = function() {
    const Uints = new Uint8Array(r.result);
    db = new SQL.Database(Uints);
  }
  r.readAsArrayBuffer(f);
}
```
See : https://sql-js.github.io/sql.js/examples/GUI/gui.js

#### Loading a database from a server

##### using fetch

```javascript
const sqlPromise = initSqlJs({
  locateFile: file => `https://path/to/your/dist/folder/dist/${file}`
});
const dataPromise = fetch("/path/to/database.sqlite").then(res => res.arrayBuffer());
const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
const db = new SQL.Database(new Uint8Array(buf));
```

##### using XMLHttpRequest

```javascript
const xhr = new XMLHttpRequest();
// For example: https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite
xhr.open('GET', '/path/to/database.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.onload = e => {
  const uInt8Array = new Uint8Array(xhr.response);
  const db = new SQL.Database(uInt8Array);
  const contents = db.exec("SELECT * FROM my_table");
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
};
xhr.send();
```
See: https://github.com/sql-js/sql.js/wiki/Load-a-database-from-the-server


### Use from node.js

`sql.js` is [hosted on npm](https://www.npmjs.org/package/sql.js). To install it, you can simply run `npm install sql.js`.
Alternatively, you can simply download `sql-wasm.js` and `sql-wasm.wasm`, from the download link below.

#### read a database from the disk:
```javascript
const fs = require('fs');
const initSqlJs = require('sql-wasm.js');
const filebuffer = fs.readFileSync('test.sqlite');

initSqlJs().then(function(SQL){
  // Load the db
  const db = new SQL.Database(filebuffer);
});

```

#### write a database to the disk
You need to convert the result of `db.export` to a buffer
```javascript
const fs = require("fs");
// [...] (create the database)
const data = db.export();
const buffer = Buffer.from(data);
fs.writeFileSync("filename.sqlite", buffer);
```

See : https://github.com/sql-js/sql.js/blob/master/test/test_node_file.js

### Use as web worker
If you don't want to run CPU-intensive SQL queries in your main application thread,
you can use the *more limited* WebWorker API.

You will need to download `worker.sql-wasm.js` and `worker.sql-wasm.wasm` from the [release page](https://github.com/sql-js/sql.js/releases).

Example:
```html
<script>
  const worker = new Worker("/dist/worker.sql-wasm.js");
  worker.onmessage = () => {
    console.log("Database opened");
    worker.onmessage = event => {
      console.log(event.data); // The result of the query
    };

    worker.postMessage({
      id: 2,
      action: "exec",
      sql: "SELECT age,name FROM test WHERE id=$id",
      params: { "$id": 1 }
    });
  };

  worker.onerror = e => console.log("Worker error: ", e);
  worker.postMessage({
    id:1,
    action:"open",
    buffer:buf, /*Optional. An ArrayBuffer representing an SQLite Database file*/
  });
</script>
```
### Enabling BigInt support
If you need ```BigInt``` support, it is partially supported since most browsers now supports it including Safari.Binding ```BigInt``` is still not supported, only getting ```BigInt``` from the database is supported for now.

```html
<script>
  const stmt = db.prepare("SELECT * FROM test");
  const config = {useBigInt: true};
  /*Pass optional config param to the get function*/
  while (stmt.step()) console.log(stmt.get(null, config));

  /*OR*/
  const results = db.exec("SELECT * FROM test", config);
  console.log(results[0].values)
</script>
```
On WebWorker, you can just add ```config``` param before posting a message. With this, you wont have to pass config param on ```get``` function.

```html
<script>
  worker.postMessage({
    id:1,
    action:"exec",
    sql: "SELECT * FROM test",
    config: {useBigInt: true}, /*Optional param*/
  });
</script>
```

See [examples/GUI/gui.js](examples/GUI/gui.js) for a full working example.

## Flavors/versions Targets/Downloads

This library includes both WebAssembly and asm.js versions of Sqlite. (WebAssembly is the newer, preferred way to compile to JavaScript, and has superceded asm.js. It produces smaller, faster code.) Asm.js versions are included for compatibility.

## Upgrading from 0.x to 1.x

Version 1.0 of sql.js must be loaded asynchronously, whereas asm.js was able to be loaded synchronously.

So in the past, you would:
```html
<script src='js/sql.js'></script>
<script>
  const db = new SQL.Database();
  //...
</script>
```
or:
```javascript
const SQL = require('sql.js');
const db = new SQL.Database();
//...
```

Version 1.x:
```html
<script src='dist/sql-wasm.js'></script>
<script>
  initSqlJs({ locateFile: filename => `/dist/${filename}` }).then(function(SQL){
    const db = new SQL.Database();
    //...
  });
</script>
```
or:
```javascript
const initSqlJs = require('sql-wasm.js');
initSqlJs().then(function(SQL){
  const db = new SQL.Database();
  //...
});
```

`NOTHING` is now a reserved word in SQLite, whereas previously it was not. This could cause errors like `Error: near "nothing": syntax error`

### Downloading/Using: ###
Although asm.js files were distributed as a single Javascript file, WebAssembly libraries are most efficiently distributed as a pair of files, the `.js`  loader and the `.wasm` file, like `sql-wasm.js` and `sql-wasm.wasm`. The `.js` file is responsible for loading the `.wasm` file. You can find these files on our [release page](https://github.com/sql-js/sql.js/releases)




## Versions of sql.js included in the distributed artifacts
You can always find the latest published artifacts on https://github.com/sql-js/sql.js/releases/latest.

For each [release](https://github.com/sql-js/sql.js/releases/), you will find a file called `sqljs.zip` in the *release assets*. It will contain:
 - `sql-wasm.js` : The Web Assembly version of Sql.js. Minified and suitable for production. Use this. If you use this, you will need to include/ship `sql-wasm.wasm` as well.
 - `sql-wasm-debug.js` : The Web Assembly, Debug version of Sql.js. Larger, with assertions turned on. Useful for local development. You will need to include/ship `sql-wasm-debug.wasm` if you use this.
 - `sql-asm.js` : The older asm.js version of Sql.js. Slower and larger. Provided for compatibility reasons.
 - `sql-asm-memory-growth.js` : Asm.js doesn't allow for memory to grow by default, because it is slower and de-optimizes. If you are using sql-asm.js and you see this error (`Cannot enlarge memory arrays`), use this file.
 - `sql-asm-debug.js` : The _Debug_ asm.js version of Sql.js. Use this for local development.
 - `worker.*` - Web Worker versions of the above libraries. More limited API. See [examples/GUI/gui.js](examples/GUI/gui.js) for a good example of this.

## Compiling/Contributing

General consumers of this library don't need to read any further. (The compiled files are available via the [release page](https://github.com/sql-js/sql.js/releases).)

If you want to compile your own version of SQLite for WebAssembly, or want to contribute to this project, see [CONTRIBUTING.md](CONTRIBUTING.md).
````
