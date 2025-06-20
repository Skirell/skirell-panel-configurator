import { FieldClass } from '../../../data/enums/classNames';
import { Color } from '../../../data/enums/color';
import { ViewId } from '../../../data/enums/view-id';
import { COLOR_OPTIONS } from '../../../data/settings/options/color-options';
import { ColorOption, ParamOption } from '../../../global/types/option';
import BaseField from './BaseField';

export default class ColorField extends BaseField<string> {
	constructor(
		fieldKey: string,
		option: ParamOption,
		initialValue: string | undefined,
	) {
		super(fieldKey, option, initialValue);
	}

	public render(): HTMLDivElement {
		const label = this.buildLabel();
		const button = this.buildButton();
		const list = this.buildList();

		this.rootElement = this.buildDropdown(label, button, list);
		this.inputElement = button;
		return this.rootElement;
	}

	public validate(): boolean {
		const ok = super.validate();
		if (!ok || (this.option.required && !this.value && this.value === '')) {
			this.inputElement!.classList.add(FieldClass.INVALID);
			return false;
		}
		this.inputElement!.classList.remove(FieldClass.INVALID);
		return ok;
	}

	// компоненты dropdown

	/** Собирает весь контрол в кучу */
	private buildDropdown(
		label: HTMLLabelElement,
		button: HTMLButtonElement,
		list: HTMLDivElement,
	): HTMLDivElement {
		const wrapper = this.wrapField(
			[label, button, list],
			[ViewId.COLOR_DROPDOWN],
		);
		this.attachToggle(button, list, wrapper);
		this.attachOutsideClick(wrapper, list);

		return wrapper;
	}

	/** Кнопка для открытия списка */
	private buildButton(): HTMLButtonElement {
		const button = document.createElement('button');
		button.type = 'button';
		button.classList.add('color-dropdown-button');
        
		// устанавливаем текст/цвет по value
		if (this.value) {
			const option = COLOR_OPTIONS.get(this.value as Color);
			button.innerHTML = `<div class="color-box" style="background-color:${option?.color}"></div>
                       <span class="color-label">${option?.label ?? '???'}</span>`;
		} else {
			button.innerHTML = '<span class="color-label">Выберите цвет</span>';
		}
		return button;
	}

	/** Обёртка списка опций */
	private buildList(): HTMLDivElement {
		const dropdownList = document.createElement('div');
		dropdownList.classList.add(ViewId.COLOR_DROPDOWN_CONTENT);
		dropdownList.style.display = 'none';

		// реальные цвета
		COLOR_OPTIONS.forEach((option: ColorOption, color: Color) => {
			dropdownList.appendChild(
				this.buildOption(option, () => this.selectColor(color, option)),
			);
		});

		return dropdownList;
	}

	/** Одна опция в списке */
	private buildOption(
		colorOption: ColorOption,
		onClick: () => void,
	): HTMLDivElement {
		const option = document.createElement('div');
		option.classList.add(ViewId.COLOR_OPTION);

		const box = document.createElement('div');
		box.classList.add(ViewId.COLOR_BOX);
		box.style.backgroundColor = colorOption.color;

		const lbl = document.createElement('span');
		lbl.classList.add(ViewId.COLOR_LABEL);
		lbl.textContent = colorOption.label;

		option.append(box, lbl);
		option.addEventListener('click', onClick);
		return option;
	}

	// логика выбора и сброса

	/** При выборе конкретного цвета */
	private selectColor(color: Color, option: ColorOption) {
		this.value = color;
		this.validate();
		// Обновляем кнопку в DOM
		const btn = this.rootElement.querySelector('button')!;
		btn.innerHTML = `<div class="color-box" style="background-color:${option.color}"></div>
                     <span class="color-label">${option.label}</span>`;
		// скрываем список
		const list = this.rootElement.querySelector(
			'.color-dropdown-content',
		) as HTMLDivElement;
		list.style.display = 'none';
	}

	/** Сбрасывает выбор (пустая опция) */
	private clearSelection() {
		this.value = '';
		this.validate();

		const button = this.rootElement.querySelector('button')!;
		button.innerHTML = '<span class="color-label">Выберите цвет</span>';

		const list = this.rootElement.querySelector(
			'.color-dropdown-content',
		) as HTMLDivElement;
		list.style.display = 'none';
	}

	// oбработчики открытия/закрытия

	/** Переключает видимость списка по кнопке */
	private attachToggle(
		button: HTMLButtonElement,
		list: HTMLDivElement,
		wrapper: HTMLDivElement,
	) {
		button.addEventListener('click', () => {
			list.style.display = list.style.display === 'none' ? 'block' : 'none';
		});
	}

	/** Закрывает список при клике вне контролла */
	private attachOutsideClick(wrapper: HTMLDivElement, list: HTMLDivElement) {
		document.addEventListener('click', e => {
			if (!wrapper.contains(e.target as Node)) {
				list.style.display = 'none';
			}
		});
	}
}
