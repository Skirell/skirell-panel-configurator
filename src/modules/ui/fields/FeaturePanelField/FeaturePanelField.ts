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

	public getValue(): Record<string, any> | null {
		const result: Record<string, Record<string, any>> = {};
		const featureParams = getFeatureParams(this.feature);
		const max = this.featureSettings.maxCount;

		for (let i = 0; i < max; i++) {
			const idx = i + 1;
			const fullKey = `${this.keyPrefix}${idx}`;

			if (i < this.tabs.length && this.tabs[i].validateFields()) {
				const tab = this.tabs[i];
				tab.save();
				const tabData = tab.toJSON();

				// Проверяем, пустой ли датчик (все поля кроме measure пустые)
				const isEmptySensor = Object.entries(tabData).every(([key, value]) => {
					// Поле measure всегда должно быть включено, даже если пустое
					if (key === 'measure') return false;
					return value === '' || value === null || value === undefined;
				});

				// Добавляем только непустые датчики
				if (!isEmptySensor) {
					result[fullKey] = tabData;
				}
			}
		}

		// Если нет ни одного непустого датчика, возвращаем null
		return Object.keys(result).length > 0 ? result : null;
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
