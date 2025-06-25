import { PLACEHOLDERS } from '../../../data/constants/placeholders';
import { Device, DeviceVariant } from '../../../data/enums/device';
import { SerializedBlock } from '../../../global/types/block';
import { ParamOption } from '../../../global/types/option';
import { showConfirm, showMessage } from '../../../utils/alert-utils';
import { getBaseParams, getVariantParams } from '../../../utils/option-utils';
import { getByPath } from '../../../utils/path-utils';
import App from '../../components/app';
import Block from '../../components/block/Block';
import { Page } from '../../components/page/Page';

class BlockManager {
	private static instance: BlockManager;
	private selectedBlock: Block | null = null;
	public readonly Blocks: Block[] = [];

	private constructor() {}

	public static getInstance(): BlockManager {
		if (!BlockManager.instance) BlockManager.instance = new BlockManager();
		return BlockManager.instance;
	}

	public get SelectedBlock(): typeof this.selectedBlock {
		return this.selectedBlock;
	}
	public set SelectedBlock(value: Block | null) {
		this.selectedBlock = value;

		const BlockController = App.Controller.BlockController;
		if (value) BlockController.bindBlock(value);
	}

	public loadBlockToPage(page: Page, serializedBlock: SerializedBlock): void {
		const block = page.addBlock();
		if (!block) return;

		block.Device = serializedBlock.type!;
		block.DeviceVariant = serializedBlock.data.variant_type!;

		const baseParams = getBaseParams(block.Device);
		if (baseParams) {
			baseParams.forEach((option: ParamOption, fieldKey: string) => {
				const path = block.resolvePath(fieldKey, option.savePath);
				const value = getByPath(serializedBlock, path);
				block.setParam(fieldKey, value, option.savePath);
			});
		}

		const variantParams = getVariantParams(block.DeviceVariant);
		if (variantParams) {
			variantParams.forEach((option: ParamOption, fieldKey: string) => {
				const path = block.resolvePath(fieldKey, option.savePath);
				const value = getByPath(serializedBlock, path);
				block.setParam(fieldKey, value, option.savePath);
			});
		}

		block.UI.populateFields();
	}

	public addBlockToPage(page: Page): Block | undefined {
		return page.addBlock();
	}

	public async removeSelectedBlock() {
		if (!this.selectedBlock) return;

		const success = await showConfirm(PLACEHOLDERS.CONFIRM_DELETE);
		if (!success) return;

		const primaryPage = this.selectedBlock.PrimaryPage;
		primaryPage.removeBlock(this.selectedBlock);

        this.selectedBlock = primaryPage.Blocks[0];

        if (this.selectedBlock) {
            App.Controller.BlockController.bindBlock(this.selectedBlock);
        }
	}

	public saveSelectedBlock(): void {
		const selectedBlock = this.selectedBlock;
		if (!selectedBlock) {
			showMessage('Блок для сохранения не выбран!');
			return;
		}

		const success = selectedBlock.save();
		if (!success)
			showMessage('Не удалось сохранить блок. Проверьте корректность полей.');
		else {
			showMessage('Блок успешно сохранен!');
		}
	}

	public setDevice(device: Device | null): void {
		if (!this.SelectedBlock) return;
		this.SelectedBlock.Device = device;
		this.SelectedBlock.DeviceVariant = null;
	}

	public setDeviceVariant(deviceVariant: DeviceVariant | null): void {
		if (!this.SelectedBlock) return;
		this.SelectedBlock.DeviceVariant = deviceVariant;
	}
}

export default BlockManager.getInstance();
