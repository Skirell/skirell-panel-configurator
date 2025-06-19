import { LIMITS } from '../../../data/constants/limits';
import { PLACEHOLDERS } from '../../../data/constants/placeholders';
import { showMessage } from '../../../utils/alert-utils';
import { renumberInstances } from '../../../utils/dom-utils';
import EventManager from '../../managers/EventManager/EventManager';
import Block from '../block/Block';

export class Page implements IJsonSerializable {
	public Index: number;
	public readonly Blocks: Block[];

	constructor(addFirstBlock: boolean = true) {
		this.Index = 1;
		this.Blocks = [];

		if (addFirstBlock) this.init();
	}

	public toJSON(): SerializedPage {
		return {
			page: this.Index,
			blocks: this.Blocks.filter(block => {
				return block.validate();
			}).map(block => {
				block.save();
				return block.toJSON();
			}),
		};
	}

	private init() {
		EventManager.emit('blockSelect', this.addBlock()); // добавляем первоначальный блок
	}

	public onBlockRemoved(): void {
		// override
	}

	public addBlock(): Block | undefined {
		if (this.Blocks.length >= LIMITS.MAX_BLOCKS_PER_PAGE) {
			showMessage(`${PLACEHOLDERS.LIMIT_REACHED} блоков!`);
			return;
		}

		const block = new Block(this);
		this.Blocks.push(block);
		this.renumberBlocks();
		return block;
	}

	public removeBlock(block: Block): void {
		const index = this.Blocks.indexOf(block);
		if (index < 0) {
			showMessage('Блок для удаления не найден!');
			return;
		}

		this.Blocks.splice(index, 1);
		this.renumberBlocks();
		this.onBlockRemoved();
	}

	private renumberBlocks(): void {
		renumberInstances(this.Blocks);
	}
}
