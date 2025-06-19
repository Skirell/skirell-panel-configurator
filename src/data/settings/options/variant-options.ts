import { EnumOption } from '../../../global/types/option';
import { DeviceVariant } from '../../enums/device';

export const VARIANT_OPTIONS = new Map<DeviceVariant, EnumOption>([
	[
		DeviceVariant.light_variant_OnOff,
		{
			label: 'Вкл/Выкл - Реле',
		},
	],
	[
		DeviceVariant.light_variant_dimmer,
		{
			label: 'Яркость - Диммер',
		},
	],
	[
		DeviceVariant.light_variant_color,
		{
			label: 'RGB цвет',
		},
	],
	[
		DeviceVariant.light_variant_temperature,
		{
			label: 'Температура цвета',
		},
	],

	[
		DeviceVariant.climate_variant_cond,
		{
			label: 'Расширенный термостат',
		},
	],
	[
		DeviceVariant.climate_variant_thermostat,
		{
			label: 'Термостат',
		},
	],

	[
		DeviceVariant.cover_variant_slider,
		{
			label: 'Основной',
		},
	],
]) as ReadonlyMap<DeviceVariant, EnumOption>;
