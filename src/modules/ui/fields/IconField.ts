import { ParamOption } from '../../../global/types/option';
import BaseField from './BaseField';

export class IconField<T> extends BaseField {
    constructor(fieldKey: string, option: ParamOption, initialValue?: T) {
        super(fieldKey, option, initialValue);
    }

    public render(): HTMLElement {
        const label = this.buildLabel();
        const input = this.buildInputElement('icon');

        input.addEventListener('input', () => this.onInput(input.value));
        input.classList.add('icon-field');

        this.rootElement = this.wrapField([label, input]);
        this.inputElement = input;
        return this.rootElement;
    }
}