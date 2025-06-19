import { EnumOption } from '../../../global/types/option';
import { Device } from '../../enums/device';

export const DEVICE_OPTIONS = new Map<Device, EnumOption>([
	[
		Device.scene,
		{
			label: 'Сценарий',
		},
	],

	[
		Device.light,
		{
			label: 'Освещение',
		},
	],

	[
		Device.climate,
		{
			label: 'Климат',
		},
	],

	[
		Device.cover,
		{
			label: 'Занавесы',
		},
	],

	[
		Device.sensor,
		{
			label: 'Датчик',
		},
	],
]) as ReadonlyMap<Device, EnumOption>;
