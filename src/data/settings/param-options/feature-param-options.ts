import { ParamOption } from '../../../global/types/option';
import { Feature } from '../../enums/feature';

export const FEATURE_PARAM_OPTIONS = new Map<Feature, Map<string, ParamOption>>([
	[
		Feature.modes,
		new Map<string, ParamOption>([
			[
				'title',
				{
					label: 'title',
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
		Feature.fan_mode,
		new Map<string, ParamOption>([
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
		Feature.sensor,
		new Map<string, ParamOption>([
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
				'measure',
				{
					label: 'measure',
					fieldType: 'text',
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
]) as ReadonlyMap<Feature, ReadonlyMap<string, ParamOption>>;
