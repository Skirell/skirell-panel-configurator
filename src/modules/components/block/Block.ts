import { VALUES } from '../../../data/constants/values';
import { Device, DeviceVariant } from '../../../data/enums/device';
import { PathType } from '../../../data/enums/path';
import { DEVICE_VARIANT_MAP } from '../../../data/settings/maps/device-variant-map';
import { PATH_MAP } from '../../../data/settings/maps/path-map';
import { BlockData, SerializedBlock } from '../../../global/types/block';
import { isFieldInBase, isFieldInVariant } from '../../../utils/option-utils';
import { getByPath, setByPath } from '../../../utils/path-utils';
import { Page } from '../page/Page';
import BlockUI from './BlockUI';

export default class Block implements IJsonSerializable {
	private device: Device | null = null;
	private deviceVariant: DeviceVariant | null = null;
	private data: BlockData;
	public Index: number;
	public readonly UI: BlockUI;

	constructor(public readonly PrimaryPage: Page) {
		this.Index = 1;
		this.UI = new BlockUI(this);
		this.data = {};
	}

	public set Device(value: Device | null) {
		this.device = value;
		this.data = {};
	}
	public get Device(): typeof this.device {
		return this.device;
	}

	public set DeviceVariant(value: DeviceVariant | null) {
		this.deviceVariant = value;
		this.data.variant = {};
	}
	public get DeviceVariant(): typeof this.deviceVariant {
		return this.deviceVariant;
	}

	public toJSON(): SerializedBlock {
		return {
			block: this.Index,
			type: this.device!,
			data: {
				...this.data,
				variant: this.requiresVariant() ? this.data.variant : undefined,
				variant_type: this.deviceVariant ?? undefined,
			},
		};
	}

	public resolvePath(fieldKey: string, overridePath?: string): string {
		const basePath =
			overridePath ??
			PATH_MAP.get(
				isFieldInVariant(this.deviceVariant, fieldKey)
					? PathType.variant
					: PathType.base,
			)!;
		return `${basePath}${VALUES.PATH_SEPARATOR}${fieldKey}`;
	}

	public setParam(fieldKey: string, value: any, path?: string): any {
		return setByPath(this, this.resolvePath(fieldKey, path), value);
	}

	public getParam(fieldKey: string, path?: string): any {
		return getByPath(this, this.resolvePath(fieldKey, path));
	}

	public validate(): boolean {
		return (
			this.device !== null && !this.isVariantMissing() && this.validateFields()
		);
	}

	public validateFields(): boolean {
		let allValid = true;

		const fields = this.UI.getFields();
		fields.forEach(field => {
			if (!field.validate()) allValid = false;
		});

		return allValid;
	}

	public requiresVariant(): boolean {
		return DEVICE_VARIANT_MAP.has(this.device!);
	}

	public hasVariantSelected(): boolean {
		return Boolean(this.DeviceVariant);
	}

	public isVariantMissing(): boolean {
		return this.requiresVariant() && !this.hasVariantSelected();
	}

	public save(): boolean {
		let saved = true;
		if (!this.validate()) return (saved = false);

		const fields = this.UI.getFields();
		fields.forEach(field => {
			const option = field.option;
			const isInBase = isFieldInBase(this.device, field.key);
			const isInVariant = isFieldInVariant(this.DeviceVariant, field.key);

			const value = field.getValue() ?? '';
			const path =
				option.savePath ??
				(isInVariant
					? PATH_MAP.get(PathType.variant)
					: isInBase
						? PATH_MAP.get(PathType.base)
						: '');

			setByPath(this, `${path}${VALUES.PATH_SEPARATOR}${field.key}`, value);
		});

		return saved;
	}
}
