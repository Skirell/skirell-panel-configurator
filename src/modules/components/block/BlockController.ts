import { Device, DeviceVariant } from '../../../data/enums/device';
import blockManager from '../../managers/BlockManager/BlockManager';
import App from '../app';
import Block from './Block';
import { BlockRenderer } from './BlockRenderer';
import { BlockView } from './BlockView';

export class BlockController {
	public readonly View: BlockView;
	public readonly Renderer: BlockRenderer;

	constructor() {
		this.View = new BlockView();
		this.Renderer = new BlockRenderer(this.View);
	}

	private setupEventListeners(): void {
		const AppController = App.Controller;

		this.View.elements.saveBlockButton.addEventListener('click', () => {
			blockManager.saveSelectedBlock();
			AppController.render();
		});

		this.View.elements.removeBlockButton.addEventListener('click', () => {
			blockManager.removeSelectedBlock().then(() => AppController.render());
		});
	}

	public init(): void {
		this.setupEventListeners();
		this.render();
	}

	public render(): void {
		this.Renderer.render();
	}

	public bindBlock(block: Block): void {
		this.render();

		this.Renderer.refillDeviceOptions();
		this.selectDeviceOption(block.Device);

		this.Renderer.refillDeviceVariantOptions();
		this.selectDeviceVariantOption(block.DeviceVariant);

		App.Controller.toggleConfig(true);
		App.Controller.togglePreviewJson(false);
	}

	private selectDeviceOption(device: Device | null): void {
		if (!device) return;
		this.View.elements.deviceType.value = device;
	}

	private selectDeviceVariantOption(deviceVariant: DeviceVariant | null): void {
		if (!deviceVariant) return;
		this.View.elements.deviceVariant.value = deviceVariant;
	}
}
