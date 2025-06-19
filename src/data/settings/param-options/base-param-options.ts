import { ParamOption } from '../../../global/types/option';
import { Device } from '../../enums/device';

export const BASE_PARAM_OPTIONS = new Map<Device, Map<string, ParamOption>>([
	[
		Device.scene,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2',
					fieldType: 'text',
				},
			],
			[
				'param_3',
				{
					label: 'param_3',
					fieldType: 'text',
				},
			],
			[
				'icon',
				{
					label: 'icon',
					fieldType: 'icon',
                    placeholder: '',
					required: true,
				},
			],
			[
				'command_topic',
				{
					label: 'command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload',
				{
					label: 'payload',
					fieldType: 'text',
					required: true,
				},
			],
		]),
	],
	[
		Device.sensor,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1',
					fieldType: 'text',
				},
			],
			[
				'measure',
				{
					label: 'measure',
					fieldType: 'text',
				},
			],
			[
				'min',
				{
					label: 'min',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'stage_1',
				{
					label: 'stage_1',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'stage_2',
				{
					label: 'stage_2',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max',
				{
					label: 'max',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'color_1',
				{
					label: 'color_1',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'color_2',
				{
					label: 'color_2',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'color_3',
				{
					label: 'color_3',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'state_topic',
				{
					label: 'state_topic',
					fieldType: 'text',
					required: true,
				},
			],
		]),
	],
	[
		Device.light,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon',
				{
					label: 'icon',
					fieldType: 'icon',
					required: true,
				},
			],
		]),
	],
	[
		Device.cover,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon_open',
				{
					label: 'icon_open',
					fieldType: 'icon',
					required: true,
				},
			],
			[
				'icon_close',
				{
					label: 'icon_close',
					fieldType: 'icon',
					required: true,
				},
			],
		]),
	],
	[
		Device.climate,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon',
				{
					label: 'icon',
					fieldType: 'icon',
					required: true,
				},
			],
			[
				'min_target',
				{
					label: 'min_target',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max_target',
				{
					label: 'max_target',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'measure',
				{
					label: 'measure',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'color',
				{
					label: 'color',
					fieldType: 'color',
					required: true,
				},
			],
		]),
	],
]) as ReadonlyMap<Device, ReadonlyMap<string, ParamOption>>;
