import { Feature } from '../../../../data/enums/feature';
import { ViewId } from '../../../../data/enums/view-id';
import { ParamOption } from '../../../../global/types/option';
import BaseField from '../BaseField';
import ButtonsHandler from './ButtonsHandler';
import Tab from './Tab/Tab';

export default abstract class FeaturePanelFieldUI extends BaseField {
	public readonly feature: Feature;
	public readonly featureSettings: FeaturePanelSettings;
	public readonly keyPrefix: string;
	protected readonly buttonsHandler: ButtonsHandler = new ButtonsHandler(this);
	protected readonly tabs: Tab[] = [];
	protected selectedTab: Tab | undefined = undefined;

	protected tabsContainer!: HTMLElement;
	protected contentContainer!: HTMLElement;
	protected fieldContainer!: HTMLElement;

	protected constructor(
		fieldKey: string,
		option: ParamOption,
		initialValue: string | undefined,
	) {
		super(fieldKey, option, initialValue);

		this.feature = option.feature!;
		this.featureSettings = option.featurePanelSettings!;
		this.keyPrefix = this.featureSettings.keyPrefix ?? 'mode_';

		this.buildBase();
	}

	public get Tabs(): typeof this.tabs {
		return this.tabs;
	}

	public get SelectedTab(): typeof this.selectedTab {
		return this.selectedTab;
	}
	public set SelectedTab(tab: Tab | undefined) {
		this.selectedTab = tab;
	}

	public render(): HTMLDivElement {
		const label = this.buildLabel();
		const panel = this.buildPanel();

		this.rootElement = this.wrapField([label, panel]);
		this.inputElement = this.fieldContainer;
		return this.rootElement;
	}

	public addTab(): Tab {
		const tab = new Tab(this.feature);
		this.tabs.push(tab);
		this.selectedTab = tab;
		return tab;
	}

	public clearTabs(): void {
		this.tabs.slice(0, this.tabs.length);
		this.selectedTab = this.tabs[0];
	}

	public refreshUI(): void {
		this.refreshTabButtons();
		this.refreshFields();
	}

    private getTabLabel(): string {
        switch (this.feature) {
            case Feature.modes:
            case Feature.fan_mode:
                return 'Режим';
            case Feature.sensor:
                return 'Датчик';
            default:
                return 'Блок';
        }
    }

	private refreshTabButtons(): void {
        this.selectedTab = this.selectedTab ?? this.tabs[0];
        this.tabsContainer.innerHTML = '';

        const tabLabel = this.getTabLabel();

        this.tabs.forEach((tab: Tab, index: number) => {
            const button = document.createElement('button');
            button.classList.add(ViewId.TABS_PANEL_TAB);
            button.classList.toggle('active', tab === this.selectedTab);
            button.textContent = `${this.selectedTab === tab ? `${tabLabel} · ` : ''}${index + 1}`;

            button.addEventListener('click', () => {
                this.selectedTab = tab;
                this.refreshUI();
            });

            this.tabsContainer.appendChild(button);
        });
    }

	private refreshFields(): void {
		this.fieldContainer.innerHTML = '';

		const tab = this.selectedTab;
		if (!tab) return;

		tab.UI.generateFields();
		tab.UI.getFields().forEach(field => {
			this.fieldContainer.appendChild(field.getRootElement());
		});
	}

	private buildBase(): void {
		this.tabsContainer = document.createElement('div');
		this.contentContainer = document.createElement('div');
		this.fieldContainer = document.createElement('div');
	}

	private buildPanel(): HTMLDivElement {
		const tabPanelContainer = document.createElement('div');
		tabPanelContainer.classList.add(ViewId.TABS_PANEL_CONTAINER);

		this.tabsContainer.classList.add('tabs-panel-tabs');
		tabPanelContainer.appendChild(this.tabsContainer);
		this.contentContainer.classList.add('tabs-panel-content');
		tabPanelContainer.appendChild(this.contentContainer);

		this.fieldContainer.classList.add('tabs-panel-form');
		this.contentContainer.appendChild(this.fieldContainer);

		const buttons = this.buildButtons();
		this.contentContainer.appendChild(buttons);

		return tabPanelContainer;
	}

	private buildButtons(): HTMLElement {
		const buttonsContainer = document.createElement('div');
		buttonsContainer.classList.add(ViewId.TABS_PANEL_BUTTONS);

		const makeButton = (text: string, handler: () => void) => {
			const b = document.createElement('button');
			b.classList.add(ViewId.TABS_PANEL_BUTTON);
			b.type = 'button';
			b.textContent = text;
			b.addEventListener('click', handler);
			return b;
		};

		buttonsContainer.append(
			makeButton('Добавить', () => this.buttonsHandler.onAdd()),
			makeButton('Сохранить', () => this.buttonsHandler.onSave()),
			makeButton('Удалить', () => this.buttonsHandler.onDelete()),
		);

		return buttonsContainer;
	}
}
