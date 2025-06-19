import { beforeEach } from 'node:test';
import { ParamOption } from '../../../global/types/option';
import { DeviceVariant } from '../../enums/device';
import { Feature } from '../../enums/feature';
import { Operator } from '../../enums/operator';
import { Action } from '../../enums/action';

export const VARIANT_PARAM_OPTIONS = new Map<
	DeviceVariant,
	Map<string, ParamOption>
>([
	[
		DeviceVariant.light_variant_OnOff,
		new Map<string, ParamOption>([
			[
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off',
					fieldType: 'text',
					required: true,
				},
			],
		]),
	],
	[
		DeviceVariant.light_variant_dimmer,
		new Map<string, ParamOption>([
			[
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale',
					fieldType: 'number',
					required: true,
				},
			],
		]),
	],
	[
		DeviceVariant.light_variant_color,
		new Map<string, ParamOption>([
			[
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'color_command_topic',
				{
					label: 'color_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
		]),
	],
	[
		DeviceVariant.light_variant_temperature,
		new Map<string, ParamOption>([
			[
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'temp_command_topic',
				{
					label: 'temp_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'temp_state_topic',
				{
					label: 'temp_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max_temp',
				{
					label: 'max_temp',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'min_temp',
				{
					label: 'min_temp',
					fieldType: 'number',
					required: true,
				},
			],
		]),
	],
	[
		DeviceVariant.cover_variant_slider,
		new Map<string, ParamOption>([
			[
				'orientation',
				{
					label: 'Направление',
					fieldType: 'options',
					fieldOptions: [
						{ label: 'Горизонтально', value: 'Horizontal' },
						{ label: 'Вертикально', value: 'Vertical' },
					],
					required: true,
				},
			],
			[
				'OpenCloseStop_command_topic',
				{
					label: 'OpenCloseStop_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'open_command_topic',
				{
					label: 'open_command_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'OpenCloseStop_command_topic',
									operator: Operator.empty,
								},
							],
						},
					},
					required: true,
				},
			],
			[
				'close_command_topic',
				{
					label: 'close_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'stop_command_topic',
				{
					label: 'stop_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_open',
				{
					label: 'payload_open',
					fieldType: 'text',
				},
			],
			[
				'payload_close',
				{
					label: 'payload_close',
					fieldType: 'text',
				},
			],
			[
				'payload_stop',
				{
					label: 'payload_stop',
					fieldType: 'text',
				},
			],
			[
				'OpenClose_state_topic',
				{
					label: 'OpenClose_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'state_open',
				{
					label: 'state_open',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'state_close',
				{
					label: 'state_close',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_command_topic',
				{
					label: 'position_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_state_topic',
				{
					label: 'position_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_open',
				{
					label: 'position_open',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'position_close',
				{
					label: 'position_close',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'lameli',
				{
					label: 'Ламели',
					fieldType: 'boolean',
				},
			],
			[
				'OpenClose_lameli_command_topic',
				{
					label: 'OpenClose_lameli_command_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'open_lameli_command_topic',
				{
					label: 'open_lameli_command_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'close_lameli_command_topic',
				{
					label: 'close_lameli_command_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'payload_lameli_open',
				{
					label: 'payload_lameli_open',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'payload_lameli_close',
				{
					label: 'payload_lameli_close',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'position_lameli_command_topic',
				{
					label: 'position_lameli_command_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'position_lameli_state_topic',
				{
					label: 'position_lameli_state_topic',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'position_lameli_open',
				{
					label: 'position_lameli_open',
					fieldType: 'number',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
			[
				'position_lameli_close',
				{
					label: 'position_lameli_close',
					fieldType: 'number',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'lameli',
									operator: Operator.equals,
									value: true,
								},
							],

							actions: {
								true: [
									{
										type: Action.setState,
										key: 'required',
										value: true,
									},
								],

								false: [
									{
										type: Action.setState,
										key: 'required',
										value: false,
									},
								],
							},
						},
					},
				},
			],
		]),
	],
	[
		DeviceVariant.climate_variant_cond,
		new Map<string, ParamOption>([
			[
				'modes',
				{
					label: 'Режимы работы',
					fieldType: 'feature',
					feature: Feature.modes,
					featurePanelSettings: { 
                        maxCount: 4, 
                        minCount: 1 
                    },
					required: true,
				},
			],
			[
				'mode_command_topic',
				{
					label: 'mode_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'mode_state_topic',
				{
					label: 'mode_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'off_payload',
				{
					label: 'off_payload',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'currentTemp_state_topic',
				{
					label: 'currentTemp_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_command_topic',
				{
					label: 'targetTemp_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_state_topic',
				{
					label: 'targetTemp_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_command_topic',
				{
					label: 'fan_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_state_topic',
				{
					label: 'fan_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_modes',
				{
					label: 'fan_modes',
					fieldType: 'feature',
					feature: Feature.fan_mode,
					featurePanelSettings: {
						maxCount: 5,
						minCount: 2,
						minOrEmpty: true,
					},
				},
			],
		]),
	],
	[
		DeviceVariant.climate_variant_thermostat,
		new Map<string, ParamOption>([
			[
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic',
					fieldType: 'text',
					fieldSettings: {},
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_command_topic',
				{
					label: 'targetTemp_command_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_state_topic',
				{
					label: 'targetTemp_state_topic',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'sensor',
				{
					label: 'sensor',
					fieldType: 'feature',
					feature: Feature.sensor,
					featurePanelSettings: { 
                        maxCount: 3, 
                        minCount: 0 
                    },
				},
			],
			[
				'sensor_main',
				{
					label: 'sensor_main',
					fieldType: 'number',
					savePath: 'data/variant/sensors',
					required: true,
				},
			],
		]),
	],
]) as ReadonlyMap<DeviceVariant, ReadonlyMap<string, ParamOption>>;
