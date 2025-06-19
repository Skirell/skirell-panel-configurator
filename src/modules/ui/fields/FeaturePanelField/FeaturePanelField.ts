import { PLACEHOLDERS } from '../../../../data/constants/placeholders';
import { Feature } from '../../../../data/enums/feature';
import { ViewId } from '../../../../data/enums/view-id';
import { ParamOption } from '../../../../global/types/option';
import { showConfirm, showMessage } from '../../../../utils/alert-utils';
import { getFeatureParams, isFieldInFeature } from '../../../../utils/option-utils';
import BaseField from '../BaseField';
import FeaturePanelFieldUI from './FeaturePanelFieldUI';
import Tab from './Tab/Tab';

// ВРЕМЕННО
interface Sensor {
	icon: any;
	measure: any;
	state_topic: any;
}

export default class FeaturePanelField extends FeaturePanelFieldUI {
	protected readonly value: Map<string, any> = new Map();

	constructor(
		fieldKey: string,
		option: ParamOption,
		initialValue: string | undefined,
	) {
		super(fieldKey, option, initialValue);
	}

	public init() {
		if (this.option.required && this.tabs.length < this.featureSettings.minCount)
			for (let i = 0; i < this.featureSettings.minCount; i++) this.addTab();

		this.refreshUI();
	}

	public setValue(record: Record<string, any>): void {
		this.clearTabs();

		const records =
			this.feature === Feature.sensor
				? this.deserializeSensors(record, this.featureSettings.maxCount)
				: Object.values(record).map((tab: any) =>
						// фильтруем только релевантные поля по свойству
						Object.fromEntries(
							Object.entries(tab).filter(([key]) =>
								isFieldInFeature(this.feature, key),
							),
						),
					);

		for (const tabParams of records) {
			const hasEmpty = Object.values(tabParams).some(
				value => value === '' || value == null,
			);
			if (hasEmpty) continue;

			const tab = this.addTab();
			for (const [fieldKey, value] of Object.entries(tabParams))
				tab.setParam(fieldKey, value);
			tab.UI.populateFields();
		}

		this.refreshUI();
	}

	public getValue(): Record<string, any> {
		if (this.feature === Feature.sensor) return this.serializeSensors();

		const result: Record<string, Record<string, any>> = {};
		const featureParams = getFeatureParams(this.feature);
		const max = this.featureSettings.maxCount;

		for (let i = 0; i < max; i++) {
			const idx = i + 1;
			const fullKey = `${this.keyPrefix}${idx}`;

			if (i < this.tabs.length && this.tabs[i].validateFields()) {
				const tab = this.tabs[i];
				tab.save();
				result[fullKey] = tab.toJSON();
			} else {
				const phantomData: Record<string, any> = {};
				for (const [key, option] of featureParams)
					phantomData[key] = this.getDefaultValue(option);
				result[fullKey] = phantomData;
			}
		}

		return result;
	}

	public validate(): boolean {
		let success = true;
		this.tabs.forEach(tab => {
			if (!tab.validateFields()) success = false;
		});
		return success;
	}

	private getDefaultValue(option: ParamOption): any {
		switch (option.fieldType) {
			case 'number':
				return 0;
			case 'boolean':
				return false;
			default:
				return '';
		}
	}

	// ВРЕМЕННО
	private serializeSensors(): Record<string, any> {
		const sensors: Record<string, any> = {};
		const max = this.featureSettings.maxCount;

		for (let i = 0; i < max; i++) {
			const idx = i + 1;

			if (i < this.tabs.length && this.tabs[i].validateFields()) {
				const tab = this.tabs[i];
				tab.save();

				const sensor = tab.toJSON();
				sensors[`sensor_${idx}_icon`] = sensor.icon;
				sensors[`sensor_${idx}_measure`] = sensor.measure;
				sensors[`sensor_${idx}_state_topic`] = sensor.state_topic;
			} else {
				sensors[`sensor_${idx}_icon`] = '';
				sensors[`sensor_${idx}_measure`] = '';
				sensors[`sensor_${idx}_state_topic`] = '';
			}
		}

		return sensors;
	}

	private deserializeSensors(
		serialized: Record<string, any>,
		maxCount: number,
	): Sensor[] {
		const sensors: Sensor[] = [];

		for (let i = 1; i <= maxCount; i++) {
			const iconKey = `sensor_${i}_icon`;
			const measureKey = `sensor_${i}_measure`;
			const stateTopicKey = `sensor_${i}_state_topic`;

			const icon = serialized[iconKey];
			const measure = serialized[measureKey];
			const state_topic = serialized[stateTopicKey];
			// пропустим пустые сенсоры
			if (icon === '' || measure === '' || state_topic === '') continue;

			sensors.push({ icon, measure, state_topic });
		}

		return sensors;
	}
}
