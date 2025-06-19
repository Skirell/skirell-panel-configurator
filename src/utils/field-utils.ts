import { FIELD_CONSTRUCTORS_MAP } from '../data/settings/maps/field-constructors-map';
import { ParamOption } from '../global/types/option';
import BaseField from '../modules/ui/fields/BaseField';

export function createFieldInstance(
	fieldKey: string,
	option: ParamOption,
	initialValue?: any,
): BaseField | undefined {
	const FieldClass = FIELD_CONSTRUCTORS_MAP[option.fieldType];
	if (!FieldClass) {
		console.warn(`Поле для типа ${option.fieldType} не предусмотрено!`);
		return;
	}
	return new FieldClass(fieldKey, option, initialValue);
}
