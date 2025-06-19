import { Device, DeviceVariant } from '../../../data/enums/device';
import { BASE_PARAM_OPTIONS } from '../../../data/settings/param-options/base-param-options';
import { VARIANT_PARAM_OPTIONS } from '../../../data/settings/param-options/variant-param-options';
import { BlockData, SerializedBlock } from '../../../global/types/block';
import { makeError, makeSuccess } from '../../../utils/validation-utils';

export function validateConfig(config: Config): IValidationResult {
	if (!config || typeof config !== 'object')
		return makeError('⚠️ Конфиг должен быть объектом');
	if (!Array.isArray(config.screens))
		return makeError('⚠️ В конфиге отсутствует массив screens');

	for (const screen of config.screens) {
		const validation = validatePage(screen);
		if (!validation.success) return validation;
	}

	return makeSuccess();
}

function validatePage(page: SerializedPage): IValidationResult {
	if (!screen || typeof screen !== 'object')
		return makeError('⚠️ Страница должна быть объектом');
	if (typeof page.page !== 'number' || page.page < 1)
		return makeError('⚠️ Номер страницы должен быть положительным числом');
	if (!Array.isArray(page.blocks))
		return makeError('⚠️ В странице отсутствует массив blocks');

	for (const block of page.blocks) {
		const validation = validateBlock(block);
		if (!validation.success) return validation;
	}

	return makeSuccess();
}

function validateBlock(block: SerializedBlock): IValidationResult {
	if (!block || typeof block !== 'object')
		return makeError('⚠️ Блок должен быть объектом');
	if (typeof block.block !== 'number' || block.block < 1)
		return makeError('⚠️ Номер блока должен быть положительным числом');
	if (!block.type || !Device[block.type])
		return makeError(`⚠️ Неверный тип блока: ${block.type}`);
	return validateBlockData(block.type, block.data);
}

function validateBlockData(device: Device, data: BlockData): IValidationResult {
	if (!data || typeof data !== 'object')
		return makeError('⚠️ В блоке отсутствует объект data');
	if (data.variant_type && !DeviceVariant[data.variant_type])
		return makeError(`⚠️ Неверный тип варианта: ${data.variant_type}`);

	for (const [key] of Object.entries(data)) {
		const baseParams = BASE_PARAM_OPTIONS.get(device);
		if (!baseParams) return makeError(`⚠️ Неизвестный тип блока: ${device}`);
		if (key !== 'variant' && key !== 'variant_type' && !baseParams.has(key))
			return makeError(`⚠️ Неизвестный базовый параметр (data): ${key}`);
	}

	if (data.variant) {
		if (typeof data.variant !== 'object')
			return makeError('⚠️ variant должен быть объектом');

		for (const [key] of Object.entries(data.variant)) {
			const variantParams = data.variant_type
				? VARIANT_PARAM_OPTIONS.get(data.variant_type)
				: undefined;

			if (!variantParams)
				return makeError(
					`⚠️ Неизвестный подтип блока: ${data.variant_type}`,
				);
			if (!variantParams.has(key))
				return makeError(
					`⚠️ Неизвестный параметр подтипа (variant): ${key}`,
				);
		}
	}

	return makeSuccess();
}
