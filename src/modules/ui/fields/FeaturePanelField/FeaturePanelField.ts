import { PLACEHOLDERS } from '../../../../data/constants/placeholders';
import { Feature } from '../../../../data/enums/feature';
import { ViewId } from '../../../../data/enums/view-id';
import { ParamOption } from '../../../../global/types/option';
import { showConfirm, showMessage } from '../../../../utils/alert-utils';
import { getFeatureParams, isFieldInFeature } from '../../../../utils/option-utils';
import BaseField from '../BaseField';
import FeaturePanelFieldUI from './FeaturePanelFieldUI';
import Tab from './Tab/Tab';

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

		const records = Object.values(record).map((tab: any) =>
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
}
