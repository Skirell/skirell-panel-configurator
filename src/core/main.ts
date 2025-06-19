import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { promises as fs } from 'fs';
import * as path from 'path';
import { CHANNELS } from '../data/constants/channels';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		webPreferences: {
			//preload: path.join(__dirname, 'render', 'preload.js'), // опционально
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	mainWindow.maximize();
	mainWindow.loadFile(path.join(__dirname, 'html', 'index.html'));
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-closed', () => {
	// на macOS принято держать приложение открытым до ручного выхода
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	// на macOS перезапускаем окно при повторной активации и отсутствии окон
	if (mainWindow === null) createWindow();
});

ipcMain.handle(
	CHANNELS.SHOW_CONFIRM_CHANNEL,
	async (_event, message: string): Promise<boolean> => {
		return dialog
			.showMessageBox({
				type: 'question',
				title: 'Подтверждение',
				message,
				buttons: ['Да', 'Отмена'],
				cancelId: 1,
				defaultId: 0,
			})
			.then(result => result.response === 0);
	},
);

ipcMain.handle(
	CHANNELS.SHOW_MESSAGE_CHANNEL,
	async (_event, message: string): Promise<void> => {
		await dialog.showMessageBox({
			type: 'none',
			title: 'Уведомление',
			message,
			buttons: ['OK'],
		});
	},
);

ipcMain.handle(
	CHANNELS.SAVE_CONFIG_CHANNEL,
	async (_event: IpcMainInvokeEvent, jsonData: string): Promise<boolean> => {
		try {
			const { canceled, filePath } = await dialog.showSaveDialog({
				title: 'Сохранить конфигурацию',
				defaultPath: path.join(app.getPath('documents'), 'DATA.json'),
				filters: [
					{ name: 'JSON Files', extensions: ['json'] },
					{ name: 'All Files', extensions: ['*'] },
				],
			});

			if (canceled || !filePath) return false;

			await fs.writeFile(filePath, jsonData, 'utf8');
			return true;
		} catch (err: any) {
			console.error('Ошибка при сохранении конфига:', err);
			return false;
		}
	},
);

ipcMain.handle(
	CHANNELS.LOAD_CONFIG_CHANNEL,
	async (_event: IpcMainInvokeEvent): Promise<string | null> => {
		try {
			const { canceled, filePaths } = await dialog.showOpenDialog({
				title: 'Загрузить конфигурацию',
				defaultPath: path.join(app.getPath('documents')),
				filters: [
					{ name: 'JSON Files', extensions: ['json'] },
					{ name: 'All Files', extensions: ['*'] },
				],
				properties: ['openFile'],
			});

			if (canceled || !filePaths.length) return null;

			const filePath = filePaths[0];
			const jsonData = await fs.readFile(filePath, 'utf8');
			return jsonData;
		} catch (err: any) {
			console.error('Ошибка при загрузке конфига:', err);
			return null;
		}
	},
);
