'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' : 'data-bs-target="#xs-controllers-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' :
                                            'id="xs-controllers-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' : 'data-bs-target="#xs-injectables-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' :
                                        'id="xs-injectables-links-module-AppModule-3ef38905f5b73974f7dbb955d5dc2de50ea152013cfd81565d1f98b9512c2f8d39bbc4bb3f6b95d787741c11a2e99c3cd633da291fca35918e2721dc91f4b905"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' :
                                            'id="xs-controllers-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' :
                                        'id="xs-injectables-links-module-AuthModule-af26d1b09e214ab4124248ab18848780d9c0a3e0206d91b969ba99a98b5f677d1fed8257f117534a7183dfce298afa188b39bf459c885d09cfc6fc0fc348ded5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-06299d2db54adda9e779169e0698da0e3160242c422bc1887762cf20daddc60d7a1d49ba492fd0b26e9b0c9713ab131d39257fad9de368df6f875a8bf531663a"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' :
                                            'id="xs-controllers-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' :
                                        'id="xs-injectables-links-module-PostsModule-b104943aca92269724a5740fec792679deb4c7b73fbb18afd90eeeab23e2bcfdf9a856791e7f48ef90ba8756c0d0887c9c1dc468831ec48ea9850618302de5c4"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-7bacd2f17f113a4d32dccd3810d9669ec7c3f6ac8ce574cfd3fae93cf5dc9b2d88d3567f1a32b55add1ee29692949187fea958e9081e69ddd5f9a4ad79c02f09"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-7bacd2f17f113a4d32dccd3810d9669ec7c3f6ac8ce574cfd3fae93cf5dc9b2d88d3567f1a32b55add1ee29692949187fea958e9081e69ddd5f9a4ad79c02f09"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-7bacd2f17f113a4d32dccd3810d9669ec7c3f6ac8ce574cfd3fae93cf5dc9b2d88d3567f1a32b55add1ee29692949187fea958e9081e69ddd5f9a4ad79c02f09"' :
                                            'id="xs-controllers-links-module-TagsModule-7bacd2f17f113a4d32dccd3810d9669ec7c3f6ac8ce574cfd3fae93cf5dc9b2d88d3567f1a32b55add1ee29692949187fea958e9081e69ddd5f9a4ad79c02f09"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' :
                                            'id="xs-controllers-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' :
                                        'id="xs-injectables-links-module-UsersModule-3aa22055d398764d3da9a29c35edfc553d6a20808056e7a02965b43b80aa75fc125e7859f3f93c75fddb98010385c08ba3c4b8fd11a4394286adb4c9f2475fb0"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MetaOptionsController.html" data-type="entity-link" >MetaOptionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagsDto.html" data-type="entity-link" >CreateTagsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsParamDto.html" data-type="entity-link" >GetPostsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetaOptionsService.html" data-type="entity-link" >MetaOptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
