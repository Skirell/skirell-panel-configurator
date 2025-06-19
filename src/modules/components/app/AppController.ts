import { PLACEHOLDERS } from '../../../data/constants/placeholders';
import { ViewId } from '../../../data/enums/view-id';
import blockManager from '../../managers/BlockManager/BlockManager';
import configManager from '../../managers/ConfigManager/ConfigManager';
import eventManager from '../../managers/EventManager/EventManager';
import Block from '../block/Block';
import { BlockController } from '../block/BlockController';
import { Page } from '../page/Page';
import { SidebarController } from '../sidebar/SidebarController';
import { AppView } from './AppView';

export class AppController {
	public readonly BlockController: BlockController;
	public readonly SidebarController: SidebarController;

	constructor(private readonly view: AppView) {
		this.BlockController = new BlockController();
		this.SidebarController = new SidebarController();
	}

	public init(): void {
		this.BlockController.init();
		this.SidebarController.init();

		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		eventManager.on('blockSelect', (block: Block) => {
			this.render();
			blockManager.SelectedBlock = block;
		});

		eventManager.on('blockAdded', (block: Block) => {
			this.render();
			if (block) blockManager.SelectedBlock = block;
		});

		eventManager.on('pageAdded', (page: Page) => {
			this.render();
		});

		eventManager.on('deviceChanged', () => {
			this.SidebarController.Renderer.render();
		});

		this.view.elements.saveConfigButton.addEventListener('click', () => {
			configManager.saveConfig();
		});

		this.view.elements.loadConfigButton.addEventListener('click', () => {
			configManager.loadConfig();
		});

		this.view.elements.showJsonPreviewButton.addEventListener('click', () => {
			this.toggleConfig(false);
			this.togglePreviewJson(true);
		});

		this.view.elements.showStartPageButton.addEventListener('click', () => {
			this.showStartPage();
		});
	}

	public render(): void {
		this.SidebarController.render();
		this.BlockController.render();
	}

	public setHeader(title: string): void {
		this.view.elements.header.textContent = title;
	}

	public updateJsonPreview() {
		this.view.elements.jsonOutput.textContent = configManager.toJSON();
	}

	public showStartPage(): void {
		this.setHeader(PLACEHOLDERS.START_PAGE_TITLE);
		this.toggleConfig(false);
		this.togglePreviewJson(false);
	}

	public toggleConfig(show: boolean): void {
		this.view.elements.startPage.classList.toggle('hidden', show);
		document
			.getElementById(ViewId.BLOCK_CONFIG)
			?.classList.toggle('hidden', !show);
	}

	public togglePreviewJson(show: boolean) {
		const jsonPreview = this.view.elements.jsonPreview;
		if (show) {
			jsonPreview.classList.remove('hidden');
			this.updateJsonPreview();
		} else jsonPreview.classList.add('hidden');
	}
}
