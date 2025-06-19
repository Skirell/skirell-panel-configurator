import { FieldType } from '../../../global/types/field';
import { ParamOption } from '../../../global/types/option';
import { TextField } from '../../../modules/ui/fields';
import BaseField from '../../../modules/ui/fields/BaseField';
import BooleanField from '../../../modules/ui/fields/BooleanFields';
import ColorField from '../../../modules/ui/fields/ColorField';
import { FeaturePanelField } from '../../../modules/ui/fields/FeaturePanelField';
import { IconField } from '../../../modules/ui/fields/IconField';
import { NumberField } from '../../../modules/ui/fields/NumberField';
import { OptionField } from '../../../modules/ui/fields/OptionField';

export const FIELD_CONSTRUCTORS_MAP: Record<
	FieldType,
	new (key: string, opt: ParamOption, val?: any) => BaseField
> = {
	text: TextField,
	number: NumberField,
	boolean: BooleanField,
	color: ColorField,
	options: OptionField,
	feature: FeaturePanelField,
    icon: IconField
};
