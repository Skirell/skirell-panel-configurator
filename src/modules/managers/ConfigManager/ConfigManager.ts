import { ipcRenderer } from 'electron';
import { CHANNELS } from '../../../data/constants/channels';
import { SerializedBlock } from '../../../global/types/block';
import { showMessage } from '../../../utils/alert-utils';
import { Page } from '../../components/page/Page';
import blockManager from '../BlockManager/BlockManager';
import eventManager from '../EventManager/EventManager';
import pageManager from '../PageManager/PageManager';
import { validateConfig } from './config-validations';

class ConfigManager implements IJsonSerializable {
	private static instance: ConfigManager;

	private constructor() {}

	public static getInstance(): ConfigManager {
		if (!ConfigManager.instance) ConfigManager.instance = new ConfigManager();
		return ConfigManager.instance;
	}

	public async saveConfig(): Promise<boolean> {
		try {
			const config = this.toJSON();
			const success = await ipcRenderer.invoke(
				CHANNELS.SAVE_CONFIG_CHANNEL,
				config
			);

			if (success) showMessage('✅ Конфигурация успешно сохранена');
			else showMessage('⚠️ Сохранение отменено');

			return true;
		} catch (err: any) {
			console.error('❌ Ошибка при сохранении конфигурации:', err);
			showMessage(`❌ Не удалось сохранить конфигурацию!`);
			return false;
		}
	}

	public async loadConfig(): Promise<boolean> {
		try {
			const loadedConfig = await ipcRenderer.invoke(
				CHANNELS.LOAD_CONFIG_CHANNEL,
			);
			if (!loadedConfig) {
				showMessage('⚠️ Файл конфигурации пуст');
				return false;
			}

			let parsedConfig: Config;
			try {
				parsedConfig = JSON.parse(loadedConfig);
			} catch (err) {
				showMessage('❌ Ошибка при разборе JSON файла');
				return false;
			}

			const validation = validateConfig(parsedConfig);
			if (!validation.success) {
				showMessage(`❌ Ошибка в JSON конфигурации: ${validation.message}`);
				return false;
			}

			this.applyConfig(parsedConfig);

			showMessage('✅ Конфигурация успешно загружена');
			return true;
		} catch (err: any) {
			console.error('❌ Ошибка при загрузке конфигурации:', err);
			showMessage(`❌ Не удалось загрузить конфигурацию!`);
			return false;
		}
	}

	public applyConfig(config: Config) {
		pageManager.clearPages();
		for (const serializedPage of config.screens) {
			const page = pageManager.addPage(false);
			if (page) this.loadBlocksTo(page, serializedPage.blocks);
		}
		eventManager.emit('pageAdded', undefined);
	}

	private loadBlocksTo(page: Page, blocks: SerializedBlock[]): void {
		for (const serializedBlock of blocks)
			blockManager.loadBlockToPage(page, serializedBlock);
	}

	public toJSON(): string {
		return JSON.stringify(
			{
				screens: pageManager.Pages.map(page => page.toJSON()).filter(
					p => p.blocks.length > 0,
				),
			},
			null,
			2,
		);
	}
}

export default ConfigManager.getInstance();
