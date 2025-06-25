import { LIMITS } from '../../../data/constants/limits';
import { FieldClass, SpanClass } from '../../../data/enums/classNames';
import { FieldSettings } from '../../../global/types/field';
import { ParamOption } from '../../../global/types/option';

function createRequiredSpan(): HTMLElement {
	const requiredSpan = document.createElement('span');
	requiredSpan.textContent = '*';
	requiredSpan.classList.add(SpanClass.REQUIRED);
	return requiredSpan;
}

export default abstract class BaseField<T = any> {
	public settings: FieldSettings;
	protected value: T;
	protected required: boolean = false;
	protected listeners: Array<(newValue: any) => void> = [];

	protected rootElement!: HTMLDivElement;
	protected inputElement?: HTMLElement;
	protected labelElement?: HTMLLabelElement;

	constructor(
		public readonly key: string,
		public readonly option: ParamOption,
		initialValue?: T,
	) {
		this.value = initialValue as T;
		this.required = option.required ?? false;
		this.settings = option.fieldSettings ?? {};
	}

	abstract render(): HTMLElement;

	init(): void {}

	getRootElement(): HTMLDivElement {
		return this.rootElement;
	}

	getValue(): T {
		return this.value;
	}

	setValue(newValue: any): void {
		const oldValue = this.value;
		this.value = newValue;
		if (newValue !== oldValue) this.notifyChange(newValue);

		this.refreshUI();
	}

	setState(key: string, value: any) {
		if (key === 'required') {
			this.required = !!value;

			// Обновляем placeholder
			if (this.inputElement && this.inputElement instanceof HTMLInputElement) {
				this.inputElement.required = this.required;
				this.inputElement.placeholder =
					this.option.placeholder ??
					`${this.required ? 'Обязательное' : 'Необязательное'} поле`;
			}

			// Обновляем label: добавить/удалить звёздочку
			if (this.labelElement) {
				const existing = this.labelElement.querySelector(
					`.${SpanClass.REQUIRED}`,
				);
				if (this.required && !existing) {
					this.labelElement.appendChild(createRequiredSpan());
				} else if (!this.required && existing) {
					existing.remove();
				}
			}

            this.validate();
		}
	}

	onChange(callback: (newValue: any) => void): void {
		this.listeners.push(callback);
	}

	validate(): boolean {
        const isEmpty =
            this.value === null ||
            this.value === undefined ||
            this.value === '' ||
            (Array.isArray(this.value) && this.value.length === 0);
    
        if (this.required && isEmpty) {
            this.inputElement?.classList.add(FieldClass.INVALID);
            return false;
        }
    
        this.inputElement?.classList.remove(FieldClass.INVALID);
        return true;
    }

	protected refreshUI(): void {
		// переопределяется в потомках при необходимости
	}

	protected onInput(value: T): void {
		this.setValue(value);
		this.validate();
	}

	protected buildLabel(htmlFor?: string): HTMLLabelElement {
		const label = document.createElement('label');
		label.htmlFor = htmlFor ?? this.key;
		label.textContent = this.option.label;
		if (this.required) label.appendChild(createRequiredSpan());
		this.labelElement = label;
		return label;
	}

    protected updateLabel(newOption: ParamOption): void {
        if (this.labelElement) {
            const existingStar = this.labelElement.querySelector(
                `.${SpanClass.REQUIRED}`
            );
            if (existingStar) existingStar.remove();
    
            this.labelElement.textContent = newOption.label;
    
            if (newOption.required) {
                this.labelElement.appendChild(createRequiredSpan());
            }
        }
    }

    public setOption(option: ParamOption): void {
        this.required = option.required ?? false;
        this.settings = option.fieldSettings ?? {};
    
        // Обновляем label
        this.updateLabel(option);
    
        if (this.inputElement && this.inputElement instanceof HTMLInputElement) {
            this.inputElement.placeholder =
                this.option.placeholder ??
                `${this.required ? 'Обязательное' : 'Необязательное'} поле`;
            this.inputElement.required = this.required;
        }

        this.refreshUI();
    }

	protected buildInputElement(type: string): HTMLInputElement {
		const input = document.createElement('input');
		input.type = type;
		input.id = this.key;
		input.value = (this.value ?? '') as any;
		input.required = this.required;
		input.placeholder =
			this.option.placeholder ??
			`${this.required ? 'Обязательное' : 'Необязательное'} поле`;

		const settings = this.settings;
		input.maxLength = settings.maxLength ?? LIMITS.MAX_FIELD_LENGTH;
		input.minLength = settings.minLength ?? LIMITS.MIN_FIELD_LENGTH;
		input.step = settings.step?.toString() ?? 'any';
		input.dataset.key = this.key;
		input.max = (settings.maxNumber ?? LIMITS.MAX_FIELD_NUMBER).toString();
		input.min = (settings.minNumber ?? LIMITS.MIN_FIELD_NUMBER).toString();

		this.inputElement = input;

		return input;
	}

	protected wrapField(
		elements: HTMLElement[],
		classNames?: string[],
	): HTMLDivElement {
		const wrapper = document.createElement('div');
		wrapper.classList.add(FieldClass.FIELD_CONTAINER, ...(classNames ?? []));
		wrapper.append(...elements);
		return wrapper;
	}

	private notifyChange(newValue: any): void {
		for (const listener of this.listeners) {
			try {
				listener(newValue);
			} catch (err) {
				console.error(
					`Ошибка в onChange-колбэке для поля "${this.key}":`,
					err,
				);
			}
		}
	}
}
