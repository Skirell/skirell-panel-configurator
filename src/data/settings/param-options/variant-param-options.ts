import { beforeEach } from 'node:test';
import { ParamOption } from '../../../global/types/option';
import { DeviceVariant } from '../../enums/device';
import { Feature } from '../../enums/feature';
import { Operator } from '../../enums/operator';
import { ConditionOperator } from '../../enums/operator';
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
					label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on — Команда(Сообщение) для включения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off — Команда(Сообщение) для выключения',
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
					label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on — Команда(Сообщение) для включения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off — Команда(Сообщение) для выключения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic — Командный MQTT-топик для отправки яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic — MQTT-топик обратной связи для получения яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale — Максимальное значение яркости',
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
					label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on — Команда(Сообщение) для включения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off — Команда(Сообщение) для выключения',
					fieldType: 'text',
					required: true,
				},
            ],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic — Командный MQTT-топик для отправки яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic — MQTT-топик обратной связи для получения яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale — Максимальное значение яркости',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'color_command_topic',
				{
					label: 'color_command_topic — Командный MQTT-топик для отправки цвета',
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
                    label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
                    fieldType: 'text',
                    required: true,
                },
            ],
            [
                'OnOff_state_topic',
                {
                    label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
                    fieldType: 'text',
                    required: true,
                },
            ],
            [
                'payload_on',
                {
                    label: 'payload_on — Команда(Сообщение) для включения',
                    fieldType: 'text',
                    required: true,
                },
            ],
            [
                'payload_off',
                {
                    label: 'payload_off — Команда(Сообщение) для выключения',
                    fieldType: 'text',
                    required: true,
                },
            ],
			[
				'brightness_command_topic',
				{
					label: 'brightness_command_topic — Командный MQTT-топик для отправки яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_state_topic',
				{
					label: 'brightness_state_topic — MQTT-топик обратной связи для получения яркости',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'brightness_scale',
				{
					label: 'brightness_scale — Максимальное значение яркости',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'temp_command_topic',
				{
					label: 'temp_command_topic — Командный MQTT-топик для отправки температуры',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'temp_state_topic',
				{
					label: 'temp_state_topic — MQTT-топик обратной связи для получения температуры',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max_temp',
				{
					label: 'max_temp — Максимальная температура',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'min_temp',
				{
					label: 'min_temp — Минимальная температура',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'temp_measure',
				{
					label: 'temp_measure — Единица измерения температуры',
					fieldType: 'text'
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
					label: 'orientation - Направление',
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
					label: 'OpenCloseStop_command_topic - Объединенный командный MQTT-топик (откр/закр/стоп)',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'open_command_topic',
									operator: Operator.empty,
								},
                                {
									fieldKey: 'close_command_topic',
									operator: Operator.empty,
								},
							],

                            operator: ConditionOperator.or,

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
				'open_command_topic',
				{
					label: 'open_command_topic - командный MQTT-топик для открытия',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'OpenCloseStop_command_topic',
									operator: Operator.empty,
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
				'close_command_topic',
				{
					label: 'close_command_topic - командный MQTT-топик для закрытия',
					fieldType: 'text',
					fieldSettings: {
						behavior: {
							dependencies: [
								{
									fieldKey: 'OpenCloseStop_command_topic',
									operator: Operator.empty,
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
				'stop_command_topic',
				{
					label: 'stop_command_topic - командный MQTT-топик для остановки',
					fieldType: 'text'
				},
			],
			[
				'payload_open',
				{
					label: 'payload_open - сообщение для открытия',
					fieldType: 'text',
				},
			],
			[
				'payload_close',
				{
					label: 'payload_close - сообщение для закрытия',
					fieldType: 'text',
				},
			],
			[
				'payload_stop',
				{
					label: 'payload_stop - сообщение для остановки',
					fieldType: 'text',
				},
			],
			[
				'OpenClose_state_topic',
				{
					label: 'OpenClose_state_topic - MQTT-топик обратной связи, для откр/закр',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'state_open',
				{
					label: 'state_open - сообщение открытия, отправляемое шторами',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'state_close',
				{
					label: 'state_close - сообщение закрытия, отправляемое шторами',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_command_topic',
				{
					label: 'position_command_topic - командный MQTT-топик для установки позиции',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_state_topic',
				{
					label: 'position_state_topic - MQTT-топик обратной связи для позиции',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'position_open',
				{
					label: 'position_open - конечная позиция в положении открыто',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'position_close',
				{
					label: 'position_close - конечная позиция в положении закрыто',
					fieldType: 'number',
					required: true,
				},
			],
			[
				'lameli',
				{
					label: 'Ламели - вкл/выкл',
					fieldType: 'boolean',
				},
			],
			[
				'OpenClose_lameli_command_topic',
				{
					label: 'OpenClose_lameli_command_topic - Объединенный командный MQTT-топик (откр/закр/стоп)',
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
					label: 'open_lameli_command_topic - командный MQTT-топик для открытия',
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
					label: 'close_lameli_command_topic - командный MQTT-топик для закрытия',
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
					label: 'payload_lameli_open - сообщение для открытия',
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
					label: 'payload_lameli_close - сообщение для закрытия',
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
					label: 'position_lameli_command_topic - командный MQTT-топик для установки позиции',
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
					label: 'position_lameli_state_topic - MQTT-топик обратной связи для позиции',
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
					label: 'position_lameli_open - конечная позиция в положении открыто',
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
					label: 'position_lameli_close - конечная позиция в положении закрыто',
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
				'OnOff_command_topic',
				{
					label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
					fieldType: 'text',
					fieldSettings: {},
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on — Команда (Сообщение) для включения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off — Команда (Сообщение) для выключения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'modes',
				{
					label: 'modes — Массив режимов при включенном состоянии',
					fieldType: 'feature',
					feature: Feature.modes,
					featurePanelSettings: { 
                        maxCount: 5, 
                        minCount: 2,
						minOrEmpty: true
                    },
					required: true,
				},
			],
			[
				'mode_command_topic',
				{
					label: 'mode_command_topic — Командный MQTT-топик для режимов',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'mode_state_topic',
				{
					label: 'mode_state_topic — MQTT-топик обратной связи для режимов',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'currentTemp_state_topic',
				{
					label: 'currentTemp_state_topic — MQTT-топик обратной связи текущей температуры',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_command_topic',
				{
					label: 'targetTemp_command_topic — Командный MQTT-топик для заданной температуры (уставки)',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_state_topic',
				{
					label: 'targetTemp_state_topic — MQTT-топик обратной связи для заданной температуры (уставки)',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_command_topic',
				{
					label: 'fan_command_topic — Командный MQTT-топик для дополнительных режимов',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_state_topic',
				{
					label: 'fan_state_topic — MQTT-топик обратной связи для дополнительных режимов',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'fan_modes',
				{
					label: 'fan_modes — Массив дополнительных режимов',
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
					label: 'OnOff_command_topic — Командный MQTT-топик для отправки команды',
					fieldType: 'text',
					fieldSettings: {},
					required: true,
				},
			],
			[
				'OnOff_state_topic',
				{
					label: 'OnOff_state_topic — MQTT-топик обратной связи для получения состояния',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_on',
				{
					label: 'payload_on — Команда (Сообщение) для включения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload_off',
				{
					label: 'payload_off — Команда (Сообщение) для выключения',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_command_topic',
				{
					label: 'targetTemp_command_topic — Командный MQTT-топик для заданной температуры (уставки)',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'targetTemp_state_topic',
				{
					label: 'targetTemp_state_topic — MQTT-топик обратной связи для заданной температуры (уставки)',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'sensors',
				{
					label: 'sensors — Массив с датчиками',
					fieldType: 'feature',
					feature: Feature.sensors,
					featurePanelSettings: { 
                        maxCount: 3, 
                        minCount: 0,
                        keyPrefix: 'sensor_'
                    },
				},
			],
			[
				'sensor_main',
				{
					label: 'sensor_main — Номер главного датчика, выводимого на блок устройства',
					fieldType: 'number',
					required: true,
				},
			],
		]),
	],
]) as ReadonlyMap<DeviceVariant, ReadonlyMap<string, ParamOption>>;
