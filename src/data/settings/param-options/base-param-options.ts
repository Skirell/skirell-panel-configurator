import { ParamOption } from '../../../global/types/option';
import { Device } from '../../enums/device';

export const BASE_PARAM_OPTIONS = new Map<Device, Map<string, ParamOption>>([
	[
		Device.scene,
		new Map<string, ParamOption>([
			[
				'param_1',
				{
					label: 'param_1 — назначение блока (например: Ужин, Кино)',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2 — локация или контекст использования',
					fieldType: 'text',
				},
			],
			[
				'param_3',
				{
					label: 'param_3 — название сценария или режима',
					fieldType: 'text',
				},
			],
			[
				'icon',
				{
					label: 'icon — иконка, отображаемая на блоке',
					fieldType: 'icon',
                    placeholder: '',
					required: true,
				},
			],
			[
				'command_topic',
				{
					label: 'command_topic — MQTT-топик для отправки команды',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'payload',
				{
					label: 'payload — команда, отправляемая при нажатии',
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
					label: 'param_1 — название датчика (например: Температура)',
					fieldType: 'text',
				},
			],
			[
				'measure',
				{
					label: 'measure — единица измерения (например: °C)',
					fieldType: 'text',
				},
			],
			[
				'min',
				{
					label: 'min — минимальное значение(датчика) для цветового индикатора',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'stage_1',
				{
					label: 'stage_1 — первая граница для цветового индикатора',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'stage_2',
				{
					label: 'stage_2 — вторая граница для цветового индикатора',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max',
				{
					label: 'max — максимальное значение(датчика) для цветового индикатора',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'color_1',
				{
					label: 'color_1 — цвет индикатора для значений ниже stage_1 (значение датчика < stage_1)',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'color_2',
				{
					label: 'color_2 — цвет индикатора для значений между stage_1 и stage_2 (stage_1 >= значение датчика <= stage_2)',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'color_3',
				{
					label: 'color_3 — цвет индикатора для значений выше stage_2 (значение датчика > stage_2)',
					fieldType: 'color',
					required: true,
				},
			],
			[
				'state_topic',
				{
					label: 'state_topic — MQTT-топик обратной связи для получения данных',
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
					label: 'param_1 — назначение блока (например, тип устройства: «Люстра», «Подсветка»)',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2 — локация или контекст использования (например, «Кухня», «Гостиная»)',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name — название устройства в настройках',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon',
				{
					label: 'icon — иконка, отображаемая на блоке',
					fieldType: 'icon',
                    placeholder: '',
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
					label: 'param_1 — назначение блока (например, тип устройства: «Штора», «Ламели»)',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2 — локация или контекст использования (например, «Кухня», «Гостиная»)',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name — название устройства в настройках',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon_open',
				{
					label: 'icon_open — иконка «Открыто в блоке ~ Открыть в настройках»',
					fieldType: 'icon',
                    placeholder: '',
					required: true,
				},
			],
			[
				'icon_close',
				{
					label: 'icon_close — иконка Закрыто в блоке ~ Закрыть в настройках»',
					fieldType: 'icon',
                    placeholder: '',
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
					label: 'param_1 — назначение блока (например, тип устройства: «Тёплый пол», «Увлажнитель»)',
					fieldType: 'text',
				},
			],
			[
				'param_2',
				{
					label: 'param_2 — локация или контекст использования (например, «Кухня», «Гостиная»)',
					fieldType: 'text',
				},
			],
			[
				'setting_name',
				{
					label: 'setting_name — название устройства в настройках',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'icon',
				{
					label: 'icon — иконка, отображаемая на блоке',
					fieldType: 'icon',
                    placeholder: '',
					required: true,
				},
			],
			[
				'min_target',
				{
					label: 'min_target — минимальное значение целевой (заданной) температуры',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'max_target',
				{
					label: 'max_target — максимальное значение целевой (заданной) температуры',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'measure',
				{
					label: 'measure — единица измерения (например: «°C»)',
					fieldType: 'text',
					required: true,
				},
			],
			[
				'color',
				{
					label: 'color — цвет блока в активном состоянии',
					fieldType: 'color',
					required: true,
				},
			],
		]),
	],
]) as ReadonlyMap<Device, ReadonlyMap<string, ParamOption>>;
