import { PLACEHOLDERS } from '../../../data/constants/placeholders';
import { ViewId } from '../../../data/enums/view-id';
import { DEVICE_OPTIONS } from '../../../data/settings/options/device-options';
import BlockManager from '../../managers/BlockManager/BlockManager';
import EventManager from '../../managers/EventManager/EventManager';
import PageManager from '../../managers/PageManager/PageManager';
import Block from '../block/Block';
import { Page } from '../page/Page';
import { SidebarView } from './SidebarView';

export class SiderbarRenderer {
	constructor(private readonly view: SidebarView) {}

	public render() {
		this.view.elements.menu.innerHTML = '';
		this.renderPages();
		this.renderAddPageButton();
	}

	private renderPages(): void {
		const pages = PageManager.Pages;
		pages.forEach((page: Page) => {
			this.view.elements.menu.appendChild(this.createPageElement(page));
		});
	}

	private createPageElement(page: Page): HTMLElement {
		const li = document.createElement('li');
		li.textContent = `Страница ${page.Index}`;

		const blocksList = this.createBlocksList(page);
		li.appendChild(blocksList);

		return li;
	}

	private createBlocksList(page: Page): HTMLElement {
		const ul = document.createElement('ul');

		page.Blocks.forEach(block => {
			const blockElement = this.createBlockElement(block);
			ul.appendChild(blockElement);
		});

		if (page.Blocks.length < 4) {
			const addButton = this.createAddBlockButton(page);
			ul.appendChild(addButton);
		}

		return ul;
	}

	private createBlockElement(block: Block): HTMLElement {
		const label = block.Device
			? DEVICE_OPTIONS.get(block.Device)?.label
			: PLACEHOLDERS.UNSPECIFIED_BLOCK_TYPE;

		const blockLi = document.createElement('li');
		blockLi.className = ViewId.BLOCK_ITEM;
		blockLi.textContent = `Блок ${block.Index} · ${label}`;
		blockLi.onclick = () => EventManager.emit('blockSelect', block);
		return blockLi;
	}

	private renderAddPageButton(): void {
		const addPage = document.createElement('li');
		addPage.textContent = '+ Новая страница';
		addPage.onclick = () =>
			EventManager.emit('pageAdded', PageManager.addPage());
		this.view.elements.menu.appendChild(addPage);
	}

	private createAddBlockButton(page: Page): HTMLElement {
		const add = document.createElement('li');
		add.textContent = '+ Добавить';
		add.onclick = () =>
			EventManager.emit('blockAdded', BlockManager.addBlockToPage(page));
		return add;
	}
}
