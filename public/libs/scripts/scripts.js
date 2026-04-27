/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Standalone C2 Demo — scripts.js
 * Minimal version of the Milo entry point, stripped of AEM Edge Delivery
 * dependencies. Only what's needed for static block rendering is kept.
 */

import {
  loadArea,
  loadLana,
  setConfig,
  getMetadata,
} from '../utils/utils.js';
import locales from '../utils/locales.js';

const config = {
  codeRoot: '/libs',
  locales,
  prodDomains: [],
  stageDomainsMap: {},
};

const miloLibs = '/libs';

const eagerLoad = (img) => {
  img?.setAttribute('loading', 'eager');
  img?.setAttribute('fetchpriority', 'high');
};

(async function loadLCPImage() {
  const firstDiv = document.querySelector('body > main > div:nth-child(1) > div');
  if (firstDiv?.classList.contains('marquee')) {
    firstDiv.querySelectorAll('img').forEach(eagerLoad);
  } else {
    eagerLoad(document.querySelector('img'));
  }
}());

function loadStyles() {
  const paths = [];
  const stylesPrefix = getMetadata('foundation') === 'c2' ? '/c2' : '';
  paths.push(`${miloLibs}${stylesPrefix}/styles/styles.css`);

  paths.forEach((path) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    document.head.appendChild(link);
  });
}

(async function loadPage() {
  loadStyles();
  performance.mark('loadpage');
  setConfig(config);
  loadLana({ clientId: 'milo-c2-demo' });
  await loadArea();
}());
