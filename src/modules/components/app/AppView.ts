import { ViewId } from '../../../data/enums/view-id';
import { getElement } from '../../../utils/dom-utils';

export class AppView {
	public readonly elements: {
		startPage: HTMLElement;
		header: HTMLElement;
		blockConfig: HTMLElement;
		jsonOutput: HTMLElement;
		jsonPreview: HTMLElement;
		saveConfigButton: HTMLButtonElement;
		loadConfigButton: HTMLButtonElement;
		showJsonPreviewButton: HTMLButtonElement;
		showStartPageButton: HTMLButtonElement;
	};

	constructor() {
		this.elements = {
			startPage: getElement(`${ViewId.START_PAGE}`),
			header: getElement('content').querySelector('h1')!,
			blockConfig: getElement(ViewId.BLOCK_CONFIG),
			jsonOutput: getElement(`${ViewId.FULL_JSON_OUTPUT}`),
			jsonPreview: getElement(`${ViewId.FULL_JSON_PREVIEW}`),
			saveConfigButton: getElement(ViewId.SAVE_CONFIG_BUTTON),
			loadConfigButton: getElement(ViewId.LOAD_CONFIG_BUTTON),
			showJsonPreviewButton: getElement(ViewId.SHOW_JSON_PREVIEW_BUTTON),
			showStartPageButton: getElement(ViewId.SHOW_START_PAGE_BUTTON),
		};
	}
}
